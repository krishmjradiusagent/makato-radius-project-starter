import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '../ui/utils';

interface DSAccordionItemData {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface DSAccordionProps {
  items: DSAccordionItemData[];
  type?: 'single' | 'multiple';
  className?: string;
}

export function DSAccordion({ items, type = 'single', className }: DSAccordionProps) {
  return (
    <Accordion type={type} className={cn(className)}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-sm">{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
