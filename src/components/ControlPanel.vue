<template>
  <div class="main-list__control">
    <Button :action="functions.handleSaveClick" buttonName="save" />
    <Button :action="functions.setCancelPopup" buttonName="cancel" />
    <Button
      v-if="$route.params.id !== 'new'"
      :action="functions.setDeletePopup"
      buttonName="delete"
    />
  </div>
</template>
<script>
import Button from "./Button";

export default {
  components: { Button },
  props: {
    functions: Object
  }
};
</script>
<style>
.main-list__control {
  max-width: 550px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}

.main-list__control-button {
  margin-right: 8px;
}

.main-list__icon {
  width: 50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

.main-list__icon_back {
  background-image: url("../assets/back.png");
  margin-right: 16px;
}

.main-list__icon_go {
  background-image: url("../assets/go.png");
}
</style>
