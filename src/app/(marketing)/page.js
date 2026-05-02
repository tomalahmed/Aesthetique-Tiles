import Banner from "@/components/banner";
import Marquee from "@/components/home/marquee";
import FilterPills from "@/components/home/filter-pills";
import FeaturedGrid from "@/components/home/featured-grid";
import ArchitecturalSpotlight from "@/components/home/architectural-spotlight";
import { getFeaturedTiles, getTileCategories } from "@/lib/tiles-service";

export default async function MarketingHomePage() {
  const [featuredTiles, categories] = await Promise.all([getFeaturedTiles(4), getTileCategories()]);

  return (
    <div className="w-full">
      <Banner />
      <Marquee />
      <FilterPills categories={categories} />
      <FeaturedGrid tiles={featuredTiles} />
      <ArchitecturalSpotlight />
    </div>
  );
}
