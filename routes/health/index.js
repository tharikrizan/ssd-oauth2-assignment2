const router = require("express").Router();
const mongoose = require("mongoose");
const { sendResponse } = require("../../utils/response");

router.get("/", async (_, res) => {
  return sendResponse(res, {
    status: "ok",
    memory: process.memoryUsage(),
    db: "ok",
  });
});

module.exports = router;
