<template>
  <div class="mychart2" id="mychart2"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import china from "echarts/map/js/china.js";
import heilongjiang from "echarts/map/json/province/heilongjiang.json";
var days = [];
var ddays = [];
var uploadedDataURL = "static/assets/data-1519188124693-rkro_O5vz.json";

var cityname = [];
var option = {};

var citydatas = [];

var cityNewdata = {};
var cityConfirmeddata = {};
var cityNames = [];
var mapdata = [];
var allConfirmed = [];
var allNew = [];
var provinceoption = {};
var daymap = {};

var cityfunc = {
  "2301": "哈尔滨市",
  "2302": "齐齐哈尔市",
  "2303": "鸡西市",
  "2304": "鹤岗市",
  "2305": "双鸭山市",
  "2306": "大庆市",
  "2307": "伊春市",
  "2308": "佳木斯市",
  "2309": "七台河市",
  "2310": "牡丹江市",
  "2311": "黑河市",
  "2312": "绥化市",
  "2313": "大兴安岭地区"
};
var citymap = {
  哈尔滨市: 1,
  齐齐哈尔市: 2,
  鸡西市: 3,
  鹤岗市: 4,
  双鸭山市: 5,
  大庆市: 6,
  伊春市: 7,
  佳木斯市: 8,
  七台河市: 9,
  牡丹江市: 10,
  黑河市: 11,
  绥化市: 12,
  大兴安岭地区: 13
};
var daycnt = 0;
function parsecsv(csv) {
  var lines = csv.split("\n");
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    var date = values[5];
    if (date != null && daymap[date] == null) {
      daymap[date] = daycnt;
      daycnt++;
      days.push(date);
      ddays.push("0" + date.split("0200")[1]);
      mapdata.push([]);
      allNew.push(0);
    }
    // if(days.length==0){
    //   days.push(date);
    //   // ddays.push(date.split('0200')[1]);
    //   ddays.push(date);
    //   daymap[date] = i-1;
    //   mapdata.push([]);
    //   allNew.push(0);
    // }else if(days.length==(i-1)&&days[0]!=date){
    //   days.push(date);
    //   console.log(date);
    //   // ddays.push(date.split('0200')[1]);
    //   ddays.push(date);
    //   daymap[date] = i-1;
    //   mapdata.push([]);
    //   allNew.push(0);
    // }else{
    //   break;
    // }
  }
  // console.log(daymap);
  // console.log(mapdata);
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    if (values[0] != "null") {
      var cityName = cityfunc[values[0]];
      var value = parseFloat(values[1]);
      var date = values[5];
      if (date) {
        mapdata[daymap[date]].push({ name: cityName, value: value });
        if (cityNewdata[cityName] == null) {
          cityNewdata[cityName] = [];
        }
        cityNewdata[cityName].push(value);
      }
    }
  }
  for (var i = 0; i < days.length; i++) {
    for (var key in cityNewdata) {
      allNew[i] += cityNewdata[key][i];
    }
  }

  // console.log(allNew);
  // console.log(cityNewdata);
  // console.log(mapdata);
}

axios
  .get("static/xinjianxuan172024base_conn_city_stat_0120_0215.csv")
  .then(s => {
    var loadcsv = s.data;
    // console.log(loadjson);
    parsecsv(loadcsv);
    var geoJson = s.data;
    echarts.registerMap("heilongjiang", heilongjiang);
    var mapFeatures = echarts.getMap("heilongjiang").geoJson.features;
    // console.log(mapFeatures);
    mapFeatures.forEach(function(v) {
      var name = v.properties.name;
      cityname.push(name);
    });
    setTimeout(function() {
      option = {
        baseOption: {
          // backgroundColor: '#021926',
          timeline: {
            axisType: "category",
            // realtime: false,
            // loop: false,
            autoPlay: false,
            playInterval: 3000,
            symbolSize: 12,
            left: "5%",
            right: "5%",
            bottom: "0%",
            width: "45%",
            // controlStyle: {
            //     position: 'left'
            // },
            data: days,
            tooltip: {
              formatter: days
            }
          },

          visualMap: {
            show: true,
            type: "piecewise",
            pieces: [
              { min: 6000, max: 10000 },
              { min: 5000, max: 6000 },
              { min: 4000, max: 5000 },
              { min: 3000, max: 4000 },
              { min: 2000, max: 3000 },
              { min: 1, max: 2000 }
              // { min: 1, max: 1500 }
            ],
            showLabel: true,
            left: "5%",
            bottom: "10%",
            // top: 'bottom',
            text: ["活跃度"],
            calculable: true,
            inRange: {
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              // color: ['#23074d', '#cc5333'] // 紫红
              // color: ["#F6CED8", "#D90505"] //蓝红
              color: ["#fff", "#D90505"]
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['white','#1488CC', '#2B32B2'] // 浅蓝
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
            }
          },
          geo: {
            show: true,
            color: "white",
            map: "heilongjiang",
            top: "20%",
            right: "55%",
            left: "10%",
            bottom: "15%",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: false
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>活跃度：{c}"
          },
          grid: {
            right: "5%",
            top: "20%",
            bottom: "10%",
            width: "40%"
          },
          series: [
            {
              name: "累计人数",
              type: "map",
              mapType: "heilongjiang",
              geoIndex: 0,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "white"
                }
              },
              roam: false
            }
          ]
        },
        //   animationDurationUpdate: 3000,
        //   animationEasingUpdate: "quinticInOut",
        options: [],
        animationDurationUpdate: 3000,
        animationEasingUpdate: "quinticInOut"
      };
      for (var k = 0; k < days.length; k++) {
        option.options.push({
          title: [
            {
              text: days[k] + "黑龙江省各城市人群活跃度",
              subtext: "人群活跃度为该城市5点到24点基站连接人数均值",
              textStyle: {
                color: "#2D3E53",
                fontSize: 20
              },
              left: 20,
              top: 20
            },
            {
              text: "哈尔滨市人群活跃度趋势图",
              x: "65%",
              top: "10%"
            }
          ],

          legend: {
            data: ["活跃度"],
            right: "5%",
            top: "15%"
          },
          // toolbox: {
          //   show: true,
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: "none"
          //     },
          //     dataView: { readOnly: false },
          //     magicType: { type: ["line", "bar"] },
          //     restore: {},
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: "category",
            data: ddays,
            boundaryGap: true
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} "
            },
            scale: true
          },
          series: [
            {
              type: "map",
              data: mapdata[k],
              itemStyle: {
                normal: {
                  areaColor: "white"
                }
              }
            },
            {
              name: "活跃度",
              type: "line",
              // smooth:true,
              data: cityNewdata["哈尔滨市"],
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "red"
                  }
                }
              }
            }
          ]
        });
      }
      // console.log(option);
    }, 1000);
  });
export default {
  name: "mychart2",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById("mychart2"));
    myChart.showLoading();
    var tag2 = 0;
    for (var i = 0; i < 20; i++) {
      setTimeout(function() {
        if (option.baseOption != null && tag2 == 0) {
          tag2 = 1;
          // console.log(option);
          myChart.setOption(option);
          provinceoption = JSON.parse(JSON.stringify(option));
          myChart.hideLoading();
        }
      }, 1000 * i);
    }
    myChart.getZr().on("click", parm => {
      if (parm.target == null) {
        myChart.setOption(option, true);
      }
    });
    myChart.on("click", param => {
      event.stopPropagation();
      console.log(param.name);
      if (citymap[param.name] != null) {
        for (var i = 0; i < days.length; i++) {
          provinceoption.options[i].series[1].data = cityNewdata[param.name];
          provinceoption.options[i].title[1].text =
            param.name + "人群活跃度趋势图";
        }
        // console.log(provinceoption);
        myChart.setOption(provinceoption);
      } else if (param.name.length != 9) {
        // console.log(param.name);
        // console.log(param.name.length);
        myChart.setOption(option, true);
      }
    });
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
.mychart2 {
  width: 100%;
  height: 600px;
}
</style>

