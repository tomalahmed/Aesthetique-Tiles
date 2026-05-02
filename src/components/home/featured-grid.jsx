import TileCard from "@/components/tiles/tile-card";
import SectionTitle from "@/components/ui/section-title";
import Button from "@/components/ui/button";

export default function FeaturedGrid({ tiles = [] }) {
  return (
    <section className="mt-10 space-y-6">
      <SectionTitle
        eyebrow="Featured Collection"
        title="Hand-picked textures for premium earthy spaces"
        subtitle="Built for designers seeking warm palettes, tactile finishes, and modern architectural utility."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, index) => (
          <TileCard key={tile.id} tile={tile} index={index} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button as="a" href="/all-tiles" variant="ghost">
          Load More Collections
        </Button>
      </div>
    </section>
  );
}
