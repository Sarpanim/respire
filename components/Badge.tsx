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
          ? 'bg-primary/15 text-primary ring-1 ring-inset ring-primary/20'
          : 'border border-border/70 text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  );
}
