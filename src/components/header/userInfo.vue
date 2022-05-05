<template>
  <div class>
    <el-button size="mini" plain @click="loginOut">退出登录</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    loginOut() {
      this.$confirm("您正在退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push({ path: "/login" });
          this.$message({
            type: "success",
            message: "退出登录成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  created() {},
  mounted() {},
  updated() {},
};
</script>
<style lang="less" scoped></style>
