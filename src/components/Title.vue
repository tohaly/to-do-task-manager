<template>
  <div class="task-title__wrapper">
    <h1 v-if="text && !isEditing" class="task-title__text">{{ text }}</h1>
    <input
      v-if="!text || isEditing"
      v-model="textHolder"
      v-on:keyup.enter="keyEditTitleHandler"
      type="text"
      class="task-title__input"
      placeholder="Enter a title"
      @input="validate"
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

// import { MINIMUM_CHARACTERS } from "../constants/constants";

export default {
  name: "Title",
  props: {
    text: String,
    saveTitle: Function,
  },
  components: { Button },
  data() {
    return {
      textHolder: this.text,
      isEditing: this.text ? false : true,
      buttinName: !this.text ? "save" : "edit",
      isButtonDisabled: this.text ? false : true,
      ctx: this,
    };
  },
  methods: {
    saveChangedTitle() {
      this.buttinName = "edit";
      this.isEditing = false;
      this.saveTitle(this.textHolder);
      this.textHolder = null;
    },
    showEditField() {
      this.buttinName = "save";
      this.isEditing = true;
      this.textHolder = this.text;
    },
    validate() {
      this.$helpers.simpleValidate(this);
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
  appearance: none;
  border-radius: 0;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 48px;
  padding: 8px 0;
  background-color: transparent;
  border-bottom: 2px solid #f8f5c1;
  margin-right: 8px;
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
