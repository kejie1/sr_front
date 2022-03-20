<template>
  <div class="login_container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <el-form-item label>
        <h2 style="color: #ffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      </el-form-item>

      <el-form-item label="用户名:" prop="username">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密    码:" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/user";
export default {
  components: {},
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "用户名长度为2~16的字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度为6~16的字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await login(this.loginForm);
          if (res.code == 200) {
            sessionStorage.setItem("token", res.token);
            this.$store.commit("setUserInfo", res.data);
            this.$router.push({ path: "/admin" });
          }
        } else {
          this.$message.warning("请按要求输入用户名哥密码");
        }
      });
    },
  },
  created() {},
  mounted() {},
  updated() {},
};
</script>
<style lang="less">
.login_container {
  background-color: #336699;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 400px;
    .el-button {
      width: 300px;
    }
  }
  .el-form-item__label {
    color: #ffff;
  }
}
</style>
