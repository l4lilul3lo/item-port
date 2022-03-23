const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");

const redisClient = require("./config/redis");
const RedisStore = require("connect-redis")(session);
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
const { isAuth } = require("./middleware/isAuth");
const { register, verifyEmail } = require("./controllers/users/registration");
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

app.get("/", (req, res) => {
  res.status(200).json("hello");
});

app.get("/isAuthenticated", isAuthenticated);

app.post("/register", register);

app.post("/verify/:token", verifyEmail);

app.post("/login", login);

app.post("/logout", logout);

app.post("/userImage");

app.get("/getUserData", isAuth, getUserData);

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
