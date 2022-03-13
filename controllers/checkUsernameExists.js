const { getUserByUsername } = require("../models/users");
const checkUsernameExists = async (req, res) => {
  try {
    const { username } = req.body;

    let user = await getUserByUsername(username);
    if (user) {
      console.log(`${username} exists`);
      return res.status(200).json({ message: "Username is already taken" });
    }

    if (!user) {
      return res.status(200).json({ message: "Available" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { checkUsernameExists };
