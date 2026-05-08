import * as React from 'react';
import { Badge, type BadgeProps } from '../ui/badge';
import { cn } from '../ui/utils';

interface DSBadgeProps extends BadgeProps {
  children: React.ReactNode;
}

export function DSBadge({ className, children, variant = 'secondary', ...props }: DSBadgeProps) {
  return (
    <Badge className={cn('text-xs', className)} variant={variant} {...props}>
      {children}
    </Badge>
  );
}
