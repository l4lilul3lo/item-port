const { getUserByEmail } = require("../models/users");
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await getUserByEmail(email);
    if (user) {
      console.log(`${email} exists`);
      return res.status(200).json({ message: "Email already in use" });
    }

    if (!user) {
      return res.status(200).json({ message: "Available" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { checkEmailExists };
