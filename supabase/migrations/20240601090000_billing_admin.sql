-- Migration: billing & admin foundation
-- Description: create billing tables, helper functions, RLS policies, and seed plans.

begin;

create extension if not exists "pgcrypto";

-- Generic trigger to update the updated_at timestamp.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

-- Helper to determine if the current user is an admin.
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
      and role = 'admin'
  );
end;
$$;

-- Profiles table keeps minimal user metadata and role.
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- Plans catalogue describing Stripe price/product pairing.
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  stripe_price_id text not null unique,
  stripe_product_id text,
  name text not null,
  interval text not null check (interval in ('month', 'year')),
  amount_cents integer not null,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_plans_updated_at
before update on public.plans
for each row
execute function public.set_updated_at();

-- Subscriptions referencing users and plans.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text not null unique,
  plan_id uuid references public.plans(id),
  status text not null check (status in ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  current_period_end timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

-- Application level settings.
create table if not exists public.app_settings (
  key text primary key,
  value jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_app_settings_updated_at
before update on public.app_settings
for each row
execute function public.set_updated_at();

-- Audit logs for administrative operations.
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid default auth.uid(),
  action text not null,
  table_name text,
  row_id uuid,
  payload jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_audit_logs_updated_at
before update on public.audit_logs
for each row
execute function public.set_updated_at();

-- Function returning the most recent active subscription for a user.
create or replace function public.get_active_subscription(p_user uuid)
returns public.subscriptions
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.subscriptions;
begin
  select s.*
    into result
  from public.subscriptions s
  where s.user_id = p_user
    and s.status in ('active', 'trialing', 'past_due')
  order by s.current_period_end desc nulls last
  limit 1;

  return result;
end;
$$;

-- Enable Row Level Security on all new tables.
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.app_settings enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles policies.
create policy profiles_owner_select on public.profiles
for select
using (auth.uid() = user_id);

create policy profiles_owner_update on public.profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy profiles_admin_select on public.profiles
for select
using (public.is_admin());

create policy profiles_admin_update on public.profiles
for update
using (public.is_admin())
with check (true);

-- Plans policies.
create policy plans_public_read on public.plans
for select
using (true);

create policy plans_admin_insert on public.plans
for insert
with check (public.is_admin());

create policy plans_admin_update on public.plans
for update
using (public.is_admin())
with check (public.is_admin());

create policy plans_admin_delete on public.plans
for delete
using (public.is_admin());

-- Subscriptions policies.
create policy subscriptions_owner_select on public.subscriptions
for select
using (auth.uid() = user_id);

create policy subscriptions_admin_select on public.subscriptions
for select
using (public.is_admin());

create policy subscriptions_admin_modify on public.subscriptions
for all
using (public.is_admin())
with check (public.is_admin());

create policy subscriptions_service_modify on public.subscriptions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- App settings policies.
create policy app_settings_admin_select on public.app_settings
for select
using (public.is_admin());

create policy app_settings_admin_modify on public.app_settings
for all
using (public.is_admin())
with check (public.is_admin());

-- Audit logs policies.
create policy audit_logs_admin_select on public.audit_logs
for select
using (public.is_admin());

create policy audit_logs_service_insert on public.audit_logs
for insert
with check (auth.role() = 'service_role');

create policy audit_logs_service_update on public.audit_logs
for update
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- Seed basic plans (idempotent on stripe_price_id).
insert into public.plans (stripe_price_id, stripe_product_id, name, interval, amount_cents, active)
values
  ('price_monthly_placeholder', 'prod_monthly_placeholder', 'Abonnement Mensuel', 'month', 990, true),
  ('price_yearly_placeholder', 'prod_yearly_placeholder', 'Abonnement Annuel', 'year', 9990, true)
on conflict (stripe_price_id) do update
set
  stripe_product_id = excluded.stripe_product_id,
  name = excluded.name,
  interval = excluded.interval,
  amount_cents = excluded.amount_cents,
  active = excluded.active;

commit;
