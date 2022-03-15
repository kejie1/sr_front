<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入姓名" @input="searchUser" v-model="searchParams">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select placeholder="请选择学院" v-model="collegeValue">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select placeholder="请选择专业" v-model="vocationalValue">
            <el-option
              v-for="item in vocationalList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            :disabled="accountType == 1 ? false : true"
            size="mini"
            @click="handleSearch"
          >搜索</el-button>
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
      <el-table-column prop="studentId" label="学号" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="idCard" label="身份证号码" width="180"></el-table-column>
      <el-table-column prop="collegeId" label="学院"></el-table-column>
      <el-table-column prop="vocationalId" label="专业"></el-table-column>
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
          <el-button type="warning" plain size="mini" @click="openAddEditDrawer(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <!-- 编辑 -->
    <el-drawer
      :title="`${studentTitle}学生信息`"
      @closed="handleClose"
      :visible.sync="addEditVisible"
      size="40%"
    >
      <el-form :model="studentInfo" :rules="studentInfoRules" ref="studentInfo" label-width="100px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="studentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="studentInfo.studentId"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio v-model="studentInfo.sex" label="1">男</el-radio>
          <el-radio v-model="studentInfo.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model="studentInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="studentInfo.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码:" prop="idCard">
          <el-input v-model="studentInfo.idCard" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="collegeId">
          <el-select v-model="studentInfo.collegeId" placeholder="请选择">
            <el-option
              v-for="item in collegeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业" prop="vocationalId">
          <el-select v-model="studentInfo.vocationalId" placeholder="请选择">
            <el-option
              v-for="item in vocationalList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" prop="classId">
          <el-select v-model="studentInfo.classId" placeholder="请选择">
            <el-option
              v-for="item in classList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍:" prop="hostelId">
          <el-input v-model="studentInfo.hostelId"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="ethnic">
          <el-select v-model="studentInfo.ethnic" placeholder="请选择">
            <el-option
              v-for="item in nationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生源地:" prop="birthPlace">
          <el-input v-model="studentInfo.birthPlace"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址:" prop="address">
          <el-input v-model="studentInfo.address" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校:" prop="graduate">
          <el-input v-model="studentInfo.graduate"></el-input>
        </el-form-item>
        <el-form-item label="辅导员姓名:" prop="counselorId">
          <el-select
            v-model="studentInfo.counselorId"
            placeholder="请选择"
            @change="getCounselorPhone"
          >
            <el-option
              v-for="item in counselorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辅导员电话:" prop="counselorPhone">
          <el-input v-model="phone" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddEdit">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  studentsList,
  searchStudents,
  addStudentInfo,
  queryById,
  updateStudentInfo,
} from '@/api/students'
import { collegeList, queryCollegeStrById } from '@/api/college'
import { vocationalList, queryVocationalStrById } from '@/api/vocational'
import { counselorList, queryPhoneByName } from '@/api/counselor'
import { classList, queryClassStrById } from '@/api/class'
import { nationList } from '@/util/Enum'
export default {
  components: {},
  data() {
    return {
      studentsList: [],
      collegeList: [],
      classList: [],
      vocationalList: [],
      counselorList: [],
      phone: '',
      searchParams: '',
      accountType: 1,
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
      collegeValue: '',
      vocationalValue: '',
      addEditVisible: false,
      studentInfo: {
        name: '',
        sex: '',
        age: '',
        phone: '',
        idCard: '',
        collegeId: '',
        counselorId: '',
      },
      nationList,
      studentInfoRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '姓名长度为2~8', trigger: 'blur' },
        ],
        studentId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { max: 11, message: '请输入长度为11的手机号码', trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { max: 18, message: '请输入长度为18的身份证号码', trigger: 'blur' },
        ],
        collegeId: [
          { required: true, message: '请选择学院', trigger: 'change' },
        ],
        vocationalId: [
          { required: true, message: '请选择专业', trigger: 'change' },
        ],
        classId: [{ required: true, message: '请选择班级', trigger: 'change' }],
        hostelId: [
          { required: true, message: '请输入宿舍号', trigger: 'blur' },
        ],
        ethnic: [{ required: true, message: '请选择民族', trigger: 'change' }],
        birthPlace: [
          { required: true, message: '请输入生源地', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入家庭住址', trigger: 'blur' },
        ],
        graduate: [
          { required: true, message: '请输入毕业院校', trigger: 'blur' },
        ],
        counselorId: [
          { required: true, message: '请选择辅导员', trigger: 'change' },
        ],
      },
      studentTitle: '',
      rowInfo: null,
      ethnicStr: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCollegeList()
    this.getVocational()
    this.getClassList()
    this.getStudentList()
    this.getCounselorList()
  },
  mounted() {},
  updated() {},
  methods: {
    searchUser() {},
    // 获取学院列表
    async getCollegeList() {
      const { data: res } = await collegeList()
      this.collegeList = res.data.map((x) => ({
        ...x,
        label: x.collegeStr,
        value: x.id,
      }))
    },
    // 获取班级列表
    async getClassList() {
      const { data: res } = await classList()
      this.classList = res.data.map((x) => ({
        ...x,
        label: x.classStr,
        value: x.id,
      }))
    },
    // 获取专业列表
    async getVocational() {
      const { data: res } = await vocationalList()
      this.vocationalList = res.data.map((x) => ({
        ...x,
        label: x.vocationalStr,
        value: x.id,
      }))
    },
    // 教师信息
    async getCounselorList() {
      const params = {
        pageSize: 10,
        currentPage: 1,
      }
      const { data: res } = await counselorList(params)
      this.counselorList = res.data.result
    },
    async getCounselorPhone(val) {
      const params = { id: val }
      const { data } = await queryPhoneByName(params)
      this.phone = data.data[0].phone
    },
    async getCounselorName(val) {
      const params = { id: val }
      const { data: res } = await queryPhoneByName(params)
      return res.data[0].name
    },
    // 学生信息
    async getStudentList() {
      const { data: res } = await studentsList(this.pagination)
      let temp = res.data.result || []
      for (let i = 0; i < temp.length; i++) {
        temp[i].ethnic = nationList[temp[i].ethnic].label
        temp[i].collegeId = await this.getCollegeStr(temp[i].collegeId)
        temp[i].vocationalId = await this.getVocationalStr(temp[i].vocationalId)
        temp[i].classId = await this.getClassStr(temp[i].classId)
        temp[i].counselorId = await this.getCounselorName(temp[i].counselorId)
        temp[i].sex = temp[i].sex == 1 ? '男' : '女'
      }
      this.studentsList = temp
      this.pagination = res.data.pagination
    },
    // 学生详细信息
    async getCollegeStr(param) {
      const params = { id: param }
      const { data: res } = await queryCollegeStrById(params)
      return res.data[0].collegeStr
    },
    async getVocationalStr(param) {
      const params = { id: param }
      const { data: res } = await queryVocationalStrById(params)
      return res.data[0].vocationalStr
    },
    async getClassStr(param) {
      const params = { id: param }
      const { data: res } = await queryClassStrById(params)
      return res.data[0].classStr
    },

    // 处理搜索
    async handleSearch() {
      const params = {
        name: this.searchParams,
        collegeId: this.collegeValue,
        vocationalId: this.vocationalValue,
      }
      const { data } = await searchStudents(params)
      this.studentsList = data.data
    },
    // 打开编辑弹框
    async openAddEditDrawer(row) {
      this.studentTitle = '添加'
      if (row.id) {
        this.rowInfo = row
        this.studentTitle = '编辑'
        const { data: res } = await queryById({ id: row.id })
        if (res.code == 200)
          this.studentInfo = {
            ...res.data[0],
            sex: res.data[0].sex + '',
          }
        ;(this.ethnicStr = nationList[res.data[0].ethnic].label),
          await this.getCounselorPhone(res.data[0].counselorId)
      }
      this.addEditVisible = true
    },
    // 处理添加修改
    async handleAddEdit() {
      const params = {
        ...this.studentInfo,
        sex: parseInt(this.studentInfo.sex),
        hostelId: parseInt(this.studentInfo.hostelId),
        counselorPhone: this.phone,
      }
      if (this.rowInfo) {
        // 修改
        params.id = this.rowInfo.id
        const { data } = await updateStudentInfo(params)
        if (data.code == 200)
          this.$message({ type: 'success', message: data.msg })
      } else {
        // 添加
        const { data } = await addStudentInfo(params)
        if (data.code == 200) {
          this.$message({ message: data.msg, type: 'success' })
        }
      }
      this.handleCancel()
      this.getStudentList()
    },
    handleClose() {
      this.rowInfo = null
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleCancel() {
      this.$refs['studentInfo'].resetFields()
      this.addEditVisible = false
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
