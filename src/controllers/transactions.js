import { sql } from "../config/db.js";

export const createTransactions = async (req, res) => {
  try {
    const { title, category, amount, user_id } = req.body;

    if (
      [title, category, amount, user_id].some(
        (field) => !field || field.toString().trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // validate amount is a valid decimal
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        message: "Amount must be a valid number",
        success: false,
      });
    }

    const transaction = await sql`
        INSERT INTO transactions (user_id, amount, category, title)
        VALUES (${user_id}, ${numericAmount}, ${category}, ${title})
        RETURNING *
    `;

    res.status(201).json({
      message: "Transaction created successfully",
      data: transaction[0],
      success: true,
    });
  } catch (error) {
    console.log("Error creating transaction", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { transaction_id, user_id } = req.params;

    if (!user_id || !transaction_id) {
      return res.status(400).json({
        message: "User ID and transaction ID are required",
        success: false,
      });
    }

    // validate transaction id is a number
    const numericTransactionId = parseInt(transaction_id);
    if (isNaN(numericTransactionId)) {
      return res.status(400).json({
        message: "Invalid transaction ID",
        success: false,
      });
    }

    const transaction = await sql`
      SELECT * FROM transactions 
      WHERE user_id = ${user_id} AND id = ${numericTransactionId}
    `;

    if (transaction.length > 0) {
      return res.status(200).json({
        message: "Transaction fetched successfully",
        success: true,
        data: transaction[0],
      });
    } else {
      return res.status(400).json({
        message: "Transaction not found",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error getting a transaction: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id || user_id.trim() === "") {
      return res.status(400).json({
        message: "User id is required",
        success: false,
      });
    }

    const transactions = await sql`
      SELECT * FROM transactions 
      WHERE user_id = ${user_id.trim()}
      ORDER BY created_at DESC
    `;

    if (transactions.length > 0) {
      return res.status(200).json({
        message: "Transactions fetched successfully",
        success: true,
        data: transactions,
        count: transactions.length,
      });
    } else {
      return res.status(400).json({
        message: "Transactions not found",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error fetching transactions: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateTransactions = async (req, res) => {
  try {
    const { title, category, amount } = req.body;
    const { user_id, transaction_id } = req.params;

    if (!user_id || !transaction_id) {
      return res.status(400).json({
        message: "User ID and transaction ID are required",
        success: false,
      });
    }

    if (
      [title, category, amount].some(
        (field) => !field || field.toString().trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        message: "Amount must be a valid number",
        success: false,
      });
    }

    // Validate transaction_id is a number
    const numericTransactionId = parseInt(transaction_id);
    if (isNaN(numericTransactionId)) {
      return res.status(400).json({
        message: "Invalid transaction ID",
        success: false,
      });
    }

    const updateTransaction = await sql`
      UPDATE transactions
      SET title = ${title.trim()}, category = ${category.trim()}, amount = ${numericAmount}
      WHERE user_id = ${user_id} AND id = ${numericTransactionId}
      RETURNING *
    `;

    if (updateTransaction.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Transaction successfully updated",
      success: true,
      data: updateTransaction[0],
    });
  } catch (error) {
    console.log("Error updating transaction: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { user_id, transaction_id } = req.params;

    if (!user_id || !transaction_id) {
      return res.status(400).json({
        message: "User ID and transaction ID are required",
        success: false,
      });
    }

    // Validate transaction_id is a number
    const numericTransactionId = parseInt(transaction_id);
    if (isNaN(numericTransactionId)) {
      return res.status(400).json({
        message: "Invalid transaction ID",
        success: false,
      });
    }

    const deletedTransaction = await sql`
      DELETE FROM transactions 
      WHERE user_id = ${user_id} AND id = ${numericTransactionId}
      RETURNING id
    `;

    if (deletedTransaction.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting transaction: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const transactionsSummary = async (req, res) => {
  try {
    const { user_id } = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM Transactions
      WHERE user_id = ${user_id}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM Transactions
      WHERE user_id = ${user_id} AND amount > 0
    `;

    const expenseResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM Transactions
      WHERE user_id = ${user_id} AND amount < 0
    `;

    res.status(200).json({
      message: "Transaction summary fetched",
      success: true,
      data: {
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expenses: expenseResult[0].expenses,
      },
    });
  } catch (error) {
    console.log("Error getting transactions summary: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
