-- Rollback script for billing & admin foundation.

begin;

drop policy if exists audit_logs_service_update on public.audit_logs;
drop policy if exists audit_logs_service_insert on public.audit_logs;
drop policy if exists audit_logs_admin_select on public.audit_logs;

drop policy if exists app_settings_admin_modify on public.app_settings;
drop policy if exists app_settings_admin_select on public.app_settings;

drop policy if exists subscriptions_service_modify on public.subscriptions;
drop policy if exists subscriptions_admin_modify on public.subscriptions;
drop policy if exists subscriptions_admin_select on public.subscriptions;
drop policy if exists subscriptions_owner_select on public.subscriptions;

drop policy if exists plans_admin_delete on public.plans;
drop policy if exists plans_admin_update on public.plans;
drop policy if exists plans_admin_insert on public.plans;
drop policy if exists plans_public_read on public.plans;

drop policy if exists profiles_admin_update on public.profiles;
drop policy if exists profiles_admin_select on public.profiles;
drop policy if exists profiles_owner_update on public.profiles;
drop policy if exists profiles_owner_select on public.profiles;

alter table if exists public.audit_logs disable row level security;
alter table if exists public.app_settings disable row level security;
alter table if exists public.subscriptions disable row level security;
alter table if exists public.plans disable row level security;
alter table if exists public.profiles disable row level security;

-- Drop triggers.
drop trigger if exists set_audit_logs_updated_at on public.audit_logs;
drop trigger if exists set_app_settings_updated_at on public.app_settings;
drop trigger if exists set_subscriptions_updated_at on public.subscriptions;
drop trigger if exists set_plans_updated_at on public.plans;
drop trigger if exists set_profiles_updated_at on public.profiles;

-- Drop tables.
drop table if exists public.audit_logs;
drop table if exists public.app_settings;
drop table if exists public.subscriptions;
drop table if exists public.plans;
drop table if exists public.profiles;

-- Drop helper functions.
drop function if exists public.get_active_subscription(uuid);
drop function if exists public.is_admin();
drop function if exists public.set_updated_at();

commit;
