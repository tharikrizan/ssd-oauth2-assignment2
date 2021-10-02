// callback

const axios = require("axios").default;
const { sendResponse } = require("../utils");
const logger = require("../services/logger");
const User = require("../models/user");

// constants
const frontendUrl = "http://localhost:8080";
const redirectUri = "http://localhost:5000/api/v1/facebook/callback";
const graphUrl = "https://graph.facebook.com";
const accessTokenUrl = `${graphUrl}/v12.0/oauth/access_token`;
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
  const longToken = await axios.get(accessTokenUrl, {
    params: {
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      code,
    },
  });
  return longToken.data?.access_token;
}

async function graphApiRequest(path, method, params) {
  const res = await axios({
    url: `${graphUrl}${path}`,
    method,
    params,
  });
  return res.data;
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
      const user = await register(longToken);
      return sendResponse(res, user);
    } catch (err) {
      logger.log(err.message);
      return redirectToErrorPage(res, err.message);
    }
  }

  return sendResponse(res, req.query);
}

/**
 * Facebook oauth callback end point
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 */
async function oauth(_req, res) {
  const redirectUri = "http://localhost:5000/api/v1/facebook/callback";
  const state = Date.now();
  const facebookUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${OAuthScopes.join(
    ","
  )}`;
  console.log(facebookUrl);
  return res.redirect(facebookUrl);
}

/**
 * Register a user with oauth
 */
async function register(userAccessToken) {
  // get user info
  const userInfo = await graphApiRequest("/me", "get", {
    access_token: userAccessToken,
    fields: "id,first_name,last_name",
  });

  if (!("id" in userInfo)) return null;

  const newUser = {
    facebookId: userInfo.id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    facebookToken: userAccessToken,
  };

  // create a user in our database
  const user = await User.findOneAndUpdate(
    { facebookId: newUser.facebookId },
    newUser,
    {
      new: true,
      upsert: true,
    }
  );

  return user.toObject();
}

module.exports = {
  callback,
  oauth,
};
