import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { hospitals } from "./src/lib/db/schema/hospital.schema";
import { userTable } from "./src/lib/db/schema/auth.schema";
import { desc } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function main() {
  console.log("Connecting to database...");
  try {
    console.log("--- USERS ---");
    const users = await db
      .select()
      .from(userTable)
      .orderBy(desc(userTable.createdAt))
      .limit(5);
    if (users.length === 0) {
      console.log("No users found.");
    } else {
      console.log(`Found ${users.length} users. Latest:`);
      console.log(JSON.stringify(users, null, 2));
    }

    console.log("\n--- HOSPITALS ---");
    const results = await db
      .select()
      .from(hospitals)
      .orderBy(desc(hospitals.createdAt))
      .limit(5);

    if (results.length === 0) {
      console.log("No hospitals found.");
    } else {
      console.log(`Found ${results.length} hospitals. Latest:`);
      console.log(JSON.stringify(results, null, 2));
    }
  } catch (error) {
    console.error("Error querying database:", error);
  } finally {
    await client.end();
  }
}

main();
