import Chip from "@/components/ui/chip";

export default function FilterPills({ categories = [] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <Chip href="/all-tiles" active>
        All Surfaces
      </Chip>
      {categories.map((category) => (
        <Chip key={category} href={`/all-tiles?category=${encodeURIComponent(category)}`}>
          {category}
        </Chip>
      ))}
    </div>
  );
}
