import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  'inline-flex transform items-center justify-center gap-control-gap rounded-lg text-sm font-medium leading-snug transition-colors transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:shadow-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground shadow-button hover:-translate-y-button-raise hover:bg-primary-dark hover:shadow-button-hover',
  secondary: 'bg-muted/80 text-muted-foreground shadow-sm hover:bg-muted',
  outline: 'border border-border bg-background hover:bg-accent/30 hover:text-accent-foreground',
  ghost: 'hover:bg-accent/20 hover:text-accent-foreground',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-control px-control-x py-control-y',
  sm: 'h-control-sm rounded-md px-control-sm-x py-control-sm-y text-xs',
  lg: 'h-control-lg px-control-lg-x py-control-lg-y text-base',
  icon: 'h-control-icon w-control-icon',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
