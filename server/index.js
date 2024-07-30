const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const config = require("./utils/config");
const db = require("./db/connectToDB");
const logger = require("./utils/logger");

const authRoutes = require("./routes/auth.routes");

const app = express();

db.connectToDB(config.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: "Server Error", error: true });
});

app.listen(config.PORT, () => {
  logger.info(`Server running at port ${config.PORT}`);
});
