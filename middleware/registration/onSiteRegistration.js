const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getUserByEmail,
  createUser,
  updateUsername,
  getUserByUsername,
} = require("../../models/users/users");

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: "10s",
  });
}

const onSiteRegistration = async (req, res, next) => {
  try {
    if (req.body.verifyMethod === "email") {
      return next();
    }

    const { username, email, password } = req.body;
    let user = await getUserByEmail(email);

    // Okay, so user registers their account. They don't verify, and try to use same username and email. Username will be taken.

    // They then try to use a different username, with the same email. It sends the request.

    // We now have an entry in the database with a stale username from the original registration.

    // User will hit condition of user exists by email and user IS NOT active.

    // Here we will have to update the username if it's not the same, and send the new verification request. There is a condition however, that by the time the request arrives, someone else has already taken the username. This is something to keep in mind for later.

    // Should someone else use the same email with a different username in this time, the same steps will be taken, and the user will be confused as to why their username is different. But that's okay since this is unlikely, and the user will then be able to change their username anyway.

    // Once the user is activated, they do not meet this condition, and a reminder email is sent instead.

    if (user && !user.active) {
      if (username !== user.username) {
        await updateUsername(username, email);
      }
      // then send verification email again.
      const token = generateAccessToken(user.id);
      res.status(201).json({ responseType: "verification", token: token });
    }

    // if there is a user and the user is active, send "did you forget you had an account?"
    if (user && user.active) {
      res.status(201).json({ responseType: "reminder", token: "" });
    }

    // if there is no user, store user information in database. Then generate an access token with id as the payload and send the token to the client. The id in the payload will be extracted from the token during email verification, which will then be used to activate the account.
    if (!user) {
      const userNameExists = await getUserByUsername(username);
      if (userNameExists) {
        return res.status(409).send("username already exists"); // This has to be here in case someone bypasses form validation on the front end. I think...
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await createUser(username, email, hashedPassword);
      const token = generateAccessToken(id);
      res.status(201).json({ responseType: "verification", token: token });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { onSiteRegistration };

// the user is in the database with their username.

// if the user doesn't have a chance to verify locally, because of refresh, when they go to register again, they won't have a token and the username will be taken. So create email simulator.
