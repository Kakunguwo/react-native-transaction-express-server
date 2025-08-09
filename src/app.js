import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactions.js";
import healthRoutes from "./routes/health.js";
import { errorHandler, notFound } from "./middlewares/error.js";
import ratelimitter from "./middlewares/rateLimiter.js";
import job from "./config/cron.js";

const app = express();

if (process.env.NODE_ENV === "production") {
  job.start();
}

app.set("trust proxy", true);

app.use(ratelimitter);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
