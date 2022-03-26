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
const { login, getUserData, logout } = require("./controllers/users/user");

const { getProducts, getProduct } = require("./controllers/products/products");
const { verification } = require("./controllers/registration/verification");
const {
  onSiteVerification,
} = require("./middleware/registration/onSiteVerification");

const { registration } = require("./controllers/registration/registration");
const {
  checkUsernameExists,
} = require("./controllers/registration/checkUsernameExists");
const {
  onSiteRegistration,
} = require("./middleware/registration/onSiteRegistration");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 15,
    },
  })
);

app.get("/", (req, res) => {
  res.status(200).json("hello");
});

app.post("/register", onSiteRegistration, registration);

app.post("/checkUsernameExists", checkUsernameExists);

app.get("/verify/:token", onSiteVerification, verification);

app.post("/login", login);

app.post("/logout", logout);

app.post("/userImage");

app.get("/getUserData", isAuth, getUserData);

app.get("/products", getProducts);

app.get("/products/:id", getProduct);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
