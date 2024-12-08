import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

import * as Accordion from "@radix-ui/react-accordion";

import { twMerge } from "tailwind-merge";

type Props = Accordion.AccordionTriggerProps;

export const AccordionTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={twMerge(
          "group",
          "h-11 px-5",
          "flex flex-1 items-center justify-between",
          "bg-white",
          "text-base leading-none",
          "cursor-pointer outline-none",
          "transition-colors ease-in-out",
          "hover:bg-slate-100",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDown
          className={twMerge(
            "transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
            "group-data-[state=open]:rotate-180"
          )}
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
