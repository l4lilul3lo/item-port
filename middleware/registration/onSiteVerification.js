const {
  activateAccount,
  isActive,
  deleteUser,
} = require("../../models/users/users");
const jwt = require("jsonwebtoken");

const onSiteVerification = async (req, res, next) => {
  const token = req.params.token;
  try {
    if (req.query.verifyMethod === "email") {
      return next();
    }

    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    // if jwt verification throws error, moves to catch block. Otherwise, continues.
    await activateAccount(id);
    return res.status(200).json({ responseType: "confirmed" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const { id } = jwt.verify(token, process.env.TOKEN_SECRET, {
        ignoreExpiration: true,
      });
      let active = await isActive(id);
      if (!active) {
        // delete user from database.
        await deleteUser(id);
        console.log("user deleted");
        // return Your link has expired, please register again.
        return res.status(200).json({ responseType: "expired" });
      }

      if (active) {
        // return your account has already been verified.
        return res.status(200).json({ responseType: "alreadyVerified" });
      }
    }
  }
};

module.exports = { onSiteVerification };
