
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-105 hover:shadow-glow",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:scale-105 hover:shadow-destructive/20",
        outline: "text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105",
        success: "border-transparent bg-green-500/20 text-green-600 hover:bg-green-500/30 hover:scale-105",
        warning: "border-transparent bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 hover:scale-105",
        info: "border-transparent bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 hover:scale-105",
        premium: "border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105",
        glass: "border border-white/10 bg-white/5 backdrop-blur-md text-foreground hover:bg-white/10 hover:scale-105",
        subtle: "border border-border/50 bg-background/80 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:scale-105",
        dot: "flex items-center gap-1 border-transparent bg-background text-muted-foreground hover:text-primary hover:scale-105 px-1.5 before:content-[''] before:h-1.5 before:w-1.5 before:rounded-full",
        pvc: "border-transparent bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 hover:scale-105",
        hdpe: "border-transparent bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30 hover:scale-105",
        pp: "border-transparent bg-green-500/20 text-green-700 hover:bg-green-500/30 hover:scale-105",
        pex: "border-transparent bg-purple-500/20 text-purple-700 hover:bg-purple-500/30 hover:scale-105",
        price: "border border-green-200 bg-green-100/50 text-green-800 hover:bg-green-200/50 hover:scale-105",
        stock: "border-transparent bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 hover:scale-105",
        outOfStock: "border-transparent bg-red-500/20 text-red-700 hover:bg-red-500/30 hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

function Badge({ className, variant, pulse = false, ...props }: BadgeProps) {
  return (
    <div className={cn(
      badgeVariants({ variant }), 
      pulse && "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]", 
      className
    )} {...props} />
  )
}

export { Badge, badgeVariants }
