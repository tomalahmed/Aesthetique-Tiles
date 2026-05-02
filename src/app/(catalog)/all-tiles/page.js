import SectionTitle from "@/components/ui/section-title";
import SearchBar from "@/components/tiles/search-bar";
import TileFilters from "@/components/tiles/tile-filters";
import TileGrid from "@/components/tiles/tile-grid";
import { getTileCategories, queryTiles } from "@/lib/tiles-service";

export default async function AllTilesPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const category = params?.category ?? "";
  const [tiles, categories] = await Promise.all([
    queryTiles({ q: query, category, sort: params?.sort }),
    getTileCategories(),
  ]);

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Catalog"
        title="All tiles"
        subtitle="Filter by category and search by material or title to find your ideal surface."
      />
      <SearchBar query={query} category={category} />
      <TileFilters categories={categories} selectedCategory={category} query={query} />
      <TileGrid tiles={tiles} />
    </div>
  );
}
