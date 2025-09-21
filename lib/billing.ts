'use server';

import { createClient } from '@/lib/supabase-server';

type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string;
  plan_id: string | null;
  status: SubscriptionStatus;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

const ACTIVE_STATUSES: SubscriptionStatus[] = ['active', 'trialing', 'past_due'];

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_active_subscription', { p_user: userId });

  if (error) {
    throw new Error(`Unable to fetch subscription: ${error.message}`);
  }

  return (data as Subscription | null) ?? null;
}

export async function requireActiveSub(userId: string): Promise<Subscription> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || !ACTIVE_STATUSES.includes(subscription.status)) {
    throw new Error('Active subscription required');
  }

  return subscription;
}
