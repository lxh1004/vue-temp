const options = () => {
    let chartOption = {
        title: {
          show: true,
          text: '',
          textStyle:{
          fontStyle: 'normal',
          fontWeight:'normal',
          fontSize:14
          }
        },
        color: ["#007aff"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [],
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#8A8A8A",
            fontSize: 16,
            padding: [0, 0, 0, 10],
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#8A8A8A",
            },
          },
        },
        yAxis: {
          name: "",
          nameTextStyle: {
            color: "#8A8A8A",
            fontSize: 14,
            padding: [0, 0, 5, 0],
          },
          axisLine: {
            lineStyle: {
              color: "#8A8A8A",
            },
          },
          type: "value",
        },
        tooltip: {
          //设置tip提示
          trigger: "item",
          formatter: "{a}：{c}",
          padding:10,
          position:'top'
        },
        series: [],
      };
  return chartOption;
};
const dataOption = () => {
    let dataset = {
        name: "",
        data: [],
        type: "line", // 类型为折线图
       
        lineStyle: {
          // 线条样式 => 必须使用normal属性
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#1274E0",
                },
                {
                  offset: 1,
                  color: "#61FECF",
                },
              ],
              global: false,
            },
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#CEE2F9", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#8EFFDE", // 100% 处的颜色
              },
            ],
            global: false,
          },
        },
      };
  return dataset;
};

export { options, dataOption };
