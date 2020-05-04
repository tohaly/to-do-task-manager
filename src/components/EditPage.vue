<template>
  <div class="main-list">
    <div class="main-list__content" v-if="!isLoad">
      <Title :title="card.title" :saveTitle="saveTitle" />
      <div v-if="card.list.length" class="main-list__tasks">
        <Task
          v-for="(task, index) in card.list"
          :key="index"
          :index="index"
          :text="task.text"
          :isChecked="task.isChecked"
          :id="$route.params.id"
          :changeCheckBox="checked"
          :isNewPage="$route.params.id === 'new'"
          :saveTask="saveTask"
          :deleteTask="deleteTask"
        ></Task>
      </div>
      <AddTask :createTask="createTask" />
      <StatePanel :stateEvents="{toPreviousState, toFutureState}" :states="states" />
      <ControlPanel :functions="{ handleSaveClick, setCancelPopup, setDeletePopup }" />
    </div>
    <Loader v-if="isLoad" />
    <ConfirmPopup :popup="popup" :confirm="popup.isDelete ? handleDeleteClick : handleCancelClick" />
  </div>
</template>

<script>
import Task from "./Task";
import routers from "../routes/";
import Loader from "./Loader";
import ConfirmPopup from "./ConfirmPopup";
import Title from "./Title";
import ControlPanel from "./ControlPanel";
import StatePanel from "./StatePanel";
import AddTask from "./AddTask";

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
    AddTask
  },
  data() {
    return {
      id: this.$route.params.id,
      popup: {
        isActive: false,
        cardId: "",
        isLoad: false,
        isDelete: false,
        message: null
      },
      card: {
        title: null,
        list: []
      },
      states: {
        isEdited: false,
        previous: null,
        future: null
      },
      isNewCard: false,
      isLoad: true
    };
  },
  computed: mapGetters(["cards"]),
  methods: {
    ...mapActions(["addCard", "updateCardApi", "getOneCard", "removeCard"]),
    ...mapMutations(["checked", "createCard", "updateCard"]),
    getCard() {
      this.card = this.cards[this.id];
      this.saveState();
    },
    saveState() {
      this.states.isEdited = false;
      this.states.future = null;
      this.states.previous = JSON.parse(JSON.stringify(this.card));
    },
    toPreviousState() {
      const card = this.states.previous;
      const { id } = this;
      this.states.future = JSON.parse(JSON.stringify(this.card));
      this.card = card;
      this.updateCard({ id, card });
      this.states.previous = JSON.parse(JSON.stringify(this.card));
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
    handleSaveClick() {
      const id = this.$route.params.id;
      this.isLoad = true;

      if (id !== "new") {
        this.updateCardApi(id)
          .then(() => this.saveState())
          .finally(() => (this.isLoad = false));
      } else {
        this.addCard(this.card)
          .then(id => {
            routers.push({ name: "edit", params: { id } });
          })
          .then(() => this.saveState())
          .finally(() => (this.isLoad = false));
      }
    },
    handleEditTitle() {
      this.title = this.titleHandler;
    },
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
    saveTitle(title) {
      this.card.title = title;
      this.states.isEdited = true;
    },

    //Task events

    createTask(text) {
      this.card.list.push({ text, isChecked: false });
      this.states.isEdited = true;
    },
    saveTask(index, text) {
      this.card.list[index].text = text;
      this.states.isEdited = true;
    },
    deleteTask(index) {
      this.card.list.splice(index, 1);
      this.states.isEdited = true;
    }
  },
  created() {
    const { id } = this;

    if (id !== "new") {
      if (!this.cards.length) {
        this.getOneCard(id)
          .then(res => this.createCard({ id, ...res.data() }))
          .then(() => this.getCard())
          .finally(() => (this.isLoad = false));
      } else {
        this.getCard();
      }
    } else {
      this.isLoad = false;
    }
  }
};
</script>

<style>
.main-list {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.main-list__button {
  margin-top: 16px;
  margin-left: auto;
  margin-bottom: 32px;
}

.main-list__tasks {
  max-width: 750px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 32px;
}
</style>
