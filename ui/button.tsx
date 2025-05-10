
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:scale-[1.02]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-sm hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-lg hover:scale-[1.02]",
        gradient: "bg-gradient-to-r from-primary/80 via-primary to-primary/80 text-primary-foreground hover:shadow-glow hover:scale-[1.02] hover:from-primary hover:to-primary",
        soft: "bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-primary/5 hover:scale-[1.02]",
        subtle: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm hover:scale-[1.02]",
        manufacturing: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30 hover:shadow-lg hover:scale-[1.02]",
        pvc: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30 hover:shadow-lg hover:scale-[1.02]",
        hdpe: "bg-yellow-600 text-white hover:bg-yellow-700 hover:shadow-yellow-500/30 hover:shadow-lg hover:scale-[1.02]",
        pp: "bg-green-600 text-white hover:bg-green-700 hover:shadow-green-500/30 hover:shadow-lg hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        bouncy: "active:scale-95 transition-transform",
        glow: "hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/30)] transition-shadow",
        pulse: "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "bouncy",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
