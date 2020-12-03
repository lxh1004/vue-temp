<template>
  <div ref="myecharts" class="echarts-container" :style="{'height':cmHeight+'px'}"></div>
</template>

<script>
import {
  options,
  dataOption,
  yAxe,
  xAxe,
  gridopt,
  eTitle,
} from "./echart_tools";

export default {
  name: "echartscomp",
  data() {
    return {
      myechartsLine: null,
    };
  },
  watch: {
    echartsData: {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.initEchartsData();
          }, 500);
        }
      },
      deep: true,
    },
  },
  props: {
    echartsData: {
      type: Array,
      default: () => [],
    },
    echartSmooth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dataSize() {
      return this.echartsData.length;
    },
    cmHeight() {
      let height = 0;
      if (this.dataSize % 2 === 0) {
        height = (this.dataSize / 2) * 320;
      } else {
        if (this.dataSize === 1) {
          height = 320;
        }
        height = (this.dataSize / 2 + 1) * 320;
      }
      return height;
    },
    chartDatas() {
      let rowNumber = Math.ceil(Math.sqrt(this.dataSize));
      let gridDatas = [];
      let yAxeDatas = [];
      let xAexDatas = [];
      let dataOptArr = [];
      let titleDatas = [];
      this.echartsData.forEach((item, idx) => {
        let grid = new gridopt();
        grid.left = ((idx % rowNumber) / rowNumber) * 100 + 1 + "%";
        grid.top = (Math.floor(idx / rowNumber) / rowNumber) * 100 + 10 + "%";
        grid.width = (1 / rowNumber) * 100 - 6 + "%";
        grid.height = 250;
        gridDatas.push(grid);
        let yaxe = new yAxe();
        yaxe.gridIndex = idx;
        yaxe.name = item.ylabel;
        yAxeDatas.push(yaxe);
        let xaxe = new xAxe();
        xaxe.gridIndex = idx;
        xaxe.name = item.xlabel;
        xAexDatas.push(xaxe);
        let itemData = item.data;
        for (let _item of itemData) {
          for (let key in _item) {
            let dataOpt = new dataOption();
            dataOpt.name = key;
            dataOpt.xAxisIndex = idx;
            dataOpt.yAxisIndex = idx;
            dataOpt.data = _item[key];
            dataOptArr.push(dataOpt);
          }
        }
        let title = new eTitle();
        title.left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + "%";
        title.top = parseFloat(grid.top) - 6 + "%";
        title.text = item.title;
        titleDatas.push(title);
      });

      return {
        grids: gridDatas,
        yAxes: yAxeDatas,
        xAxes: xAexDatas,
        dataOpt: dataOptArr,
        titles: titleDatas,
      };
    },
  },
  mounted() {
  },
  methods: {
    initEchartsData() {
      console.log("chart data :", this.chartDatas);
      this.myechartsLine = this.$echarts.init(this.$refs["myecharts"]);
      let chartOption = new options();
      chartOption.grid = this.chartDatas.grids;
      chartOption.xAxis = this.chartDatas.xAxes;
      chartOption.yAxis = this.chartDatas.yAxes;
      chartOption.series = this.chartDatas.dataOpt;
      chartOption.title = this.chartDatas.titles;
      this.myechartsLine.setOption(chartOption);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-container {
  position: relative;
  width: 100%;
}
</style>