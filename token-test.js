const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: "1s",
  });
}

async function verifyToken(token) {
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(id);
  } catch (error) {
    console.log(error);
  }
}

const token = generateAccessToken("abcdefg");
setTimeout(() => verifyToken(token), 3000);
