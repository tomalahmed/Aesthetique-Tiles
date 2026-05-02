import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function CollectionsPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Collections"
        title="Explore curated earthy collection stories"
        subtitle="Navigate by mood, material character, and architectural intent."
      />
      <CardShell className="space-y-3">
        <p className="text-sm text-[var(--color-text-muted)]">
          Our collection navigator is expanding. For now, browse every curated surface from the gallery.
        </p>
        <Link href="/all-tiles" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
          Open full gallery
        </Link>
      </CardShell>
    </div>
  );
}
