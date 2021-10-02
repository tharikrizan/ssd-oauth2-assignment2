export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
export function saveUser(user) {
  return localStorage.setItem("user", JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem("user");
}

export default {
  getUser,
  saveUser,
  removeUser,
};
