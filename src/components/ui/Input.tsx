import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, rightElement, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 text-text-muted">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "h-11 w-full rounded-app border border-border bg-white px-4 text-sm text-text placeholder:text-text-muted transition-colors outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              icon && "pl-10",
              rightElement && "pr-11",
              error && "border-danger focus:border-danger focus:ring-danger/20",
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3.5 flex items-center">{rightElement}</span>
          )}
        </div>
        {error && <p className="text-xs font-medium text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
