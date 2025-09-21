import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Tiny utility: join class strings safely
const cn = (...classes) => classes.filter(Boolean).join(" ");

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-900/90 focus-visible:ring-gray-400",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-100/80 focus-visible:ring-gray-300",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-300",
        ghost:
          "bg-transparent hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-300",
        destructive:
          "bg-red-600 text-white hover:bg-red-600/90 focus-visible:ring-red-400",
        link: "text-gray-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
