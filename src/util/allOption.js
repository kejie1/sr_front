var lineData = {
  year: [
    [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
    [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
  ],
};

var barOption = {
  color: ["#2f89cf"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: "0%",
    top: "10px",
    right: "0%",
    bottom: "4%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: "8",
        },
      },
      axisLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
          // width: 1,
          // type: "solid"
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
    },
  ],
  series: [
    {
      name: "直接访问",
      type: "bar",
      barWidth: "35%",
      data: [200, 300, 300, 900, 1500, 1200, 600],
      itemStyle: {
        barBorderRadius: 5,
      },
    },
  ],
};

var lineOption = {
  color: ["#00f2f1", "#ed3f35"],
  tooltip: {
    // 通过坐标轴来触发
    trigger: "axis",
  },
  legend: {
    // 距离容器10%
    right: "10%",
    // 修饰图例文字的颜色
    textStyle: {
      color: "#4c9bfd",
    },
    // 如果series 里面设置了name，此时图例组件的data可以省略
    // data: ["邮件营销", "联盟广告"]
  },
  grid: {
    top: "20%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    show: true,
    borderColor: "#012f4a",
    containLabel: true,
  },

  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
    // 去除刻度
    axisTick: {
      show: false,
    },
    // 修饰刻度标签的颜色
    axisLabel: {
      color: "rgba(255,255,255,.7)",
    },
    // 去除x坐标轴的颜色
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    // 去除刻度
    axisTick: {
      show: false,
    },
    // 修饰刻度标签的颜色
    axisLabel: {
      color: "rgba(255,255,255,.7)",
    },
    // 修改y轴分割线的颜色
    splitLine: {
      lineStyle: {
        color: "#012f4a",
      },
    },
  },
  series: [
    {
      name: "男生",
      type: "line",
      stack: "总量",
      // 是否让线条圆滑显示
      smooth: true,
      data: lineData.year[0],
    },
    {
      name: "女生",
      type: "line",
      stack: "总量",
      smooth: true,
      data: lineData.year[1],
    },
  ],
};

var pieOption = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
    position: function (p) {
      //其中p为当前鼠标的位置
      return [p[0] + 10, p[1] - 10];
    },
  },
  // legend: {
  //   top: "90%",
  //   itemWidth: 10,
  //   itemHeight: 10,
  //   data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
  //   textStyle: {
  //     color: "rgba(255,255,255,.5)",
  //     fontSize: "12"
  //   }
  // },
  legend: {
    top: "90%",
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "rgba(255,255,255,.5)",
      fontSize: "12",
    },
  },
  series: [
    {
      name: "高中同院校比例",
      type: "pie",
      center: ["50%", "42%"],
      radius: ["40%", "60%"],
      color: [
        "#065aab",
        "#066eab",
        "#0682ab",
        "#0696ab",
        "#06a0ab",
        "#06b4ab",
        "#06c8ab",
        "#06dcab",
        "#06f0ab",
      ],
      label: { show: false },
      labelLine: { show: true },
      data: [],
    },
  ],
};

var bar1Data = [70, 34, 60, 78, 69];
var bar1Titlename = ["讯飞学院", "软件学院", "智能制造学院", "大数据学院", "金融学院"];
var bar1Valdata = [702, 350, 610, 793, 664];
var bar1MyColor = ["#1089E7", "#6699CC", "#56D0E3", "#CCFF99", "#CCFFFF"];
var bar1Option = {
  //图标位置
  grid: {
    top: "10%",
    left: "25%",
    bottom: "10%",
  },
  xAxis: {
    show: false,
  },
  yAxis: [
    {
      show: true,
      data: bar1Titlename,
      inverse: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#fff",

        rich: {
          lg: {
            backgroundColor: "#339911",
            color: "#fff",
            borderRadius: 15,
            // padding: 5,
            align: "center",
            width: 15,
            height: 15,
          },
        },
      },
    },
    {
      show: true,
      inverse: true,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      data: bar1Data,
      barCategoryGap: 50,
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: 20,
          color: function (params) {
            var num = bar1MyColor.length;
            return bar1MyColor[params.dataIndex % num];
          },
        },
      },
      label: {
        normal: {
          show: true,
          position: "inside",
          formatter: "{c}%",
        },
      },
    },
    {
      name: "框",
      type: "bar",
      yAxisIndex: 1,
      barCategoryGap: 50,
      data: [100, 100, 100, 100, 100],
      barWidth: 15,
      itemStyle: {
        normal: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15,
        },
      },
    },
  ],
};
var line1Option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#dddc6b",
      },
    },
  },
  legend: {
    top: "0%",
    textStyle: {
      color: "rgba(255,255,255,.5)",
      fontSize: "12",
    },
  },
  grid: {
    left: "20",
    top: "30",
    right: "10",
    bottom: "10",
    containLabel: true,
  },

  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 8,
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },

      data: [],
    },
    {
      axisPointer: { show: false },
      axisLine: { show: false },
      position: "bottom",
      offset: 20,
    },
  ],

  yAxis: [
    {
      type: "value",
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12,
        },
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
    },
  ],
  series: [
    {
      name: "男生",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          color: "#0184d5",
          width: 2,
        },
      },
      areaStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(1, 132, 213, 0.1)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
      itemStyle: {
        normal: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12,
        },
      },
      data: [],
    },
    {
      name: "女生",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          color: "#00d887",
          width: 2,
        },
      },
      areaStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 216, 135, 0.4)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 216, 135, 0.1)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          // color: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: "rgba(0, 216, 135, 0.4)"
          //     },
          //     {
          //       offset: 0.8,
          //       color: "rgba(0, 216, 135, 0.1)"
          //     }
          //   ],
          //   false
          // ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
      itemStyle: {
        normal: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12,
        },
      },
      data: [],
    },
  ],
};
var pie1Option = {
  legend: {
    top: "90%",
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "rgba(255,255,255,.5)",
      fontSize: "12",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  // 注意颜色写的位置
  color: [
    "#006cff",
    "#60cda0",
    "#ed8884",
    "#ff9f7f",
    "#0096ff",
    "#9fe6b8",
    "#32c5e9",
    "#1d9dff",
  ],
  series: [
    {
      name: "各民族占例",
      type: "pie",
      // 如果radius是百分比则必须加引号
      radius: ["10%", "70%"],
      center: ["50%", "42%"],
      roseType: "radius",
      data: [],
      // 修饰饼形图文字相关的样式 label对象
      label: {
        fontSize: 10,
      },
      // 修饰引导线样式
      labelLine: {
        // 连接到图形的线长度
        length: 10,
        // 连接到文字的线长度
        length2: 10,
      },
    },
  ],
};

module.exports = {
  barOption,
  lineOption,
  pieOption,
  bar1Option,
  line1Option,
  pie1Option,
};
