<template>
  <div style="height:100%; " class="home">
    <div v-if="!pages.length" style="width:100%; height:100%; margin:20%;">
      <h1>No pages under your facebook account</h1>
    </div>

    <div style="width:100%; height:100%; margin:0;" class="list-container">
      <b-card
        img-src="https://source.unsplash.com/rqnaRQCEVsE/640x798"
        img-alt="Image"
        img-left
        bg-variant="dark"
        text-variant="white"
        :title="page.name"
        v-for="page in pages"
        :key="page.id"
        style="height:100%; margin:1%;"
      >
        <b-card-text> Category: {{ page.category }} </b-card-text>
        <b-button
          style="margin:1%;"
          @click.prevent="writeMessage(page.id, page.access_token)"
          variant="primary"
        >
          Write a message
        </b-button>

        <b-button
          style="margin:1%;"
          class="ml-5"
          @click="showDialog(page.id, page.access_token)"
          variant="primary"
        >
          Show Posts
        </b-button>
      </b-card>
    </div>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> Posts </template>
      <div class="d-block text-center">
        <b-card
          :title="post.message"
          :sub-title="post.created_time"
          v-for="post in posts"
          :key="post.id"
        >
          <b-button
            @click="delMessage(post.id, selectedPage)"
            class="mt-3"
            variant="outline-danger"
            block
          >
            Delete
          </b-button>
        </b-card>
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
      selectedPage: "",
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
        if (result?.value?.data?.id) {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully posted to your page...",
            // footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      });
    },
    async delMessage(id, selectedPage) {
      this.$swal({
        title: "Are you sure to DELETE POST?",
        text: "You will not be able to undo this action",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00b894",
        cancelButtonColor: "#d63031",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return Facebook.deleteExistingMessage(id, selectedPage).catch(
            (err) => {
              this.$swal.showValidationMessage(
                `Failed to delete: ${err.message}`
              );
            }
          );
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then(() => {
        this.$swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully deleted...",
        });
      });
    },
    async showDialog(id, token) {
      this.selectedPage = token;
      this.$bvModal.show("bv-modal-example");
      this.posts = (await Facebook.getAllPosts(id, token)).data.data;
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
