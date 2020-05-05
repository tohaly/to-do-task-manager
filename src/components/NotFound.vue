<template>
  <div class="not-found">
    <p class="not-found__text">404 Not Found</p>
    <div class="not-found__icon">
      <svg viewBox="0 0 426.667 426.667">
        <path
          d="M138.667 192c17.707 0 32-14.293 32-32s-14.293-32-32-32-32 14.293-32 32 14.293 32 32 32zM288 192c17.707 0 32-14.293 32-32s-14.293-32-32-32-32 14.293-32 32 14.293 32 32 32z"
        />
        <path
          d="M213.12 0C95.36 0 0 95.573 0 213.333s95.36 213.333 213.12 213.333c117.973 0 213.547-95.573 213.547-213.333S331.093 0 213.12 0zm.213 384c-94.293 0-170.667-76.373-170.667-170.667S119.04 42.667 213.333 42.667 384 119.04 384 213.333 307.627 384 213.333 384z"
        />
        <path
          d="M213.333 256c-49.707 0-92.16 31.04-109.227 74.667h35.733C154.667 305.28 181.867 288 213.333 288s58.667 17.28 73.493 42.667h35.733C305.493 287.04 263.04 256 213.333 256z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
@keyframes spin-loader {
  100% {
    transform: rotate(360deg);
  }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.not-found__text {
  margin: 40px 0;
  font-size: 60px;
  text-align: center;
}

.not-found__icon {
  width: 120px;
  fill: #373f41;
}
</style>
