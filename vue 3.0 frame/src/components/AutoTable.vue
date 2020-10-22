<template>
  <div class="table-container">
    <el-table
      :data="data"
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
      border
    >
      <el-table-column type="selection" align="center" width="50"></el-table-column>
      <el-table-column type="index" align="center" label="序号" :width="numWidth"></el-table-column>
      <el-table-column
        align="center"
        v-for="(item,index) in columns"
        :key="index"
        :sortable="item.sort"
        :prop="item.attrName"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div class="table-item-group">
            <span
              v-if="item.isType==='status'"
              :class="[scope.row[item.attrName]===1?'status-dot-grean':'status-dot-red']"
            ></span>
            <span
              class="btn-type"
              v-if="item.eventType"
              @click="operateType(item.eventType,scope.row)"
            >{{checkType(item.isType,scope.row[item.attrName])}}</span>
            <span class="normal-text" v-else>{{checkType(item.isType,scope.row[item.attrName])}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="operation.length>0" align="center" label="操作" :width="operationWidth">
        <template slot-scope="scope">
          <span
            v-for="(item,index) in operation"
            :key="index"
            class="opreate-btn"
            @click="operateType(item.opreatetype,scope.row,scope.$index)"
          >
            <i :class="[item.icon]"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
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

    operationWidth: {
      type: Number,
      default: () => 0,
    },
    numWidth: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    // 修改table header的背景色
    tableHeaderColor() {
      return "background-color: #F4F4F4;";
    },
    operateType(type, value, index) {
      this.$emit("operate", { type: type, value: value, index: index });
    },

    checkType(type, value) {
      let label = "";
      switch (type) {
        case "teskType": //测试任务类型
          if (value === 1) {
            label = "功能测试";
          } else if (value === 2) {
            label = "性能测试";
          } else if (value === 3) {
            label = "稳定性测试";
          }
          break;
        case "status": //状态：是否启用
          if (value == 1) {
            label = "启用";
          } else {
            label = "禁用";
          }
          break;
        default:
          label = value;
      }
      return label;
    },
  },
};
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
  color: $subtitle_color;
  font-size: 18px;
  margin-right: 10px;
  &:hover {
    opacity: 0.8;
  }
}
.status-dot-grean {
  background: #6dd400;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 5px;
}
.status-dot-red {
  background: #e02020;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 5px;
}
.table-item-group {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

