"use client";

import * as React from "react";
import { cn } from "./utils";

interface FlipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipButton({ front, back, className, disabled, ...props }: FlipButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "group relative h-9 w-full overflow-hidden rounded-md border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {/* Front face */}
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {front}
      </span>
      {/* Back face */}
      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        {back}
      </span>
    </button>
  );
}
