<template>
  <div class="task-node-model" :draggable="isDraggable" @dragstart='dragStart($event)'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'NodeModel',
  props: {
    node: {
      id: [String, Number],
      name: {
        type: [String, Number],
        default: '节点'
      }
    },
  },
  data () {
    return {
      store: null
    }
  },
  computed: {
    isDraggable(){
      return this.$store.getters.getViDragDis;
    }
  },
  methods: {
    dragStart (event) {
      event.dataTransfer.setData('nodemodel', JSON.stringify(this.node))
    }
  }
}
</script>
<style lang="scss" scoped>
.task-node-model{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  border: 1px solid transparent;
  cursor: -webkit-grab;
  &:hover {
    cursor: grab;
    background-color: #fff;
    border-color: #289de9;
  }

  &-label {
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

</style>