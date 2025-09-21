import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      message: 'Stripe webhooks are handled via the Supabase Edge Function.',
      endpoint:
        process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL ??
        'https://<project>.functions.supabase.co/stripe-webhook',
    },
    { status: 410 }
  );
}
