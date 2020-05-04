<template>
  <div class="add-task">
    <div class="add-task__container">
      <input v-model="textHolder" type="text" class="add-task-input" placeholder="Enter a title" />
      <Button :action="addNewTaskHandler" buttonName="add task" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "AddTask",
  components: {
    Button
  },
  props: {
    createTask: Function
  },
  data() {
    return {
      textHolder: null
    };
  },
  methods: {
    addNewTaskHandler() {
      this.createTask(this.textHolder);
      this.textHolder = null;
    }
  }
};
</script>

<style>
.add-task__container {
  max-width: 750px;
  width: 100%;
  margin: 0 auto 32px;
  display: flex;
}

.add-task-input {
  box-sizing: border-box;
  flex-grow: 1;
  border: none;
  font-size: 30px;
  padding: 8px 16px;
  background-color: transparent;
  border-bottom: 2px solid #f8f5c1;
}

.add-task-input:focus {
  outline: none;
  border-bottom: 4px solid #f8f5c1;
}
</style>