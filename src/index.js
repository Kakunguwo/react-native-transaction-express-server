import dotenv from "dotenv";
import { app } from "./app.js";
import { sql } from "../config/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

async function initializeDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialised successfully");
  } catch (error) {
    console.log("Error initialising database", error);
    process.exit(1);
  }
}

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
