import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

let db: NeonHttpDatabase | undefined;

export function getDb(): NeonHttpDatabase {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL environment variable is not set");
    db = drizzle({ client: neon(url) });
  }
  return db;
}
