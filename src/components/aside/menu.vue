<template>
  <div class>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">{{menuList.admin.title}}</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">{{menuList.student.title}}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">{{menuList.financial.title}}</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menuList.school.title}}</span>
        </template>
        <el-menu-item index="1-1">{{menuList.school.college}}</el-menu-item>
        <el-menu-item index="1-2">{{menuList.school.vocational}}</el-menu-item>
        <el-menu-item index="1-3">{{menuList.school.class}}</el-menu-item>
        <el-menu-item index="1-4">{{menuList.school.teacher}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList: {
        admin: {
          title: '管理员管理',
        },
        student: {
          title: '学生信息管理',
        },
        hostel: {
          title: '学生宿舍管理',
        },
        financial: {
          title: '财务管理',
        },
        school: {
          title: '学校配置',
          college: '学院管理',
          vocational: '专业管理',
          class: '班级管理',
          teacher: '辅导员管理',
        },
      },
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {},
}
</script>
<style lang='less' scoped>
</style>