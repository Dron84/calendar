import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: null,
  },
  mutations: {
    date(state, val) {
      state.date = val;
    },
  },
  actions: {},
  getters: {
    date(state) {
      return state.date;
    },
  },
});
