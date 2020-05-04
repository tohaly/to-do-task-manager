<template>
  <header class="header">
    <router-link class="header__title" to="/">to do Task</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style>
.header {
  display: flex;
  padding: 32px 0;
  margin: 0 auto 32px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}

.header__title {
  font-size: 60px;
  margin: 0 40px 0 0;
  font-weight: bold;
  text-decoration: none;
}

.header__title:visited {
  color: #373f41;
}
</style>
