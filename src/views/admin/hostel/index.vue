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
            >添加用户</el-button
          >
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
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="hostelSex" label="男女"></el-table-column>
      <el-table-column prop="hostelBuild" label="楼栋"></el-table-column>
      <el-table-column prop="hostelName" label="宿舍号"></el-table-column>

      <el-table-column label="操作" fixed="right">
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
    <!-- 添加修改用户 -->
    <!-- <el-dialog
      :title="`${userInfo.id ? '编辑' : '添加'}用户`"
      :visible.sync="userInfoVisible"
      width="40%"
    >
      <el-form
        :model="userInfo"
        :rules="userInfoRules"
        ref="userInfo"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { hostelList, queryHostelName } from "@/api/hostel";
export default {
  components: {},
  data() {
    return {
      searchParams: "",
      tableData: "",
      accountType: "",
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      userInfoRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "用户名长度为2~16的字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "用户名长度为6~16的字符",
            trigger: "blur",
          },
        ],
      },
      accountTypeEnum: [
        { value: 1, label: "超级管理员" },
        { value: 2, label: "普通用户" },
      ],
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.getHostelList();
  },
  mounted() {},
  updated() {},
  methods: {
    async getHostelList() {
      const { data: res } = await hostelList(this.paginationParams);
      this.tableData = res.data.result;
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
      this.tableData = res.data.result || [];
    },
    searchHostel() {
      if (this.searchParams == "") {
        this.debounce(this.getHostelList(this.paginationParams), 1500);
      } else {
        this.debounce(this.getDataByHostalName(), 1500);
      }
    },
    // 判断添加/修改
    handleAddEdit(row) {
      console.log(row);
    },

    handleCancel() {},
    // 添加修改保存
    async submit() {
      // this.userInfo.status ? 1 : 0;
      // if (this.userInfo.id) {
      //   const { data } = await updateUser(this.userInfo);
      //   this.$message({ message: data.msg, type: "success" });
      //   this.userInfoVisible = false;
      //   await this.getUserList();
      // } else {
      //   await addUser(this.userInfo);
      //   this.userInfoVisible = false;
      //   await this.getUserList();
      // }
      // this.userInfo.status = true;
      // this.$refs["userInfo"].resetFields();
    },
    async handleStatus(row, column) {
      // if (column.property === "status") {
      //   row.status ? 1 : 0;
      //   await updateUser(row);
      // }
      console.log(row, column);
    },
    async handleDelete(id) {
      // const { data } = await deleteUser({ id });
      // this.$message({ message: data.msg, type: "success" });
      // this.getUserList();
      console.log(id);
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
