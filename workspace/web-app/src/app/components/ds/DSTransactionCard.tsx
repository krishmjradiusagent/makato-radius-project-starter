import * as React from 'react';
import { DSCard } from './DSCard';
import { DSBadge } from './DSBadge';
import { ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';

interface DSTransactionCardProps {
  type: string;
  address: string;
  price: string;
  status: string;
  date: string;
  onClick?: () => void;
  className?: string;
}

export function DSTransactionCard({
  type,
  address,
  price,
  status,
  date,
  onClick,
  className,
}: DSTransactionCardProps) {
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
            <span className="text-sm font-medium text-foreground">{type}</span>
            <DSBadge variant="secondary">{status}</DSBadge>
          </div>
          <p className="text-sm text-muted-foreground">{address}</p>
          <p className="text-sm font-semibold text-foreground">{price}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </DSCard>
  );
}
