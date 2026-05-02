import Banner from "@/components/banner";
import FilterPills from "@/components/home/filter-pills";
import FeaturedGrid from "@/components/home/featured-grid";
import { getFeaturedTiles, getTileCategories } from "@/lib/tiles-service";

export default async function MarketingHomePage() {
  const [featuredTiles, categories] = await Promise.all([getFeaturedTiles(8), getTileCategories()]);

  return (
    <div className="w-full">
      <Banner />
      <FilterPills categories={categories} />
      <FeaturedGrid tiles={featuredTiles} />
    </div>
  );
}
