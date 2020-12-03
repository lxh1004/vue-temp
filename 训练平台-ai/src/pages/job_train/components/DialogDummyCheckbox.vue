<template>
  <el-dialog
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="25%"
  >
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group
      class="checkbox-v"
      v-model="selectValues"
      @change="handleSelectChange"
    >
      <el-checkbox v-for="item in checkValues" :label="item" :key="item">{{
        item
      }}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      selectValues: [],
      checkAll: false,
      dialogVisible: false,
      isIndeterminate: false,
    };
  },
  components: {},
  props: {
    checkValues: {
      type: Array,
      default: () => [],
    },
    dialogTitle: {
      type: String,
      default: "",
    },
    dummyPtype: {
      type: String,
      default: "",
    },
    dummyValue: {
      type: Array,
      default: () => [],
    },
    dummyName: {
      type: String,
      default: "",
    },
    selectId: {
      type: String,
      default: "",
    },
  },
  watch: {
    dummyValue: {
      handler(value) {
        this.selectValues = value;
        let checkedCount = this.selectValues.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkValues.length;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    refreshData() {
      this.selectValues = [];
      this.isIndeterminate = false;
    },
    showDummyCheck() {
      this.dialogVisible = true;
    },
    disDummyCheck() {
      this.dialogVisible = false;
    },
    closeDialog() {
      this.callBackValue();
      this.dialogVisible = false;
    },
    handleCheckAllChange(val) {
      this.selectValues = val ? this.checkValues : [];
      this.isIndeterminate = false;
      this.callBackValue();
    },
    handleSelectChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkValues.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkValues.length;
      this.callBackValue();
    },
    callBackValue() {
      this.$emit("checkChange", {
        name: this.dummyName,
        type: this.dummyPtype,
        value: this.selectValues,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.checkbox-v {
  position: relative;
  display: flex;
  max-height: 300px;
  overflow-y: auto;
  flex-direction: column;
}
.el-checkbox {
  height: 30px;
  line-height: 30px;
}
</style>
