const bcrypt = require("bcrypt");
const {
  getUserByEmail,
  createUser,
  getUserByUsername,
} = require("../../models/users/users");

const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await getUserByEmail(email);
    console.log(`Email ${user ? "exists" : "available"}`);
    if (user) {
      return res.status(409).json({ message: "Email already in use" });
    }

    if (!user) {
      return res.status(200).json({ message: "Available" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const checkUsernameExists = async (req, res) => {
  try {
    console.log(req.body);
    const { username } = req.body;

    let user = await getUserByUsername(username);
    console.log(`Username ${user ? "Exists" : "Available"}`);
    if (user) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    if (!user) {
      return res.status(200).json({ message: "Available" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const register = async (req, res) => {
  try {
    console.log(`register body ${req.body}`);
    let { username, email, password } = req.body;
    let user = await getUserByEmail(email);
    console.log(user);
    if (user) {
      return res
        .status(422)
        .json({ message: "User with this email already exists" });
    }

    if (user?.username === username) {
      return res.status(422).json({ message: "Username is already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(username, email, hashedPassword);
    res.status(201).json({ message: "register success" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { register, checkEmailExists, checkUsernameExists };
