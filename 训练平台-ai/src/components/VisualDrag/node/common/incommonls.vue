<template>
  <div :class="classes"
       ref="port">
    <div v-for="(item,index) in in_ports"
         :class="wrapCls"
         :key='index'>
      <in-port :pid="item.id"
               v-on:on-add-path='addPath'
               :content="item.dtype"
               :isConnected=item.isConnected></in-port>
    </div>
    <div :class="wrapCls"></div>
  </div>
</template>
<script>
import InPort from "../../port/inport.vue";
const prefixCls = "task-in-common-ls";
export default {
  components: { InPort },
  name: "InCommonLs",
  props: {
    in_ports: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    wrapCls() {
      return [`${prefixCls}-wrap`];
    },
  },
  methods: {
    addPath: function (event, start, end) {
      this.$emit("on-add-path", event, start, end);
    },
  },
};
</script>
<style lang="scss" scoped>

.task-in-common-ls {
  display: flex;
  clear: both;
  margin-top: -34px;
  float: left;
  width: 200px;
  &-wrap {
    height: 1px;
    float: left;
    flex: 1;
  }
}


</style>