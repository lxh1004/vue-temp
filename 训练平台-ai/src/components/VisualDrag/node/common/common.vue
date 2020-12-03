<template>
  <node :node="node"
        width=200
        height=30
        @on-select="selectNodeMethod"
        @on-drag-ging="dragGing"
        @on-drag-start="dragStart"
        @on-drag-end="dragEnd"
        @updateTem="updateTemp"
        @on-mouse="mouseMenu">
    <div :class="classes" :style="{borderColor:isEdited?'#67c23a':'#409eff'}">
      <span :class="iconCls +' '+ [node.icon ? node.icon : 'icon node-model']"></span>
      <span :class="nameCls">{{node.name}}</span>
      <span :class="statusCls +' '+ stateCls(node.state)"></span>
      <in-common-ls :in_ports="node.inPorts"
                    @on-add-path='addPath'></in-common-ls>
      <out-common-ls :out_ports="node.outPorts"></out-common-ls>

    </div>
  </node>
</template>
<script>
import Node from "../node.vue";
import InCommonLs from "./incommonls.vue";
import OutCommonLs from "./outcommonls.vue";
import mixinsNode from "@/mixins/node";

const prefixCls = "task-common-node";
export default {
  components: {
    OutCommonLs,
    InCommonLs,
    Node,
  },
  mixins: [mixinsNode],
  name: "CommonNode",
  data() {
    return {
      state: "",
      isEdited:false
    };
  },
  props: {
    node: {
      id: [String, Number],
      name: {
        type: [String, Number],
        default: "节点",
      },
      positionX: {
        type: [String, Number],
        default: 0,
      },
      positionY: {
        type: [String, Number],
        default: 0,
      },
      icon: [String, Number],
      state: {
        type: [String, Number],
        default: 1,
      },
      inPorts: {
        type: Array,
        default: [],
      },
      outPorts: {
        type: Array,
        default: [],
      },
    },
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    iconCls() {
      return [`${prefixCls}-icon`];
    },
    nameCls() {
      return [`${prefixCls}-name`];
    },
    statusCls() {
      return [`${prefixCls}-status`];
    },
    selectedCls() {
      return [`task-node-selected`];
    },
    nodeParams(){
      return this.node.params;
    }
  },
  watch:{
    nodeParams:{
      handler(value){
        console.log('watch listen params :',value);
        this.isEdited = true
      },
      deep:true,
      immediate:false
    }
  },
  methods: {
    stateCls(value) {
      switch (value) {
        case 1: // 等待中
          return "icon task-node-waiting state-await-color";
        case 2: // 运行中
          return "el-icon-loading state-running-color";
        case 3: // 已中止
          return "icon task-node-pause state-pause-color";
        case 4: // 成功
          return "icon task-node-success state-success-color";
        case 5: // 失败
          return "icon task-node-failed state-failed-color";
        default:
          // 未运行
          return "icon task-node-waiting state-await-color";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task-common-node{
  width: 200px;
  height: 30px;
  background-color: hsla(0,0%,100%,.9);
  border: 2px solid $auto_primary_color;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color .2s;
  transition: background-color .2s;
  text-align: center;
  z-index: 998;
  &-icon {
    float: left;
    color: #fff;
    font-size: 16px;
    background-color: $auto_primary_color;
    width: 26px;
    height: 26px;
    margin: 2px;
    border-radius: 100%;
    &:before{
      float: left;
      margin: 4px;
    }
  }

  &-name {
    float: left;
    margin-left: 2px;
    width: 120px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-status {
    width: 26px;
    height: 26px;
    border-radius: 100%;
    float: right;
    font-size: 18px;
    margin: 1px;
    &:before{
      float: left;
      margin: 4px;
    }
  }
  &:hover {
    background-color: $node_select_color ;
  }
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
