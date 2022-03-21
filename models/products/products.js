const pool = require("../../config/db");
const getProductsDB = async () => {
  try {
    const res = await pool.query(
      `SELECT id, title, price, category, description, image FROM products`
    );

    return res.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductDB = async (productId) => {
  try {
    const res = await pool.query(
      `SELECT id, title, price, category, description, image FROM products WHERE id = $1`,
      [productId]
    );

    return res.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getProductsDB, getProductDB };
