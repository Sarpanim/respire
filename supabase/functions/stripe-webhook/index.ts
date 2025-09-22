// @ts-nocheck
import { serve } from "https://deno.land/std@0.214.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.8.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.2";

type JsonRecord = Record<string, unknown>;

type SubscriptionUpsert = {
  id?: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string;
  plan_id: string | null;
  status: string;
  current_period_end: string | null;
};

const stripeSecretKey = Deno.env.get("STRIPE_API_KEY");
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey =
  Deno.env.get("SUPABASE_SERVICE_ROLE") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
  console.error("Missing required environment variables for Stripe webhook function.");
}

const stripe = new Stripe(stripeSecretKey ?? "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(supabaseUrl ?? "", serviceRoleKey ?? "", {
  auth: { persistSession: false },
});

async function logEvent(action: string, tableName: string | null, rowId: string | null, payload: JsonRecord) {
  const { error } = await supabase.from("audit_logs").insert({
    action,
    table_name: tableName,
    row_id: rowId,
    payload,
  });
  if (error) {
    console.error("Failed to persist audit log", error);
  }
}

async function mapPriceToPlan(priceId: string | null): Promise<string | null> {
  if (!priceId) {
    return null;
  }
  const { data, error } = await supabase
    .from("plans")
    .select("id")
    .eq("stripe_price_id", priceId)
    .maybeSingle();

  if (error) {
    console.error("Failed to map Stripe price to plan", error);
    return null;
  }

  return data?.id ?? null;
}

function getCurrentPeriodEnd(subscription: Stripe.Subscription | Stripe.SubscriptionSchedule | null): string | null {
  if (!subscription || typeof subscription !== "object") {
    return null;
  }
  const timestamp =
    "current_period_end" in subscription && typeof subscription.current_period_end === "number"
      ? subscription.current_period_end
      : null;
  return timestamp ? new Date(timestamp * 1000).toISOString() : null;
}

async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.user_id;
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;

  if (!userId || !subscriptionId) {
    await logEvent("checkout.session.completed:missing", "subscriptions", null, {
      message: "Checkout session missing user or subscription reference.",
      session,
    });
    return;
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price"],
  });

  const priceId = stripeSubscription.items.data[0]?.price?.id ?? null;
  const planId = await mapPriceToPlan(priceId);

  const upsertPayload: SubscriptionUpsert = {
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    plan_id: planId,
    status: stripeSubscription.status,
    current_period_end: getCurrentPeriodEnd(stripeSubscription),
  };

  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(upsertPayload, { onConflict: "stripe_subscription_id" })
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Failed to upsert subscription from checkout session", error);
    await logEvent("checkout.session.completed:error", "subscriptions", null, {
      error: error.message,
      payload: upsertPayload,
    });
    return;
  }

  await logEvent(event.type, "subscriptions", data?.id ?? null, {
    stripe_subscription_id: subscriptionId,
    status: stripeSubscription.status,
  });
}

async function handleSubscriptionUpdate(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const priceId = subscription.items.data[0]?.price?.id ?? null;
  const planId = await mapPriceToPlan(priceId);

  const { data: existing, error: lookupError } = await supabase
    .from("subscriptions")
    .select("id, user_id")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();

  if (lookupError) {
    console.error("Failed to fetch existing subscription", lookupError);
  }

  if (!existing) {
    await logEvent(`${event.type}:missing`, "subscriptions", null, {
      message: "Subscription not found while processing event.",
      stripe_subscription_id: subscription.id,
    });
    return;
  }

  const updatePayload: JsonRecord = {
    plan_id: planId,
    status: subscription.status,
    current_period_end: getCurrentPeriodEnd(subscription),
    stripe_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id ?? null,
  };

  const { error } = await supabase
    .from("subscriptions")
    .update(updatePayload)
    .eq("id", existing.id);

  if (error) {
    console.error("Failed to update subscription", error);
    await logEvent(`${event.type}:error`, "subscriptions", existing.id, {
      error: error.message,
      payload: updatePayload,
    });
    return;
  }

  await logEvent(event.type, "subscriptions", existing.id, {
    status: subscription.status,
  });
}

serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    return new Response("Configuration error", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Invalid Stripe signature", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.trial_will_end":
        await handleSubscriptionUpdate(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionUpdate(event);
        break;
      default:
        await logEvent(event.type, "events", null, { message: "Unhandled event", type: event.type });
    }
  } catch (error) {
    console.error("Error processing Stripe webhook", error);
    await logEvent(`${event.type}:exception`, "subscriptions", null, {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
