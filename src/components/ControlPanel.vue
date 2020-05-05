<template>
  <div class="main-list__control">
    <Button
      class="main-list__control-button"
      v-if="title"
      :action="functions.handleSaveClick"
      buttonName="save"
    />
    <Button
      class="main-list__control-button"
      :action="functions.setCancelPopup"
      buttonName="cancel"
    />
    <Button
      class="main-list__control-button"
      v-if="$route.params.id !== 'new'"
      :action="functions.setDeletePopup"
      buttonName="delete"
    />
  </div>
</template>
<script>
import Button from "./Button";

export default {
  name: "ControlPanel",
  components: { Button },
  props: {
    functions: Object,
    title: String,
  },
};
</script>
<style>
.main-list__control {
  max-width: 550px;
  display: flex;
  flex-direction: column;
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

.main-list__control-button {
  width: 100%;
  margin: 0 0 8px;
}

@media screen and (max-width: 1220px) {
  .main-list__control {
    flex-direction: row;
  }

  .main-list__control-button {
    width: 100%;
    margin: 0 8px 0 0;
  }

  .main-list__control-button:last-child {
    margin-right: 0;
  }
}
</style>
