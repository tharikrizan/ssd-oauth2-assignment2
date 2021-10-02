<template>
  <div>
    <button @click.prevent="onConnectFb">Login with facebook</button>
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
