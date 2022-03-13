const bcrypt = require("bcrypt");
const { getUserByEmail, createUser } = require("../models/users");
const pool = require("../config/db");

const register = async (req, res) => {
  try {
    console.log(`login body ${req.body}`);
    let { username, email, password } = req.body;
    let user = await getUserByEmail(email);
    console.log(user);
    if (user) {
      return res
        .status(422)
        .send({ message: "User with this email already exists" });
    }

    if (user?.user_name === username) {
      return res.status(422).send({ message: "Username is already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(username, email, hashedPassword);
    res.status(201).json({ message: "register success" });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    let user = await getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    let isCorrectPassword = await bcrypt.compare(password, user.user_password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }
    req.session.user = {
      user_id: user.user_id,
      user_name: user.user_name,
      user_image: user.user_image,
    };
    console.log(req.sessionID);
    console.log(req.session);

    res.status(200).json({
      user: { user_name: user.user_name, user_image: user.user_image },
      message: "Login Success",
    });
  } catch (error) {
    console.error(error);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Logged out successfuly" });
};
module.exports = { register, login, logout };
