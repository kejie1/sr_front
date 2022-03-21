<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input
            placeholder="请输入宿舍号"
            @input="searchHostel"
            v-model="searchParams"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn">
          <el-button type="primary" plain @click="handleAddEdit"
            >添加宿舍</el-button
          >
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="hostelSex" label="分类">
        <template slot-scope="scope">{{
          scope.row.hostelSex == 1 ? "男" : "女"
        }}</template>
      </el-table-column>
      <el-table-column prop="hostelBuild" label="楼栋"></el-table-column>
      <el-table-column prop="hostelName" label="宿舍号"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="handleMoreInfo(scope.row)"
            >查看宿舍人数</el-button
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
    <!-- 添加宿舍 -->
    <el-dialog
      :title="`${hostelInfo.id ? '编辑' : '添加'}用户`"
      :visible.sync="hostelVisible"
      width="40%"
      @close="handleCancel"
    >
      <el-form
        :model="hostelInfo"
        :rules="hostelfoRules"
        ref="hostelInfo"
        label-width="100px"
      >
        <el-form-item label="分类" prop="hostelSex">
          <el-radio v-model="hostelInfo.hostelSex" :label="1">男</el-radio>
          <el-radio v-model="hostelInfo.hostelSex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="楼栋" prop="hostelBuild">
          <el-input type="number" v-model="hostelInfo.hostelBuild"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="hostelName">
          <el-input v-model="hostelInfo.hostelName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 宿舍详细信息 -->
    <el-dialog
      title="宿舍详细信息"
      :visible.sync="hostelMoreInfoVisible"
      width="50%"
    >
      <el-table
        :key="Math.random()"
        :data="moreInfoList"
        stripe
        style="width: 100%"
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="collegeId" label="学院"></el-table-column>
        <el-table-column prop="vocationalId" label="专业"></el-table-column>
        <el-table-column prop="classId" label="班级"></el-table-column>
        <el-table-column prop="counselorId" label="辅导员"></el-table-column>
        <el-table-column
          prop="counselorPhone"
          label="辅导员电话"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  hostelList,
  queryHostelName,
  queryById,
  addHostel,
  updateHostel,
  deleteHostel,
} from "@/api/hostel";
import { queryByHostel } from "@/api/students";
import { collegeList, queryCollegeStrById } from "@/api/college";
import { queryVocationalStrById } from "@/api/vocational";
import { queryClassStrById } from "@/api/class";
import { queryPhoneByName } from "@/api/counselor";
export default {
  components: {},
  data() {
    return {
      searchParams: "",
      tableData: "",
      accountType: "",
      hostelVisible: false,
      hostelInfo: {},
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      hostelfoRules: {
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        hostelBuild: [
          { required: true, message: "请输入楼栋", trigger: "blur" },
        ],
        hostelName: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
        ],
      },
      hostelMoreInfoVisible: false,
      moreInfoList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getHostelList(this.paginationParams);
  },
  mounted() {},
  updated() {},
  methods: {
    async getHostelList() {
      const { data: res } = await hostelList(this.paginationParams);
      if (res.code == 200) this.tableData = res.data.result;
    },

    // 防抖todo
    debounce(fn, delay) {
      let timer = null; //借助闭包
      return (function () {
        if (timer) {
          clearTimeout(timer); //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
          timer = setTimeout(fn, delay);
        } else {
          timer = setTimeout(fn, delay); // 进入该分支说明当前并没有在计时，那么就开始一个计时
        }
      })();
    },
    async getDataByHostalName() {
      const { data: res } = await queryHostelName({
        hostelName: this.searchParams,
      });
      if (res.code == 200) this.tableData = res.data.result;
    },
    searchHostel() {
      if (this.searchParams == "") {
        this.debounce(this.getHostelList(this.paginationParams), 1500);
      } else {
        this.debounce(this.getDataByHostalName(), 1500);
      }
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.hostelVisible = true;
      if (row.id) {
        const { data: res } = await queryById({ id: row.id });
        if (res.code == 200) this.hostelInfo = res.data[0];
      }
    },

    handleCancel() {
      this.hostelInfo.id = null;
      this.$refs["hostelInfo"].resetFields();
      this.hostelVisible = false;
    },
    // 添加修改保存
    async submit() {
      this.hostelInfo.hostelBuild = parseInt(this.hostelInfo.hostelBuild);
      if (this.hostelInfo.id) {
        const { data: res } = await updateHostel(this.hostelInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      } else {
        const { data: res } = await addHostel(this.hostelInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      }
      this.handleCancel();
      this.getHostelList(this.paginationParams);
    },
    // 删除
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteHostel({ id });
          this.$message({ message: data.msg, type: "success" });
          this.getHostelList(this.paginationParams);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handleMoreInfo(row) {
      this.hostelMoreInfoVisible = true;
      const { data: res } = await queryByHostel({ hostelId: row.id });
      if (res.code == 200) {
        let temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].collegeId = await this.getCollegeStr(temp[i].collegeId);
          temp[i].vocationalId = await this.getVocationalStr(
            temp[i].vocationalId
          );
          temp[i].classId = await this.getClassStr(temp[i].classId);
          temp[i].counselorId = await this.getCounselorName(
            temp[i].counselorId
          );
        }
        this.moreInfoList = temp;
      }
    },
    async getCollegeList() {
      const { data: res } = await collegeList();
      this.collegeList = res.data.map((x) => ({
        ...x,
        label: x.collegeStr,
        value: x.id,
      }));
    },
    // 学生详细信息
    async getCollegeStr(param) {
      const params = { id: param };
      const { data: res } = await queryCollegeStrById(params);
      return res.data[0].collegeStr;
    },
    async getVocationalStr(param) {
      const params = { id: param };
      const { data: res } = await queryVocationalStrById(params);
      return res.data[0].vocationalStr;
    },
    async getClassStr(param) {
      const params = { id: param };
      const { data: res } = await queryClassStrById(params);
      return res.data[0].classStr;
    },
    async getCounselorName(val) {
      const params = { id: val };
      const { data: res } = await queryPhoneByName(params);
      return res.data[0].name;
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
