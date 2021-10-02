const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
require("dotenv").config();

const logger = require("./services/logger");

const port = process.env.PORT || 5000;
const server = express();

server.use(morgan("dev"));

// routes
server.use("/", require("./routes"));

// error
server.use(require("./services/errors"));

server.listen(port, () => {
  logger.log(`Server is running in http://localhost:${port}`);
});
