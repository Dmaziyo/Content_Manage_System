<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="dialogFormVisible = true">添加用户</el-button>
      <el-dialog width="30%" title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <div class="form_item">
            <label for="url">用户名</label>
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </div>
          <div class="form_item">
            <label for="url">密码</label>
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="userList" border style="width: 80%">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column width="200" label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small">重置密码</el-button>
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
    this.getUserList()
  },
  data() {
    return {
      userList: [],
      dialogFormVisible: false,
      updateId: undefined,
      form: {
        username: '',
        password: ''
      },
      isEdit: false
    }
  },
  methods: {
    getUserList() {
      request.get(`/user`).then(res => {
        // console.log(res.data.data)
        this.userList = res.data.data
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
          .put(`/user/${this.updateId}`, {
            username: this.form.username,
            password: this.form.password
          })
          .then(() => {
            this.getUserList()
            this.cancel()
          })
      } else {
        request
          .post(`/user`, {
            username: this.form.username,
            password: this.form.password
          })
          .then(() => {
            this.getUserList()
            this.cancel()
          })
      }
    },
    update({ id, username, password }) {
      this.updateId = id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.username = username
      this.form.password = password
    },
    cancel() {
      this.dialogFormVisible = false
      this.form.username = ''
      this.form.password = ''
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