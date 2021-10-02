<template>
  <div class="home">
    <h1>Pages</h1>
    <div v-if="!pages.length">No pages under your facebook account</div>
    <div v-for="page in pages" :key="page.id">
      <div>Name: {{ page.name }}</div>
      <div>Category: {{ page.category }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LocalStorage from "../services/storage";

const graphUrl = "https://graph.facebook.com";
export default {
  name: "Home",
  async mounted() {
    // load the pages
    await this.loadPages();
  },
  data() {
    return {
      pages: [],
    };
  },
  methods: {
    async loadPages() {
      const { facebookToken } = LocalStorage.getUser();
      try {
        const pages = await axios.get(`${graphUrl}/me/accounts`, {
          params: {
            access_token: facebookToken,
          },
        });
        console.log(pages.data.data);
        this.pages = pages.data.data;
      } catch {
        // this means the token has expired or permission have been revoked or rate limit reached
        LocalStorage.removeUser();
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
