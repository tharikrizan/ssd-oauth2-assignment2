const { sendResponse } = require("../utils");

const router = require("express").Router();

router.use("/health", require("./health"));

router.all("*", (_, res) => sendResponse(res, "Route not found", 404));

module.exports = router;
