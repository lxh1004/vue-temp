<template>
  <div class="vheader">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt />
    </div>
    <div class="vheader-right">
      <div class="sort">
        <el-dropdown
          placement="bottom-start"
          class="vheader_drow"
          trigger="hover"
          @command="handleCommandSort"
        >
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-user"></i>
            <span class="vheader_drow_span">admin</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="vheader_drow_box"></div>
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      timer: null,
    }
  },
  methods: {
    // handle drow
    handleCommandSort: function (e) {
      console.log(e)
    },
  },
}
</script>
<style scoped lang="scss">
.vheader {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  color: #fff;
}
.vheader .logo {
  float: left;
  width: 250px;
  line-height: 60px;
}
.vheader-right {
  float: right;
  padding-right: 50px;
}
.vheader_drow {
  color: #fff;
  cursor: pointer;
  .vheader_drow_span {
    padding-left: 10px;
  }
}

.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown {
  font-size: 16px;
}
/* 设置弹出框的宽高 */
.el-dropdown-menu {
  width: 240px;
  height: 140px;
  padding: 10px 10px;
}

.vheader_drow_box {
  width: 100%;
  height: 80px;
  background: #ccf;
}
</style>
