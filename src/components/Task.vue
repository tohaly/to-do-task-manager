<template>
  <div class="task__item">
    <input
      class="task__checkbox"
      v-if="!isNewPage"
      type="checkbox"
      @click="changeCheckBox(index)"
      v-model="isChecked"
    />
    <div class="task__item-text" v-if="!isEditing">{{ text }}</div>
    <input
      type="text"
      class="task__input"
      placeholder="Enter a task"
      v-if="isEditing"
      v-model="textHolder"
      v-on:keyup.enter="keyEditTaskHandler"
      @input="validate()"
      minlength="2"
      maxlength="25"
    />
    <Button
      :class="[{ task__button_disabled: isButtonDisabled }, 'task__button']"
      :action="isEditing ? saveChangedTask : showEditField"
      :buttonName="buttonName"
      :disabled="isButtonDisabled"
    />
    <div class="task__delete-button" @click="deleteTask(index)"></div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "Task",
  props: {
    text: String,
    isChecked: Boolean,
    changeCheckBox: Function,
    index: Number,
    isNewPage: Boolean,
    id: String,
    saveTask: Function,
    deleteTask: Function,
  },
  components: { Button },
  data() {
    return {
      isEditing: false,
      buttonName: "edit",
      isButtonDisabled: false,
      textHolder: this.text,
    };
  },
  methods: {
    showEditField() {
      this.isEditing = true;
      this.buttonName = "save";
      this.textHolder = this.text;
    },
    saveChangedTask() {
      this.isEditing = false;
      this.buttonName = "edit";
      this.saveTask(this.index, this.textHolder);
    },
    validate() {
      this.$helpers.simpleValidate(this);
    },
    keyEditTaskHandler() {
      if (!this.isButtonDisabled) {
        this.saveChangedTask();
      }
    },
  },
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
  border: 3px solid #373f41;
  opacity: 0.8;
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
  background-color: #373f41;
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
  opacity: 0.8;
  transition: opacity 0.4s, transform 0.4s;
}

.task__delete-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #373f41;
  top: 16px;
  right: 0;
  transform: rotate(45deg);
}

.task__delete-button::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #373f41;
  top: 16px;
  right: 0;
  transform: rotate(-45deg);
}

.task__delete-button:hover {
  opacity: 1;
  transform: scale(1.05);
}

.task__input {
  border: none;
  font-size: 30px;
  letter-spacing: 5px;
  flex-grow: 1;
  border: 1px solid #fff;
  margin-right: 16px;
  border-bottom: 1px solid #000;
}

.task__input:focus {
  outline: none;
  border-bottom: 2px solid #000;
}

.task__button {
  margin-right: 16px;
  background-color: #ccc;
  padding: 4px 8px;
  border: none;
}

.task__button_disabled {
  opacity: 0.4;
}

.task__button_disabled:hover {
  transform: none;
}

@media screen and (max-width: 650px) {
  .task__item {
    padding: 4px 8px;
  }

  .task__item-text {
    font-size: 18px;
    letter-spacing: 0;
  }

  .task__checkbox {
    width: 14px;
    height: 14px;
    border: 2px solid #373f41;
    padding: 4px;
    margin-right: 8px;
  }

  .task__delete-button {
    width: 20px;
  }

  .task__input {
    font-size: 18px;
    letter-spacing: 0;
    margin-right: 8px;
  }
}
</style>
