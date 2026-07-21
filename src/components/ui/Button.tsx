import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-app font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-app-sm hover:bg-primary-dark hover:shadow-app-md focus-visible:ring-primary",
        secondary:
          "bg-white text-primary border border-primary/30 hover:bg-primary-light focus-visible:ring-primary",
        success:
          "bg-success text-white shadow-app-sm hover:brightness-110 focus-visible:ring-success",
        danger:
          "bg-danger text-white shadow-app-sm hover:brightness-110 focus-visible:ring-danger",
        ghost:
          "bg-transparent text-text hover:bg-surface-muted focus-visible:ring-primary",
        outline:
          "bg-transparent border border-border text-text hover:bg-surface-muted focus-visible:ring-primary",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
