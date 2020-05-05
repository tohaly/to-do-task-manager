<template>
  <div class="state-panel">
    <button
      :class="[
        { 'state-panel__button_disabled': !states.isEdited },
        'state-panel__button',
      ]"
      :disabled="!states.isEdited"
      @click="stateEvents.toPreviousState()"
    >
      <span class="state-panel__icon">
        <svg viewBox="0 0 1000 1000">
          <path
            d="M890 896.8C800.7 760.7 690.3 718 554.4 707.1v78.2c0 29.1-11.3 56.4-31.9 77-41.2 41.2-113.1 40.9-153.7.3L26.2 524.7C15.8 514.4 10 500.5 10 485.9s5.8-28.5 16.2-38.8l342.3-337.7c41.1-41.1 112.9-41.2 154 .1 20.5 20.6 31.8 47.9 31.8 77v92.8C805.9 330 990 551.3 990 812.6V867c0 24.1-15.8 45.3-38.9 52.2-5.2 1.5-10.3 2.3-15.6 2.3-18-.1-35.1-9-45.5-24.7zM501.3 595.4c120.2 3 252.5 21.5 367.9 115.5-41.8-175.1-189.3-310.4-375.3-331-27.4-3-48.3-2.8-48.3-2.8V186.7L142 485.9l303.6 299.4V594.8s40.1.6 55.7.6z"
          />
        </svg>
      </span>
    </button>
    <button
      :class="[
        { 'state-panel__button_disabled': states.isEdited || !states.future },
        'state-panel__button',
      ]"
      :disabled="states.isEdited || !states.future"
      @click="stateEvents.toFutureState()"
    >
      <span class="state-panel__icon state-panel__icon_reflection">
        <svg viewBox="0 0 1000 1000">
          <path
            d="M890 896.8C800.7 760.7 690.3 718 554.4 707.1v78.2c0 29.1-11.3 56.4-31.9 77-41.2 41.2-113.1 40.9-153.7.3L26.2 524.7C15.8 514.4 10 500.5 10 485.9s5.8-28.5 16.2-38.8l342.3-337.7c41.1-41.1 112.9-41.2 154 .1 20.5 20.6 31.8 47.9 31.8 77v92.8C805.9 330 990 551.3 990 812.6V867c0 24.1-15.8 45.3-38.9 52.2-5.2 1.5-10.3 2.3-15.6 2.3-18-.1-35.1-9-45.5-24.7zM501.3 595.4c120.2 3 252.5 21.5 367.9 115.5-41.8-175.1-189.3-310.4-375.3-331-27.4-3-48.3-2.8-48.3-2.8V186.7L142 485.9l303.6 299.4V594.8s40.1.6 55.7.6z"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "StatePanel",
  props: {
    stateEvents: Object,
    states: Object,
  },
  methods: {
    handlePreviusClick() {
      this.stateEvents.toPreviousState();
    },
  },
};
</script>
<style>
.state-panel {
  width: 112px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 22px;
}

.state-panel__button {
  background-color: transparent;
  border: none;
  display: block;
  padding: 0;
  cursor: pointer;
  transition: transform 0.4s;
  outline: none;
}

.state-panel__button:hover {
  transform: scale(1.1);
}

.state-panel__button:hover .state-panel__icon {
  fill: #fcfadd;
}

.state-panel__button_disabled {
  opacity: 0.3;
  cursor: auto;
}

.state-panel__button_disabled:hover {
  opacity: 0.3;
  transform: none;
}

.state-panel__icon {
  display: block;
  width: 50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  fill: #f8f5c1;
}

.state-panel__icon_reflection {
  transform: scale(-1, 1);
}
</style>
