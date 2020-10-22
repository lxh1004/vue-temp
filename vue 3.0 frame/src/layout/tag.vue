<template>
  <div class="tags">
    <el-breadcrumb>
      <el-breadcrumb-item :to="currentroute">{{currentrouteName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentroute() {
      return this.$route.path.split("/").slice(0, 3).join("/");
    },
    currentrouteName() {
      return this.$route.meta.title;
    },
  },
};
</script>
<style scoped>
.tags {
  position: relative;
  height: 30px;
  /* overflow: hidden;
  background: #fff;
  padding-right: 120px; */
}
.el-breadcrumb {
  padding-bottom: 15px;
  border-bottom: solid 1px #e3e3e3;
}
</style>