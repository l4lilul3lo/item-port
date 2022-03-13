const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getUserByEmail = async (email) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
      email,
    ]);

    return res.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByUsername = async (username) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE user_name = $1`, [
      username,
    ]);
    return res.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCart = async (user_id) => {
  try {
    await pool.query(`INSERT INTO CARTS (user_id) VALUES $1`, [user_id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (user_name, email, hashedPassword) => {
  try {
    pool.query(
      `INSERT INTO users (user_name, user_email, user_password)
      VALUES ($1, $2, $3)`,
      [user_name, email, hashedPassword]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (user_name, email, hashedPassword) => {
  try {
  } catch (error) {}
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  createUser,
  deleteUser,
};
