import Image from "next/image";
import Link from "next/link";
import CardShell from "@/components/ui/card-shell";
import Chip from "@/components/ui/chip";

export default function TileCard({ tile }) {
  return (
    <CardShell className="h-full space-y-4">
      <div className="relative h-40 overflow-hidden rounded-sm border border-[var(--color-border)]">
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
        <h3 className="text-lg font-semibold text-[var(--color-text)]">{tile.title}</h3>
        <p className="text-sm text-[var(--color-text-muted)]">{tile.description}</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-[var(--color-primary)]">${tile.price.toFixed(2)}</span>
        <Link
          href={`/tiles/${tile.id}`}
          className="text-[11px] tracking-[0.12em] text-[var(--color-text-muted)] uppercase hover:text-[var(--color-text)]"
        >
          View Details
        </Link>
      </div>
    </CardShell>
  );
}
