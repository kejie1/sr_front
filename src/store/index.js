import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    getToken(content, data) {
      content.commit("SET_TOKEN", data);
    },
    getUserInfo(content, data) {
      content.commit("setUserInfo", data);
    },
  },
  modules: {},
});
