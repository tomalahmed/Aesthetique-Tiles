import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-[var(--color-primary)] text-[#181512] hover:opacity-90",
  ghost: "bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:bg-white/5",
  subtle: "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase transition-colors",
        variants[variant] ?? variants.primary,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
