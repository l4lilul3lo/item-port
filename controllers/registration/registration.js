const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  createUser,
  updateUsername,
  getUserByUsername,
} = require("../../models/users/users");
const {
  transporter,
  generateVerificationHtml,
  generateReminderHtml,
  generateMailOptions,
} = require("../../config/node-mailer");

function generateAccessToken(userID) {
  return jwt.sign({ id: userID }, process.env.TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

const registration = async (req, res) => {
  try {
    console.log(`register body ${JSON.stringify(req.body)}`);
    const { username, email, password } = req.body;
    let user = await getUserByEmail(email);
    console.log(user);

    if (user && !user.active) {
      if (username !== user.username) {
        await updateUsername(username, email);
      }
      const token = generateAccessToken(user.id);
      const verificationHtml = generateVerificationHtml(token);
      const mailOptions = generateMailOptions(
        process.env.EMAIL_USERNAME,
        "Verify your email with item-port",
        verificationHtml
      );
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    if (user && user.active) {
      const reminderHtml = generateReminderHtml();
      const mailOptions = generateMailOptions(
        process.env.EMAIL_USERNAME,
        "Verify your email with item-port",
        reminderHtml
      );
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    if (!user) {
      // check username exists again in case someone bypassed frontend
      let userNameExists = await getUserByUsername(username);
      if (userNameExists) {
        return res.status(409).send("username already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await createUser(username, email, hashedPassword);
      const token = generateAccessToken(id);
      const verificationHtml = generateVerificationHtml(token);
      const mailOptions = generateMailOptions(
        process.env.EMAIL_USERNAME,
        "Verify your email with item-port",
        verificationHtml
      );

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { registration };
