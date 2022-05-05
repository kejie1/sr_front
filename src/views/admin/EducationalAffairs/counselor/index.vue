<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input
            placeholder="请输入教师名称"
            v-model="searchParams"
            size="mini"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
           <el-button size="mini" type="primary" @click="searchVocationalList">搜索</el-button>
        </div>
        <div class="addBtn">
          <el-button type="primary" size="mini" @click="handleAddEdit"
            >添加教师</el-button
          >
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="collegeId" label="所属学院"></el-table-column>
      <el-table-column prop="vocationalId" label="所属专业"></el-table-column>
      <el-table-column prop="classId" label="负责班级"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
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
      :title="`${counselorInfo.id ? '编辑' : '添加'}教师`"
      :visible.sync="counselorVisible"
      width="40%"
      @close="handleCancel"
    >
      <el-form
        :model="counselorInfo"
        :rules="counselorInfoRules"
        ref="counselorInfo"
        label-width="100px"
      >
        <el-form-item required label="姓名" prop="name">
          <el-input v-model="counselorInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="电话" prop="phone">
          <el-input v-model="counselorInfo.phone"></el-input>
        </el-form-item>
        <el-form-item required label="所属学院" prop="collegeId">
          <el-select
            clearable
            v-model="counselorInfo.collegeId"
            placeholder="请选择学院"
            @change="getVocationalList"
          >
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeStr"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业" prop="vocationalId">
          <el-select
            clearable
            v-model="counselorInfo.vocationalId"
            placeholder="不负责专业则无需选取"
            @change="getClassList"
          >
            <el-option
              v-for="item in vocationalList"
              :key="item.id"
              :label="item.vocationalStr"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级" prop="classId">
          <el-select
            clearable
            v-model="counselorInfo.classId"
            placeholder="不负责班级则无需选取"
            @change="getCounselorList"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.classStr"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  counselorList,
  queryCount,
  queryPhoneByName,
  addCounselor,
  deleteCounselor,
  updateCounselor,
} from "@/api/counselor";
import { queryVocationalById } from "@/api/vocational";
import { queryClassStrById } from "@/api/class";
export default {
  components: {},
  data() {
    return {
      searchParams: "",
      tableData: "",
      accountType: "",
      counselorVisible: false,
      counselorInfo: {},
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      counselorInfoRules: {
        vocationalStr: [
          { required: true, message: "请输入楼栋", trigger: "blur" },
        ],
        principal: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
        ],
      },
      collegeList: JSON.parse(sessionStorage.getItem('collegeList')),
      classList: JSON.parse(sessionStorage.getItem('classList')),
      vocationalList: JSON.parse(sessionStorage.getItem('vocationalList')),
    };
  },
  computed: {},
  async created() {
    await queryCount();
    await this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      if (
        this.collegeList != [] &&
        this.vocationalList != [] &&
        this.classList != []
      ) {
        this.getCounselorList();
      }
    },
    async getCounselorList() {
      const { data: res } = await counselorList(this.paginationParams);
      if (res.code == 200) {
        this.tableData = res.data.result
          ? res.data.result.map((x) => ({
              ...x,
              collegeId: this.collegeList[x.collegeId].collegeStr || "暂无",
              vocationalId: this.vocationalList[x.vocationalId].vocationalStr
                ? this.vocationalList[x.vocationalId].vocationalStr
                : "暂无",
              classId: !this.classList[x.classId].classStr
                ? "暂无"
                : this.classList[x.classId].classStr,
            }))
          : [];
        this.paginationParams = res.data.pagination;
      }
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
    async getVocationalName() {
      const { data: res } = await queryVocationalName({
        vocationalStr: this.searchParams,
      });
      if (res.code == 200) this.tableData = res.data.result;
    },
    searchVocationalList() {
      if (this.searchParams == "") {
        this.debounce(this.getCounselorList(), 1500);
      } else {
        this.debounce(this.getVocationalName(), 1500);
      }
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.counselorVisible = true;
      if (row.id) {
        const { data: res } = await queryPhoneByName({ id: row.id });
        if (res.code == 200) this.counselorInfo = res.data[0];
      }
    },

    handleCancel() {
      this.counselorInfo.id = null;
      this.$refs["counselorInfo"].resetFields();
      this.counselorVisible = false;
    },
    // 添加修改保存
    async submit() {
      if (this.counselorInfo.id) {
        console.log("res", this.counselorInfo);
        const { data: res } = await updateCounselor(this.counselorInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      } else {
        const { data: res } = await addCounselor(this.counselorInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      }
      this.handleCancel();
      this.getCounselorList();
    },
    // 删除
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteCounselor({ id });
          this.$message({ message: data.msg, type: "success" });
          this.getCounselorList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getVocationalList(row) {
      const { data: res } = await queryVocationalById({ collegeId: row });
      this.vocationalList = res.data ? res.data : [];
    },
    async getClassList(row) {
      const { data: res } = await queryClassStrById({ id: row });
      this.classList = res.data ? res.data : [];
    },
    // 分页
    handleSizeChange(val) {
      this.paginationParams.pageSize = val;
      this.getCounselorList();
    },
    handleCurrentChange(val) {
      this.paginationParams.currentPage = val;
      this.getCounselorList();
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
