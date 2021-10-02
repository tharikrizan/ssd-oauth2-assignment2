import axios from "axios";
import LocalStorage from "./storage";

const { facebookToken } = LocalStorage.getUser();
const graphUrl = "https://graph.facebook.com";

async function getAllPages() {
  return await axios.get(`${graphUrl}/me/accounts`, {
    params: {
      access_token: facebookToken,
    },
  });
}

async function writeNewMessage(id, accessToken, message) {
  return axios.post(
    `${graphUrl}/${[id]}/feed?message=${message}&access_token=${accessToken}`
  );
}

async function getAllPosts(id, accessToken) {
  return axios.get(`${graphUrl}/${[id]}/feed?access_token=${accessToken}`);
}

export default {
  getAllPages,
  writeNewMessage,
  getAllPosts,
};
