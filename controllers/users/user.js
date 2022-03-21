const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../../models/users/users");

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    let isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    req.session.user = {
      username: user.name,
      image: "https://robohash.org/aliquidtemporadolor.png?size=50x50&set=set1",
    };

    return res.status(200).json({
      user: {
        username: user.name,
        image:
          "https://robohash.org/aliquidtemporadolor.png?size=50x50&set=set1",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const isAuthenticated = async (req, res) => {
  try {
    if (req.session.user) {
      return res.status(200).json({ isAuth: true });
    }
    return res.status(401).json({ isAuth: false });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserData = async (req, res) => {
  console.log(req.session.user);
  const { username, image } = req.session.user;
  return res.status(200).json({
    user: {
      name: username,
      image: "https://robohash.org/aliquidtemporadolor.png?size=50x50&set=set1",
    },
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfuly" });
};

module.exports = { login, isAuthenticated, getUserData, logout };
