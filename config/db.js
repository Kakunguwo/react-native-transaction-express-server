import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// This creates a sql connection using our database
export const sql = neon(process.env.DATABASE_URL);
