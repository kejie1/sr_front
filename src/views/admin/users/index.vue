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
    <el-table
      @cell-click="handleStatus"
      :key="Math.random()"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column :v-if="accountType == 1" prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="college" label="所属学院">
        <template slot-scope="scope">
          {{
          scope.row.college.label
          }}
        </template>
      </el-table-column>
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
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="warning" plain size="mini" @click="handleAddEdit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加修改用户 -->
    <el-dialog
      :title="`${userInfo.id ? '编辑' : '添加'}用户`"
      :visible.sync="userInfoVisible"
      width="40%"
    >
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
        <el-form-item label="所属学院" prop="collegeId" :v-if="accountType == 1">
          <el-select v-model="userInfo.collegeId" placeholder="请选择">
            <el-option
              v-for="item in collegeList"
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
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  searchUser,
  addUser,
  updateUser,
  deleteUser,
} from '../../../api/user'
import { collegeList } from '../../../api/college'
// import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      userInfoVisible: false,
      accountType: 1,
      rowData: {},
      collegeList: [],
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
      this.tableData = data.data.map((x) => ({
        ...x,
        status: x.status == 1 ? true : false,
        college: this.collegeList[x.collegeId],
      }))
      // this.accountType = this.$store.state.userInfo.accountType
    },
    // 获取学院列表
    async getCollegeList() {
      const { data } = await collegeList()
      this.collegeList = data.data.map((x) => ({
        label: x.collegeStr,
        value: x.id,
      }))
    },

    // 防抖todo
    async searchUser() {
      if (this.searchParams == '') {
        this.getUserList()
      } else {
        const { data } = await searchUser({ username: this.searchParams })
        this.tableData = data.data
      }
    },
    // 判断添加/修改
    handleAddEdit(row) {
      if (row.id) {
        this.userInfo = row
      }
      this.userInfoVisible = true
    },

    handleCancel() {
      this.userInfoVisible = false
    },
    // 添加修改保存
    async submit() {
      this.userInfo.status ? 1 : 0
      if (this.userInfo.id) {
        const { data } = await updateUser(this.userInfo)
        this.$message({ message: data.msg, type: 'success' })
        this.userInfoVisible = false
        await this.getUserList()
      } else {
        await addUser(this.userInfo)
        this.userInfoVisible = false
        await this.getUserList()
      }
      this.userInfo.status = true

      this.$refs['userInfo'].resetFields()
    },
    async handleStatus(row, column) {
      if (column.property === 'status') {
        row.status ? 1 : 0
        await updateUser(row)
      }
    },
    async handleDelete(id) {
      const { data } = await deleteUser({ id })
      this.$message({ message: data.msg, type: 'success' })
      this.getUserList()
    },
  },
  async created() {
    await this.getCollegeList()
    await this.getUserList()
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
