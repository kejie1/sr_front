<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入姓名" @input="searchUser" v-model="searchParams">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-model="value" placeholder="请选择学院">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择班级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            :disabled="accountType == 1 ? false : true"
            size="mini"
            @click="handleAddEdit"
          >搜索</el-button>
        </div>
        <div class="addBtn">
          <el-button
            type="primary"
            :disabled="accountType == 1 ? false : true"
            size="mini"
            @click="handleAddEdit"
          >添加学生信息</el-button>
          <el-button
            type="success"
            :disabled="accountType == 1 ? false : true"
            size="mini"
            @click="handleAddEdit"
          >导出为表格</el-button>
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
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="idCard" label="身份证号码"></el-table-column>
      <el-table-column prop="college" label="学院"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="hostelId" label="宿舍"></el-table-column>
      <el-table-column prop="ethnic" label="民族"></el-table-column>
      <el-table-column prop="birthPlace" label="生源地"></el-table-column>
      <el-table-column prop="address" label="家庭地址"></el-table-column>
      <el-table-column prop="graduate" label="毕业院校"></el-table-column>
      <el-table-column prop="counselor" label="辅导员姓名"></el-table-column>
      <el-table-column prop="counselorPhone" label="辅导员电话"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleAddEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
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
  async created() {
    await this.getCollegeList()
    await this.getUserList()
  },
  mounted() {},
  updated() {},
  methods: {
    // 获取学院列表
    async getCollegeList() {
      const { data } = await collegeList()
      this.collegeList = data.data.map((x) => ({
        label: x.collegeStr,
        value: x.id,
      }))
    },
  },
}
</script>
<style lang="less" scoped>
.userContainer {
  .search_btn {
    .search_btn_container {
      display: flex;
      justify-content: space-between;
      .search {
        display: flex;
        justify-content: space-around;
        width: 500px;
        .el-input {
          margin-left: 10px;
          width: 60%;
        }
        .el-select {
          margin-left: 10px;
        }
        .el-button {
          margin-left: 10px;
        }
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
