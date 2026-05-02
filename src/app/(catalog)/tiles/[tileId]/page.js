import Image from "next/image";
import { notFound } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getTileDetails } from "@/lib/tiles-service";
import Chip from "@/components/ui/chip";

export default async function TileDetailsPage({ params }) {
  const { tileId } = await params;

  const tile = await getTileDetails(tileId);
  if (!tile) {
    notFound();
  }

  const creator = tile.creator || "Aesthetique Studio";
  const styleDescription = tile.styleDescription || tile.description;
  const tags = Array.isArray(tile.tags) && tile.tags.length
    ? tile.tags
    : [tile.category, tile.material, tile.inStock ? "In Stock" : "Out of Stock"].filter(Boolean);
  // #region agent log
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "pre-fix", hypothesisId: "H1", location: "src/app/(catalog)/tiles/[tileId]/page.js:21", message: "Tile details classes before canonicalization", data: { imageBorderClass: "border-[var(--color-border)]", headingTextClass: "text-(--color-text)", mutedTextClass: "text-(--color-text-muted)", keyValueBorderClass: "border-[var(--color-border)]" }, timestamp: Date.now() }) }).catch(() => {});
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "post-fix", hypothesisId: "V1", location: "src/app/(catalog)/tiles/[tileId]/page.js:22", message: "Tile details classes after canonicalization", data: { imageBorderClass: "border-(--color-border)", headingTextClass: "text-foreground", keyValueBorderClass: "border-(--color-border)" }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Private Detail"
        title={tile.title}
        subtitle="Technical and material profile for specification workflows."
      />
      <CardShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-sm border border-(--color-border) lg:h-[420px]">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">{tile.title}</h3>
            <p className="text-sm text-(--color-text-muted)">{styleDescription}</p>
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Creator</dt>
                <dd className="font-semibold text-foreground">{creator}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Category</dt>
                <dd className="font-semibold text-foreground">{tile.category}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Material</dt>
                <dd className="font-semibold text-foreground">{tile.material}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Dimensions</dt>
                <dd className="font-semibold text-foreground">{tile.dimensions}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2">
                <dt className="text-(--color-text-muted)">Price</dt>
                <dd className="font-semibold text-(--color-primary)">${tile.price.toFixed(2)}</dd>
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
