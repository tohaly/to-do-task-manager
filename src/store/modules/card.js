import Vue from "vue";
import db from "../../constants/firebase";

export default {
  state: {
    cardList: {},
  },
  actions: {
    getCards({ commit }) {
      const arr = {};
      return db
        .get()
        .then((res) => {
          res.forEach((doc) => {
            arr[doc.id] = doc.data();
          });
          commit("createList", arr);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneCard(state, id) {
      return db
        .doc(id)
        .get()
        .catch((err) => {
          console.log(err);
        });
    },
    addCard({ commit }, { title, list }) {
      return db
        .add({
          title,
          list,
        })
        .then((res) => {
          commit("createCard", { id: res.id, title, list });
          return res.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeCard({ commit }, id) {
      return db
        .doc(id)
        .delete()
        .then(() => {
          commit("removeCard", id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCardApi({ state }, id) {
      const { title, list } = state.cardList[id];

      return db
        .doc(id)
        .update({
          title,
          list,
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    createCard(state, { id, title, list }) {
      state.cardList[id] = { title, list };
    },
    createList(state, list) {
      state.cardList = list;
    },
    removeCard(state, id) {
      Vue.delete(state.cardList, id);
    },
    updateCard(state, { id, card }) {
      state.cardList[id] = card;
    },
  },
  getters: {
    cards(state) {
      return state.cardList;
    },
  },
};
