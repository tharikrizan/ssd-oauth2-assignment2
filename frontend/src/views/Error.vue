<template>
  <div class="about">
    <h1>Error: {{ errorMessage }}</h1>
  </div>
</template>

<script>
export default {
  name: "Error",
  computed: {
    errorMessage() {
      return this.$route.query.errorMessage;
    },
  },
};
</script>
