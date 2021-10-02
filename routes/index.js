const router = require("express").Router();

const { sendResponse } = require("../utils");

router.use("/health", require("./health"));
router.use("/facebook", require("./oauth/facebook"));

router.all("*", (_, res) => sendResponse(res, "Route not found", 404));

module.exports = router;
