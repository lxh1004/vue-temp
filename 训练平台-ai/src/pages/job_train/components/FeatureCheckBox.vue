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
      :disabled="pType !== 'List'"
      >全选</el-checkbox
    >
    <el-checkbox-group
      class="checkbox-v"
      v-model="selectValues"
      @change="handleSelectChange"
    >
      <el-checkbox
        v-for="item in checkValues"
        :label="item.name"
        :key="item.name"
        :disabled="item.disabled"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="disFeatureCheck">确 定</el-button>
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
      dialogTitle: "",
      labelType: "",
      pType: "",
      initValues: {},
    };
  },
  components: {},
  watch: {
    initValues: {
      handler(value) {
        if (value.label || value.feature) {
          this.initSelects(value);
        }
      },
      deep: true,
      // immediate: true,
    },
  },
  props: {
    checkValues: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {},
  methods: {
    initSelects(value) {
      let initFeatures = [];
      let featureData = [];
      let labelData = [];
      if (value.feature) {
        featureData = value.feature.default;
        initFeatures = initFeatures.concat(featureData);
      }

      //选择
      if (value.label) {
        labelData = value.label.default;
        if (value.label.ptype === "List") {
          initFeatures = initFeatures.concat(labelData);
        } else {
          if (labelData) {
            initFeatures.push(labelData);
          }
        }
      }

      if (this.labelType === "label") {
        //设置特征例不能选择
        featureData.forEach((feature) => {
          for (let item of this.checkValues) {
            if (item.name === feature) {
              this.$set(item, "disabled", true);
              break;
            }
          }
        });
      } else {
        if (labelData) {
          if (labelData instanceof Array) {
            labelData.forEach((label) => {
              for (let item of this.checkValues) {
                if (item.name === label) {
                  this.$set(item, "disabled", true);
                  break;
                }
              }
            });
          } else {
            for (let item of this.checkValues) {
              if (labelData === item.name) {
                this.$set(item, "disabled", true);
                break;
              }
            }
          }
        }
      }

      this.selectValues = Array.from(new Set(initFeatures));

      let checkedCount = this.selectValues.length;
      this.checkAll = checkedCount === this.checkValues.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkValues.length;
    },
    showFeatureCheck() {
      this.dialogVisible = true;
    },
    disFeatureCheck() {
      this.dialogVisible = false;
    },
    handleSelectChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkValues.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkValues.length;
      let selects = [];
      value.forEach((val) => {
        for (let item of this.checkValues) {
          if (!item.disabled) {
            if (item.name === val) {
              selects.push(val);
              break;
            }
          }
        }
      });
      if (this.pType !== "List") {
        if (selects.length > 1) {
          this.$alert("此参数只能选择一项，将使用当前选项", "提示", {
            confirmButtonText: "确定",
            callback: () => {
              let delval = selects.shift();
              for (let index = 0; index < this.selectValues.length; index++) {
                if (this.selectValues[index] === delval) {
                  this.selectValues.splice(index, 1);
                  break;
                }
              }
              this.$emit("featureSelect", {
                type: this.labelType,
                value: selects.toString(),
              });
            },
          });
        } else {
          this.$emit("featureSelect", {
            type: this.labelType,
            value: selects.toString(),
          });
        }
      } else {
        this.$emit("featureSelect", {
          type: this.labelType,
          value: selects,
        });
      }
    },
    handleCheckAllChange(val) {
      let checked = this.checkValues.map((item) => item.name);
      let selected = [];
      this.checkValues
        .filter((item) => item.disabled)
        .map((item) => {
          for (let el of this.selectValues) {
            if (el === item.name) {
              selected.push(el);
              break;
            }
          }
        });
      this.selectValues = val ? checked : selected;
      this.isIndeterminate = false;
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
