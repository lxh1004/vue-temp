<template>
  <el-container>
    <el-header>
      <v-header></v-header>
    </el-header>
    <div class="home-container-main">
      <v-left></v-left>
      <el-main ref="mainContainer">
        <v-tag></v-tag>
        <router-view></router-view>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import vHeader from "@/layout/header";
import vLeft from "@/layout/leftNav";
import vTag from "@/layout/tag";
export default {
  name: "home",
  watch: {
    currentroute() {
      this.$refs["mainContainer"].$el.scrollTop = 0;
    },
  },
  computed: {
    currentroute() {
      return this.$route.path.split("/").slice(0, 3).join("/");
    },
  },
  components: {
    vHeader,
    vLeft,
    vTag,
  },
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.el-container {
  position: relative;
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
.el-header {
  background-color: #051941;
  color: #fff;
  line-height: 60px;
}
.home-container-main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.el-aside {
  background-color: #051941;
  transition: width 0.3s;
  border: none;
}

.el-main {
  color: #333;
  overflow: auto;
  position: relative;
  height: calc(100% - 60px);
}
</style>