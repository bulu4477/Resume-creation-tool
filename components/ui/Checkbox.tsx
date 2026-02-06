import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(e);
      if (onCheckedChange) {
        const target = e.target as HTMLInputElement;
        onCheckedChange(target.checked);
      }
    };

    return (
      <input
        type="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
