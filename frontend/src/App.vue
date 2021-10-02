<template>
  <div id="app">
    <button @click.prevent="logout">Logout</button>
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/error">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import LocalStorage from "./services/storage";

export default {
  name: "App",
  methods: {
    logout() {
      LocalStorage.removeUser();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style></style>
