<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { collegeList, queryCount as queryCollegeCount } from "@/api/college";
import {vocationalList} from "@/api/vocational";
import { classList } from "@/api/class";
export default {
  data() {
    return {
      paginationParams: {
        pageSize: 100000,
        currentPage: 1,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.commonRequest()
  },
  mounted() {},
  methods: {
    async commonRequest() {
      await queryCollegeCount();
      const { data: collegeListData } = await collegeList(
        this.paginationParams
      );
      const { data: vocationalListData } = await vocationalList(
        this.paginationParams
      );
      const { data: classListData } = await classList(
        this.paginationParams
      );
      sessionStorage.setItem('collegeList',JSON.stringify(collegeListData.data.result))
      sessionStorage.setItem('vocationalList',JSON.stringify(vocationalListData.data.result))
      sessionStorage.setItem('classList',JSON.stringify(classListData.data.result))
    },
  },
};
</script>
