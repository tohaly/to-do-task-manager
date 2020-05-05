<template>
  <div class="loader">
    <div class="loader__item"></div>
    <p class="loader__text">Загрузка...</p>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style>
@keyframes spin-loader {
  100% {
    transform: rotate(360deg);
  }
}
.loader {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  color: #1a1b22;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 80px 104px;
  margin: auto;
}

.loader__item {
  display: block;
  width: 120px;
  height: 120px;
  border: 8px solid #444;
  border-bottom-color: #888;
  border-radius: 50%;
  margin-bottom: 24px;
  animation: spin-loader 0.75s infinite linear;
}

.loader__text {
  font-size: 32px;
  line-height: 1.3;
  color: #000;
  margin: 0;
}

@media screen and (max-width: 650px) {
  .loader {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #1a1b22;
    flex-direction: column;
    align-items: center;
    display: flex;
    padding: 40px 16px;
    margin: auto;
  }

  .loader__text {
    font-size: 22px;
  }

  .loader__item {
    width: 80px;
    height: 80px;
  }
}
</style>
