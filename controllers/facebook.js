// callback

const axios = require("axios").default;
const { sendResponse } = require("../utils");
const logger = require("../services/logger");

// constants
const frontendUrl = "http://localhost:8080";
const redirectUri = "http://localhost:5000/api/v1/facebook/callback";
const url = `https://graph.facebook.com/v12.0/oauth/access_token`;
const clientId = 3041782756109931;
const clientSecret = "68a09e0188224a32a6fa9f6c6c2532bf";

const OAuthScopes = [
  "email",
  "user_posts",

  "pages_show_list",
  "pages_manage_posts",

  "publish_to_groups",
];

/**
 * Get the facebook long-lived token
 * @param {string} code
 * @returns {string}
 */
async function getFacebookLongToken(code) {
  const longToken = await axios.get(url, {
    params: {
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      code,
    },
  });
  return longToken.data?.access_token;
}

/**
 * Redirect to the error page in the frontend
 * @param {import("express").Response} res
 * @param {string} errorMessage
 */
function redirectToErrorPage(res, errorMessage) {
  return res.redirect(`${frontendUrl}/error?errorMessage=${errorMessage}`);
}

/**
 * Facebook oauth callback end point
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function callback(req, res) {
  if ("error" in req.query) {
    return redirectToErrorPage(
      res,
      req.query?.error_description || "Permission request failed"
    );
  } else if ("code" in req.query) {
    const code = req.query?.code;
    try {
      if (!code) throw Error("Invalid authorization code");

      const longToken = await getFacebookLongToken(code);
      return sendResponse(res, longToken);
    } catch (err) {
      logger.log(err.message);
      return redirectToErrorPage(res, err.message);
    }
  }

  return sendResponse(res, req.query);
}

/**
 * Facebook oauth callback end point
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function oauth(req, res) {
  const redirectUri = "http://localhost:5000/api/v1/facebook/callback";
  const state = Date.now();
  const facebookUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${OAuthScopes.join(
    ","
  )}`;

  return res.redirect(facebookUrl);
}

// registering
// writing to the wall

module.exports = {
  callback,
  oauth,
};
