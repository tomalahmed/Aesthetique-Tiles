import TileCard from "@/components/tiles/tile-card";

export default function TileGrid({ tiles = [] }) {
  if (!tiles.length) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">No tiles matched your search. Try another category or keyword.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tiles.map((tile, index) => (
        <TileCard key={tile.id} tile={tile} index={index} />
      ))}
    </div>
  );
}
