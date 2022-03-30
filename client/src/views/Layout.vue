<template>
  <div class="layout">
    <div class="slider">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        :collapse="isCollapse"
      >
        <el-menu-item index="/book">
          <i class="el-icon-menu"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <el-menu-item index="/blog">
          <i class="el-icon-document"></i>
          <span slot="title">博客管理</span>
        </el-menu-item>
        <el-menu-item index="/video">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
        <el-submenu index="userManage">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user">用户列表</el-menu-item>
            <el-menu-item @click="logout" index>注销</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      localStorage.setItem('token', '')
      this.$router.push('/Login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.layout .slider {
  float: left;
  margin-right: 30px;
}
</style>