<template>
  <div :class="classes">
    <div v-for="(item,index) in out_ports"
         :class="wrapCls"
         :key='index'>
      <out-port :pid="item.id" :content='item.dtype'></out-port>
    </div>
    <div :class="wrapCls"></div>
  </div>
</template>
<script>
import OutPort from "../../port/outport.vue";
const prefixCls = "task-out-common-ls";
export default {
  components: {
    OutPort,
  },
  name: "OutCommonLs",
  props: {
    out_ports: {
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
};
</script>
<style lang="scss" scoped>
.task-out-common-ls{
  display: flex;
  margin-top: -5px;
  clear: both;
  float: left;
  width: 200px;
  &-wrap {
    height: 1px;
    float: left;
    flex: 1;
  }
}

</style>