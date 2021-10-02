const { sendResponse } = require("../utils");
const logger = require("./logger");

module.exports = function (err, req, res, next) {
  logger.log("[ERROR]: ", err.stack);
  return sendResponse(res, err.message, 500);
};
