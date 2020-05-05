<template>
  <div class="edit-page">
    <div class="edit-page__content" v-if="!isLoad">
      <Title :text="card.title" :saveTitle="saveTitle" />
      <div v-if="card.list.length" class="edit-page__tasks">
        <Task
          v-for="(task, index) in card.list"
          :key="index"
          :index="index"
          :text="task.text"
          :isChecked="task.isChecked"
          :id="$route.params.id"
          :isNewPage="$route.params.id === 'new'"
          :changeCheckBox="chekedTask"
          :saveTask="saveTask"
          :deleteTask="deleteTask"
        ></Task>
      </div>
      <AddTask :createTask="createTask" />
      <div class="edit-page__control-wrapper">
        <StatePanel
          :stateEvents="{ toPreviousState, toFutureState }"
          :states="states"
        />
        <ControlPanel
          :functions="{ handleSaveClick, setCancelPopup, setDeletePopup }"
          :title="card.title"
        />
      </div>
    </div>
    <Loader v-if="isLoad" />
    <ConfirmPopup
      :popup="popup"
      :confirm="popup.isDelete ? handleDeleteClick : handleCancelClick"
    />
  </div>
</template>

<script>
import Task from "./Task";
import Loader from "./Loader";
import ConfirmPopup from "./ConfirmPopup";
import Title from "./Title";
import ControlPanel from "./ControlPanel";
import StatePanel from "./StatePanel";
import AddTask from "./AddTask";

import routers from "../routes/";

import { mapActions, mapGetters, mapMutations } from "vuex";

import { CANCEL_MESSAGE, DELETE_MESSAGE } from "../constants/constants";

export default {
  name: "EditPage",
  components: {
    Task,
    Loader,
    ConfirmPopup,
    Title,
    ControlPanel,
    StatePanel,
    AddTask,
  },
  data() {
    return {
      id: this.$route.params.id,
      popup: {
        isActive: false,
        cardId: "",
        isLoad: false,
        isDelete: false,
        message: null,
      },
      card: {
        title: null,
        list: [],
      },
      states: {
        isEdited: false,
        previous: null,
        future: null,
      },
      isNewCard: false,
      isLoad: true,
    };
  },
  computed: mapGetters(["cards"]),
  methods: {
    ...mapActions(["addCard", "updateCardApi", "getOneCard", "removeCard"]),
    ...mapMutations(["createCard", "updateCard"]),

    // Get card from cardList store

    getCard() {
      this.card = this.cards[this.id];
      this.saveState();
    },

    // State events
    copyCard() {
      return JSON.parse(JSON.stringify(this.card));
    },
    saveState() {
      this.states.isEdited = false;
      this.states.future = null;
      this.states.previous = this.copyCard();
    },
    toPreviousState() {
      const card = this.states.previous;
      const { id } = this;
      this.states.future = this.copyCard();
      this.card = card;
      this.updateCard({ id, card });
      this.states.previous = this.copyCard();
      this.states.isEdited = false;
    },
    toFutureState() {
      const card = this.states.future;
      const { id } = this;
      this.card = card;
      this.updateCard({ id, card });
      this.states.future = null;
      this.states.isEdited = true;
    },

    // Title events

    handleEditTitle() {
      this.title = this.titleHandler;
    },

    // Popup control

    setCancelPopup() {
      this.popup.isActive = true;
      this.popup.isDelete = false;
      this.popup.message = CANCEL_MESSAGE;
    },
    setDeletePopup() {
      this.popup.isActive = true;
      this.popup.isDelete = true;
      this.popup.message = DELETE_MESSAGE;
    },

    // Control edit page events

    handleSaveClick() {
      const id = this.$route.params.id;
      this.isLoad = true;

      if (id !== "new") {
        this.updateCardApi(id).finally(() => (this.isLoad = false));
      } else {
        this.addCard(this.card)
          .then((id) => {
            routers.push({ name: "edit", params: { id } });
          })
          .finally(() => (this.isLoad = false));
      }
    },
    handleCancelClick() {
      routers.push("/");
    },
    handleDeleteClick() {
      this.popup.isLoad = true;
      this.removeCard(this.$route.params.id)
        .then(() => {
          routers.push("/");
        })
        .finally(() => (this.popup.isLoad = false));
    },

    // Title events

    saveTitle(title) {
      this.card.title = title;
      if (this.card.title !== this.states.previous.title) {
        this.states.isEdited = true;
      }
    },

    //Task events

    createTask(text) {
      this.card.list.push({ text, isChecked: false });
      this.states.isEdited = true;
    },
    saveTask(index, text) {
      this.card.list[index].text = text;
      if (
        this.card.list[index].text !== this.states.previous.list[index].text
      ) {
        this.states.isEdited = true;
      }
    },
    chekedTask(index) {
      this.card.list[index].isChecked = !this.card.list[index].isChecked;
      this.states.isEdited = true;
    },
    deleteTask(index) {
      this.card.list.splice(index, 1);
      this.states.isEdited = true;
    },
  },
  created() {
    const { id } = this;

    if (id !== "new") {
      if (!this.cards.length) {
        this.getOneCard(id)
          .then((res) => this.createCard({ id, ...res.data() }))
          .then(() => this.getCard())
          .finally(() => (this.isLoad = false));
      } else {
        this.getCard();
      }
    } else {
      this.isLoad = false;
      this.saveState();
    }
  },
};
</script>

<style>
.edit-page {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.edit-page__button {
  margin-top: 16px;
  margin-left: auto;
  margin-bottom: 32px;
}

.edit-page__tasks {
  max-width: 750px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 32px;
}

.edit-page__control-wrapper {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 120px;
  right: 50px;
}

@media screen and (max-width: 1220px) {
  .edit-page__control-wrapper {
    position: static;
  }
}
</style>
