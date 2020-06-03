<template>
  <div class="task__item">
    <label class="task__label">
      <input
        id="task-input-chekcbox"
        class="task__checkbox"
        v-if="!isNewPage"
        type="checkbox"
        @click="changeCheckBox(index)"
        v-model="isChecked"
      />
      <div class="task__custom-checkbox"></div>
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
    </label>
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
    deleteTask: Function
  },
  components: { Button },
  data() {
    return {
      isEditing: false,
      buttonName: "edit",
      isButtonDisabled: false,
      textHolder: this.text
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
    }
  }
};
</script>

<style>
.task__wrapper {
  width: 100%;
  display: flex;
}

.task__label {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.task__item {
  display: flex;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 16px;
  padding: 8px 16px;
}

.task__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.task__custom-checkbox {
  position: relative;
  width: 22px;
  height: 22px;
  margin: auto 6px auto 0;
  border-radius: 50%;
  border: 3px solid #818586;
  margin-right: 16px;
}

.task__checkbox:checked + .task__custom-checkbox {
  background-color: transparent;
  border: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 22 22'%3e%3cdefs/%3e%3cpath fill='%23818586' d='M11 0C4.9348 0 0 4.9344 0 11c0 6.0657 4.9348 11 11 11s11-4.9343 11-11c0-6.0656-4.9348-11-11-11zm6.1325 7.3315l-6.7692 7.6154a.846.846 0 01-1.1614.0986l-4.2308-3.3847c-.3646-.2915-.4239-.8241-.132-1.1892.2915-.3651.8246-.4244 1.1893-.1324l3.6034 2.8824 6.2357-7.015c.3097-.3495.8453-.3808 1.1943-.0703.3495.311.3812.8457.0707 1.1952z'/%3e%3c/svg%3e");
}

.task__checkbox:checked ~ .task__item-text {
  text-decoration: line-through;
  opacity: 0.6;
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
  appearance: none;
  border-radius: 0;
  border: none;
  font-size: 30px;
  letter-spacing: 5px;
  flex-grow: 1;
  border: 1px solid #fff;
  margin-right: 8px;
  border-bottom: 1px solid #000;
}

.task__input:focus {
  outline: none;
  border-bottom: 2px solid #000;
  border-radius: 0;
  box-shadow: none;
}

.task__button {
  margin-right: 16px;
  background-color: transparent;
  padding: 4px 8px;
  border: none;
  transition: color 0.4s;
}

.task__button:hover {
  transform: none;
  color: #373f41;
}

.task__button_disabled {
  opacity: 0.2;
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
