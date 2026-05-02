import { cn } from "@/lib/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-(--color-text) outline-none transition focus:border-[var(--color-primary)]",
        className,
      )}
      {...props}
    />
  );
}
