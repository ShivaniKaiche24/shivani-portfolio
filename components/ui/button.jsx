import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors ",
  {
    variants: {
      variant: {
        default:
          "bg-[#3B82F6] text-primary hover:bg-[#2563EB]-hover ",
          primary:'bg-primary text-white',
          outline:'border border-purple-400 bg-transparent text-purrple-400 hover:bg-purple-400 hover:text-primary'
         },
      size: {
        default: "h-[40px] px-6",
        sm: "h-[44px] px-6",
        lg: "h-[44px] px-8 text-sm uppercase tracking-[2px]",
        
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
