import * as React from 'react';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';

interface DSSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

export function DSSection({ title, children, className, showDivider = true }: DSSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
      {children}
      {showDivider && <Separator />}
    </div>
  );
}
