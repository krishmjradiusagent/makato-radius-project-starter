import * as React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../ui/utils';

interface DSScrollPanelProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export function DSScrollPanel({ children, className, maxHeight = 'calc(100vh - 200px)' }: DSScrollPanelProps) {
  return (
    <ScrollArea className={cn('w-full', className)} style={{ maxHeight }}>
      {children}
    </ScrollArea>
  );
}
