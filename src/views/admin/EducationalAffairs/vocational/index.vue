<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input
            placeholder="请输入专业名称"
            @input="searchVocationalList"
            v-model="searchParams"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn">
          <el-button type="primary" plain @click="handleAddEdit"
            >添加专业</el-button
          >
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="vocationalStr" label="专业名称"></el-table-column>
      <el-table-column prop="principal" label="专业负责人"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="handleMoreInfo(scope.row)"
            >查看班级列表</el-button
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
      :title="`${vocationalInfo.id ? '编辑' : '添加'}专业`"
      :visible.sync="vocationalVisible"
      width="40%"
      @close="handleCancel"
    >
      <el-form
        :model="vocationalInfo"
        :rules="vocationalInfoRules"
        ref="vocationalInfo"
        label-width="100px"
      >
        <el-form-item required label="专业名称" prop="vocationalStr">
          <el-input v-model="vocationalInfo.vocationalStr"></el-input>
        </el-form-item>
        <el-form-item required label="专业负责人" prop="principal">
          <el-input v-model="vocationalInfo.principal"></el-input>
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
      :visible.sync="vocationalMoreInfoVisible"
      width="30%"
    >
      <el-table :key="Math.random()" :data="moreInfoList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="classStr" label="专业"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  vocationalList,
  addVocational,
  deleteVocational,
  updateVocational,
  queryVocationalName,
  queryVocationalStrById,
} from "@/api/vocational";
import { queryVocationalById } from "@/api/class";
export default {
  components: {},
  data() {
    return {
      searchParams: "",
      tableData: "",
      accountType: "",
      vocationalVisible: false,
      vocationalInfo: {},
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      vocationalInfoRules: {
        vocationalStr: [
          { required: true, message: "请输入楼栋", trigger: "blur" },
        ],
        principal: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
        ],
      },
      vocationalMoreInfoVisible: false,
      moreInfoList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getVocational();
  },
  mounted() {},
  updated() {},
  methods: {
    async getVocational() {
      const { data: res } = await vocationalList(this.paginationParams);
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
    async getVocationalName() {
      const { data: res } = await queryVocationalName({
        vocationalStr: this.searchParams,
      });
      if (res.code == 200) this.tableData = res.data.result;
    },
    searchVocational() {
      if (this.searchParams == "") {
        this.debounce(this.getVocationalList(), 1500);
      } else {
        this.debounce(this.getVocationalName(), 1500);
      }
    },
    async handleMoreInfo(row) {
      this.vocationalMoreInfoVisible = true;
      const { data: res } = await queryVocationalById({ vocationalId: row.id });
      if (res.code == 200) this.moreInfoList = res.data;
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.vocationalVisible = true;
      if (row.id) {
        const { data: res } = await queryVocationalStrById({ id: row.id });
        if (res.code == 200) this.vocationalInfo = res.data[0];
      }
    },

    handleCancel() {
      this.vocationalInfo.id = null;
      this.$refs["vocationalInfo"].resetFields();
      this.vocationalVisible = false;
    },
    // 添加修改保存
    async submit() {
      if (this.vocationalInfo.id) {
        console.log("res", this.vocationalInfo);
        const { data: res } = await updateVocational(this.vocationalInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      } else {
        const { data: res } = await addVocational(this.vocationalInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });
      }
      this.handleCancel();
      this.getVocationalList();
    },
    // 删除
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteVocational({ id });
          this.$message({ message: data.msg, type: "success" });
          this.getVocationalList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
