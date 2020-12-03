<template>
  <div class="table-container">
    <el-table
      :data="data"
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
      border
    >
      <el-table-column
        type="index"
        align="center"
        v-if="showNum"
        label="序号"
        :width="numWidth"
      ></el-table-column>
      <el-table-column
        align="center"
        v-for="(item, index) in columns"
        :key="index"
        :sortable="item.sort"
        :prop="item.attrName"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div class="table-item-group">
            <!-- 用户状态 -->
            <span
              v-if="item.isType === 'status'"
              :class="[
                scope.row[item.attrName] === 1
                  ? 'status-dot-grean'
                  : 'status-dot-red',
              ]"
            ></span>
            <!-- bug状态 -->
            <span
              v-if="item.isType === 'bugstatus'"
              :class="[scope.row[item.attrName] === 1 ? 'status-dot-red' : '']"
            ></span>
            <span
              v-if="item.isType === 'bugstatus'"
              :class="[
                scope.row[item.attrName] === 0 ? 'status-dot-grean' : '',
              ]"
            ></span>
            <span
              v-if="item.isType === 'bugstatus'"
              :class="[
                scope.row[item.attrName] === 2 ? 'status-dot-orange' : '',
              ]"
            ></span>
            <!--  bug图片 -->
            <div
              v-if="item.isBug === 'bug'"
              style="width: 100px; height: 100px"
              class="bugimgs"
            >
              <el-image
                v-if="scope.row[item.attrName].length > 0"
                style="width: 100px; height: 100px"
                :src="scope.row[item.attrName][0]"
                alt="sorry"
                :preview-src-list="scope.row[item.attrName]"
              >
              </el-image>
            </div>

            <span
              class="btn-type"
              v-else-if="item.eventType === 'toBug'"
              @click="operateType(item.eventType, scope.row)"
              >{{ checkType(item.isType, scope.row[item.attrName]) }}</span
            >
            <span class="normal-text" v-else>{{
              checkType(item.isType, scope.row[item.attrName])
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="operation.length > 0"
        align="center"
        label="操作"
        :width="operationWidth"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              v-for="(item, index) in operation"
              :key="index"
              :type="item.type"
              :icon="item.icon"
              :title="item.operateName"
              @click="operateType(item.opreatetype, scope.row, scope.$index)"
              circle
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'commontable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    showNum: {
      type: Boolean,
      default: false,
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
        case 'status': //状态：是否启用
          if (value == 1) {
            label = '启用'
          } else {
            label = '禁用'
          }
          break
        case 'bugstatus': //BUG 的状态
          if (value == 1) {
            label = '未关闭'
          } else if (value == 2) {
            label = '已修复'
          } else {
            label = '关闭'
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
.status-dot-orange {
  background: orange;
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

.bugimgs {
  cursor: pointer;
}
</style>

