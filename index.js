const express = require("express");
const session = require("express-session");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis");
const RedisStore = require("connect-redis")(session);
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const { isAuth } = require("./middleware/isAuth");
const {
  register,
  checkEmailExists,
  checkUsernameExists,
} = require("./controllers/users/registration");
const {
  login,
  isAuthenticated,
  getUserData,
  logout,
} = require("./controllers/users/user");

const { getProducts, getProduct } = require("./controllers/products/products");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60,
    },
  })
);

//app.use("/registration", registration)
//app.use("/user", user)
//app.use("/products", products)
app.get("/", (req, res) => {
  res.status(200).json("hello");
});

app.get("/isAuthenticated", isAuthenticated);

app.post("/register", register);

app.post("/login", login);

app.post("/logout", logout);

app.post("/userImage");

app.get("/getUserData", isAuth, getUserData);

app.post("/checkUsernameExists", checkUsernameExists);

app.post("/checkEmailExists", checkEmailExists);

app.get("/products", getProducts);

app.get("/products/:id", getProduct);

app.get("/test", (req, res) => {
  console.log(Object.keys(req.query).length === 0);
  return res.status(200).send("goodjob");
});

app.get("/dashboard", isAuth, (req, res) => {
  res.json({ user_id: req.session.user_id });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// A user visits the site, no session should be created. saveUnitialized: false.

// A user visits the register page and then makes a post request with user information. If the email already exists, return a 422 and say a user already exists with this email.

// If the user does not exist, create the user, the user cart, and an empty session and redirect to login page with a user succesfully created message.

// When the user logs in, their information should be checked from the backend, and if it's accurate and there is no redis session data, their redis session data should be synced with postgresql database.
