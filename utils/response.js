/**
 * Send response back to the user
 * @param {import("express").Response} res
 * @param {Object} body
 * @param {Number} status
 */
function sendResponse(res, data, status = 200) {
  return res.status(status).json({
    isError: status >= 400,
    data,
  });
}

module.exports = {
  sendResponse,
};
