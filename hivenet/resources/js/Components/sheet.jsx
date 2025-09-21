import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// class joiner
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Root pieces
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetPortal({ className, ...props }) {
  return <DialogPrimitive.Portal className={className} {...props} />;
}

export const SheetOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
);
SheetOverlay.displayName = "SheetOverlay";

const sideStyles = {
  top: "inset-x-0 top-0 border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
  bottom:
    "inset-x-0 bottom-0 border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  left:
    "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:w-80",
  right:
    "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:w-80",
};

export const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 grid gap-4 bg-white p-6 shadow-lg transition ease-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "duration-200",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
  );
}

export function SheetFooter({ className, ...props }) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2", className)} {...props} />
  );
}

export const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-gray-900", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  )
);
SheetDescription.displayName = "SheetDescription";
