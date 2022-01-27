<template>
  <div class="indexContainer">
    <el-container>
      <el-header>
        <div class="header_container">
          <div class="logo">
            <logo></logo>
          </div>
          <div class="userInfo">
            <user-info></user-info>
          </div>
        </div>
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          <menu-list></menu-list>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logo from '@/components/header/logo.vue'
import userInfo from '@/components/header/userInfo.vue'
import menuList from '@/components/aside/menu.vue'
export default {
  components: {
    logo,
    userInfo,
    menuList,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {},
}
</script>
<style lang="less" scoped>
.indexContainer {
  width: 100%;
  min-height: 100%;
  position: absolute;
  .el-header {
    background-color: #333333;
    display: flex;
    justify-content: center;
    .header_container {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .el-aside {
      height: 100%;
      display: block;
      position: relative;
      overflow-y: scroll;
      background-color: #324157 !important;
    }
  }
  .content {
    width: 100%;
    .el-aside {
      width: 20%;
    }
    .el-main {
      width: 100%;
    }
  }
}
</style>
