import { getAllTiles, getTileById } from "@/lib/tiles-db";

function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}

export async function queryTiles({ q = "", category = "", sort = "title" } = {}) {
  const tiles = await getAllTiles();
  const query = normalize(q);
  const normalizedCategory = normalize(category);

  const filtered = tiles.filter((tile) => {
    const matchesQuery =
      !query ||
      normalize(tile.title).includes(query) ||
      normalize(tile.description).includes(query) ||
      normalize(tile.material).includes(query);
    const matchesCategory = !normalizedCategory || normalize(tile.category) === normalizedCategory;
    return matchesQuery && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.title.localeCompare(b.title);
  });

  return sorted;
}

export async function getTileCategories() {
  const tiles = await getAllTiles();
  return [...new Set(tiles.map((tile) => normalize(tile.category)).filter(Boolean))];
}

export async function getFeaturedTiles(limit = 8) {
  const tiles = await queryTiles({ sort: "title" });
  return tiles.slice(0, limit);
}

export async function getTileDetails(tileId) {
  return getTileById(tileId);
}
