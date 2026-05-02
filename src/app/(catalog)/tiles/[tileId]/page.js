import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getTileDetails } from "@/lib/tiles-service";
import { getServerSession } from "@/lib/server-session";

export default async function TileDetailsPage({ params }) {
  const sessionData = await getServerSession();
  if (!sessionData?.session?.user) {
    redirect(`/login?next=/tiles/${params.tileId}`);
  }

  const tile = await getTileDetails(params.tileId);
  if (!tile) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Private Detail"
        title={tile.title}
        subtitle="Technical and material profile for specification workflows."
      />
      <CardShell className="space-y-4">
        <div className="relative h-64 overflow-hidden rounded-sm border border-[var(--color-border)]">
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">{tile.description}</p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--color-text-muted)]">Category</dt>
            <dd className="font-semibold text-[var(--color-text)]">{tile.category}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-muted)]">Material</dt>
            <dd className="font-semibold text-[var(--color-text)]">{tile.material}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-muted)]">Dimensions</dt>
            <dd className="font-semibold text-[var(--color-text)]">{tile.dimensions}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-muted)]">Price</dt>
            <dd className="font-semibold text-[var(--color-primary)]">${tile.price.toFixed(2)}</dd>
          </div>
        </dl>
      </CardShell>
    </div>
  );
}
