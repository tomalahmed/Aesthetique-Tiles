import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function ArchitectsPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Architects"
        title="Material insights tailored for architecture teams"
        subtitle="Detail sheets, finish guidance, and product availability are coming soon."
      />
      <CardShell className="space-y-3">
        <p className="text-sm text-(--color-text-muted)">
          Use the main tile gallery to shortlist textures while we finalize architect-specific tooling.
        </p>
        <Link href="/all-tiles" className="text-sm font-semibold text-(--color-primary) hover:underline">
          Browse all tiles
        </Link>
      </CardShell>
    </div>
  );
}
