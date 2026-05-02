import Image from "next/image";
import Link from "next/link";
import CardShell from "@/components/ui/card-shell";
import Chip from "@/components/ui/chip";
import Button from "@/components/ui/button";

export default async function TileCard({ tile }) {
  // #region agent log
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "pre-fix", hypothesisId: "H5", location: "src/components/tiles/tile-card.jsx:8", message: "Tile card classes before canonicalization", data: { imageBorderClass: "border-[var(--color-border)]", titleClass: "text-(--color-text)", mutedClass: "text-(--color-text-muted)", priceClass: "text-(--color-primary)" }, timestamp: Date.now() }) }).catch(() => {});
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "post-fix", hypothesisId: "V5", location: "src/components/tiles/tile-card.jsx:9", message: "Tile card classes after canonicalization", data: { imageBorderClass: "border-(--color-border)", titleClass: "text-foreground", mutedClass: "text-(--color-text-muted)", priceClass: "text-(--color-primary)" }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion
  return (
    <CardShell className="h-full space-y-4">
      <div className="relative h-40 overflow-hidden rounded-sm border border-(--color-border)">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-2">
        <Chip>{tile.material || tile.category}</Chip>
        <h3 className="text-lg font-semibold text-foreground">{tile.title}</h3>
        <p className="text-sm text-(--color-text-muted)">{tile.description}</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-(--color-primary)">${tile.price.toFixed(2)}</span>
        <Button as={Link} href={`/tiles/${tile.id}`} variant="subtle" className="px-3 py-2 text-[10px]">
          Details
        </Button>
      </div>
    </CardShell>
  );
}
