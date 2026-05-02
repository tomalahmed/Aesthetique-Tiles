import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="surface-card relative overflow-hidden px-6 py-12 sm:px-10">
      <div className="absolute inset-0 opacity-30 tile-swatch" />
      <div className="relative max-w-2xl">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
          Refining Surfaces. Redefining Spaces.
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-semibold text-[var(--color-text)]">
          Premium earthy tile palettes for expressive interiors.
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Discover artisanal textures, architectural finishes, and material-first collections curated for modern projects.
        </p>
        <form action="/all-tiles" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input name="q" placeholder="Search by title, style, or material..." />
          <Button type="submit" className="sm:min-w-32">
            Explore
          </Button>
        </form>
      </div>
    </section>
  );
}
