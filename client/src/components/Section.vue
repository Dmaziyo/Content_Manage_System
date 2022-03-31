<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="createSection">添加小节</el-button>
    </div>
    <el-table :data="SectionList" border style="width: 80%">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="title" label="节" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editSection(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteSection(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  created() {
    this.getSectionList()
  },
  computed: {
    // 返回路由传递的参数
    chapter_id() {
      return this.$route.query.chapter_id
    }
  },
  data() {
    return {
      SectionList: []
    }
  },
  methods: {
    getSectionList() {
      request.get(`/section?chapter_id=${this.chapter_id}`).then(res => {
        this.SectionList = res.data.data
      })
    },
    createSection() {
      this.$router.push(`/createSection?chapter_id=${this.chapter_id}`)
    },
    editSection({ id }) {
      this.$router.push(`/section/${id}?chapter_id=${this.chapter_id}`)
    },
    deleteSection({ id }) {
      request.delete(`/section/${id}`).then(() => {
        this.getSectionList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
</style>