<template>
  <div class="task-title__wrapper">
    <h1 v-if="title && !isEditing" class="task-title__text">{{ title }}</h1>
    <input
      v-if="!title || isEditing"
      v-model="titleHolder"
      v-on:keyup.enter="keyEditTitleHandler"
      type="text"
      class="task-title__input"
      placeholder="Enter a title"
      @input="validate()"
      minlength="2"
      maxlength="25"
    />
    <Button
      :class="[
        { 'task-title__save-title-button_disabled': isButtonDisabled },
        'task-title__save-title-button',
      ]"
      :action="isEditing ? saveChangedTitle : showEditField"
      :buttonName="buttinName"
      :disabled="isButtonDisabled"
    />
  </div>
</template>

<script>
import Button from "./Button";

import { MINIMUM_CHARACTERS } from "../constants/constants";

export default {
  name: "Title",
  props: {
    title: String,
    saveTitle: Function,
  },
  components: { Button },
  data() {
    return {
      titleHolder: this.title,
      isEditing: this.title ? false : true,
      buttinName: !this.title ? "save" : "edit",
      isButtonDisabled: this.title ? false : true,
    };
  },
  methods: {
    saveChangedTitle() {
      this.buttinName = "edit";
      this.isEditing = false;
      this.saveTitle(this.titleHolder);
      this.titleHolder = null;
    },
    showEditField() {
      this.buttinName = "save";
      this.isEditing = true;
      this.titleHolder = this.title;
    },
    validate() {
      if (
        typeof this.titleHolder === "string" &&
        this.titleHolder.length < MINIMUM_CHARACTERS
      ) {
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
    },
    keyEditTitleHandler() {
      if (!this.isButtonDisabled) {
        this.saveChangedTitle();
      }
    },
  },
};
</script>

<style>
.task-title__wrapper {
  max-width: 750px;
  display: flex;
  margin: 0 auto 32px;
  justify-content: flex-start;
}

.task-title__text {
  font-size: 48px;
  margin: 0 16px 0 0;
  align-self: center;
  width: 100%;
}

.task-title__save-title-button {
  align-self: flex-end;
  border: none;
}

.task-title__save-title-button_disabled {
  background-color: #ccc;
}

.task-title__input {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 48px;
  padding: 8px 0;
  background-color: transparent;
  border-bottom: 2px solid #f8f5c1;
}

.task-title__input:focus {
  outline: none;
  border-bottom: 4px solid #f8f5c1;
}

@media screen and (max-width: 650px) {
  .task-title__text {
    font-size: 22px;
    letter-spacing: 1px;
  }

  .task-title__input {
    font-size: 22px;
  }

  .task-title__wrapper {
    margin-bottom: 16px;
  }
}
</style>
