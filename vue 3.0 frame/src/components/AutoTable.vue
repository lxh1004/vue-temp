<template>
  <div>
    <!-- 中部列表表格 -->
    <el-table
      :data="tableData"
      :header-cell-style="tableHeaderColor"
      highlight-current-row
      border
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
        v-if="gg ? true : false"
      ></el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        v-for="(itemtest, index) in title"
        :key="index"
        v-if="!itemtest.operate"
        :sortable="itemtest.sort"
        :prop="itemtest.attrName"
        :label="itemtest.label"
        :width="itemtest.width"
      >
        <template slot-scope="scope">
          <div class="table-item-group">
            <!-- 配置启用禁用的颜色 -->
            <i
              v-if="itemtest.isType === 'status'"
              :class="[
                scope.row[itemtest.prop] === 1
                  ? 'status-dot-grean'
                  : 'status-dot-red',
              ]"
              class="el-icon-message-solid"
            ></i>
            <!-- 表格中具体的某一项点击事件 -->
            <span
              class="btn-type"
              v-if="itemtest.eventType"
              @click="operateType(itemtest.eventType, scope.row, scope.$index)"
              >{{ checkType(itemtest.isType, scope.row[itemtest.prop]) }}</span
            >
            <!-- 正常表格渲染数据 -->
            <span class="normal-text" v-else>{{
              checkType(itemtest.isType, scope.row[itemtest.prop])
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :label="itemtest.label"
        :width="itemtest.width"
        :prop="itemtest.prop"
        align="center"
      >
        <template slot-scope="scope">
          <slot
            :name="itemtest.prop"
            :$index="scope.$index"
            :row="scope.row"
          ></slot>
          <!-- 对应slot name -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tabletable',
  props: {
    title: {
      type: Array,
      default: [],
    },
    tableData: {
      type: Array,
      default: [],
    },
    gg: Boolean,
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor() {
      return 'background-color: #F4F4F4;'
    },
    operateType(type, value, index) {
      this.$emit('operate', { type: type, value: value, index: index })
    },
    checkType(type, value) {
      let label = ''
      switch (type) {
        case 'teskType': //测试任务类型
          if (value === 1) {
            label = '功能测试'
          } else if (value === 2) {
            label = '性能测试'
          } else if (value === 3) {
            label = '稳定性测试'
          }
          break
        case 'status': //状态：是否启用
          if (value == 1) {
            label = '启用'
          } else {
            label = '禁用'
          }
          break
        default:
          label = value
      }
      return label
    },
  },
}
</script>

<style scoped lang="scss">
.normal-text {
  color: $title_color;
}
.btn-type {
  color: $title_color;
  cursor: pointer;
  &:hover {
    color: $auto_primary_color;
  }
}
.status-dot-grean {
  color: #6dd400;
  // width: 10px;
  // height: 10px;
  // margin-right: 10px;
  // border-radius: 5px;
}
.status-dot-red {
  color: #e02020;
  // width: 10px;
  // height: 10px;
  // margin-right: 10px;
  // border-radius: 5px;
}
.table-item-group {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>