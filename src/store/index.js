import Vue from "vue";
import Vuex from "vuex";
import { collegeList, queryCount as queryCollegeCount } from "@/api/college";
import {
  vocationalList,
  queryCount as queryVocationalCount,
} from "@/api/vocational";
import { classList, queryCount as queryClassCount } from "@/api/class";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
    collegeList: [],
    vocationalList: [],
    classList: [],
    paginationParams: {
      pageSize: 10,
      currentPage: 1,
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    setCollegeList(state, data) {
      state.collegeList = data;
    },
    setVocationList(state, data) {
      state.vocationalList = data;
    },
    setClassList(state, data) {
      state.classList = data;
    },
  },
  actions: {
    getToken(content, data) {
      content.commit("SET_TOKEN", data);
    },
    getUserInfo(content, data) {
      content.commit("setUserInfo", data);
    },
    async getCollegeList(content) {
      await queryCollegeCount();
      const { data: res } = await collegeList(this.state.paginationParams);
      res.data.result
        ? res.data.result.map((x) => ({
            ...x,
            label: x.collegeStr,
            value: x.id,
          }))
        : [];
      content.commit("setCollegeList", res.data.result);
    },
    async getVocationList(content) {
      await queryVocationalCount();
      const { data: res } = await vocationalList(this.state.paginationParams);
      res.data.result
        ? res.data.result.map((x) => ({
            ...x,
            label: x.vocationalStr,
            value: x.id,
          }))
        : [];
      content.commit("setVocationList", res.data.result);
    },
    async getClassList(content) {
      await queryClassCount();
      const { data: res } = await classList(this.state.paginationParams);
      res.data.result
        ? res.data.result.map((x) => ({
            ...x,
            label: x.classStr,
            value: x.id,
          }))
        : [];
      content.commit("setClassList", res.data.result);
    },
  },
  modules: {},
});
