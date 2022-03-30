<template>
  <div class="body">
    <header>
      <!-- <h1>新生报到系统可视化大屏</h1> -->
      <div class="showTime">当前时间：{{ newTime }}</div>
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel bar">
          <h2 @click="handleChangeBar">
            学院人数 <a href="javascript:;">{{nowYear}}</a>
            <a href="javacript:;"> {{nowYear -1 }}</a>
          </h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>折线图-人员变化</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-年龄分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>125811</li>
              <li>104563</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>前端需求人数</li>
              <li>市场供应人数</li>
            </ul>
          </div>
        </div>
        <div class="map" style="width:100%;height:400px">
          <div class="chart"></div>
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar1">
          <h2>柱状图-技能掌握</h2>
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
import { option } from "@/util/mapInfo";
import { barOption, lineOption, pieOption,bar1Option,line1Option,pie1Option } from "@/util/allOption";
import {queryeThnicDesc,queryCollegeCount} from '@/api/students'
import {nationList} from '@/util/Enum'
export default {
  data() {
    return {
      newTime: "2022年3月17-0时54分14秒",
      nowYear:2021,
      collegeList:[],
      collegeCount:[]
    };
  },
  computed: {},
 watch: {
    newTime(){
      setTimeout(() => {
        this.getNewTime()
      }, 1000);
    },
    async "$store.state.collegeList"() {
      this.collegeList = this.$store.state.collegeList;
      // 
      this.collegeCount = await this.getCollegeCount()
      this.getBar();
    },
  },
  created() {
  },
  mounted() {
    this.getNewTime();
    this.myMap();
    this.getLine()
    this.getPie()
    this.getBar1()
    this.getline1()
    this.getPie1()
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
      this.nowYear = y
      this.newTime =
        y +
        "年" +
        mt +
        "月" +
        day +
        "-" +
        h +
        "时" +
        m +
        "分" +
        s +
        "秒";
    },
    myMap() {
      let myChart = this.$echarts.init(document.querySelector(".map .chart"));
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getBar(temp) {
      let myChart = this.$echarts.init(document.querySelector(".bar .chart"));
      console.log(this.collegeCount);
      debugger
      barOption.xAxis[0].data = this.collegeCount.filter(x=>x.name)
      myChart.setOption(temp || barOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    handleChangeBar() {
      const dataAll = [
        { year: "2019", data: [200, 300, 300, 900, 1500, 1200, 600] },
        { year: "2020", data: [300, 400, 350, 800, 1800, 1400, 700] },
      ];
      barOption.series[0].data = dataAll[1].data;
      this.getBar();
    },
    getLine() {
      let myChart = this.$echarts.init(document.querySelector(".line .chart"));
      myChart.setOption(lineOption);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getPie() {
      let myChart = this.$echarts.init(document.querySelector(".pie .chart"));
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
      const temp = await this.getThnicDesc()
      pie1Option.series[0].data = temp
      myChart.setOption(pie1Option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 民族比例
    async getCollegeCount(){
      const {data:res} = await queryCollegeCount()
      let temp
      if(res.code == 200){
        setTimeout(() => {
          temp = res.data.map(x=>({
          value:x.cntNum,
          name:this.collegeList[x.collegeId].collegeStr
        }))
        }, 0);
      }
      return temp
    },
    async getThnicDesc(){
      const {data:res} = await queryeThnicDesc()
      let temp
      if(res.code == 200){
        temp = res.data.map(x=>({
          value:x.cntNum,
          name:nationList[x.ethnic].label
        }))
      }
      return temp.slice(0,5)
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
