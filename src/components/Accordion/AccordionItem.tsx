import { forwardRef } from "react";

import * as Accordion from "@radix-ui/react-accordion";

import { twMerge } from "tailwind-merge";

type Props = Accordion.AccordionItemProps;

export const AccordionItem = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={twMerge(
        "mt-px rounded",
        "overflow-hidden",
        "first:mt-0 first:rounded-t",
        "last:rounded-b",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);
