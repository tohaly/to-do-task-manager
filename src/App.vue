<template>
  <div id="app" class="page">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import "./vendor/fonts.css";
import "./vendor/normalize.css";

import Header from "./components/Header";

export default {
  name: "App",
  data() {
    return {};
  },
  components: { Header },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #c4c4c4;
  font-family: "Darker Grotesque", Arial, Helvetica, sans-serif;
  letter-spacing: 5px;
  color: #373f41;
}

.page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 104px;
}

@media screen and (max-width: 1024px) {
  .page {
    padding: 0 40px;
  }
}

@media screen and (max-width: 480px) {
  .page {
    padding: 0 16px;
  }
}
</style>
