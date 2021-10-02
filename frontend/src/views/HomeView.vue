<template>
  <div class="home">
    <h1>My Pages</h1>
    <div v-if="!pages.length">No pages under your facebook account</div>

    <div class="list-container">
      <b-card
        bg-variant="dark"
        text-variant="white"
        :title="page.name"
        v-for="page in pages"
        :key="page.id"
      >
        <b-card-text> Category: {{ page.category }} </b-card-text>
        <b-button
          @click.prevent="writeMessage(page.id, page.access_token)"
          variant="primary"
        >
          Write a message</b-button
        >

        <b-button @click="showDialog">
          Show Posts
        </b-button>
      </b-card>
    </div>

    <b-modal id="bv-modal-example" hide-footer hide-title>
      <template #modal-title> Posts </template>
      <div class="d-block text-center">
        <h3>Hello From This Modal!</h3>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">
        Close Me
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import Facebook from "../services/facebook";
import LocalStorage from "../services/storage";

export default {
  name: "Home",
  async mounted() {
    // load the pages
    await this.loadPages();
  },
  data() {
    return {
      pages: [],
      posts: [],
    };
  },
  methods: {
    async loadPages() {
      try {
        const pages = await Facebook.getAllPages();
        this.pages = pages.data.data;
      } catch {
        // this means the token has expired or permission have been revoked or rate limit reached
        LocalStorage.removeUser();
        this.$router.push({ name: "login" });
      }
    },
    async writeMessage(id, token) {
      this.$swal({
        title: "Write to your page",
        input: "textarea",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Post",
        showLoaderOnConfirm: true,
        preConfirm: (message) => {
          return Facebook.writeNewMessage(id, token, message).catch((err) => {
            this.$swal.showValidationMessage(`Failed to post: ${err.message}`);
          });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.value.data.id) {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully posted to your page...",
            // footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      });
    },
    async showDialog() {
      this.$bvModal.show("bv-modal-example");
    },
  },
};
</script>

<style scoped>
.list-container {
  width: 80%;
  margin-left: 8px;
}
</style>
