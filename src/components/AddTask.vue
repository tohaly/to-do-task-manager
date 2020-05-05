<template>
  <div class="add-task">
    <div class="add-task__container">
      <input
        v-model="textHolder"
        type="text"
        class="add-task__input"
        placeholder="Enter a task"
        @input="validate()"
        minlength="2"
        maxlength="25"
        v-on:keyup.enter="keyAddTaskHandler"
      />
      <Button
        :class="{ 'add-task__button_disabled': isButtonDisabled }"
        :action="addNewTask"
        buttonName="add"
        :disabled="isButtonDisabled"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "AddTask",
  components: {
    Button,
  },
  props: {
    createTask: Function,
  },
  data() {
    return {
      textHolder: null,
      isButtonDisabled: true,
    };
  },
  methods: {
    addNewTask() {
      this.createTask(this.textHolder);
      this.textHolder = null;
      this.isButtonDisabled = true;
    },
    validate() {
      this.$helpers.simpleValidate(this);
    },
    keyAddTaskHandler() {
      if (!this.isButtonDisabled) {
        this.addNewTask();
      }
    },
  },
};
</script>

<style>
.add-task__container {
  max-width: 750px;
  width: 100%;
  margin: 0 auto 32px;
  display: flex;
}

.add-task__input {
  appearance: none;
  border-radius: 0;
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 30px;
  padding: 8px 16px;
  background-color: transparent;
  border-bottom: 2px solid #f8f5c1;
  margin-right: 8px;
}

.add-task__input:focus {
  outline: none;
  border-bottom: 4px solid #f8f5c1;
}

.add-task__button_disabled {
  opacity: 0.7;
  background-color: #ccc;
  border: 1px solid #ccc;
}

.add-task__button_disabled:hover {
  transform: none;
}

@media screen and (max-width: 650px) {
  .add-task__input {
    font-size: 22px;
    padding: 8px 16px;
    background-color: transparent;
    border-bottom: 2px solid #f8f5c1;
  }
}
</style>
