import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function JournalPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Journal"
        title="Design stories from earthy modern spaces"
        subtitle="Editorial content and case studies are being assembled."
      />
      <CardShell className="space-y-3">
        <p className="text-sm text-(--color-text-muted)">
          In the meantime, jump into current collections to explore available looks and materials.
        </p>
        <Link href="/all-tiles" className="text-sm font-semibold text-(--color-primary) hover:underline">
          View current catalog
        </Link>
      </CardShell>
    </div>
  );
}
