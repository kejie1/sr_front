<template>
  <div class>
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn">
          <el-button type="primary" plain>添加用户</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="accountType" label="角色类型" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <el-table-column label="操作">
        <el-button type="warning" plain size="mini">编辑</el-button>
        <el-button type="danger" plain size="mini">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userList } from '../../../api/user'
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          id: 1,
          username: 1,
          email: 1,
          phone: 1,
          accountType: 1,
          status: 1,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserList() {
      const res = await userList()
      this.tableData = res.data
    },
  },
  created() {
    // this.getUserList()
  },
  mounted() {},
  updated() {},
}
</script>
<style lang='less' scoped>
.search_btn {
  width: 98%;
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
</style>