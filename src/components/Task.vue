<template>
  <div class="task__item">
    <input
      v-if="!isNewPage"
      type="checkbox"
      class="task__checkbox"
      @click="changeCheckBox({ id, index })"
      v-model="isChecked"
    />
    <div class="task__item-text" v-if="!isEditing">{{ text }}</div>
    <input type="text" class="task__edit-field" v-if="isEditing" v-model="textHandler" />
    <Button
      class="task__button"
      :action="isEditing ? saveChangedTask : showEditField"
      :buttonName="buttonName"
    />
    <div class="task__delete-button" @click="deleteTask(index)"></div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  props: {
    text: String,
    isChecked: Boolean,
    changeCheckBox: Function,
    index: Number,
    isNewPage: Boolean,
    id: String,
    saveTask: Function,
    deleteTask: Function
  },
  components: { Button },
  data() {
    return {
      isEditing: false,
      buttonName: "edit",
      textHandler: this.text
    };
  },
  methods: {
    showEditField() {
      this.isEditing = true;
      this.buttonName = "save";
      this.textHandler = this.text;
    },
    saveChangedTask() {
      this.isEditing = false;
      this.buttonName = "edit";
      this.saveTask(this.index, this.textHandler);
    }
  }
};
</script>

<style>
.task__wrapper {
  width: 100%;
  display: flex;
}

.task__item {
  display: flex;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 16px;
  padding: 8px 16px;
}

.task__checkbox {
  display: block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #000;
  appearance: none;
  outline: none;
  cursor: pointer;
  align-self: center;
  padding: 8px;
  margin-right: 16px;
}

.task__checkbox:checked ~ .task__item-text {
  text-decoration: line-through;
  color: #ccc;
}

.task__checkbox:checked {
  background-color: #808080;
}

.task__item-text {
  display: block;
  font-size: 30px;
  flex-grow: 1;
  align-self: center;
}

.task__delete-button {
  position: relative;
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.task__delete-button::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 4px;
  background-color: #000;
  top: 16px;
  right: 0;
  transform: rotate(45deg);
}

.task__delete-button::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 4px;
  background-color: #000;
  top: 16px;
  right: 0;
  transform: rotate(-45deg);
}

.task__edit-field {
  border: none;
  font-size: 30px;
  flex-grow: 1;
  border: 1px solid #fff;
  margin-right: 16px;
  border-bottom: 1px solid #000;
  text-align: center;
}

.task__edit-field:focus {
  outline: none;
}

.task__button {
  margin-right: 16px;
  background-color: #ccc;
  padding: 4px 8px;
}
</style>
