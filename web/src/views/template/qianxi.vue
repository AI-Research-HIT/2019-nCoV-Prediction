<template>
  <div class="mychart3" id="mychart3"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import china from "echarts/map/js/china.js";

var geoMap = {};
var option = {};
var planePath =
  "path://M.6p,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";

var convertData = function(data) {
  var res = [];
  // console.log(1);
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = geoMap[dataItem[0].name];
    var toCoord = geoMap[dataItem[1].name];
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: fromCoord
        },
        {
          coord: toCoord
        }
      ]);
    }
  }
  // console.log(res);
  return res;
};

var WHdata = [];
var alldata = [];
var days = [];
var daymap = {};
var cnt = 0;
var allout = [];
var citymap = {};
var cityin = [];
function parsecsv(csv) {
  var lines = csv.split("\n");
  cnt = 0;
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    if (values[1] != null) {
      var date = values[5].substring(0, 8);
      if (daymap[date] == null) {
        days.push(date);
        daymap[date] = cnt;
        WHdata.push([]);
        alldata.push([]);
        allout.push(0);
        cnt++;
      }
    }
  }
  // console.log(WHdata);
  // console.log(daymap);
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    if (values[1] != null) {
      var city = values[1];
      var date = values[5].substring(0, 8);
      var num = parseInt(values[4]);
      WHdata[daymap[date]].push([{ name: "武汉" }, { name: city, value: num }]);
      alldata[daymap[date]].push({ name: city, value: num });
      allout[daymap[date]] += num;
      var cityid = citymap[city];
      if (cityin[cityid].length != daymap[date]) {
        var cal = daymap[date] - cityin[cityid].length;
        for (var j = 1; j <= cal; j++) {
          cityin[cityid].push(0);
          // WHdata[daymap[date]-j].push([{name:"武汉"},{name:city,value:0}]);
          // alldata[daymap[date]-j].push({ name: city, value: 0 });
        }
      }
      cityin[cityid].push(num);
    }
  }
}

var cityname = [];

axios.get("static/assets/data2.json").then(s => {
  var geoJson = s.data;
  var geodata = geoJson["features"];
  for (var i = 0; i < geodata.length; i++) {
    geoMap[geodata[i]["properties"]["name"]] = geodata[i]["properties"]["cp"];
  }
  echarts.registerMap("chinacity", geoJson);
  var mapFeatures = echarts.getMap("chinacity").geoJson.features;
  var ccnt = 0;
  mapFeatures.forEach(function(v) {
    var name = v.properties.name;
    cityname.push(name);
    if (citymap[name] == null) {
      citymap[name] = ccnt;
      ccnt++;
      cityin.push([]);
    }
  });
});

var myChart = {};
var tag1 = 0;
function setreli() {
  // console.log("setreli");
  option = {};
  option = {
    baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: false,
        playInterval: 3000,
        symbolSize: 12,
        left: "5%",
        right: "5%",
        bottom: "0%",
        width: "45%",
        data: days,
        tooltip: {
          formatter: days
        }
      },

      visualMap: {
        show: true,
        type: "piecewise",
        pieces: [
          { min: 10000, max: 50000 },
          { min: 5000, max: 10000 },
          { min: 1000, max: 5000 },
          { min: 200, max: 1000 },
          { min: 50, max: 200 },
          { min: 1, max: 50 }
        ],
        showLabel: true,
        left: "5%",
        bottom: "10%",
        text: ["迁徙人数"],
        calculable: true,
        inRange: {
          color: ["#F6CED8", "#D90505"]
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
        formatter: "{b}<br/>人数：{c}"
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
    options: [],
    animationDurationUpdate: 3000,
    animationEasingUpdate: "quinticInOut"
  };
  // console.log(option);
  for (var k = 0; k < days.length; k++) {
    option.options.push({
      title: [
        {
          text: days[k] + "武汉迁徙到其他城市人数分布",
          subtext: "点击城市可查看武汉迁入人数趋势",
          textStyle: {
            color: "#2D3E53",
            fontSize: 20
          },
          left: 20,
          top: 20
        },
        {
          text: "武汉出城人数趋势图",
          x: "65%",
          top: "10%"
        }
      ],

      legend: {
        data: ["自武汉出城人数"],
        right: "5%",
        top: "15%"
      },
      toolbox: {
        padding: 30,
        right: "5%",
        show: true,
        feature: {
          myTool: {
            show: true,
            title: "查看迁徙图形式",
            icon:
              "path://M525.4 721.2H330.9c-9 0-18.5-7.7-18.5-18.1V311c0-9 9.3-18.1 18.5-18.1h336.6c9.3 0 18.5 9.1 18.5 18.1v232.7c0 6 8.8 12.1 15 12.1 6.2 0 15-6 15-12.1V311c0-25.6-25.3-48.9-50.1-48.9h-335c-26.2 0-50.1 23.3-50.1 48.9v389.1c0 36.3 20 51.5 50.1 51.5h197.6c6.2 0 9.3-7.5 9.3-15.1 0-6-6.2-15.3-12.4-15.3zM378.8 580.6c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h141.4c6.2 0 12.3-5.8 12.3-13.4 0.3-9.5-6.2-15.9-12.3-15.9H378.8z m251.6-91.2c0-6-6.2-14.6-12.3-14.6H375.7c-6.2 0-12.4 8.6-12.4 14.6s6.2 14.6 12.4 14.6h240.8c6.2 0.1 13.9-8.5 13.9-14.6z m-9.2-120.5H378.8c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h240.8c7.7 0 13.9-8.6 13.9-14.6s-6.2-14.6-12.3-14.6z m119.4 376.6L709 714.1c9.2-12 14.6-27 14.6-43.2 0-39.4-32.1-71.4-71.8-71.4-39.7 0-71.8 32-71.8 71.4s32.1 71.4 71.8 71.4c16.3 0 31.3-5.4 43.4-14.5l31.6 31.5c3.8 3.8 10 3.8 13.8 0 3.8-3.8 3.8-10 0-13.8z m-88.8-23.6c-28.3 0-51.3-22.8-51.3-51s23-51 51.3-51c28.3 0 51.3 22.8 51.3 51s-23 51-51.3 51z",
            onclick: function() {
              setqianxi();
              myChart.setOption(option, true);
              // console.log(option);
            }
          }
        }
      },
      xAxis: {
        type: "category",
        data: days,
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
          data: alldata[k],
          itemStyle: {
            normal: {
              areaColor: "white"
            }
          }
        },
        {
          name: "自武汉出城人数",
          type: "line",
          // smooth:true,
          data: allout,
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
}

var options = [];
function setqianxi() {
  // console.log("setqianxi");
  var color = ["#3ed4ff", "#ffa022", "#a6c84c"];
  // var color = ["pruple","blue","purple"];
  var series = [];
  options = [];
  for (var i = 0; i < cnt; i++) {
    [["武汉", WHdata[i]]].forEach(function(item, i) {
      series.push([
        {
          name: item[0],
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: "#fff",
            // color:"black",
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
          // data:item[1]
        },
        {
          name: item[0],
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0],
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            if (val[2] < 10) {
              return 2;
            } else if (val[2] < 100) {
              return 4;
            } else if (val[2] < 1000) {
              return 8;
            } else if (val[2] < 10000) {
              return 16;
            } else {
              return 30;
            }
            // return val[2] / 800;
          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function(dataItem) {
            // console.log(geoMap[dataItem[1].name]);
            // console.log(dataItem[1]);
            return {
              name: dataItem[1].name,
              value: geoMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        }
      ]);
    });
    options.push({ series: series[i] });
  }
  option = {
    baseOption: {
      timeline: {
        textStyle: {
          color: "#fff"
          // color:"black"
        },
        axisType: "category",
        autoPlay: false,
        playInterval: 3000,
        symbolSize: 12,
        left: "5%",
        right: "5%",
        bottom: "0%",
        width: "90%",
        data: days,
        tooltip: {
          formatter: days
        }
      },
      backgroundColor: "#080a20",
      // backgroundColor: "white",
      title: {
        text: "武汉至全国迁徙图",
        subtext: "点击右上按钮切换至热力图",
        left: "left",
        textStyle: {
          color: "#fff"
          // color:"black"
        }
      },
      tooltip: {
        trigger: "item",
        // formatter: "{b}<br/>人数：{c}"
        formatter: function(data) {
          if (data.name == "武汉") {
            return "";
          } else {
            return data.name + ": " + data.value[2];
          }
        }
      },
      toolbox: {
        padding: 30,
        show: true,
        right: "5%",
        feature: {
          myTool1: {
            show: true,
            title: "查看热力形式",
            icon:
              "path://M525.4 721.2H330.9c-9 0-18.5-7.7-18.5-18.1V311c0-9 9.3-18.1 18.5-18.1h336.6c9.3 0 18.5 9.1 18.5 18.1v232.7c0 6 8.8 12.1 15 12.1 6.2 0 15-6 15-12.1V311c0-25.6-25.3-48.9-50.1-48.9h-335c-26.2 0-50.1 23.3-50.1 48.9v389.1c0 36.3 20 51.5 50.1 51.5h197.6c6.2 0 9.3-7.5 9.3-15.1 0-6-6.2-15.3-12.4-15.3zM378.8 580.6c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h141.4c6.2 0 12.3-5.8 12.3-13.4 0.3-9.5-6.2-15.9-12.3-15.9H378.8z m251.6-91.2c0-6-6.2-14.6-12.3-14.6H375.7c-6.2 0-12.4 8.6-12.4 14.6s6.2 14.6 12.4 14.6h240.8c6.2 0.1 13.9-8.5 13.9-14.6z m-9.2-120.5H378.8c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h240.8c7.7 0 13.9-8.6 13.9-14.6s-6.2-14.6-12.3-14.6z m119.4 376.6L709 714.1c9.2-12 14.6-27 14.6-43.2 0-39.4-32.1-71.4-71.8-71.4-39.7 0-71.8 32-71.8 71.4s32.1 71.4 71.8 71.4c16.3 0 31.3-5.4 43.4-14.5l31.6 31.5c3.8 3.8 10 3.8 13.8 0 3.8-3.8 3.8-10 0-13.8z m-88.8-23.6c-28.3 0-51.3-22.8-51.3-51s23-51 51.3-51c28.3 0 51.3 22.8 51.3 51s-23 51-51.3 51z",
            onclick: function() {
              setreli();
              myChart.setOption(option, true);
              // console.log(option);
            }
          }
        }
      },
      legend: {
        orient: "vertical",
        top: "bottom",
        left: "right",
        data: ["北京 Top10", "上海 Top10", "广州 Top10"],
        textStyle: {
          // color: "#fff"
          color: "black"
        },
        selectedMode: "single"
      },
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#132937",
            // areaColor:"white",
            borderColor: "#0692a4"
          },
          emphasis: {
            areaColor: "#0b1c2d"
            // areaColor:"yellow"
          }
        }
      },
      series: series[0]
    },
    options: options
  };
}

axios.get("static/20200110.CSV").then(s => {
  var csv = s.data;

  for (var i = 0; i < 20; i++) {
    setTimeout(function() {
      if (geoMap["上海"] != null && tag1 == 0) {
        tag1 = 1;
        parsecsv(csv);
        // console.log(WHdata);
        setreli();
      }
      // setqianxi();
    }, 1000 * i);
  }
});

export default {
  mounted() {
    myChart = echarts.init(document.getElementById("mychart3"));
    myChart.showLoading();
    var tag2 = 0;
    var provinceoption = {};
    for (var i = 0; i < 20; i++) {
      setTimeout(function() {
        if (option.baseOption != null && tag2 == 0) {
          tag2 = 1;
          // console.log("qianxi:");
          // console.log(option);
          myChart.setOption(option);
          provinceoption = JSON.parse(JSON.stringify(option));
          myChart.hideLoading();
        }
      }, 1000 * i);
    }

    myChart.on("click", param => {
      event.stopPropagation();
      // console.log("test");
      // console.log(option.baseOption.grid);
      // console.log(param.name);
      if (option.baseOption.grid != null) {
        if (
          citymap[param.name] != null &&
          cityin[citymap[param.name]][0] != null
        ) {
          for (var i = 0; i < days.length; i++) {
            provinceoption.options[i].series[1].data =
              cityin[citymap[param.name]];
            provinceoption.options[i].title[1].text =
              "武汉到" + param.name + "人数趋势图";
          }
          // console.log(provinceoption);
          myChart.setOption(provinceoption, true);
        } else if (param.name.length != 8) {
          // console.log("1");
          myChart.setOption(option, true);
        }
      }
    });

    // myChart.on("click", param => {
    //   event.stopPropagation();
    //   console.log(param);
    // });
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
.mychart3 {
  width: 100%;
  height: 600px;
}
</style>

