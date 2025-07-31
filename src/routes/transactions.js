import { Router } from "express";
import { createTransactions } from "../controllers/transactions.js";

const router = Router();

router.route("/create").post(createTransactions);

export default router;
