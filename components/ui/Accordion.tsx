import * as React from "react"

import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  isOpen?: boolean
  onToggle?: () => void
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, title, children, isOpen, onToggle, ...props }, ref) => (
    <div ref={ref} className={cn("border rounded-lg", className)} {...props}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 font-medium"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
)
AccordionItem.displayName = "AccordionItem"

export { Accordion, AccordionItem }
