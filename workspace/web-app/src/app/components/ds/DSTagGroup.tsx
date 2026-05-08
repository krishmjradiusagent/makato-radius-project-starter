import * as React from 'react';
import { DSBadge } from './DSBadge';
import { cn } from '../ui/utils';

interface DSTagGroupProps {
  tags: string[];
  maxVisible?: number;
  className?: string;
}

export function DSTagGroup({ tags, maxVisible = 3, className }: DSTagGroupProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visibleTags.map((tag, index) => (
        <DSBadge key={index} variant="secondary">
          {tag}
        </DSBadge>
      ))}
      {remainingCount > 0 && (
        <DSBadge variant="outline">+{remainingCount}</DSBadge>
      )}
    </div>
  );
}
