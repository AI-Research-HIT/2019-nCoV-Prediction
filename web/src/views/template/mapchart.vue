<template>
  <div class="mychart" id="mychart"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import china from "echarts/map/js/china.js";
var days = [];

var uploadedDataURL = "static/assets/data-1519188124693-rkro_O5vz.json";

var cityname = [];
var option = {};

var citydatas = [];

var cityNewdata = {};
var cityConfirmeddata = {};
var cityNames = [];
var mapdata = [];
var citymap = {};
var allConfirmed = [];
var allNew = [];
var exeConfirmed = [];
var exeNew = [];
var provinceoption = {};
var hubeiConfirmed = [];
var hubeiNew = [];
var ddays = [];
var jsonend = 0;
function parsejson(jsdata) {
  var province = jsdata["省份"];
  days = jsdata["上海市"]["时间"];
  for (var i = 0; i < days.length; i++) {
    mapdata.push([]);
    allConfirmed.push(0);
    allNew.push(0);
    hubeiConfirmed.push(0);
    hubeiNew.push(0);
    exeConfirmed.push(0);
    exeNew.push(0);
  }
  var cnt = 0;
  for (var i = 0; i < province.length; i++) {
    var provinceName = province[i];
    var provinceConfirmed = jsdata[provinceName]["确诊"];
    var provinceNew = jsdata[provinceName]["新增确诊"];
    var protime = jsdata[provinceName]["时间"];
    for (var k = 0; k < days.length; k++) {
      if (protime[k] != days[k]) {
        if (k == 0) {
          provinceConfirmed.splice(k, 0, 0);
          provinceNew.splice(k, 0, 0);
        } else {
          provinceConfirmed.splice(k, 0, provinceConfirmed[k - 1]);
          provinceNew.splice(k, 0, provinceConfirmed[k - 1]);
        }
      }
      if (provinceName != "湖北省") {
        exeConfirmed[k] += provinceConfirmed[k];
        exeNew[k] += provinceNew[k];
      } else {
        hubeiConfirmed[k] += provinceConfirmed[k];
        hubeiNew[k] += provinceNew[k];
      }
      allConfirmed[k] += provinceConfirmed[k];
      allNew[k] += provinceNew[k];
      mapdata[k].push({ name: provinceName, value: provinceConfirmed[k] });
    }
    // console.log(jsdata[provinceName]);
    var citys = jsdata[provinceName]["城市"];
    for (var j = 0; j < citys.length; j++) {
      var cityName = citys[j];
      cityNames.push(cityName);
      citymap[cityName] = cnt;
      cnt = cnt + 1;
      var dtime = jsdata[provinceName][cityName]["时间"];
      var cityConfirmed = jsdata[provinceName][cityName]["确诊"];
      var cityNew = jsdata[provinceName][cityName]["新增确诊"];
      for (var k = 0; k < days.length; k++) {
        if (dtime[k] != days[k]) {
          if (k == 0) {
            cityConfirmed.splice(k, 0, 0);
            cityNew.splice(k, 0, 0);
          } else {
            cityConfirmed.splice(k, 0, cityConfirmed[k - 1]);
            cityNew.splice(k, 0, cityConfirmed[k - 1]);
          }
        }
        mapdata[k].push({ name: cityName, value: cityConfirmed[k] });
      }
      cityConfirmeddata[cityName] = cityConfirmed;
      cityNewdata[cityName] = cityNew;
    }
  }
  jsonend = 1;
  // mapdata.splice(0, 0, mapdata[days.length - 1]);
  // ddays[0] = days[days.length - 1];
  // for (var i = 0; i < days.length - 1; i++) {
  //   ddays.push(days[i]);
  // }
}

// axios.get('static/2019-nCoV-data.json').then(s=>{
//     console.log(s.data);
// });
axios.get("static/2019-nCoV-data.json").then(s => {
  var loadjson = s.data;
  // console.log(loadjson);
  parsejson(loadjson);
});

function makeoption(){
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
          currentIndex: days.length-1,
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
            { min: 1000, max: 100000 },
            { min: 200, max: 1000 },
            { min: 50, max: 200 },
            { min: 10, max: 50 },
            { min: 1, max: 10 }
          ],
          showLabel: true,
          left: "5%",
          bottom: "10%",
          // top: 'bottom',
          text: ["确诊病例"],
          calculable: true,
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ["#F6CED8", "#D90505"] //蓝红
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
          map: "chinacity",
          right: "50%",
          left: "5%",
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
          formatter: "{b}<br/>{a}：{c}"
        },
        grid: {
          right: "5%",
          top: "20%",
          bottom: "10%",
          width: "40%"
        },
        series: [
          {
            name: "累计确诊人数",
            type: "map",
            mapType: "chinacity",
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
            text: days[k] + "新型冠状病毒全国分布图",
            subtext: "点击空白区域返回全国地图",
            textStyle: {
              color: "#2D3E53",
              fontSize: 20
            },
            left: 20,
            top: 20
          },
          {
            text: "全国疫情累计/新增确诊趋势图",
            
            x: "62.5%",
            top: "5%"
          }
        ],
        color: ["red", "red", "blue", "green", "grey", "black", "purple"],
        legend: [
          {
            data: ["全国累计确诊", "湖北累计确诊", "非湖北累计确诊"],
            right: "5%",
            top: "15%"
          },
          {
            data: ["全国新增确诊", "湖北新增确诊", "非湖北新增确诊"],
            right: "5%",
            top: "10%"
          }
        ],
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
          axisLine: {
            onZero: false
          },
          // boundaryGap: false,
          data: days
          // data: ['1/24', '1/25', '1/26', '1/27', '1/28', '1/29', '1/30','1/31','2/1','2/2','2/3','2/4','2/5','2/6','2/7','2/8','2/9','2/10','2/11','2/12','2/13','2/14','2/15','2/16','2/17','2/18']
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} "
          }
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
            name: "全国累计确诊",
            type: "line",
            // smooth:true,
            data: allConfirmed,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "red"
                }
              }
            }
          },
          {
            name: "全国新增确诊",
            type: "line",
            // smooth:true,
            data: allNew,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "blue"
                }
              }
            }
          },
          {
            name: "湖北新增确诊",
            type: "line",
            // smooth:true,
            data: hubeiNew,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "green"
                }
              }
            }
          },
          {
            name: "湖北累计确诊",
            type: "line",
            // smooth:true,
            data: hubeiConfirmed,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "gray"
                }
              }
            }
          },
          {
            name: "非湖北新增确诊",
            type: "line",
            // smooth:true,
            data: exeNew,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "purple"
                }
              }
            }
          },
          {
            name: "非湖北累计确诊",
            type: "line",
            // smooth:true,
            data: exeConfirmed,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "black"
                }
              }
            }
          }
        ]
      });
    }
}
axios.get(uploadedDataURL).then(s => {
  var geoJson = s.data;
  echarts.registerMap("chinacity", geoJson);
  var mapFeatures = echarts.getMap("chinacity").geoJson.features;
  mapFeatures.forEach(function(v) {
    var name = v.properties.name;
    cityname.push(name);
  });
  for(var i = 0;i<20;i++){
    setTimeout(function() {
      if(jsonend==1&&option.baseOption==null){
        makeoption();
      }
    }, 1000*i);
  }
});
export default {
  name: "mychart",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById("mychart"));
    myChart.showLoading();
    setTimeout(function() {
      //console.log(option);
    }, 3000);
    var flag = 0;
    for(var i = 0;i<20;i++){
      setTimeout(function() {
        if(flag == 0&&option.baseOption!=null){
          flag = 1;
          myChart.hideLoading();
          myChart.setOption(option);
          provinceoption = JSON.parse(JSON.stringify(option));
          for (var i = 0; i < days.length; i++) {
            provinceoption.options[i].series.pop();
            provinceoption.options[i].series.pop();
            provinceoption.options[i].series.pop();
            provinceoption.options[i].series.pop();
            provinceoption.options[i].series[1].name = "累计确诊";
            provinceoption.options[i].series[2].name = "新增确诊";
            provinceoption.options[i].legend = {
              data: ["累计确诊", "新增确诊"],
              right: "5%",
              top: "15%"
            };
            provinceoption.options[i].color = ["red", "red", "blue"];
            provinceoption.options[i].legend.data[0] = "累计确诊";
            provinceoption.options[i].legend.data[1] = "新增确诊";
          }
        }
      }, 1000*i);
    }
    
    myChart.getZr().on("click",parm=>{
      if (parm.target==null) {
        myChart.setOption(option, true);
      }
    });
    myChart.on("click", param => {
      event.stopPropagation();
      //console.log(param);
      if (citymap[param.name] != null) {
        for (var i = 0; i < days.length; i++) {
          provinceoption.options[i].series[1].data =
            cityConfirmeddata[param.name];
          provinceoption.options[i].series[2].data = cityNewdata[param.name];
          provinceoption.options[i].title[1].text =
            param.name + "疫情累计/新增确诊趋势图";
        }
        //console.log(provinceoption);
        myChart.setOption(provinceoption, true);
      } else if (param.name.length != 5) {
        // console.log("1");
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
.mychart {
  width: 100%;
  height: 600px;
}
</style>

