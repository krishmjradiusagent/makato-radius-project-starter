import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../ui/utils';

interface DSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DSCard({ className, children, ...props }: DSCardProps) {
  return (
    <Card className={cn('bg-card border-border', className)} {...props}>
      {children}
    </Card>
  );
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
