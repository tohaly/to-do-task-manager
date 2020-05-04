<template>
  <div class="card-list">
    <div class="card-list__container" v-if="!isLoad">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :id="index"
        :card="card"
        :openConfirmPopup="openConfirmPopup"
      />
      <router-link class="main__add-button" to="/edit/new" tag="div">
        <span class="card-list__add-icon">
          <svg width="60px" viewBox="0 0 448 448">
            <path
              d="M408 184H272c-4.418 0-8-3.582-8-8V40c0-22.0898-17.9102-40-40-40s-40 17.9102-40 40v136c0 4.418-3.582 8-8 8H40c-22.0898 0-40 17.9102-40 40s17.9102 40 40 40h136c4.418 0 8 3.582 8 8v136c0 22.0898 17.9102 40 40 40s40-17.9102 40-40V272c0-4.418 3.582-8 8-8h136c22.0898 0 40-17.9102 40-40s-17.9102-40-40-40zm0 0"
            />
          </svg>
        </span>
      </router-link>
    </div>
    <Loader v-if="isLoad" />
  </div>
</template>

<script>
import Card from "./Card";
import Loader from "./Loader";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardList",
  components: { Card, Loader },
  props: {
    openConfirmPopup: Function
  },
  data() {
    return {
      isLoad: true
    };
  },
  methods: mapActions(["getCards"]),
  computed: mapGetters(["cards"]),
  mounted() {
    if (!this.cards.length) {
      this.getCards().finally(() => {
        this.isLoad = false;
      });
    }
  }
};
</script>

<style>
.card-list__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  justify-content: center;
}

.main__add-button {
  background-color: #d8d7d1;
  color: #000;
  font-size: 40px;
  width: 100%;
  min-height: 370px;
  display: flex;
  cursor: pointer;
  transition: box-shadow 0.4s, transform 0.4s;
}

.main__add-button:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  transform: translateY(-5px);
}

.card-list__add-icon {
  fill: #f1e9e9;
  widows: 50px;
  margin: auto;
}
</style>
