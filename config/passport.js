const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./db");

passport.use(
  new LocalStrategy((email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, result) => {
        if (err) {
          return done(err);
        }
        const user = result.rows[0];
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });

          // bcrypt.compare(password, )
        }
      }
    );
  })
);

pool.query(
  `SELECT * FROM users WHERE email = 'bob@gmail.com'`,
  (err, result) => {
    console.log(result);
  }
);
