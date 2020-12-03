<template>
  <div class="container">
    <el-form
      label-width="80px"
      label-position="top"
      ref="paramsform"
      style="margin-top: 25px"
    >
      <template v-for="(item, index) in selectParam">
        <el-form-item :prop="item.name" :key="index" :label="item.desc">
          <el-input
            v-if="item.front === 'TextBox' && item.ptype === 'Unicode'"
            type="text"
            :disabled="!item.is_edit || isDraggable"
            v-model="item.default"
          ></el-input>
          <el-input
            v-else-if="
              item.front === 'TextBox' &&
              (item.ptype === 'Integer' || item.ptype === 'Float')
            "
            :disabled="!item.is_edit || isDraggable"
            type="number"
            :max="item.max_val"
            :min="item.min_val"
            v-model="item.default"
            v-only-number="{
              min: item.min_val,
              max: item.max_val,
              precision: item.ptype === 'Float' ? 6 : 0,
            }"
          ></el-input>
          <el-slider
            v-else-if="item.front === 'HorizonSlider'"
            :max="item.max_val"
            :min="item.min_val"
            :disabled="!item.is_edit || isDraggable"
            v-model="item.default"
            :step="item.step"
            show-input
          ></el-slider>
          <el-select
            v-else-if="
              item.front === 'DropRadioBox' || item.front === 'DropCheckBox'
            "
            :disabled="!item.is_edit || isDraggable"
            v-model="item.default"
            :multiple="item.front === 'DropCheckBox'"
            collapse-tags
          >
            <el-option
              v-for="opItem in item.choice"
              :key="opItem"
              :value="opItem"
            ></el-option>
          </el-select>
          <el-switch
            v-else-if="item.front === 'SwitchBox'"
            :disabled="!item.is_edit || isDraggable"
            v-model="item.default"
          ></el-switch>
          <el-button
            v-else-if="item.front === 'FeatureCheckBox'"
            :disabled="!item.is_edit || isDraggable"
            type="primary"
            @click="showCheckBox(item.name, item.desc, item.ptype)"
            >{{ item.desc }}</el-button
          >
          <el-button
            v-else-if="item.front === 'DummyFeatureCheckBox'"
            :disabled="!item.is_edit || isDraggable"
            type="primary"
            @click="
              showDummyCheckBox(item.name, item.desc, item.ptype, item.default)
            "
            >{{ item.desc }}</el-button
          >
          <div v-show="item.front === 'UploadButton'">
            <upload-com
              @previewCsv="previewCsv"
              @dataSetId="getDatasetId"
              @disabledRun="setRunState"
              ref="uploadbtncom"
            ></upload-com>
          </div>
        </el-form-item>
      </template>
    </el-form>
    <dialog-dummy-check
      ref="dialogdummy"
      :check-values="jobCsvData"
      :dialog-title="dummyDesc"
      :dummy-ptype="dummyPtype"
      :dummy-name="dummyName"
      :select-id="dummySelecId"
      :dummy-value="dummyValue"
      @checkChange="dummyCallBack"
    ></dialog-dummy-check>
    <feature-check-box
      ref="dialogFeatureCheck"
      :check-values="checkValues"
      @featureSelect="callFeatureSelect"
    ></feature-check-box>
    <dialog-preview ref="previewdialog"></dialog-preview>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dialogPreview from "./DialogCsvpreview";
import dialogDummyCheck from "./DialogDummyCheckbox";
import uploadCom from "./ParamUpload";
import featureCheckBox from "./FeatureCheckBox";
export default {
  name: "",
  components: { dialogPreview, dialogDummyCheck, uploadCom, featureCheckBox },
  data() {
    return {
      paramsValue: {},
      dummyDesc: "",
      dummyPtype: "",
      dummyName: "",
      dummyValue: [],
      datasetId: null,
    };
  },

  props: {
    paramsMap: {
      type: Object,
      default: () => {},
    },
    initialData: {
      type: Object,
      default: () => {},
    },
    selectId: {
      type: [Number, String],
      default: "",
    },
  },
  computed: {
    ...mapGetters(["jobCsvData"]),
    checkValues() {
      let dataArr = [];
      for (let item of this.jobCsvData) {
        let data = {
          name: item,
          disabled: false,
        };
        dataArr.push(data);
      }
      return dataArr;
    },
    dummySelecId() {
      return this.uuid + this.dummyName;
    },
    isDraggable() {
      return !this.$store.getters.getViDragDis;
    },
    selectParam() {
      let param = this.paramsMap[this.selectId];
      return param;
    },
  },
  watch: {
    selectParam: {
      handler(value) {
        this.$nextTick(() => {
          if (value) {
            for (let item of value) {
              if (item.name === "data_id") {
                this.$refs["uploadbtncom"][0].dataSetId = item.default;
                break;
              }
            }
          }
        });
      },
      deep: true,
    },
    // checkValues: {
    //   handler(value) {
    //     if (value.length > 0) {
    //       let featureParam = {};
    //       for (let item of this.selectParam) {
    //         if (item.front === "FeatureCheckBox") {
    //           if (item.name === "label") {
    //             featureParam["label"] = item;
    //           } else {
    //             featureParam["feature"] = item;
    //           }
    //         }
    //       }
    //       let dialogFeature = this.$refs["dialogFeatureCheck"];
    //       dialogFeature.initValues = featureParam;
    //     }
    //   },
    //   deep: true,
    // },
  },
  mounted() {},
  methods: {
    getDatasetId(value) {
      this.datasetId = value;
      this.clearParams();
      let data = {
        name: "data_id",
        default: value,
      };
      let hasdataid = false;
      for (let item of this.selectParam) {
        if (item.name === "data_id") {
          item.default = value;
          hasdataid = true;
          break;
        }
      }
      if (!hasdataid) {
        this.selectParam.push(data);
      }
      this.$emit("disRunState", "run");
    },
    setRunState(type) {
      this.$emit("disRunState", type);
    },
    clearParams() {
      for (let key in this.initialData) {
        this.initialData[key].forEach((param, index) => {
          this.paramsMap[key][index].default = param.default;
        });
      }
    },
    dummyCallBack(data) {
      for (let item of this.selectParam) {
        if (item.front === "DummyFeatureCheckBox")
          if (item.name === data.name) {
            item.default = data.value;
            break;
          }
      }
    },
    callFeatureSelect(data) {
      for (let item of this.selectParam) {
        if (item.front === "FeatureCheckBox")
          if (item.name === data.type) {
            item.default = data.value;
            break;
          }
      }
    },
    showCheckBox(type, title, ptype) {
      this.checkValues.forEach((item) => {
        this.$set(item, "disabled", false);
      });
      let featureParam = {};
      for (let item of this.selectParam) {
        if (item.front === "FeatureCheckBox") {
          if (item.name === "label") {
            featureParam["label"] = item;
          } else {
            featureParam["feature"] = item;
          }
        }
      }
      let dialogFeature = this.$refs["dialogFeatureCheck"];
      dialogFeature.labelType = type;
      dialogFeature.pType = ptype;
      dialogFeature.dialogTitle = title;
      dialogFeature.initValues = featureParam;
      this.$nextTick(() => {
        dialogFeature.showFeatureCheck();
      });
    },
    showDummyCheckBox(name, desc, ptype, value) {
      this.dummyName = name;
      this.dummyDesc = desc;
      this.dummyPtype = ptype;
      this.dummyValue = value;
      this.$refs.dialogdummy.showDummyCheck();
    },
    previewCsv(datasetId) {
      this.$refs["previewdialog"].datasetId = datasetId;
      this.$refs["previewdialog"].showDialog();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: calc(100% - 60px);
  width: 100%;
}
</style>
