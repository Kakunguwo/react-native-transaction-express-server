import { Router } from "express";
import {
  createTransactions,
  getTransaction,
  getTransactions,
  updateTransactions,
  deleteTransaction,
  transactionsSummary,
} from "../controllers/transactions.js";

const router = Router();

// Create transaction
router.route("/create").post(createTransactions);

// Get all transactions for a user
router.route("/user/:user_id").get(getTransactions);

// Get transactions summary for a user
router.route("/summary/user/:user_id").get(transactionsSummary);

// Get, update, delete specific transaction
router
  .route("/user/:user_id/:transaction_id")
  .get(getTransaction)
  .patch(updateTransactions)
  .delete(deleteTransaction);

export default router;
