<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    destroy-on-close
    width="60%"
    @close="cancel"
    title="统计数据"
  >
    <div class="table-data">
      <div class="table-left-group">
        <div class="table-left-head" v-if="indexArr.length>0">属性名</div>
        <div
          class="table-left-head"
          v-for="(tItem, index) in indexArr"
          :key="index"
        >
          {{ tItem }}
        </div>
      </div>
      <div class="table-data-item" v-for="item in dataArr" :key="item.title">
        <div class="table-data-item-title">{{ item.title }}</div>
        <div
          class="table-data-item-title"
          v-for="(tItem, index) in item.value"
          :key="index"
        >
          {{ tItem }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dialog-statistics",
  data() {
    return {
      visibleDialog: false,
    };
  },
  props: {
    statisticData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    indexArr() {
      return this.statisticData.index;
    },
    dataArr() {
      let data = [];
      let scdata = this.statisticData.data;
      for (let key in scdata) {
        let item = {
          title: key,
          value: scdata[key],
        };
        data.push(item);
      }
      return data;
    },
  },
  mounted() {

  },
  methods: {
    cancel() {
      this.visibleDialog = false;
    },
    showDialog() {
      this.visibleDialog = true;
    },
  },
};
</script>
<style scoped lang="scss">
.table-data {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
.table-data-item {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: solid 1px #eee;
}
.table-data-item-title {
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
  min-width: 100px;
  margin: 2px 0;
  line-height: 30px;
  height: 30px;
  border-bottom: solid 1px #eee;
  &:first-child {
    color: white;
    background: $auto_primary_color;
  }
}
.table-left-head {
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
  min-width: 200px;
  line-height: 34px;
  height: 34px;
  border-bottom: solid 1px #eee;
  color: $subtitle_color;
  background: $line_color;
  &:first-child {
    background: $auto_primary_color;
    line-height: 30px;
    height: 30px;
    margin: 2px 0;
    color: white;
  }
}
.table-left-group {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: solid 1px #eee;
}
</style>
