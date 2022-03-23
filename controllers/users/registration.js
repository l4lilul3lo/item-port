const bcrypt = require("bcrypt");
const { getUserByEmail, createUser } = require("../../models/users/users");
const {
  transporter,
  generateVerificationHtml,
  generateReminderHtml,
  generateMailOptions,
} = require("../../config/node-mailer");

const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

const register = async (req, res) => {
  try {
    console.log(`register body ${JSON.stringify(req.body)}`);
    const { username, email, password, verifyMethod } = req.body;
    let user = await getUserByEmail(email);
    console.log(user);

    // if verifyMethod is email, and if email already exists, send email to provided email that says "did you forget you had an account?". else send email with verification token url html;
    // if there is a user and the user isn't activated, send new token to verify.
    if (user && !user.active) {
      //send email with verification token
      //send response status 201
    }

    // if there is a user and the user is active, send "did you forget you had an account?"
    if (user && user.active) {
      // send email with login link
    }

    // if there is no user, store user information in database
    if (!user) {
      console.log(`verifyMethod ${verifyMethod}`);

      const hashedPassword = await bcrypt.hash(password, 10);
      createUser(username, email, hashedPassword);
      const token = generateAccessToken(email);
      const verificationHtml = generateVerificationHtml(token);
      const mailOptions = generateMailOptions(
        email,
        "Verify your email with item-port",
        verificationHtml
      );
      if (verifyMethod === "on-site") {
        res.status(201).json({ html: verificationHtml });
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(201).json("");
      }

      // send email with verification token
    }

    // if verifyMethod is on-site, do the same thing except return a response of the two html's and check for response on site.
  } catch (err) {
    console.error(err);
  }
};

module.exports = { register };

// If the user is already in the database, and there status is inactive, send a new json webtoken url.

// If the user is already in the database, and there status is active, send a "did you forget you had an account? You can log in here. If you did not attempt to register again, you can ignore this message".

// don't store in database until verified homie.
