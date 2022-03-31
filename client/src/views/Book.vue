<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="dialogFormVisible = true">添加书籍</el-button>
      <el-dialog width="30%" title="添加" :visible.sync="dialogFormVisible">
        <h5>上传封面:</h5>
        <el-upload :action="getUploadUrl()" list-type="picture-card" :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form :model="form">
          <el-dialog :visible.sync="dialogImageVisible">
            <img width="100%" :src="form.dialogImageUrl" alt />
          </el-dialog>

          <div class="form_item">
            <label for="book_name">书籍名称</label>
            <el-input v-model="form.book_name" autocomplete="off"></el-input>
          </div>

          <div class="form_item">
            <label for="orderby">排序权重</label>
            <el-input v-model="form.book_order" autocomplete="off"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="bookList" border style="width: 80%">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">
          <label for>{{scope.$index+1}}</label>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面" width="450"></el-table-column>
      <el-table-column prop="title" label="书名" width="300"></el-table-column>
      <el-table-column prop="address" label="详情" width="100">
        <template slot-scope="scope">
          <el-button @click="getChapterDetail(scope.row.id)" type="text" size="small">查看章</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  created() {
    this.getBookList()
  },
  data() {
    return {
      bookList: [],
      dialogFormVisible: false,
      dialogImageVisible: false,
      updateId: undefined,
      fileList: [],
      form: {
        book_name: '',
        book_order: '',
        dialogImageUrl: ''
      },
      isEdit: false
    }
  },
  methods: {
    // 通过Vue的路由传递参数
    getChapterDetail(id) {
      this.$router.push(`/chapter?book_id=${id}`)
    },
    // 返回要上传的URL
    getUploadUrl() {
      return process.env.VUE_APP_UPLOAD_API
    },
    getBookList() {
      request.get(`/book`).then(res => {
        // console.log(res.data.data)
        this.bookList = res.data.data
      })
    },
    handleSuccess(response) {
      // console.log(file)
      // console.log(fileList)
      this.form.dialogImageUrl = response.data.file
    },
    // 保存书籍
    save() {
      if (this.isEdit) {
        console.log(this.form)
        request
          .put(`/book/${this.updateId}`, {
            title: this.form.book_name,
            orderby: this.form.book_order,
            img: this.form.dialogImageUrl
          })
          .then(() => {
            this.getBookList()
            this.dialogFormVisible = false
            ;(this.form.book_name = ''), (this.form.book_order = ''), (this.form.dialogImageUrl = '')
            this.isEdit = false
          })
      } else {
        request
          .post(`/book`, {
            title: this.form.book_name,
            orderby: this.form.book_order,
            img: this.form.dialogImageUrl
          })
          .then(() => {
            this.getBookList()
            this.dialogFormVisible = false
            ;(this.form.book_name = ''), (this.form.book_order = ''), (this.form.dialogImageUrl = '')
          })
      }
    },
    // 更新
    update({ id, title, img, orderby }) {
      this.updateId = id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.book_name = title
      this.form.dialogImageUrl = img
      this.form.book_order = orderby
      this.fileList = [{ url: this.img }]
    },
    // 删除
    deleteBook({ id }) {
      request.delete(`/book/${id}`).then(() => {
        this.getBookList()
      })
    },
    cancel() {
      this.dialogFormVisible = false
      ;(this.form.book_name = ''), (this.form.book_order = ''), (this.form.dialogImageUrl = '')
      this.isEdit = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
</style>