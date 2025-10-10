import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variant === 'default'
          ? 'bg-primary/20 text-primary'
          : 'border border-slate-600/70 text-slate-300 dark:border-slate-400/40 dark:text-slate-200',
        className
      )}
    >
      {children}
    </span>
  );
}
