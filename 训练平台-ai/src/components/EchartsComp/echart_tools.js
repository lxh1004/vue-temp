let xAxe = () => {
  return {
    type: "value",
    show: true,
    gridIndex: 0,
    nameTextStyle:{
      color:' #409eff'
    },
    splitLine:{
      show:false
    }
  };
};
let yAxe = () => {
  return {
    type: "value",
    show: true,
    gridIndex: 0,
    nameTextStyle:{
      color:' #409eff'
    },
    splitLine:{
      show:false
    }
  };
};
let eTitle = () => {
  return {
    show: true,
    text: "",
    textStyle: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
    },
  };
};
let gridopt = () => {
  return {
    show: true,
    borderWidth: 0,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowBlur: 2,
    containLabel:true,
  };
};


let options = () => {
  let chartOption = {
    title: [],
    xAxis: [],
    yAxis: [],
    grid: [],
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    tooltip: {
      //设置tip提示
      show:true,
      trigger: "axis",
      formatter: (params) => {
        let tooltipstr = "指标：<br/>";
        for (let param of params) {
          tooltipstr += `${param.seriesName}: ${param.value}<br/>`;
        }
        return tooltipstr;
      },
      padding: 10,
      position: "top",
    },
    series: [],
  };
  return chartOption;
};
let dataOption = () => {
  let dataset = {
    name: "",
    data: [],
    xAxisIndex: 0,
    yAxisIndex: 0,
    type: "line", // 类型为折线图
    smooth:true,
    symbol: "circle",
    showSymbol: false,
    // lineStyle: {
    //   // 线条样式 => 必须使用normal属性
    //   normal: {
    //     width:1,
    //     color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    //   },
    // },
  };
  return dataset;
};

export { options, dataOption ,xAxe,yAxe,eTitle,gridopt};
