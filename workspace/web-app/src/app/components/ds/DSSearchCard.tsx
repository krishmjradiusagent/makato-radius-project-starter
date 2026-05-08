import * as React from 'react';
import { DSCard } from './DSCard';
import { DSBadge } from './DSBadge';
import { ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';

interface DSSearchCardProps {
  title: string;
  criteria: string;
  status: string;
  created: string;
  onClick?: () => void;
  className?: string;
}

export function DSSearchCard({
  title,
  criteria,
  status,
  created,
  onClick,
  className,
}: DSSearchCardProps) {
  return (
    <DSCard
      className={cn(
        'p-4 cursor-pointer hover:bg-muted/40 transition-colors',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{title}</span>
            <DSBadge variant="secondary">{status}</DSBadge>
          </div>
          <p className="text-sm text-muted-foreground">{criteria}</p>
          <p className="text-xs text-muted-foreground">{created}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </DSCard>
  );
}
