const Redis = require("ioredis");
let isProduction = process.env.NODE_ENV === "production";
let connectionString = isProduction ? process.env.REDIS_URL : "";
let redisClient = new Redis(connectionString);

module.exports = redisClient;
