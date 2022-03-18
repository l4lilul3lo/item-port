const pool = require("../../config/db");
const getAllProducts = async () => {
  try {
    const res = await pool.query(
      `SELECT title, price, category, description, image FROM products`
    );

    return res.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getAllProducts };
