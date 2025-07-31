import { sql } from "../../config/db.js";

export const createTransactions = async (req, res) => {
  try {
    const { title, category, amount, user_id } = req.body;

    if (
      [title, category, amount, user_id].some((field) => field?.trim === "")
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const transaction = await sql`
        INSERT INTO transactions (user_id, amount, category, title)
        VALUES (${user_id}, ${amount}, ${category}, ${title})
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
