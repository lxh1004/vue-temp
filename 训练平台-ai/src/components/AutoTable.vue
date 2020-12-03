<template>
  <div class="table-container">
    <el-table :data="data"
              style="width: 100%;"
              :header-cell-style="tableHeaderColor"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column :align="contentAlign"
                       v-if="showSelection"
                       type="selection"></el-table-column>
      <el-table-column :align="contentAlign"
                       v-if="showIndex"
                       label="序号"
                       type="index"></el-table-column>
      <el-table-column v-for="(item, index) in columns"
                       :align="contentAlign"
                       :key="index"
                       :prop="item.attrName"
                       :label="item.label"
                       :width="item.width"
                       :min-width="item.minWidth?item.width:averMinWidth">
        <template slot-scope="scope">
          <div class="table-item-group"
               :style="{ textAlign: contentAlign }">
            {{
              item.isType === "jobStatus"
                ? checkStatus(scope.row[item.attrName])
                : scope.row[item.attrName]
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="operation.length > 0"
                       :align="contentAlign"
                       label="操作"
                       :width="operationWidth">
        <template slot-scope="scope">
          <el-button v-for="(item, index) in operation"
                     :class="[item.operatetype === 'deljob' ? 'delete-btn' : 'opreate-btn',]"
                     :key="index"
                     :disabled="scope.row['jobStatus']===0||scope.row['jobStatus']===2"
                     type="text"
                     @click="operateType(item.operatetype, scope.row)">
            {{item.operateName }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  computed: {
    ...mapGetters(['jobStatusData']),
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    operation: {
      type: Array,
      default: () => [],
    },
    otherOperations: {
      type: Object,
      default: () => {
        return {
          options: [],
        }
      },
    },
    operationWidth: {
      type: Number,
      default: () => 0,
    },
    showSelection: {
      type: Boolean,
      default: false,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    contentAlign: {
      type: String,
      default: 'left',
    },
    headerColor: {
      type: String,
      default: '#409eff',
    },
    headerTextColor: {
      type: String,
      default: '#fff',
    },
    averMinWidth:{
      type:Number,
      default:0
    }
  },
  data() {
    return {}
  },
  components: {},
  mounted() {},
  methods: {
    // 修改table header的背景色
    tableHeaderColor() {
      return `background-color: ${this.headerColor};color:${this.headerTextColor}`
    },
    operateType(type, value) {
      this.$emit('operate', { type: type, value: value })
    },
    handleSelectionChange(val) {
      this.$emit('operate', { type: 'selection', value: val })
    },

    checkStatus(type) {
      let name = type
      for (let item of this.jobStatusData) {
        if (item.jobStatus === type) {
          name = item.statusName
          break
        }
      }
      return name
    },
  },
}
</script>

<style scoped lang="scss">
.table-container {
  position: relative;
  width: 100%;
}

.btn-type {
  color: $title_color;
  cursor: pointer;
  &:hover {
    color: $auto_primary_color;
  }
}
.normal-text {
  color: $title_color;
}
.opreate-btn {
  cursor: pointer;
  color: $auto_primary_color;
  margin-right: 10px;
}
.delete-btn {
  cursor: pointer;
  color: $auto_danger_color;
  margin-right: 10px;
}

.table-item-group {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.status-dot {
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 5px;
}
</style>
