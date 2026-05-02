import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "tiles_gallery";

if (!uri) {
  throw new Error("Missing MONGODB_URI. Add it to your .env.local file.");
}

let client;

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri);
  }
  client = globalThis._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db(dbName);

export { client, db };
