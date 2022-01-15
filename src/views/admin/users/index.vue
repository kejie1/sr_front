<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入用户名" @input="searchUser" v-model="searchParams">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn">
          <el-button
            type="primary"
            :disabled="accountType == 1 ? false : true"
            plain
            @click="handleAddEdit"
          >添加用户</el-button>
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column :v-if="accountType == 1" prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="collegeStr" label="所属学院"></el-table-column>
      <el-table-column prop="accountType" label="角色类型">
        <template slot-scope="scope">
          {{
          scope.row.accountType == 1 ? "超级管理员" : "普通用户"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80px">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" plain size="mini" @click="handleAddEdit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加删除用户 -->
    <el-dialog :title="`${rowData.id ? '编辑' : '添加'}用户`" :visible.sync="userInfoVisible" width="40%">
      <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="accountType" :v-if="accountType == 1">
          <el-select v-model="userInfo.accountType" placeholder="请选择">
            <el-option
              v-for="item in accountTypeEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" :v-if="accountType == 1">
          <el-switch v-model="userInfo.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel = false">取 消</el-button>
        <el-button type="primary" @click="submit = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, searchUser } from '../../../api/user'
// import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      userInfoVisible: false,
      accountType: 1,
      rowData: {},
      userInfo: {
        username: '',
        password: '',
        email: '',
        phone: '',
        accountType: 1,
        status: true,
      },
      searchParams: '',
      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 16,
            message: '用户名长度为2~16的字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '用户名长度为6~16的字符',
            trigger: 'blur',
          },
        ],
      },
      accountTypeEnum: [
        { value: 1, label: '超级管理员' },
        { value: 2, label: '普通用户' },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserList() {
      const { data } = await userList()
      if (data.code !== 200)
        return this.$message({ message: '接口调用失败', type: 'error' })
      this.tableData = data.data.map((x) => ({
        ...x,
        status: x.status == 1 ? true : false,
      }))
      // this.accountType = this.$store.state.userInfo.accountType
      // console.log(this.accountType)
      this.$message({ message: data.msg, type: 'success' })
    },
    // 防抖
    async searchUser() {
      const { data } = searchUser({ username: this.searchParams })
      this.tableData = data.data
    },
    handleAddEdit(row) {
      if (row.id) {
        this.rowData = row
      }
      this.userInfoVisible = true
    },
    handleCancel() {
      this.userInfoVisible = false
    },
    submit() {},
  },
  created() {
    this.getUserList()
  },
  mounted() {},
  updated() {},
}
</script>
<style lang="less" scoped>
.userContainer {
  .search_btn {
    // width: 98%;
    .search_btn_container {
      display: flex;
      justify-content: space-between;
      .search {
        width: 300px;
      }
      .addBtn {
        .el-button {
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
