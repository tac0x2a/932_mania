import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kusatsuList: null
  },
  mutations: {
    kusatsuList(state, payload) {
      state.kusatsuList = payload;
    }
  },
  actions: {},
  modules: {}
});
