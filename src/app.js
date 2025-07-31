import express from "express";
import transactionRoutes from "./routes/transactions.js";
import { errorHandler, notFound } from "./middlewares/error.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.use("/api/v1/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
