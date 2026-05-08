import * as React from 'react';
import { cn } from '../ui/utils';

interface DSActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  className?: string;
}

export function DSActivityItem({ icon, title, description, timestamp, className }: DSActivityItemProps) {
  return (
    <div className={cn('flex items-start gap-3 py-3', className)}>
      {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{timestamp}</span>
    </div>
  );
}
