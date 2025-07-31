import dotenv from "dotenv";
import { app } from "./app.js";
import { initializeDatabase } from "./config/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
