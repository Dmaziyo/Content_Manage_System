<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="dialogFormVisible = true">添加视频</el-button>
      <el-dialog width="30%" title="添加" :visible.sync="dialogFormVisible">
        <h5>上传封面:</h5>
        <el-upload :action="getUploadUrl()" list-type="picture-card" :on-success="handleSuccess" :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form :model="form">
          <el-dialog :visible.sync="dialogImageVisible">
            <img width="100%" :src="form.img" alt />
          </el-dialog>

          <div class="form_item">
            <label for="title">视频标题</label>
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </div>

          <div class="form_item">
            <label for="orderby">视频地址</label>
            <el-input v-model="form.iframe_url" autocomplete="off"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="videoList" border style="width: 80%">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">
          <label for>{{scope.$index+1}}</label>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面" width="450"></el-table-column>
      <el-table-column prop="title" label="视频标题" width="300"></el-table-column>
      <el-table-column prop="address" label="详情" width="100">
        <template slot-scope="scope">
          <el-button @click="browseVideo(scope.row)" type="text" size="small">浏览视频</el-button>
          <el-dialog width="800" title="视频浏览" :visible.sync="videoDialogVisible">
            <div v-html="cur_iframe_url" class="videoBrowse"></div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteVideo(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  created() {
    this.getVideoList()
  },
  data() {
    return {
      videoList: [],
      dialogFormVisible: false,
      videoDialogVisible: false,
      dialogImageVisible: false,
      updateId: undefined,
      fileList: [],
      form: {
        title: '',
        img: '',
        iframe_url: ''
      },
      cur_iframe_url: '',
      isEdit: false
    }
  },
  methods: {
    // 返回要上传的URL
    getUploadUrl() {
      return process.env.VUE_APP_UPLOAD_API
    },
    getVideoList() {
      request.get(`/video`).then(res => {
        // console.log(res.data.data)
        this.videoList = res.data.data
      })
    },
    handleSuccess(response) {
      // console.log(file)
      // console.log(fileList)
      this.form.img = response.data.file
    },
    // 浏览视频
    browseVideo({ iframe_url }) {
      this.videoDialogVisible = true
      this.cur_iframe_url = iframe_url
    },
    // 保存书籍
    save() {
      if (this.isEdit) {
        console.log(this.form)
        request
          .put(`/video/${this.updateId}`, {
            title: this.form.title,
            iframe_url: this.form.iframe_url,
            img: this.form.img
          })
          .then(() => {
            this.getVideoList()
            this.dialogFormVisible = false
            ;(this.form.title = ''), (this.form.img = ''), (this.form.iframe_url = '')
            this.isEdit = false
          })
      } else {
        request
          .post(`/video`, {
            title: this.form.title,
            iframe_url: this.form.iframe_url,
            img: this.form.img
          })
          .then(() => {
            this.getVideoList()
            this.dialogFormVisible = false
            ;(this.form.title = ''), (this.form.img = ''), (this.form.iframe_url = '')
          })
      }
    },
    update({ id, title, img, iframe_url }) {
      this.updateId = id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.title = title
      this.form.img = img
      this.form.iframe_url = iframe_url
      this.fileList = [{ url: this.img }]
    },
    cancel() {
      this.dialogFormVisible = false
      ;(this.form.title = ''), (this.form.img = ''), (this.form.iframe_url = '')
      this.isEdit = false
    },
    // 删除视频
    deleteVideo({ id }) {
      request.delete(`/video/${id}`).then(() => {
        this.getVideoList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
.videoBrowse {
  height: 500px;
  width: 100%;
}
/deep/.videoBrowse iframe {
  height: 100%;
  width: 100%;
}
</style>