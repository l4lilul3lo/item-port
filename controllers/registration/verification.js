const {
  activateAccount,
  isActive,
  deleteUser,
} = require("../../models/users/users");
const { generateConfirmedHtml } = require("../../config/node-mailer");
const jwt = require("jsonwebtoken");

const verification = async (req, res) => {
  const token = req.params.token;
  try {
    console.log(` token ${token}`);
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    let active = await isActive(id);
    if (active) {
      return res
        .status(200)
        .send("<h1>You've already activated your account</h1>");
    }
    await activateAccount(id);
    const confirmedHtml = generateConfirmedHtml();
    return res.status(200).send(confirmedHtml);
  } catch (error) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      const { id } = jwt.verify(token, process.env.TOKEN_SECRET, {
        ignoreExpiration: true,
      });
      let active = await isActive(id);
      console.log(email);
      console.log(active);
      if (!active) {
        // delete user from database.
        await deleteUser(id);
        console.log("user deleted");
        // return Your link has expired
        return res
          .status(200)
          .send(
            "<h1>Your link has expired. Please register again to get a new one.</h1>"
          );
      }

      if (active) {
        // return your account has already been verified.
        return res
          .status(200)
          .send("<h1>You've already activated your account</h1>");
      }
    }
  }
};

module.exports = { verification };
