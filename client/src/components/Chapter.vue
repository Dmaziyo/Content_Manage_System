<template>
  <div class="book">
    <div class="book_dialog">
      <el-button @click="dialogFormVisible = true">添加章</el-button>
      <el-dialog width="30%" title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <div class="form_item">
            <label for="book_name">章名称</label>
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
    <el-table :data="chapterList" border style="width: 80%">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="title" label="章" width="300"></el-table-column>
      <el-table-column prop="address" label="详情" width="100">
        <template slot-scope="scope">
          <el-button @click="getSectionList(scope.row)" type="text" size="small">查看小节</el-button>
        </template>
      </el-table-column>
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
    this.getChapterList()
  },
  computed: {
    // 返回路由传递的参数
    book_id() {
      return this.$route.query.book_id
    }
  },
  data() {
    return {
      chapterList: [],
      dialogFormVisible: false,
      updateChapterId: undefined,
      form: {
        book_name: '',
        book_order: ''
      },
      isEdit: false
    }
  },
  methods: {
    getSectionList({ id }) {
      this.$router.push(`/section?chapter_id=${id}`)
    },

    getChapterList() {
      request.get(`/chapter?book_id=${this.book_id}`).then(res => {
        this.chapterList = res.data.data
      })
    },
    // 保存章节
    save() {
      if (this.isEdit) {
        request
          .put(`/chapter/${this.updateChapterId}`, {
            title: this.form.book_name,
            orderby: this.form.book_order
          })
          .then(() => {
            this.getChapterList()
            this.dialogFormVisible = false
            ;(this.form.book_name = ''), (this.form.book_order = '')
            this.isEdit = false
          })
      } else {
        request
          .post(`/chapter`, {
            title: this.form.book_name,
            orderby: this.form.book_order,
            book_id: this.book_id
          })
          .then(() => {
            this.getChapterList()
            this.dialogFormVisible = false
            ;(this.form.book_name = ''), (this.form.book_order = '')
          })
      }
    },
    update({ id, title, orderby }) {
      this.updateChapterId = id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.book_name = title
      this.form.book_order = orderby
      this.fileList = [{ url: this.img }]
    },
    cancel() {
      this.dialogFormVisible = false
      ;(this.form.book_name = ''), (this.form.book_order = '')
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