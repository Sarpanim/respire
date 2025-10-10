import React from 'react';
import type { ReactNode } from 'react';

export type AdminShellProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export default function AdminShell({ title, description, actions, children }: AdminShellProps) {
  return (
    <div className="relative min-h-screen">
      <header className="relative overflow-hidden border-b border-border/60 bg-card/80 backdrop-blur">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,hsl(var(--accent-gradient-from)/0.35),transparent_70%)]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            {title ? <h1 className="text-2xl font-semibold text-foreground">{title}</h1> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
