const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const port = process.env.PORT || 5000;
const server = express();

server.use(morgan("dev"));
server.use("/health", require("./routes/health"));

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
