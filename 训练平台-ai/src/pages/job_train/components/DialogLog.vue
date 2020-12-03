<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-dialogDrag
    :close-on-click-modal="false"
    width="70%"
    top="5vh"
    @close="cancel"
    title="查看日志"
  >
    <el-button
      v-show="this.scrollHeight > 500"
      icon="el-icon-top"
      class="back-top-btn"
      @click.stop="backTop"
    ></el-button>

    <el-button
      class="back-bottom-btn"
      type="primary"
      icon="el-icon-bottom"
      @click.stop="setScroll"
    ></el-button>
    <div class="log-group" ref="logGroup" @click.stop="scrollControl">
      <span v-html="logContent" ref="logText"></span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      visibleDialog: false,
      stopScroll: false,
      myInterval: {},
      logIndex: 0,
      scrollHeight: 0,
    };
  },
  props: {
    logContent: {
      type: String,
      default: "",
    },
  },
  watch: {
    logContent() {
      this.$nextTick(() => {
        this.setScroll();
      });
    },
  },
  components: {},
  mounted() {},
  methods: {
    cancel() {
      this.visibleDialog = false;
      this.stopScroll = true;
      this.$emit("scrollStop", true);
    },
    showDialog() {
      this.visibleDialog = true;
      this.stopScroll = false;
    },
    scrollControl() {
      if (this.stopScroll) {
        this.stopScroll = false;
        this.$emit("scrollStop", false);
      } else {
        this.stopScroll = true;
        this.$emit("scrollStop", true);
      }
    },

    backTop() {
      this.$emit("scrollStop", true);
      this.stopScroll = true;
      let step = 0;
      let interval = setInterval(() => {
        if (this.$refs.logGroup.scrollTop <= 0) {
          clearInterval(interval);
          return;
        }
        step += 10;
        this.$refs.logGroup.scrollTop -= step;
      }, 20);
    },
    setScroll() {
      let loggroup = this.$refs.logGroup;
      let logtext = this.$refs.logText;
      let logHeight = logtext.offsetHeight + 20;
      if (logHeight !== this.stopScroll) {
        loggroup.scrollTop = logHeight;
        this.scrollHeight = logHeight;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.log-group {
  position: relative;
  height: 500px;
  overflow-y: auto;
}
.back-top-btn {
  position: absolute;
  right: 40px;
  bottom: 70px;
  z-index: 999;
  width: 32px;
  height: 32px;
  padding: 0;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}
.back-bottom-btn {
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 999;
  width: 32px;
  height: 32px;
  padding: 0;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}
</style>
