<template>
  <div class="md_box">
    <div class="title">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div>
      <el-input v-model="orderby" placeholder="请输入排序权重"></el-input>
    </div>
    <mavon-editor v-model="md_text" @change="textChange" />
    <el-button @click="save" type="success">保存</el-button>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      md_text: '',
      html_text: '',
      title: '',
      orderby: ''
    }
  },
  methods: {
    textChange(value, render) {
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
        .put(`/section/${this.id}`, {
          md_text: this.md_text,
          html_text: this.html_text,
          title: this.title,
          orderby: this.orderby
        })
        .then(() => {
          this.$router.push(`/section/?chapter_id=${this.chapter_id}}`)
        })
    },
    createSection() {
      request
        .post(`/section`, {
          md_text: this.md_text,
          html_text: this.html_text,
          title: this.title,
          orderby: this.orderby,
          chapter_id: this.chapter_id
        })
        .then(() => {
          this.$router.push(`/section/?chapter_id=${this.chapter_id}}`)
        })
    }
  },
  // id和chapter_id都是可以传过来的,用有无id来判断是创建还是修改
  computed: {
    chapter_id() {
      return Number(this.$route.query.chapter_id)
    },
    id() {
      return this.$route.params.id
    }
  },
  // 判断是创建还是编辑
  created() {
    if (this.id) {
      request.get(`/section/${this.id}`).then(res => {
        const data = res.data.data
        this.md_text = data.md_text
        this.html_text = data.html_text
        this.title = data.title
        this.orderby = data.orderby
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
</style>