<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="dialogFormVisible = true">添加资源</el-button>
      <el-dialog width="30%" title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <div class="form_item">
            <label for="resource_name">资源名称</label>
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </div>

          <div class="form_item">
            <label for="url">资源地址</label>
            <el-input v-model="form.url" autocomplete="off"></el-input>
          </div>
          <div class="form_item">
            <label for="url">提取码</label>
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="bookList" border style="width: 80%">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="title" label="资源名称" width="120"></el-table-column>
      <el-table-column prop="code" label="提取码" width="300"></el-table-column>
      <el-table-column prop="url" label="下载地址"></el-table-column>
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
    this.getResourceList()
  },
  data() {
    return {
      bookList: [],
      dialogFormVisible: false,
      updateId: undefined,
      form: {
        title: '',
        code: '',
        url: ''
      },
      isEdit: false
    }
  },
  methods: {
    getResourceList() {
      request.get(`/resource`).then(res => {
        // console.log(res.data.data)
        this.bookList = res.data.data
      })
    },
    handleSuccess(response) {
      // console.log(file)
      // console.log(fileList)
      this.form.dialogImageUrl = response.data.file
    },
    // 保存资源
    save() {
      if (this.isEdit) {
        console.log(this.form)
        request
          .put(`/resource/${this.updateId}`, {
            title: this.form.title,
            code: this.form.code,
            url: this.form.url
          })
          .then(() => {
            this.getResourceList()
            this.dialogFormVisible = false
            ;(this.form.title = ''), (this.form.code = ''), (this.form.url = '')
            this.isEdit = false
          })
      } else {
        request
          .post(`/resource`, {
            title: this.form.title,
            code: this.form.code,
            url: this.form.url
          })
          .then(() => {
            this.getResourceList()
            this.dialogFormVisible = false
            ;(this.form.title = ''), (this.form.code = ''), (this.form.url = '')
          })
      }
    },
    update({ id, title, url, code }) {
      this.updateId = id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.title = title
      this.form.url = url
      this.form.code = code
    },
    cancel() {
      this.dialogFormVisible = false
      ;(this.form.title = ''), (this.form.code = ''), (this.form.url = '')
      this.isEdit = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
.form_item {
  margin-bottom: 30px;
}
</style>