<template>
  <div class="card">
    <header class="card__header">
      <h2 class="card__title">{{ card.title }}</h2>
      <div class="card__delete-button" @click="remove"></div>
    </header>
    <ul class="card__task-list">
      <li
        :class="[{ card__task_marked: task.isChecked }, 'card__task']"
        v-for="(task, index) in card.list.slice(0, 4)"
        :key="index"
      >{{ task.text }}</li>
    </ul>
    <router-link class="card__button" :to="`edit/${id}`" tag="button">edit</router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Card",
  components: {},
  props: {
    card: Object,
    id: String,
    openConfirmPopup: Function
  },
  methods: {
    ...mapActions(["removeCard"]),
    remove() {
      this.openConfirmPopup(this.id);
    }
  }
};
</script>

<style>
.card {
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f8f5c1;
  padding-bottom: 16px;
  transition: box-shadow 0.4s, transform 0.4s;
}
.card:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  transform: translateY(-5px);
}

.card__header {
  background-color: #263238;
  padding: 16px;
  display: flex;
}

.card__title {
  font-size: 32px;
  color: #fff;
  margin: 0;
  flex-grow: 1;
}

.card__delete-button {
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
}

.card__delete-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #fff;
  top: 16px;
  right: 0;
  transform: rotate(45deg);
}

.card__delete-button::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #fff;
  top: 16px;
  right: 0;
  transform: rotate(-45deg);
}

.card__task-list {
  display: flex;
  flex-direction: column;
  padding: 8px 16px 0;
  margin: 0 0 16px;
}

.card__task {
  font-family: "Anonymous Pro", Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
  background-color: #fff;
  font-size: 28px;
  margin-bottom: 8px;
  list-style-type: none;
  border-radius: 8px;
  padding: 4px 16px;
}

.card__task_marked {
  text-decoration: line-through;
  color: #808080;
}

.card__button {
  font-size: 30px;
  padding: 8px 16px;
  align-self: flex-end;
  cursor: pointer;
  margin-right: 16px;
  background-color: transparent;
  color: #918989;
  border: 3px solid #918989;
}

.card__many-cards {
  font-size: 20px;
  margin: 8px 0;
  padding: 0;
  line-height: 1;
  text-align: right;
  font-weight: bold;
}
</style>
