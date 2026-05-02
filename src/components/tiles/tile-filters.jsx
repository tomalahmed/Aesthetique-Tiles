import Chip from "@/components/ui/chip";

export default function TileFilters({ categories = [], selectedCategory = "", query = "" }) {
  const baseQuery = query ? `q=${encodeURIComponent(query)}&` : "";

  return (
    <div className="flex flex-wrap gap-2">
      <Chip href={`/all-tiles?${baseQuery}`} active={!selectedCategory}>
        All
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category}
          href={`/all-tiles?${baseQuery}category=${encodeURIComponent(category)}`}
          active={selectedCategory === category}
        >
          {category}
        </Chip>
      ))}
    </div>
  );
}
