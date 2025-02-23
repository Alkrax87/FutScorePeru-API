const mongoose = require("mongoose");
require("dotenv").config();

const mongoAuthDB = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_AUTH_DATABASE}`;
const mongoContentDB = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

const dbAuth = mongoose.createConnection(mongoAuthDB);
const dbContent = mongoose.createConnection(mongoContentDB);

dbAuth.on("open", () => console.log("🔑 Connected to Authentication DB"));
dbContent.on("open", () => console.log("📂 Connected to Content DB"));

module.exports = {
  dbContent,
  dbAuth,
};