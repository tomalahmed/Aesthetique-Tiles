import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SearchBar({ query = "", category = "" }) {
  return (
    <form action="/all-tiles" method="get" className="surface-card flex flex-col gap-3 p-6 sm:flex-row">
      <Input
        name="q"
        defaultValue={query}
        placeholder="Search for tiles by title..."
        className="h-12 text-base"
      />
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <Button type="submit">Search</Button>
    </form>
  );
}
