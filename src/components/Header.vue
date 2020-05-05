<template>
  <header class="header">
    <h1 class="header__title" @click="isOpeningPopup()">to do Task</h1>
    <ConfirmPopup :popup="popup" :confirm="goHome" />
  </header>
</template>

<script>
import ConfirmPopup from "./ConfirmPopup";

import routers from "../routes/";

import { CANCEL_MESSAGE } from "../constants/constants";

export default {
  name: "Header",
  components: {
    ConfirmPopup,
  },
  data() {
    return {
      popup: {
        isActive: false,
        isLoad: false,
        message: CANCEL_MESSAGE,
      },
    };
  },
  methods: {
    goHome() {
      routers.push("/");
      this.popup.isActive = false;
    },
    isOpeningPopup() {
      if (this.$route.path.startsWith("/edit")) {
        this.popup.isActive = true;
      } else if (this.$route.path !== "/") {
        routers.push("/");
      }
    },
  },
};
</script>

<style>
.header {
  display: flex;
  padding: 32px 0 8px;
  margin: 0 auto 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}

.header__title {
  font-size: 60px;
  margin: 0;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}

.header__title:visited {
  color: #373f41;
}
</style>
