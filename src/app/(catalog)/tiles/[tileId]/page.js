import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getTileDetails } from "@/lib/tiles-service";
import { getServerSession } from "@/lib/server-session";
import Chip from "@/components/ui/chip";

export default async function TileDetailsPage({ params }) {
  const { tileId } = await params;
  const sessionData = await getServerSession();
  if (!sessionData?.session?.user) {
    redirect(`/login?next=/tiles/${tileId}`);
  }

  const tile = await getTileDetails(tileId);
  if (!tile) {
    notFound();
  }

  const creator = tile.creator || "Aesthetique Studio";
  const styleDescription = tile.styleDescription || tile.description;
  const tags = Array.isArray(tile.tags) && tile.tags.length
    ? tile.tags
    : [tile.category, tile.material, tile.inStock ? "In Stock" : "Out of Stock"].filter(Boolean);

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Private Detail"
        title={tile.title}
        subtitle="Technical and material profile for specification workflows."
      />
      <CardShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-sm border border-[var(--color-border)] lg:h-[420px]">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--color-text)]">{tile.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">{styleDescription}</p>
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                <dt className="text-[var(--color-text-muted)]">Creator</dt>
                <dd className="font-semibold text-[var(--color-text)]">{creator}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                <dt className="text-[var(--color-text-muted)]">Category</dt>
                <dd className="font-semibold text-[var(--color-text)]">{tile.category}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                <dt className="text-[var(--color-text-muted)]">Material</dt>
                <dd className="font-semibold text-[var(--color-text)]">{tile.material}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                <dt className="text-[var(--color-text-muted)]">Dimensions</dt>
                <dd className="font-semibold text-[var(--color-text)]">{tile.dimensions}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2">
                <dt className="text-[var(--color-text-muted)]">Price</dt>
                <dd className="font-semibold text-[var(--color-primary)]">${tile.price.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
        </div>
      </CardShell>
    </div>
  );
}
