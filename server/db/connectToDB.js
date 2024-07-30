const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectToDB = (url) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => {
      logger.info("Connected to MongoDB");
    })
    .catch((error) => {
      logger.error("Something went wrong connectin to DB", error);
      process.exit(1);
    });
};

module.exports = { connectToDB };
