<template>
  <button class="button button__color" @click="action()">{{ buttonName }}</button>
</template>

<script>
export default {
  name: "Button",
  props: { buttonName: String, action: Function }
};
</script>

<style>
.button {
  font-size: 32px;
  padding: 8px 32px;
  align-self: center;
  cursor: pointer;
  border: 1px solid #f8f5c1;
  transition: transform 0.4s;
  letter-spacing: 4px;
}

.button:focus {
  outline: none;
}

.button:hover {
  transform: scale(1.05);
}

.button__color {
  background-color: #f8f5c1;
  color: #918989;
}

@media screen and (max-width: 650px) {
  .button {
    font-size: 20px;
    padding: 8px 16px;
  }
}

@media screen and (max-width: 650px) {
  .button {
    font-size: 20px;
    padding: 8px 8px;
  }
}
</style>
