import { cn } from "@/lib/cn";

export default function SectionTitle({ eyebrow, title, subtitle, className }) {
  return (
    <header className={cn("space-y-2", className)}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold tracking-[0.2em] text-(--color-accent) uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold text-(--color-text) md:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm text-(--color-text-muted)">{subtitle}</p> : null}
    </header>
  );
}
