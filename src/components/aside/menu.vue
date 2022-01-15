<template>
  <div>
    <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="left-menu"
      router
    >
      <el-menu-item :index="item.url" v-for="item in menuList" :key="item.url">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <!-- <el-submenu :index="item.key" v-for="item in menuList" :key="item.key">
        <template slot="title" v-if="item.subMenu">
          <i class="el-icon-location"></i>
          <span>{{item.title}}</span>
          <el-menu-item
            v-for="subItem in item.subMenu"
            :key="subItem.key"
            :route="{path:subItem.url}"
            :index="subItem.key"
          >{{subItem.title}}</el-menu-item>
        </template>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList: [
        //admin
        {
          title: '管理员管理',
          url: '/admin/users',
          icon: 'el-icon-user-solid',
          key: 1,
        },
        // student
        {
          title: '学生信息管理',
          url: '/admin/students',
          icon: 'el-icon-s-management',
          key: 2,
        },
        //hostel
        {
          title: '学生宿舍管理',
          url: '/admin/hotel',
          icon: 'el-icon-s-home',
          key: 3,
        },
        // financial
        {
          title: '财务管理',
          url: '/admin/finance',
          icon: 'el-icon-s-finance',
          key: 4,
        },
        // school
        {
          title: '学校配置',
          url: '/admin/college',
          icon: 'el-icon-s-tools',
          key: 5,
          subMenu: [
            { title: '学院管理', url: '/admin/users', key: 5 - 1 },
            { title: '专业管理', url: '/admin/users', key: 5 - 2 },
            { title: '班级管理', url: '/admin/users', key: 5 - 3 },
            { title: '辅导员管理', url: '/admin/users', key: 5 - 4 },
          ],
        },
      ],
    }
  },
  computed: {
    activeUsers: function () {
      let subMenu = []
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].subMenu) {
          subMenu = this.menuList[i].subMenu
        }
      }
      return subMenu
    },
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {},
}
</script>
<style lang='less' scoped>
.left-menu {
  height: 90.4vh;
}
</style>