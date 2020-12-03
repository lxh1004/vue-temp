<template>
  <el-container class="home-container">
    <el-header>
      <span style="font-weight: bold;font-size:18px">SANY</span>
      <span style="font-size:14px;margin-left:10px">可视化AI训练平台</span>
    </el-header>
    <div class="main-group">
      <el-aside width="200px">
        <el-menu :default-active="currentroute"
                 background-color="#15284C"
                 text-color="#fff"
                 router>
          <template v-for="(item, index) in navData">
            <el-menu-item :index="item.path"
                          :key="index">
              <i :class="item.icon"
                 style="margin-right:5px"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb>
          <el-breadcrumb-item v-for="item in currentrouteName"
                              :to="item.path"
                              :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "home",
  computed: {
    currentroute() {
      return this.$route.meta.index;
    },
    currentrouteName() {
      let matched = this.$route.matched.filter((item) => item.meta.title);
      return matched;
    },
  },
  data() {
    return {
      navData: [
        {
          path: "/home/experiment_manage",
          title: "实验管理",
          icon: "iconfont iconmoxing",
        },
      ],
    };
  },
  components: {},
  mounted() {
    this.$store.dispatch("getPatternList"); //项目模式
    this.$store.dispatch("getStatusList"); //项目状态
    this.$store.dispatch("getLearnTypeList"); //学习类型
    this.$store.dispatch("getFrameworkList"); //All项目框架
    this.$store.dispatch("getFrameworkList", { learnType: 1 }); //robot项目框架
    this.$store.dispatch("getFrameworkList", { learnType: 2 }); //deep项目框架
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.home-container {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.el-header {
  position: relative;
  background-color: $head_color;
  color: white;
  line-height: 60px;
  align-items: center;
}
.main-group {
  position: relative;
  display: flex;
  height: calc(100% - 60px);
  width: 100%;
}
.el-aside {
  position: relative;
  background-color: $nav_bg_color;
  color: white;
  text-align: center;
  height: 100%;
}
.el-main {
  position: relative;
  background-color: #eee;
  padding: 0 10px;
  height: 100%;
  overflow: hidden;
}
.el-menu {
  position: relative;
  text-align: start;
  border: solid 1px $nav_bg_color;
}
.el-menu-item.is-active {
  border-left: 2px solid $auto_primary_color;
  background: $nav_item_active !important;
  color: #eee;
}
.el-breadcrumb {
  padding-bottom: 15px;
  border-bottom: solid 1px $line_color;
  height: 50px;
  padding: 0 15px;
  line-height: 50px;
  background: #fff;
}
</style>
