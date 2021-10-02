<template>
  <div class="about">
    <h1 v-if="errorMessage">Error: {{ errorMessage }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OauthRedirect",
  async mounted() {
    if ("userId" in this.$route.query) {
      const api = "http://localhost:5000";
      const userId = this.$route.query.userId;
      const user = await axios.get(`${api}/api/v1/facebook/user/${userId}`);
      localStorage.setItem("user", JSON.stringify(user.data.data));

      this.$router.push({ name: "home" });
    }
  },
  computed: {
    errorMessage() {
      return this.$route.query.errorMessage;
    },
  },
};
</script>
