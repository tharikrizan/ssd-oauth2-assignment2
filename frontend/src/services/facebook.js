import axios from "axios";
import LocalStorage from "./storage";

const graphUrl = "https://graph.facebook.com";

async function getAllPages() {
  const user = LocalStorage.getUser();
  return await axios.get(`${graphUrl}/me/accounts`, {
    params: {
      access_token: user?.facebookToken,
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

async function deleteExistingMessage(id, accessToken) {
  return axios.delete(`${graphUrl}/${[id]}?access_token=${accessToken}`);
}

export default {
  getAllPages,
  writeNewMessage,
  getAllPosts,
  deleteExistingMessage,
};
