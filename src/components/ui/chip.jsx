import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Chip({ href, active = false, children, className }) {
  const classes = cn(
    "inline-flex rounded-sm border px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors",
    active
      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[#181512]"
      : "border-[var(--color-border)] bg-[var(--color-surface)] text-(--color-text-muted) hover:text-(--color-text)",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
