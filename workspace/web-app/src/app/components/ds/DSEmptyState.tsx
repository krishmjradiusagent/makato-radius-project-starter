import * as React from 'react';
import { DSButton } from './DSButton';
import { cn } from '../ui/utils';

interface DSEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function DSEmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: DSEmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-6 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <DSButton onClick={onAction}>{actionLabel}</DSButton>
      )}
    </div>
  );
}
