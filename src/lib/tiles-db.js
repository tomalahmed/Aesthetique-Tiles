import { readFile } from "node:fs/promises";
import path from "node:path";

export const DB_JSON_PATH = path.join(process.cwd(), "src", "db", "db.json");

function normalizeImagePath(image) {
  if (typeof image !== "string") {
    return image;
  }

  if (image.startsWith("/public/")) {
    return image.replace("/public/", "/");
  }

  return image;
}

function normalizeTile(tile) {
  return {
    ...tile,
    image: normalizeImagePath(tile?.image),
  };
}

async function readTilesFromDb() {
  const fileContent = await readFile(DB_JSON_PATH, "utf8");
  const parsedTiles = JSON.parse(fileContent);

  if (!Array.isArray(parsedTiles)) {
    return [];
  }

  return parsedTiles.map(normalizeTile);
}

export async function getAllTiles({ query = "" } = {}) {
  const tiles = await readTilesFromDb();
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return tiles;
  }

  return tiles.filter((tile) => {
    const searchableText = [
      tile.id,
      tile.title,
      tile.description,
      tile.category,
      tile.material,
      tile.dimensions,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export async function getTileById(tileId) {
  if (!tileId) {
    return null;
  }

  const tiles = await readTilesFromDb();
  return tiles.find((tile) => tile.id === tileId) ?? null;
}
