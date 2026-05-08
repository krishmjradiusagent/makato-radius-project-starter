import * as React from 'react';
import { cn } from '../ui/utils';

interface DSFieldRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DSFieldRow({ label, value, className }: DSFieldRowProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 py-2', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground text-right">{value}</span>
    </div>
  );
}
