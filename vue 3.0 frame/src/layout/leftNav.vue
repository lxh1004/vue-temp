<template>
  <div class="main_container">
    <el-aside :width="isCollapse ? '60px' : '200px'">
      <div
        @click="toggleCollapse"
        :class="[isCollapse ? 'toggle-button-act' : 'toggle-button']"
      >
        <i :class="[!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
      </div>
      <el-menu
        :default-active="currentroute"
        class="el-menu-vertical-demo"
        background-color="#051941"
        text-color="#fff"
        :collapse="isCollapse"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/home/user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/home/project">
          <i class="el-icon-user-solid"></i>
          <span slot="title">项目管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  computed: {
    currentroute() {
      return this.$route.path.split('/').slice(0, 3).join('/')
    },
  },
  data() {
    return {
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>
<style scoped lang="scss">
.main_container .el-menu {
  border-right: none;
}
.el-aside {
  height: 100%;
  background-color: #051941;
  transition: width 0.3s;
  border: none;
}
.toggle-button {
  cursor: pointer;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #133d75;
  color: #fff;
  text-align: center;
  margin: 0 0 10px 24px;
  border-top-left-radius: 5px;
  border-top-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  &:hover {
    opacity: 0.8;
  }
}
.toggle-button-act {
  cursor: pointer;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: $auto_error_color;
  color: #fff;
  text-align: center;
  margin: 0 0 10px 24px;
  border-top-left-radius: 5px;
  border-top-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  &:hover {
    opacity: 0.8;
  }
}

.el-menu-item.is-active {
  border-left: 1px solid #e50012;
  color: #fff;
  background-color: #133d75 !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>