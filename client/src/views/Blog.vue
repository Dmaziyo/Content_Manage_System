<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="createBlog">新建博客</el-button>
    </div>
    <el-table :data="blogList" border style="width: 80%">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="img" label="封面" width="450"></el-table-column>
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  created() {
    this.getBlogList()
  },
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    // 通过Vue的路由传递参数
    getBlogList() {
      request.get(`/blog`).then(res => {
        // console.log(res.data.data)
        this.blogList = res.data.data
      })
    },
    update({ id }) {
      this.$router.push(`/blogDetail/${id}`)
    },
    createBlog() {
      this.$router.push(`/createBlog`)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
</style>