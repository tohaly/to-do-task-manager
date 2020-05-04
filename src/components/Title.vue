<template>
  <div class="main-list__title-wrapper">
    <h1 v-if="title && !isEditing" class="main-list__title">{{ title }}</h1>
    <input
      v-if="!title || isEditing"
      v-model="titleHolder"
      type="text"
      class="main-list__input"
      placeholder="Enter a title"
      @input="validate()"
    />
    <Button
      :class="[
        { 'main-list__save-title-button_disabled': isButtonDisabled },
        'main-list__save-title-button',
      ]"
      :action="isEditing ? saveChangedTitle : showEditField"
      :buttonName="buttinName"
      :disabled="isButtonDisabled"
    />
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "Title",
  props: {
    title: String,
    saveTitle: Function
  },
  components: { Button },
  data() {
    return {
      titleHolder: this.title,
      isEditing: this.title ? false : true,
      buttinName: !this.title ? "save" : "edit",
      isButtonDisabled: this.title ? false : true
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
        this.titleHolder.length <= 2
      ) {
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
    }
  }
};
</script>

<style>
.main-list__title-wrapper {
  display: flex;
  margin: 0 auto 32px;
  justify-content: flex-start;
}

.main-list__title {
  font-size: 48px;
  margin: 0 16px 0 0;
  align-self: center;
}

.main-list__save-title-button {
  align-self: center;
}

.main-list__save-title-button_disabled {
  background-color: #ccc;
}

.main-list__input {
  box-sizing: border-box;
  flex-grow: 1;
  border: none;
  font-size: 48px;
  padding: 8px 16px;
  background-color: transparent;
  border-bottom: 2px solid #f8f5c1;
}

.main-list__input:focus {
  outline: none;
  border-bottom: 4px solid #f8f5c1;
}
</style>
