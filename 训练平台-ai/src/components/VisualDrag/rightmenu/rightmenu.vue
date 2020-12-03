<template>
  <g :transform="rightmTrans">
    <foreignObject
      v-if="menuVisible"
      :height="comHight"
      width="182px"
      class="right-menu"
    >
      <body xmlns="http://www.w3.org/1999/xhtml">
        <div v-loading="showloading" class="right-menu-btn">
          <template v-for="menuItem of menuList">
            <el-button
              class="right-menu-item"
              icon="el-icon-loading"
              :key="menuItem.type"
              :disabled="menuItem.disabled"
              @click="rightMenuItem(menuItem.type)"
            >
              {{ menuItem.title }}
            </el-button>
          </template>
        </div>
      </body>
    </foreignObject>
  </g>
</template>

<script>
import mixinsTool from "@/mixins/tool";

export default {
  name: "rightmenu",
  data() {
    return {
      menuVisible: false,
      showloading: false,
    };
  },
  mixins: [mixinsTool],
  computed: {
    rightmTrans() {
      return `translate(${this.menuLeft},${this.menuTop})`;
    },
    gStyle() {
      return {
        transform: `translate3d(${this.menuLeft}px,${this.menuTop}px,0)`,
      };
    },
    comHight() {
      return this.menuList.length * 35.5 + "px";
    },
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    menuTop: {
      type: [String, Number],
      default: 0,
    },
    menuLeft: {
      type: [String, Number],
      default: 0,
    },
  },
  mounted() {},
  methods: {
    getCheckX(X) {
      // 检查是否移出工作区
      let x = X;
      if (x <= 0) {
        x = 0;
      } else if (x >= this.getBrowserHW().width) {
        x = this.getBrowserHW().width - this.width;
      }
      return x;
    },
    getCheckY(Y) {
      // 检查是否移出工作区
      let y = Y;
      if (y <= 0) {
        y = 0;
      } else if (y >= this.getBrowserHW().height) {
        y = this.getBrowserHW().height - this.height;
      }
      return y;
    },
    showMenu() {
      this.menuVisible = true;
    },
    disMenu() {
      this.menuVisible = false;
    },
    showLoading() {
      this.showloading = true;
    },
    disLoading() {
      this.showloading = false;
    },
    rightMenuItem(type) {
      this.disMenu();
      this.$emit("rightMenu", type);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0 !important;
  padding: 2px !important;
  box-sizing: border-box;
}
.right-menu {
  top: 0;
  left: 0;
  z-index: 999;
  width: 180px;
  text-align: center;
}
.right-menu-btn{
  position: fixed;
  border: solid 1px $auto_primary_color;
  border-radius: 3px;
  background: #fff;
}
.right-menu-item {
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  margin: 0;
  text-align: left;
  border-left: none;
  border-right: none;
}

/deep/ .el-icon-loading {
  color: white;
}

.rightmenu-show-enter-active,
.rightmenu-show-leave-active {
  transition: all 0.5s;
}
.rightmenu-show-enter,
.rightmenu-show-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>