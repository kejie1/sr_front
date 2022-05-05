<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input
            placeholder="请输入班级名称"
            size="mini"
            v-model="searchParams"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button size="mini" type="primary" @click="searchClassList">搜索</el-button>
        </div>
        <div class="addBtn">
          <el-button type="primary" size="mini" @click="handleAddEdit"
            >添加班级</el-button
          >
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="classStr" label="班级名称"></el-table-column>
      <el-table-column prop="counselorId" label="负责人"></el-table-column>
      <el-table-column prop="vocationalId" label="所属专业"></el-table-column>
      <el-table-column prop="collegeId" label="所属学院"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="handleMoreInfo(scope.row)"
            >查看学生列表</el-button
          >
          <el-button
            type="warning"
            plain
            size="mini"
            @click="handleAddEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="mini"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationParams.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="paginationParams.pageSize"
      layout="->,total, sizes, prev, pager,next, jumper"
      :total="paginationParams.total || 0"
    ></el-pagination>
    <!-- 添加宿舍 -->
    <el-dialog
      :title="`${classInfo.id ? '编辑' : '添加'}班级`"
      :visible.sync="classVisible"
      width="40%"
      @close="handleCancel"
    >
      <el-form
        :model="classInfo"
        :rules="classInfoRules"
        ref="classInfo"
        label-width="100px"
      >
        <el-form-item required label="所属学院" prop="collegeId">
          <el-select
            v-model="classInfo.collegeId"
            placeholder="请选择学院"
            @change="getVocationalList"
          >
            <el-option
              v-for="item in collegeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="所属专业" prop="vocationalId">
          <el-select
            v-model="classInfo.vocationalId"
            placeholder="请选择专业"
            @change="getCounselorList"
          >
            <el-option
              v-for="item in vocationalList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级负责人" prop="counselorId">
          <el-select v-model="classInfo.counselorId" placeholder="请选择负责人">
            <el-option
              v-for="item in counselorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="classStr">
          <el-input v-model="classInfo.classStr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 宿舍详细信息 -->
    <el-dialog
      title="查看班级学生"
      :visible.sync="classMoreInfoVisible"
      width="50%"
    >
      <el-table :key="Math.random()" :data="moreInfoList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryCount,
  classList,
  addClass,
  deleteClass,
  updateClass,
  queryClassName,
  queryClassStrById,
} from "@/api/class";
import { collegeList } from "@/api/college";
import {
  queryVocationalById
} from "@/api/vocational";
import { queryByVocationalId, counselorList } from "@/api/counselor";
import { queryStudentsByClassId } from "@/api/students";
export default {
  data() {
    return {
      searchParams: "",
      tableData: "",
      accountType: "",
      classVisible: false,
      classInfo: {},
      collegeList: [],
      collegeStrList: JSON.parse(sessionStorage.getItem('collegeList')),
      classList: [],
      vocationalStrList: JSON.parse(sessionStorage.getItem('vocationalList')),
      vocationalList:[],
      counselorStrList:[],
      counselorList:[],
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      classInfoRules: {
        collegeId: [
          { required: true, message: "请选择学院", trigger: "change" },
        ],
        vocationalId: [
          { required: true, message: "请选择专业", trigger: "change" },
        ],
        classStr: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        counselorId: [
          { required: true, message: "请选择班级负责人", trigger: "change" },
        ],
      },
      classMoreInfoVisible: false,
      moreInfoList: [],
    };
  },
  computed: {},
  watch: {},
  async created() {
    await queryCount()
    await this.getCounselorStrList()
    await this.getClass();
  },
  mounted() {},
  updated() {},
  methods: {
    async getClass() {
      const { data: res } = await classList(this.paginationParams);
      if (res.code == 200) {
        let temp = res.data.result || [];
        for (let i = 0; i < temp.length; i++) {
          temp[i].collegeId = this.collegeStrList[temp[i].collegeId].collegeStr
          temp[i].vocationalId = this.vocationalStrList[temp[i].vocationalId].vocationalStr
          temp[i].counselorId = this.counselorStrList[temp[i].counselorId].name
        }
        this.tableData = temp;
      }
      this.paginationParams = res.data.pagination;
    },
    async getCounselorStrList(){
      const { data: res } = await counselorList({pageSize: 1000,currentPage: 1});
      this.counselorStrList = res.data.result
    },
    async getCollegeList() {
      const { data: res } = await collegeList();
      this.collegeList = res.data.result
        ? res.data.result.map((x) => ({
            ...x,
            label: x.collegeStr,
            value: x.id,
          }))
        : [];
    },
    async searchClassList() {
      if (this.searchParams == "") {
        this.getClass();
      } else {
        const { data: res } = await queryClassName({
        classStr: this.searchParams,pageSize: 10,currentPage: 1,
      });
      if (res.code == 200) this.tableData = res.data;
      }
    },
    async handleMoreInfo(row) {
      this.classMoreInfoVisible = true;
      const { data: res } = await queryStudentsByClassId({ classId: row.id });
      if (res.code == 200) this.moreInfoList = res.data;
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.classVisible = true;
      this.getCollegeList();
      if (row.id) {
        const { data: res } = await queryClassStrById({ id: row.id });
        if (res.code == 200) this.classInfo = res.data[0];
      }
    },
    async getVocationalList(row) {
      const { data: res } = await queryVocationalById({ collegeId: row });
      this.vocationalList = res.data
        ? res.data.map((x) => ({
            label: x.vocationalStr,
            value: x.id,
          }))
        : [];
    },
    async getCounselorList(row) {
      const { data: res } = await queryByVocationalId({ vocationalId: row });
      this.counselorList = res.data
        ? res.data.map((x) => ({
            label: x.name,
            value: x.id,
          }))
        : [];
    },
    handleCancel() {
      this.classInfo.id = null;
      this.$refs["classInfo"].resetFields();
      this.classVisible = false;
    },
    // 添加修改保存
    async submit() {
      if (this.classInfo.id) {
        console.log("res", this.classInfo);
        const { data: res } = await updateClass(this.classInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      } else {
        const { data: res } = await addClass(this.classInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      }
      this.handleCancel();
      this.getClass();
    },
    // 删除
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteClass({ id });
          this.$message({ message: data.msg, type: "success" });
          this.getClass();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.paginationParams.pageSize = val;
      this.getClass();
    },
    handleCurrentChange(val) {
      this.paginationParams.currentPage = val;
      this.getClass();
    },
  },
};
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
        display: flex;
        justify-content: space-around;
        .el-input {
          margin-left: 5px;
          width: 70%;
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
