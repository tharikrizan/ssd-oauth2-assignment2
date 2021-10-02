const mongoose = require("mongoose");
const logger = require("../services/logger");
require("dotenv").config();

const dbUrl = process.env.DB;

module.exports = function () {
  if (!dbUrl) return logger.log("Invalid DB URL");
  mongoose
    .connect(dbUrl)
    .then((_) => logger.log("DB connected successfully"))
    .catch((err) => logger.error("DB connection failed: ", err.message));

  return mongoose;
};
