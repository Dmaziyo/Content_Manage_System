<template>
  <div class="Login">
    <h2>后台登录</h2>
    <el-form label-position="right" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="login" type="primary">登录</el-button>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      request
        .post('/verify', {
          username: this.form.username,
          password: this.form.password
        })
        .then(res => {
          const data = res.data
          if (data.message.state) {
            localStorage.setItem('token', data.message.token)
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
            this.$router.push('/')
          } else {
            this.$message.error('账号或密码错误')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.Login {
  width: 285px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  h2 {
    text-align: center;
  }
}
</style>