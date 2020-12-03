<template>
  <div
    :class="classes"
    ref="svgArea"
    :style="areaStyles"
    @contextmenu.stop.prevent="mouseMenu"
    @dragover.prevent
    @drop.prevent="onAddNodeModel"
  >
    <svg
      preserveAspectRatio="xMinYMin meet"
      :viewBox="svgViewBox"
      :width="svgWidth"
      :height="svgHeight"
      :id="id"
    >
      <g :transform="svgTransform">
        <slot></slot>
        <right-menu
          ref="rightmenu"
          :menu-left="menuLeft"
          :menu-top="menuTop"
          :menu-list="menuList"
          @rightMenu="rightMenuClick"
        ></right-menu>
      </g>
    </svg>
  </div>
</template>

<script>
import mixinsTool from "@/mixins/tool";
const prefixCls = "task-work-area";
import rightMenu from "../rightmenu";

export default {
  name: "workarea",
  mixins: [mixinsTool],
  components: {
    rightMenu,
  },
  data() {
    return {
      svgWidth: 1000,
      svgHeight: 500,
      menuVisible: false,
    };
  },
  props: {
    ini: {
      lineType: {
        type: [String],
        default: "Q",
      },
      isDotted: {
        type: [Boolean],
        default: false,
      },
      scaling: {
        type: [Object],
        default: { Zoom: 1 },
      },
    },
    width: {
      type: [String, Number],
      default: 0,
    },
    height: {
      type: [String, Number],
      default: 0,
    },
    id: {
      type: [String, Number],
    },
    menuTop: {
      type: [String, Number],
      default: 0,
    },
    menuLeft: {
      type: [String, Number],
      default: 0,
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    ini: {
      handler(newIni, oldIni) {
        this.$store.dispatch("setViConfig", newIni);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    svgTransform() {
      return `translate(0,0) scale(${this.ini.scaling.Zoom})`;
    },
    svgViewBox() {
      return `0,0,${this.svgWidth},${this.svgHeight}`;
    },
    classes() {
      return [`${prefixCls}`];
    },
    areaStyles() {
      let style = {};
      if (this.isCssInUnit(this.width) >= 0) {
        style.width = this.width;
      } else {
        style.width = `${this.width}px`;
      }
      if (this.isCssInUnit(this.height) >= 0) {
        style.height = this.height;
      } else {
        style.height = `${this.height}px`;
      }
      return style;
    },
  },
  mounted() {
    this.setSvgHW();
    window.onresize = () => {
      this.setSvgHW();
    };
  },
  methods: {
    rightMenuClick(type) {
      this.$emit("rightMenuItem", type);
    },
    showRightMenu() {
      this.$refs["rightmenu"].showMenu();
    },
    disRightMenu() {
      this.$refs["rightmenu"].disMenu();
    },

    showMenuLoading() {
      this.$refs["rightmenu"].showLoading();
    },
    disMenuLoading() {
      this.$refs["rightmenu"].disLoading();
    },

    setSvgHW() {
      let width = this.transferCss(this.width);
      let height = this.transferCss(this.height);
      if (this.getBrowserHW().width < width) {
        this.svgWidth = width;
      } else {
        this.svgWidth = this.getBrowserHW().width;
      }
      if (this.getBrowserHW().height < height) {
        this.svgHeight = height;
      } else {
        this.svgHeight = this.getBrowserHW().height;
      }
    },
    mouseMenu(event) {
      this.$emit("on-mouse", event, this.id);
    },
    onAddNodeModel(event) {
      let node = event.dataTransfer.getData("nodemodel");
      let scalin = this.$store.getters.getViConfig.scaling;
      if (node) {
        let nodeObj = JSON.parse(node);
        let ref = this.$refs.svgArea;
        nodeObj.positionX = (
          (event.clientX - this.getContainersLeft(ref)) /
          scalin.Zoom
        ).toFixed(1);
        nodeObj.positionY = (
          (event.clientY - this.getContainersTop(ref)) /
          scalin.Zoom
        ).toFixed(1);
        this.$emit("on-add-nodemodel", event, nodeObj);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task-work-area {
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.right-menu-group {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  z-index: 1001;
  width: 180px;
  text-align: center;
}
</style>