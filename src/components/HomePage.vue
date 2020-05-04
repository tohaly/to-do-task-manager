<template>
  <div class="main">
    <CardList :openConfirmPopup="openConfirmPopup" />
    <ConfirmPopup :popup="popup" :confirm="confirmRemoveCard" />
  </div>
</template>

<script>
import CardList from "./CardList";
import ConfirmPopup from "./ConfirmPopup";

import { DELETE_MESSAGE } from "../constants/constants";

import { mapActions } from "vuex";

// import SERVER_ERROR from "../constants/constants";

export default {
  name: "Home",
  components: {
    CardList,
    ConfirmPopup
  },
  data() {
    return {
      popup: {
        isActive: false,
        cardId: "",
        isLoad: false,
        message: DELETE_MESSAGE
      }
    };
  },
  methods: {
    ...mapActions(["removeCard"]),
    openConfirmPopup(id) {
      this.popup.isActive = true;
      this.popup.cardId = id;
    },
    confirmRemoveCard() {
      this.popup.isLoad = true;
      this.removeCard(this.popup.cardId)
        .then(() => {
          this.popup.isActive = false;
        })
        .catch(err => {
          console.err(err);
        })
        .finally(() => {
          this.popup.isLoad = false;
        });
    }
  }
};
</script>

<style>
.main {
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
