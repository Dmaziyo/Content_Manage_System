<template>
  <div class="md_box">
    <div>上传封面</div>
    <el-upload class="avatar-uploader" :action="getUploadUrl()" list-type="picture-card" :on-success="handleSuccess">
      <img v-if="img" :src="img" class="avatar" alt />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <div class="title">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div></div>
    <mavon-editor v-model="md_text" @change="textChange" />
    <el-button @click="save" type="success">保存</el-button>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  computed: {
    id() {
      return Number(this.$route.params.id)
    }
  },
  data() {
    return {
      dialogVisible: false,
      md_text: '',
      html_text: '',
      title: '',
      img: '',
      fileList: []
    }
  },
  created() {
    if (this.id) {
      request.get(`/blog/${this.id}`).then(res => {
        const data = res.data.data
        this.title = data.title
        this.img = data.img
        this.md_text = data.md_text
        this.html_text = data.html_text
        console.log(this.img)
        console.log(this.title)
      })
    }
  },
  methods: {
    handleSuccess(res) {
      const data = res.data
      this.img = data.file
    },
    getUploadUrl() {
      return process.env.VUE_APP_UPLOAD_API
    },
    textChange(md_html, render) {
      this.html_text = render
    },
    save() {
      if (this.id) {
        this.updateSection()
      } else {
        this.createSection()
      }
    },
    updateSection() {
      request
        .put(`/blog/${this.id}`, {
          md_text: this.md_text,
          html_text: this.html_text,
          title: this.title,
          img: this.img
        })
        .then(() => {
          this.$router.push(`/blog`)
        })
    },
    createSection() {
      console.log('')
      request
        .post(`/blog`, {
          md_text: this.md_text,
          html_text: this.html_text,
          title: this.title,
          img: this.img
        })
        .then(() => {
          this.$router.push(`/blog`)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.md_box {
  float: left;
  width: 80%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>