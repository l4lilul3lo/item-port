const pool = require("../../config/db");

const getUserByEmail = async (email) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    return res.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByUsername = async (username) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    return res.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUsername = async (username, email) => {
  try {
    await pool.query(`UPDATE users SET username = $1 WHERE email = $2`, [
      username,
      email,
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCart = async (user_id) => {
  try {
    await pool.query(`INSERT INTO CARTS (user_id) VALUES ($1)`, [user_id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (username, email, hashedPassword) => {
  try {
    const res = await pool.query(
      `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING id`,
      [username, email, hashedPassword]
    );
    return res.rows[0].id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const activateAccount = async (id) => {
  console.log(`id in activate account ${JSON.stringify(id)}`);
  try {
    pool.query(
      `UPDATE users 
      SET active = true 
      WHERE id = $1
      `,
      [id]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const isActive = async (id) => {
  try {
    const res = await pool.query(`SELECT active FROM users WHERE id = $1`, [
      id,
    ]);
    return res.rows[0].active;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  createUser,
  activateAccount,
  isActive,
  deleteUser,
  updateUsername,
};
