const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const config = require("./utils/config");
const db = require("./db/connectToDB");
const logger = require("./utils/logger");

const app = express();

db.connectToDB(config.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(config.PORT, () => {
  logger.info(`Server running at port ${config.PORT}`);
});
