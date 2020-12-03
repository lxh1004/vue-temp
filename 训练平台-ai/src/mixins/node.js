export default {
  props: {
    updateTem: Function
  },
  methods: {
    updateTemp (val) {
      this.updateTem()
    },
    selectNodeMethod (event, node, ref) {
      this.$emit('on-select', event, node, ref)
    },
    dragStart (event, node) {
      this.$emit('on-drag-start', event, node)
    },
    dragGing (event) {
      this.$emit('on-drag-ging', event)
    },
    dragEnd (event, node) {
      this.$emit('on-drag-end', event, node)
    },
    addPath (event, start, end) {
      this.$emit('on-add-path', event, start, end)
    },
    mouseMenu (event, node) {
      this.$emit('on-mouse', event, node)
    }
  },
  updated () {
    this.updateTem()
  }
}
