<template>
  <div>
    <b-card
      img-src="https://source.unsplash.com/DfMMzzi3rmg/1600x900"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 100%;"
      class="mb-2"
      img-bottom
    >
      <!-- <b-button href="#" @click.prevent="onConnectFb" variant="primary"
        >Login with Facebook</b-button
      >
      <b-button @click.prevent="logout" variant="secondary">Logout</b-button> -->
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    // onConnectFb() {
    //   window.location.href = "http://localhost:5000/api/v1/facebook/oauth";
    // },
  },
};
</script>

<style scoped></style>
