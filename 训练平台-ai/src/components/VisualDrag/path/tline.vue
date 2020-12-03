<template>
  <g :class="classes">
    <path :class="conWrapCls" ref="wrap" :d="lpath"></path>
    <circle v-if="portData.useAnimation" r="5" fill="#409eff">
      <animateMotion :path="lpath" begin="0s" dur="2s" repeatCount="indefinite" />
    </circle>
    <path :class="conCls" ref="con" :d="lpath" @contextmenu.prevent="mouseFn"></path>
  </g>
</template>
<script>
import Line from "@/utils/line";
const prefixCls = "task-tline";
export default {
  name: "TLine",
  data() {
    return {
      lpath: "M0 0 Q 0 0, 0 0 T 0 0",
      isDraw: false,
    };
  },
  props: {
    portData: {
      useAnimation: {
        type: [String, Boolean],
        default: false,
      },
      ptype: {
        type: [String, Number],
        default: "Q",
      },
      dotted: {
        type: [String, Boolean],
        default: false,
      },
      Mxy: {
        x: [String, Number],
        y: [String, Number],
      },
      Txy: {
        x: [String, Number],
        y: [String, Number],
      },
      startPort: {
        type: [String, Number],
      },
      endPort: {
        type: [String, Number],
      },
    },
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    conCls() {
      return [`${prefixCls}-con`];
    },
    conWrapCls() {
      return [
        `${prefixCls}-con-wrap`,
        this.portData.dotted ? `${prefixCls}-dotted` : ``,
      ];
    },
    conWrapHoverCls() {
      return [`${prefixCls}-hover`];
    },
  },
  beforeUpdate() {
    if (!this.isDraw) {
      this.drawCurvePath();
    }
    this.isDraw = false;
  },
  mounted() {
    this.drawCurvePath();
    this.isDraw = true;
    // let nameSpace = 'http://www.w3.org/2000/svg'
    let _this = this.$refs.con;
    _this.addEventListener("mouseover", () => {
      let wr = this.$refs.wrap;
      wr.classList.add(this.conWrapHoverCls);
      this.$emit("on-mouse-over", wr, this.portData);
    });
    _this.addEventListener("mouseout", () => {
      let wr = this.$refs.wrap;
      wr.classList.remove(this.conWrapHoverCls);
      this.$emit("on-mouse-out", wr, this.portData);
    });
  },
  methods: {
    drawCurvePath() {
      if (this.portData.Mxy && this.portData.Txy) {
        this.lpath = Line.drawCurvePath(
          this.portData.Mxy,
          this.portData.Txy,
          this.portData.ptype,
          this.$store.getters.getViConfig.scaling
        );
      }
      return this.lpath;
    },
    mouseFn(event) {
      event.stopPropagation();
      this.$emit("on-mouse", event, this.portData);
    },
  },
};
</script>
<style lang="scss" scoped>
.task-tline {
  cursor: default;
  z-index: 999;

  &-con {
    fill: none;
    stroke: hsla(0, 0%, 100%, 0);
    stroke-width: 15px;
  }

  &-con-wrap {
    fill: none;
    stroke: gray;
    stroke-width: 1px;
  }

  &-dotted {
    stroke: rgba(57, 202, 116, 0.8);
    stroke-width: 2px;
    stroke-dasharray: 5;
    -webkit-animation: ant-line 30s infinite linear;
    animation: ant-line 30s infinite linear;
  }
}
.task-tline-hover {
  fill: none;
  stroke: #aeaeae;
  stroke-width: 3px;
}
</style>