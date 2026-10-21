import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 rounded-sm";

    const variants = {
      primary: "bg-dark text-light hover:bg-[#2a2a2a]",
      outline: "border border-dark text-dark hover:bg-dark hover:text-light",
      ghost: "text-dark hover:bg-dark/6",
    };

    const sizes = {
      sm: "min-h-[44px] px-4 text-xs",
      default: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-sm",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && children) {
      return <span className={classes}>{children}</span>;
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
