<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入姓名" @input="searchUser" v-model="searchParams">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select placeholder="请选择学院" v-model="value">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeStr"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select placeholder="请选择班级" v-model="value">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeStr"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button type="primary" :disabled="accountType == 1 ? false : true" size="mini">搜索</el-button>
        </div>
        <div class="addBtn">
          <el-button
            type="primary"
            :disabled="accountType == 1 ? false : true"
            size="mini"
            @click="openAddEditDrawer"
          >添加学生信息</el-button>
          <el-button type="success" :disabled="accountType == 1 ? false : true" size="mini">导出为表格</el-button>
        </div>
      </div>
    </div>
    <el-table fit :data="studentsList" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="idCard" label="身份证号码" width="180"></el-table-column>
      <el-table-column prop="collegeId" label="学院"></el-table-column>
      <el-table-column prop="classId" label="班级"></el-table-column>
      <el-table-column prop="hostelId" label="宿舍"></el-table-column>
      <el-table-column prop="ethnic" label="民族"></el-table-column>
      <el-table-column prop="birthPlace" label="生源地"></el-table-column>
      <el-table-column prop="address" label="家庭地址" width="120"></el-table-column>
      <el-table-column prop="graduate" label="毕业院校"></el-table-column>
      <el-table-column prop="counselorId" label="辅导员姓名" width="100"></el-table-column>
      <el-table-column prop="counselorPhone" label="辅导员电话" width="120"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleAddEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.pageSize"
      layout="->,total, sizes, prev, pager,next, jumper"
      :total="pagination.total || 0"
    ></el-pagination>
    <el-drawer
      title="添加学生信息"
      :visible.sync="addEditVisible"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <el-form :model="studentInfo" :rules="studentInfoRules" ref="studentInfo" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="studentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="sex">
          <el-input v-model="studentInfo.sex"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="age">
          <el-input v-model="studentInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色类型" prop="accountType" :v-if="accountType == 1">
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
        </el-form-item>-->
        <!-- <el-form-item label="状态" prop="status" :v-if="accountType == 1">
          <el-switch v-model="userInfo.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { collegeList, studentsList } from '../../../api/students'
// import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      studentsList: [],
      collegeList: [],
      searchParams: '',
      accountType: 1,
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
      value: '',
      addEditVisible: false,
      studentInfo: {
        name: '',
        sex: '',
        age: '',
        phone: '',
        idCard: '',
        collegeId: '',
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCollegeList()
    this.getStudentList()
  },
  mounted() {},
  updated() {},
  methods: {
    searchUser() {},
    // 获取学院列表
    async getCollegeList() {
      const { data } = await collegeList()
      this.collegeList = data.data
    },
    async getStudentList() {
      const { data } = await studentsList(this.pagination)
      console.log(data)
      this.studentsList = data.data.result.map((x) => ({
        ...x,
      }))
      this.pagination = data.data.pagination
    },
    openAddEditDrawer() {
      this.addEditVisible = true
    },
    handleAddEdit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
