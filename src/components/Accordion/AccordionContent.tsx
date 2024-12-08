import { forwardRef } from "react";

import * as Accordion from "@radix-ui/react-accordion";

import { twMerge } from "tailwind-merge";

type Props = Accordion.AccordionContentProps;

export const AccordionContent = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={twMerge(
        "overflow-hidden bg-mauve2 text-base data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-5 py-4">{children}</div>
    </Accordion.Content>
  )
);
