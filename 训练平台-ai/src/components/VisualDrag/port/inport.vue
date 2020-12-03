<template>
  <div :class="[isConnected ? isCls:classes]" :id="pid" @dragover.prevent=dragPortOver($event) @drop.prevent='inDropPort($event)' @dragenter="dragEnter" @dragleave="dragLeave">
    <el-tooltip :content="content" placement="top">
      <span :class="magnetCls"></span>
    </el-tooltip>
  </div>
</template>
<script>

const prefixCls = 'task-port'
export default {
  name: 'InPort',
  data () {
    return {
      className: null
    }
  },
  props: {
    pid: [Number, String],
    content: {
      type: [String, Number],
      default: '输入'
    },
    isConnected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-in`
      ]
    },
    magnetCls () {
      return [
        `${prefixCls}-magnet`
      ]
    },
    isCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-in`,
        `is-connected`
      ]
    }
  },
  methods: {
    inDropPort: function (event) {
      if (this.className) {
        let _this = event.target.parentNode
        _this.className = this.className
      }
      let startData = event.dataTransfer.getData('portStart')
      if (startData) {
        this.$emit('on-add-path', event, startData, this.pid)
      }
    },
    dragPortOver: function (event) {
    },
    dragEnter: function (event) {
      let _this = event.target.parentNode
      this.className = _this.className
      _this.className = 'task-port task-in-out'
    },
    dragLeave: function (event) {
      let _this = event.target.parentNode
      _this.className = this.className
    }
  }
}
</script>
<style lang="scss" scoped>
.task-port {
  width: 10px;
  height: 10px;
  float: right;
  margin-right: -5px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: #fff;

  &-magnet {
    float: left;
    width: 20px;
    height: 20px;
    margin-top: -6px;
    margin-left: -6px;
    background-color: transparent;
    border-radius: 50%;
  }
}

.task-port-in {
  cursor: default;

  &:hover {
    border: 1px solid #2d8cf0;
    width: 10px;
    height: 10px;
    box-shadow: 0px 0px 1px 3px #57a3f3;
    border-radius: 50%;
    margin-top: -1px;
  }
}
.task-in-out {
  border: 1px solid #2d8cf0;
  width: 10px;
  height: 10px;
  box-shadow: 0px 0px 1px 3px #57a3f3;
  border-radius: 50%;
  margin-top: -1px;
}

.is-connected {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 4px 0;
  border-color: gray transparent transparent;
  background-color: transparent;
  border-radius: 0;
  margin-top: 4px;
}


</style>