<template>
  <div class="userContainer">
    <div class="search_btn">
      <div class="search_btn_container">
        <div class="search">
          <el-input placeholder="请输入学院名称" @input="searchCollegeList" v-model="searchParams">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn">
          <el-button type="primary" plain @click="handleAddEdit">添加学院</el-button>
        </div>
      </div>
    </div>
    <el-table :key="Math.random()" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="collegeStr" label="学院名称"></el-table-column>
      <el-table-column prop="principal" label="学院负责人"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleMoreInfo(scope.row)">查看专业列表</el-button>
          <el-button type="warning" plain size="mini" @click="handleAddEdit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加学院 -->
    <el-dialog
      :title="`${collegeInfo.id ? '编辑' : '添加'}学院`"
      :visible.sync="hostelVisible"
      width="40%"
      @close="handleCancel"
    >
      <el-form :model="collegeInfo" :rules="collegeInfoRules" ref="collegeInfo" label-width="100px">
        <el-form-item required label="学院名称" prop="collegeStr">
          <el-input v-model="collegeInfo.collegeStr"></el-input>
        </el-form-item>
        <el-form-item required label="学院负责人" prop="principal">
          <el-input v-model="collegeInfo.principal"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 学院详细信息 -->
    <el-dialog title="学院详细信息" :visible.sync="hostelMoreInfoVisible" width="30%">
      <el-table :key="Math.random()" :data="moreInfoList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="vocationalStr" label="专业"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  collegeList,
  addCollege,
  deleteCollege,
  updateCollege,
  queryCollegeById,
  queryCollegeName,
} from '@/api/college'
import { queryVocationalById } from '@/api/vocational'
export default {
  components: {},
  data() {
    return {
      searchParams: '',
      tableData: '',
      accountType: '',
      hostelVisible: false,
      collegeInfo: {},
      paginationParams: {
        pageSize: 10,
        currentPage: 1,
      },
      collegeInfoRules: {
        collegeStr: [
          { required: true, message: '请输入楼栋', trigger: 'blur' },
        ],
        principal: [
          { required: true, message: '请输入学院号', trigger: 'blur' },
        ],
      },
      hostelMoreInfoVisible: false,
      moreInfoList: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCollegeList()
  },
  mounted() {},
  updated() {},
  methods: {
    async getCollegeList() {
      const { data: res } = await collegeList(this.paginationParams)
      if (res.code == 200) this.tableData = res.data.result
    },
    // 防抖todo
    debounce(fn, delay) {
      let timer = null //借助闭包
      return (function () {
        if (timer) {
          clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
          timer = setTimeout(fn, delay)
        } else {
          timer = setTimeout(fn, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
        }
      })()
    },
    async getCollegeName() {
      const { data: res } = await queryCollegeName({
        collegeStr: this.searchParams,
      })
      if (res.code == 200) this.tableData = res.data.result
    },
    searchCollegeList() {
      if (this.searchParams == '') {
        this.debounce(this.getCollegeList(), 1500)
      } else {
        this.debounce(this.getCollegeName(), 1500)
      }
    },
    async handleMoreInfo(row) {
      this.hostelMoreInfoVisible = true
      const { data: res } = await queryVocationalById({ collegeId: row.id })
      if (res.code == 200) this.moreInfoList = res.data
    },
    // 判断添加/修改
    async handleAddEdit(row) {
      this.hostelVisible = true
      if (row.id) {
        const { data: res } = await queryCollegeById({ id: row.id })
        if (res.code == 200) this.collegeInfo = res.data[0]
      }
    },

    handleCancel() {
      this.collegeInfo.id = null
      this.$refs['collegeInfo'].resetFields()
      this.hostelVisible = false
    },
    // 添加修改保存
    async submit() {
      if (this.collegeInfo.id) {
        console.log('res', this.collegeInfo)
        const { data: res } = await updateCollege(this.collegeInfo)
        if (res.code == 200)
          this.$message({ message: res.msg, type: 'success' })
      } else {
        const { data: res } = await addCollege(this.collegeInfo)
        if (res.code == 200)
          this.$message({ message: res.msg, type: 'success' })
      }
      this.handleCancel()
      this.getCollegeList()
    },
    // 删除
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data } = await deleteCollege({ id })
          this.$message({ message: data.msg, type: 'success' })
          this.getCollegeList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
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
