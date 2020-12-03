<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    destroy-on-close
    width="60%"
    @close="cancel"
    :title="echartTitle"
  >
    <auto-echarts :title="echartTitle" :echarts-data="indexData.echartdata" :echart-smooth="true"></auto-echarts>
    <div class="table-data">
      <div class="table-data-item" v-for="item in indexData.tableData" :key="item.key">
        <div class="table-data-item-title">{{ item.key }}</div>
        <div
          class="table-data-item-title"
          v-for="(tItem,index) in item.value"
          :key="index"
        >{{ tItem }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import AutoEcharts from "@/components/EchartsComp";
export default {
  name: "dialognodeecharts",
  components: {
    AutoEcharts,
  },
  data() {
    return {
      visibleDialog: false,
    };
  },
  computed: {
    indexData() {
      let data = {};
      let dataArr = [];
      let echartdata = [];
      for (let item of this.echartData) {
        item = JSON.parse(item);
        if (item.front === "table") {
          data = item.data;
        } else {
          echartdata.push(item);
        }
      }
      for (let key in data) {
        let dataItem = {
          key: key,
          value: data[key],
        };
        dataArr.push(dataItem);
      }
      let edata = [];
      echartdata.forEach((item) => {
        let itemdata = item.data;
        let x = itemdata.x;
        let y = itemdata.y;
        let linedata = [];
        let _onedata = {};
        let _vdata = [];
        if (item.front === "curve") {
          y.forEach((yItem, index) => {
            let ledata = [x[index], yItem];
            _vdata.push(ledata);
          });
          _onedata["data"] = _vdata;
          linedata.push(_onedata);
        } else {
          for (let key in y) {
            let _tdata = {};
            let _dataArr = [];
            y[key].forEach((ylitem, ylidx) => {
              let _data = [x[ylidx], ylitem];
              _dataArr.push(_data);
            });
            _tdata[key] = _dataArr;
            linedata.push(_tdata);
          }
        }
        let eldata = {
          title: itemdata.title,
          xlabel: itemdata.x_label,
          ylabel: itemdata.y_label,
          type: item.front,
          data: linedata,
        };
        edata.push(eldata);
      });

      return { tableData: dataArr, echartdata: edata };
    },
  },
  props: {
    echartTitle: {
      type: String,
      default: "",
    },
    echartData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {},
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

<style lang="scss" scoped>
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
  padding: 5px 15px;
  box-sizing: border-box;
  min-width: 100px;
  margin: 2px 0;
  border-bottom: solid 1px #eee;
  &:first-child {
    color: white;
    background: $auto_primary_color;
  }
}
</style>