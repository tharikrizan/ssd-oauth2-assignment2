<template>
  <div>
    <!-- <button @click.prevent="onConnectFb">Login with facebook</button> -->
    <b-card
      title="Card Title"
      img-src="https://source.unsplash.com/AGqzy-Uj3s4/1600x900"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 100%;"
      class="mb-2"
      img-bottom
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" @click.prevent="onConnectFb" variant="primary"
        >Login with Facebook</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    onConnectFb() {
      window.location.href = "http://localhost:5000/api/v1/facebook/oauth";
    },
  },
};
</script>

<style scoped></style>
