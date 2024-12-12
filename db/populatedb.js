import pkg from "pg";
import { readFileSync, existsSync, writeFileSync, readFile } from "fs";
import path from "path";

const { Client } = pkg;

const dbUrl = process.env.DB_URL;

const sqlFilePath = path.resolve("./db/seed.sql");
const SQL = readFileSync(sqlFilePath, "utf-8");

const DB_POPULATED_FLAG = ".db_populated";

async function main() {
  if (existsSync(DB_POPULATED_FLAG)) {
    console.log("Database already populated, skipping...");
    return;
  }

  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
    writeFileSync(DB_POPULATED_FLAG, "true");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
