<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input
            placeholder="请输入专业名称"
            v-model="searchParams"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="getVocationalName">搜索</el-button>
        </div>
        <div class="addBtn">
          <el-button type="success" @click="exportToExcel" size="mini"
            >导出为表格</el-button
          >
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="vocationalStr" label="专业名称"></el-table-column>
      <el-table-column prop="cost" label="费用(元)" type="number"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            type="warning"
            plain
            size="mini"
            @click="handleAddEdit(scope.row)"
            >编辑</el-button
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
    <!-- 设置费用 -->
    <el-dialog
      :title="'设置费用'"
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
        <el-form-item disabled label="专业名称" prop="vocationalStr">
          <el-input v-model="vocationalInfo.vocationalStr"></el-input>
        </el-form-item>
        <el-form-item label="费用(元)" prop="cost">
          <el-input v-model="vocationalInfo.cost" type="number"></el-input>
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
  vocationalList,
  updateVocational,
  queryVocationalName,
  queryVocationalStrById,
  queryCount
} from "@/api/vocational";
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
        cost: [
          { required: true, message: "请输入金额", trigger: "blur" },
        ],
      },
      moreInfoList: [],
    };
  },
  computed: {},
  watch: {},
  async created() {
    await queryCount();
    this.getVocationalList();
  },
  mounted() {},
  updated() {},
  methods: {
    async getVocationalList() {
      const { data: res } = await vocationalList(this.paginationParams);
      if (res.code == 200){
          this.tableData = res.data.result;
          this.paginationParams = res.data.pagination;
      } 
    },
    handleSizeChange(val) {
      this.paginationParams.pageSize = val;
      this.getVocationalList();
    },
    handleCurrentChange(val) {
      this.paginationParams.currentPage = val;
      this.getVocationalList();
    },
    async getVocationalName() {
      if(this.searchParams == ''){
          this.getVocationalList()
      }
      const { data: res } = await queryVocationalName({
        vocationalStr: this.searchParams,
        pageSize: 10,
        currentPage: 1,
      });
      if (res.code == 200) {
        this.tableData = res.data.result;
        this.paginationParams = res.data.pagination;
      }
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.vocationalVisible = true;
        const { data: res } = await queryVocationalStrById({ id: row.id });
        if (res.code == 200){
            this.vocationalInfo = res.data[0];
            
        } 
    },

    handleCancel() {
      this.vocationalInfo.id = null;
      this.$refs["vocationalInfo"].resetFields();
      this.vocationalVisible = false;
    },
    // 添加修改保存
    async submit() {
        console.log("res", this.vocationalInfo);
        const { data: res } = await updateVocational(this.vocationalInfo);
        if (res.code == 200)
          this.$message({ message: res.msg, type: "success" });

      this.handleCancel();
      this.getVocationalList();
    },
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel");
        const tHeader = [
          "id",
          "专业名称",
          "费用(元)",
        ];
        const filterVal = [
          "id",
          "vocationalStr",
          "cost",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "各专业学费信息表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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
        display: flex;
        .el-button {
          border-radius: 5px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
