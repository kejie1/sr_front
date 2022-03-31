<template>
  <div class="body">
    <header>
      <h1>新生报到系统可视化大屏</h1>
      <div class="showTime">当前时间：{{ newTime }}</div>
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel bar">
          <h2>各学院报到学院人数</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>年龄分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>高中同院校比例</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>{{ registerCount }}</li>
              <li>{{ nowRegisterCount }}</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>应报道人数</li>
              <li>实际报道人数</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div class="chart"></div>
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar1">
          <h2>各学院报到比例</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line1">
          <h2>折线图-播放量</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie1">
          <h2>民族比例</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { XAData, XNData, YCData, planePath, geoCoordMap } from "@/util/mapInfo";
import {
  barOption,
  lineOption,
  pieOption,
  bar1Option,
  line1Option,
  pie1Option,
} from "@/util/allOption";
import {
  queryeThnicDesc,
  queryCollegeCount,
  studentsList,
  queryAgeCount,
  queryeGraduateDesc
} from "@/api/students";
import { collegeList as allCollegeList } from "@/api/college";
import { nationList } from "@/util/Enum";
export default {
  data() {
    return {
      newTime: "2022年3月17-0时54分14秒",
      nowYear: 2021,
      collegeList: [],
      collegeCount: [],
      registerCount: 0, //应注册总人数
      nowRegisterCount: 0, //已注册人数
      ageCount: [], //年龄数据
      birthPlaceMap: [],
    };
  },
  computed: {},
  watch: {
    newTime() {
      setTimeout(() => {
        this.getNewTime();
      }, 1000);
    },
    async "$store.state.collegeList"() {
      this.collegeList = this.$store.state.collegeList;
      this.collegeCount = await this.getCollegeCount();
      this.getBar();
    },
  },
  created() {},
  async mounted() {
    this.getNewTime();
    await this.getRegisterCount();
    await this.getNowRegisterCount();
    await this.setBirthPlaceMap();
    await this.myMap();
    await this.getAgeCount();
    await this.getLine();
    this.getPie();
    this.getBar1();
    this.getline1();
    this.getPie1();
  },
  methods: {
    getNewTime() {
      const dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours(); //获取时
      let m = dt.getMinutes(); //获取分
      let s = dt.getSeconds(); //获取秒
      this.nowYear = y;
      this.newTime =
        y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
    },
    myMap() {
      let myChart = this.$echarts.init(document.querySelector(".map .chart"));
      const color = ["#fff", "#fff", "#fff"]; //航线的颜色
      let series = [];
      [
        ["西安", XAData],
        ["西宁", XNData],
        ["银川", YCData],
      ].forEach((item, i)=> {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "red", //arrow箭头的颜色
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: this.convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: this.convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });
      const mapOption = {
        tooltip: {
          trigger: "item",
          formatter: function (params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },

        geo: {
          map: "china",
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          roam: false,
          //   放大我们的地图
          zoom: 1,
          itemStyle: {
            normal: {
              areaColor: "rgba(43, 196, 243, 0.42)",
              borderColor: "rgba(43, 196, 243, 1)",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };

      myChart.setOption(mapOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getBar() {
      let myChart = this.$echarts.init(document.querySelector(".bar .chart"));
      const dataName = this.collegeCount
        ? this.collegeCount.map((x) => x.name)
        : [];
      const dataValue = this.collegeCount
        ? this.collegeCount.map((x) => x.value)
        : [];
      barOption.xAxis[0].data = dataName;
      barOption.series[0].data = dataValue;
      myChart.setOption(barOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getLine() {
      let myChart = this.$echarts.init(document.querySelector(".line .chart"));
      const dataName = this.ageCount ? this.ageCount.map((x) => x.age) : [];
      const dataValue = this.ageCount ? this.ageCount.map((x) => x.cntNum) : [];
      lineOption.xAxis.data = dataName;
      lineOption.series[0].data = dataValue;
      lineOption.series[1].data = dataValue;
      myChart.setOption(lineOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    async getPie() {
      let myChart = this.$echarts.init(document.querySelector(".pie .chart"));
      const temp = await this.getGraduateDesc()
      pieOption.series[0].data = temp
      myChart.setOption(pieOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getBar1() {
      let myChart = this.$echarts.init(document.querySelector(".bar1 .chart"));
      myChart.setOption(bar1Option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getline1() {
      let myChart = this.$echarts.init(document.querySelector(".line1 .chart"));
      myChart.setOption(line1Option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    async getPie1() {
      let myChart = this.$echarts.init(document.querySelector(".pie1 .chart"));
      const temp = await this.getThnicDesc();
      pie1Option.series[0].data = temp;
      myChart.setOption(pie1Option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    async getCollegeCount() {
      const { data: res } = await queryCollegeCount();
      let temp;
      if (res.code == 200) {
        temp = res.data.map((x) => ({
          value: x.cntNum,
          name: this.collegeList[x.collegeId].collegeStr,
        }));
      }
      return temp;
    },
    // 民族比例
    async getThnicDesc() {
      const { data: res } = await queryeThnicDesc();
      let temp;
      if (res.code == 200) {
        temp = res.data.map((x) => ({
          value: x.cntNum,
          name: nationList[x.ethnic].label,
        }));
      }
      return temp.slice(0, 5);
    },
    // 总人数
    async getRegisterCount() {
      const { data: res } = await allCollegeList({
        pageSize: 100000,
        currentPage: 1,
      });
      let temp = res.data.result.map((x) => x.register);
      this.registerCount = eval(temp.join("+"));
    },
    // 当前人数
    async getNowRegisterCount() {
      const { data: res } = await studentsList({
        pageSize: 10000,
        currentPage: 1,
      });
      const temp = res.data.pagination.total;
      const temp1 = res.data.result.map((x) => x.birthPlace.replace('市',''));
      this.nowRegisterCount = temp;
      this.birthPlaceMap = temp1;
    },
    // 年龄数量
    async getAgeCount() {
      const { data: res } = await queryAgeCount();
      if (res.code == 200) this.ageCount = res.data;
    },
    // 生源地
    async setBirthPlaceMap() {
      const temp = this.birthPlaceMap.map((x) => x.replace("市", ""));
      for (let i = 0; i < temp.length; i++) {
        XAData.push([
          { name: this.birthPlaceMap[i] },
          { name: "重庆", value: 100 },
        ]);
      }
    },
    //mapUtil
    convertData(param) {
      let res = [];
      for (let i = 0; i < param.length; i++) {
        
        let dataItem = param[i];
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value,
          });
        }
      }
      return res;
    },
    // 毕业学校
    async getGraduateDesc(){
      const {data:rs} = await queryeGraduateDesc()
      const temp1 = rs.data.map(x=>({
        value:x.cntNum,
        name:x.graduate
      })).splice(0,5)
      const temp2 = rs.data.splice(5,rs.data.length).map(x=>x.cntNum)
      const others = eval(temp2.join("+"))
      temp1.push({value:others,name:'其它'})
      return temp1
    }
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
@font-face {
  font-family: electronicFont;
  src: url(../../assets/font/DS-DIGIT.TTF);
}
.body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
  background: url(../../assets/images/bg.jpg) no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;
}
header {
  position: relative;
  height: 1.25rem;
  background: url(../../assets/images/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
  h1 {
    font-size: 0.475rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
  .showTime {
    position: absolute;
    top: 0;
    right: 0.375rem;
    line-height: 0.9375rem;
    font-size: 0.25rem;
    color: rgba(255, 255, 255, 0.7);
  }
}
.mainbox {
  min-width: 1024px;
  max-width: 1920px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  .column {
    flex: 3;
    &:nth-child(2) {
      flex: 5;
      margin: 0 0.125rem 0.1875rem;
      overflow: hidden;
    }
  }
}
.panel {
  position: relative;
  height: 3.875rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.04) url(../../assets/images/line.png);
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  .panel-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
  }

  h2 {
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    font-size: 0.25rem;
    font-weight: 400;
    a {
      margin: 0 0.1875rem;
      color: #fff;
      text-decoration: underline;
    }
  }
  .chart {
    height: 3rem;
  }
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
  .no-hd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      top: 0;
      left: 0;
    }
    &::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
      right: 0;
      bottom: 0;
    }
    ul {
      display: flex;
      li {
        position: relative;
        flex: 1;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.875rem;
        color: #ffeb7b;
        padding: 0.05rem 0;
        font-family: electronicFont;
        font-weight: bold;
        &:first-child::after {
          content: "";
          position: absolute;
          height: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
          right: 0;
          top: 25%;
        }
      }
    }
  }
  .no-bd ul {
    display: flex;
    li {
      flex: 1;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      font-size: 0.225rem;
      color: rgba(255, 255, 255, 0.7);
      padding-top: 0.125rem;
    }
  }
}
.map {
  position: relative;
  height: 10.125rem;
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    height: 10.125rem;
    width: 100%;
  }
  .map1,
  .map2,
  .map3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.475rem;
    height: 6.475rem;
    background: url(../../assets/images/map.png) no-repeat;
    background-size: 100% 100%;
    opacity: 0.3;
  }
  .map2 {
    width: 8.0375rem;
    height: 8.0375rem;
    background-image: url(../../assets/images/lbx.png);
    opacity: 0.6;
    animation: rotate 15s linear infinite;
    z-index: 2;
  }
  .map3 {
    width: 7.075rem;
    height: 7.075rem;
    background-image: url(../../assets/images/jt.png);
    animation: rotate1 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}
</style>
