<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">DS Assignment 2 OAuth2</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-button style="margin:1%; padding:6%;" href="/" variant="primary"
            >HOME</b-button
          >

          <b-button
            style="margin:1%; "
            @click.prevent="logout"
            variant="primary"
            >LOGOUT</b-button
          >
          <b-button
            style="margin:1%; "
            @click.prevent="onConnectFb"
            variant="primary"
            >Login with Facebook</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
    onConnectFb() {
      window.location.href = "http://localhost:5000/api/v1/facebook/oauth";
    },
  },
};
</script>

<style></style>
