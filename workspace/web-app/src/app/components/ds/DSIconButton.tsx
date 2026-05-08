import * as React from 'react';
import { cn } from '../ui/utils';

interface DSIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'ghost' | 'outline';
}

export function DSIconButton({ icon, label, variant = 'ghost', className, ...props }: DSIconButtonProps) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-muted hover:text-foreground',
    outline: 'border border-border bg-background hover:bg-muted',
  };

  return (
    <button
      type="button"
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        'h-9 w-9',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
}
