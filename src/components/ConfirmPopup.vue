<template>
  <div class="popup" :class="{ 'popup_is-active': popup.isActive }">
    <div v-if="!popup.isLoad" class="popup__content">
      <p class="popup__text">{{ popup.message }}</p>
      <div class="popup__control">
        <Button class="popup__margin-right" :action="confirm" buttonName="Ok" />
        <Button :action="closePopup" buttonName="Cancel" />
      </div>
    </div>
    <Loader v-if="popup.isLoad" />
  </div>
</template>

<script>
import Loader from "./Loader";
import Button from "./Button";

export default {
  name: "PopupConfirm",
  components: { Loader, Button },
  props: {
    popup: Object,
    confirm: Function,
  },
  methods: {
    closePopup() {
      this.popup.isActive = false;
    },
  },
};
</script>

<style>
.popup {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  animation: loader 0.4s infinite;
}

.popup_is-active {
  display: flex;
}

.popup__content {
  width: 400px;
  margin: auto;
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
}

.popup__text {
  font-size: 32px;
  color: #000;
  text-align: center;
}

.popup__control {
  text-align: right;
}

.popup__margin-right {
  margin-right: 16px;
}
</style>
