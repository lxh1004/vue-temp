<template>
  <task-node :node="nodeData"
             width="60"
             height="60"
             v-on:on-select="selectNodeMethod"
             v-on:on-drag-ging="dragGing"
             v-on:on-drag-start="dragStart"
             v-on:on-drag-end="dragEnd"
             v-on:on-mouse="mouseMenu"
             v-on:updateTem="updateTemp">
    <div class="node-erhombus-class">
      <div class="top-in">
        <template v-for="(item, portIndex) of nodeData.inPorts">
          <task-in-port :key="portIndex"
                        :pid="item.id"
                        :content="item.content"
                        :isConnected="item.isConnected"
                        v-on:on-add-path="addPath">
          </task-in-port>
        </template>
      </div>
      <div class="bottom-out">
        <template v-for="(item, portIndex) of nodeData.outPorts">
          <task-out-port :key="portIndex"
                         :pid="item.id"
                         :content="item.content"
                         :isConnected="item.isConnected"
                         v-on:on-add-path="addPath"></task-out-port>
        </template>
      </div>
      <div class="node-icon-left">
        <i :class="nodeTypeIcon(nodeData.nodeType)"></i>
      </div>
      <span>{{ nodeData.name }}</span>
      <i :class="stateIcon(nodeData.state) + ' ' + 'node-icon-right'"></i>
    </div>
  </task-node>
</template>

<script>
import { NodeMix } from "vue-task-node";

export default {
  name: "autoCommonNode",
  data() {
    return {};
  },
  mixins: [NodeMix],
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {
          id: [String, Number],
          name: [String, Number],
          nodeType: {
            type: [String, Number],
            default: "imageClassify",
          },
          positionX: {
            type: [String, Number],
            default: 0,
          },
          positionY: {
            type: [String, Number],
            default: 0,
          },
          icon: String,
          state: {
            type: [String, Number],
            default: 1,
          },
          inPorts: {
            type: Array,
            default: () => [
              {
                id: [Number, String],
                content: String,
                isConnected: Boolean,
              },
            ],
          },
          outPorts: {
            type: Array,
            default: () => [
              {
                id: [Number, String],
                content: String,
                isConnected: Boolean,
              },
            ],
          },
        };
      },
    },
  },
  mounted() {},
  methods: {
    stateIcon(value) {
      switch (value) {
        case 1: //等待中
          return "icon task-node-waiting state-await-color";
        case 2: //运行中
          return "icon task-node-running state-running-color";
        case 3: //已中止
          return "icon task-node-pause state-pause-color";
        case 4: //成功
          return "icon task-node-success state-success-color";
        case 5: //失败
          return "icon task-node-failed state-failed-color";
        default:
          //未运行
          return "icon task-node-waiting state-await-color";
      }
    },
    nodeTypeIcon(value) {
      switch (value) {
        case "imageClassify":
          return "el-icon-files";
        case "imageSegmentation":
          return "el-icon-data-line";
        case "objectDetection":
          return "el-icon-box";
        default:
          return "el-icon-box";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.node-erhombus-class {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  min-width: 180px;
  width: 200px;
  text-align: center;
  border: 1px solid #289de9;
  border-radius: 15px;
  white-space: nowrap;
}
.node-icon-left {
  width: 30px;
  background: #289de9;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  color: #fff;
  text-align: center;
}
.node-icon-right {
  width: 30px;
  height: 28px;
  line-height: 28px;
  font-size: 18px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
}
.top-in {
  position: absolute;
  display: flex;
  min-width: 180px;
  width: 180px;
  margin: auto;
  left: 0;
  right: 0;
  justify-content: space-around;
  top: -6px;
}
.bottom-out {
  position: absolute;
  display: flex;
  min-width: 180px;
  width: 180px;
  margin: auto;
  left: 0;
  right: 0;
  bottom: -5px;
  justify-content: space-around;
}
.state-success-color {
  color: $success_color;
}
.state-failed-color {
  color: $auto_danger_color;
}
.state-pause-color {
  color: $warning_color;
}
.state-running-color {
  color: $auto_primary_color;
}
.state-await-color {
  color: $auto_info_color;
}
</style>
