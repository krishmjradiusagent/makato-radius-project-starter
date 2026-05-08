import * as React from 'react';
import { Button, type ButtonProps } from '../ui/button';
import { cn } from '../ui/utils';

interface DSButtonProps extends ButtonProps {}

export function DSButton({ className, children, ...props }: DSButtonProps) {
  return (
    <Button className={cn(className)} {...props}>
      {children}
    </Button>
  );
}
