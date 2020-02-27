<template>

    <section class="chart-container">
		<!--工具条-->
            <el-form ref="form" :model="form" class="history">
                <el-form-item label="选择地区: ">
                    <el-select v-model="form.city" @change="onProvinceChange" clearable placeholder="省份">
                        <el-option
                        v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
		        </el-form-item>
            </el-form>

		<el-form ref="form" :model="form" class="sim-input">
        <h4>仿真条件</h4>
        <el-form-item label="传染系数">
          <el-col :span="5">
              <el-input-number v-model="form.beta" :precision="3" :step="0.01" :max="10"></el-input-number>
			<!-- <el-input v-model="form.beta" placeholder="传染系数"></el-input> -->
          </el-col >
        </el-form-item>
        <el-form-item label="潜伏期天数">
            <el-col :span="5">
            <el-input-number v-model="form.te" :min="1" :max="24"></el-input-number>
          	<!-- <el-input v-model="form.te" placeholder="病毒潜伏时间"></el-input> -->
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
            <el-col :span="5">
            <el-date-picker v-model="form.endDate" type="date" placeholder="计算结束时间"></el-date-picker>
            </el-col>
        </el-form-item> 

        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始仿真</el-button>
        </el-form-item>
			</el-form>
        <el-row>
            <el-col :span="15">
                <div class="lschart" id="predictChart"></div>    
            </el-col>
        </el-row>
                <!-- <el-row>
          <el-col :span="12">
          <H3>新增确诊预测趋势</H3>
          <ve-line :data="newChartData" :setting="newChartSettings"></ve-line>
          </el-col>
        </el-row> -->
            <el-row>
                <H2>疫情时间节点对比</H2>
                <p>中间地图为计算时间区间中间时间的疫情情况，左右两图为下面滑动点控制的时间节点</p>
            <el-col :span="8">
              <div class="chinaMap" id="chinaMapBefore">
              </div>
            </el-col>
            <el-col :span="8">
              <div class="chinaMap" id="chinaMapNow">
              </div>
            </el-col>
            <el-col :span="8">
              <div class="chinaMap" id="chinaMapAfter">
              </div>
            </el-col>
        </el-row>
        <H3>拖动选择上图对比日期</H3>
        <p>两边滑动点分别控制以上左右图的显示时间，以比较不同时间节点的疫情情况</p>
          <div class="slider">
            <el-slider
            v-model="slidervalue"
            range
            :min="slidermin"
            :max="slidermax"
            :format-tooltip="formatTooltip"
            @change="sliderChange"
            :marks="slidermarks">
            </el-slider>
        </div>

    </section>

</template>


<script>
    import CountTo from 'vue-count-to'
    import { simulate } from '../../api/api';
    import echarts from "echarts";
    import 'echarts/map/js/china.js'
        
    var predictChart
    var dates = []
    var chinaChartBefore
    var chinaChartNow
    var chinaChartAfter

    var baseVisualMap= {
                show : true,
                x: 'left',
                y: 'center',
                splitList: [
                {start: 0, end: 0},{start: 1, end: 200},
                {start: 200, end: 400},{start: 400, end: 1000},
                {start: 1000, end: 2000},{start: 2000, end: 10000},{start: 10000}
                ],
                color: ['#ff2222', '#ff4444','#ff6666', '#ff9999', '#ffbbbb', '#ffcccc', '#ffeeee']
                }
    var baseMapSeries= [
            {
                name: "关键时间节点疫情比较",
                type: "map",
                mapType: "china",
                roam: false,
                zoom:1.2,//默认地图在容器中显示zoom:1,可根据需求放大缩小地图
                itemStyle:{
                    areaColor:'#ff0000',//地图区域背景颜色
                    borderColor:'#fff'//地图边界颜色
                },
                label: {
                    normal: {
                        show: false
                    },
                },
                data: [
                ]
            }]
  export default {
    components: {
        CountTo
    },
    mounted() {
        this.drawLine();
        this.drawMap();
    },
    methods: {
        formatTooltip(val) {
            if (val >= 0 && val < dates.length)
            return dates[val]
        },
        sliderChange() {
            //console.log(this.slidervalue)
            if (this.modelResult.length > 0) {
                if (this.slidervalue[0] >= 0 && this.slidervalue[0] < this.modelResult.length) {
                    var before = {name:this.selectedCity, value:this.modelResult[this.slidervalue[0]]['predictTotal']}
                    //console.log(before)
                    this.beforeMapOption.series[0].data = []
                    this.beforeMapOption.series[0].data.push(before)
                    this.beforeMapOption.title.text = this.modelResult[this.slidervalue[0]]['date'] + "：预测确诊" + before.value
                    chinaChartBefore.setOption(this.beforeMapOption)
                }

                if (this.slidervalue[1] >= 0 && this.slidervalue[1] < this.modelResult.length) {
                    var after = {name:this.selectedCity, value:this.modelResult[this.slidervalue[1]]['predictTotal']}
                    //console.log(after)
                    this.afterMapOption.title.text = this.modelResult[this.slidervalue[1]]['date'] + "：预测确诊" + after.value
                    this.afterMapOption.series[0].data = []
                    this.afterMapOption.series[0].data.push(after)
                    chinaChartAfter.setOption(this.afterMapOption)
                }
            }
        },
        calMapDate(data, idx) {            
            var before = {name:this.selectedCity, value:data[0]['predictTotal']}
            this.beforeMapOption.series[0].data = []
            this.beforeMapOption.series[0].data.push(before)
            this.beforeMapOption.title.text = data[0]['date']  + "：预测确诊" + before.value
            chinaChartBefore.setOption(this.beforeMapOption)

            if (idx == 0) {
                idx = parseInt(data.length/2)
            }
            //console.log(idx)
            var now = {name:this.selectedCity, value:data[idx]['predictTotal']}
            this.nowMapOption.series[0].data = []
            this.nowMapOption.series[0].data.push(now)
            this.nowMapOption.title.text = data[idx]['date']  + "：预测确诊" + now.value
            chinaChartNow.setOption(this.nowMapOption)

            var after = {name:this.selectedCity, value:data[data.length-1]['predictTotal']}
            this.afterMapOption.title.text = data[data.length-1]['date']  + "：预测确诊" + after.value
            this.afterMapOption.series[0].data = []
            this.afterMapOption.series[0].data.push(after)
            chinaChartAfter.setOption(this.afterMapOption)

        },
        drawMap() {
            chinaChartBefore = echarts.init(
                document.getElementById("chinaMapBefore")
            );
            chinaChartNow = echarts.init(
                document.getElementById("chinaMapNow")
            );
            chinaChartAfter = echarts.init(
                document.getElementById("chinaMapAfter")
            );
            chinaChartBefore.setOption(this.beforeMapOption);
            chinaChartNow.setOption(this.nowMapOption);
            chinaChartAfter.setOption(this.afterMapOption);
            },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
        predictChart = echarts.init(document.getElementById('predictChart'))

        predictChart.setOption({
            title: { text: '累计疫情趋势预测',
            top: 0 },
            grid: {
                top: 100
            },
            tooltip: {show: true},
            xAxis: {
                data: [],
                axisLabel :{  
                interval: 5,
                rotate:40 
            }
            },
            yAxis: {},
            series: [],
            color: ['#ee0000', '#00aa00', '#000099', '#eeaa00']
        });
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
		onSubmit() {
      var _this = this
      if (this.form.endDate == '') {
        this.$message({
            message: "请选择结束时间",
            type: "warning",
        });
        return
      }
      if (this.form.city == '') {
        this.$message({
                    message: "请选择城市",
                    type: "warning",
                });
        return
      }
      var startDate = new Date("2020-01-21")
      var day = Math.round((this.form.endDate - startDate) / (1000 * 60 * 60 * 24))
        if (day < 0) {
          this.$message({
              message: "日期不能早于2020年1月21日",
              type: "warning",
          });
        return
      }
      this.$axios({
        method: 'post',
        url: '/api/model-cal',

        data: JSON.stringify({city:this.form.city,
                          predictDay: day,
                          beta: this.form.beta,
                          te: this.form.te})

        })
        .then(function (response) {
          //_this.lineTotalData.rows = []
          _this.lineMData.rows = []
          _this.lineAlphaData.rows = []
          _this.newChartData.rows = []
          dates = []
          var totalInfections = []
          var predictTotal = []
          var predictCure = []
          var predictDeath = []
          var actives = response.data.data.actives

          _this.slidermax = actives.length-1
          _this.slidervalue = [0, _this.slidermax]
          var idxj = 0
          var now = new Date()
          var findIdx = 0
          _this.modelResult = actives
          for (let i of actives) {
            //var dicTotal = {}
            var dicNew = {}
            var dicM = {}
            var dicAlpha = {}
            var newI = i['newInfection']
            if (newI != 0) {
              dicNew['真实新增确诊'] = newI
            }
            dicNew['预测新增确诊'] = i['predictNew']
            var totalI = i['totalInfection']
            predictTotal.push(i['predictTotal'])
            //dicTotal['date'] = i['date']
            var itera = new Date(i['date'])
            if (now.setHours(0, 0, 0, 0) == itera.setHours(0, 0, 0, 0)) {
                findIdx = idxj                
            }
            dicM['date'] = i['date']
            dicAlpha['date'] = i['date']
            dates.push(i['date'])
            dicNew['date'] = i['date']
            if (totalI != 0) {
                //dicTotal['累计确诊'] = totalI
                totalInfections.push(totalI)
            }
            predictCure.push(i['predictRecover'])
            predictDeath.push(i['predictDeath'])
            // dicTotal['预测累计确诊'] = i['predictTotal']
            // dicTotal['预测累计治愈'] = i['predictRecover']
            // dicTotal['预测累计死亡'] = i['predictDeath']
            dicM['m'] = i['mval']
            dicAlpha['alpha'] = i['alpha']
            //_this.lineTotalData.rows.push(dicTotal)
            _this.lineMData.rows.push(dicM)
            _this.lineAlphaData.rows.push(dicAlpha)
            _this.newChartData.rows.push(dicNew)
            idxj++
          }
        _this.calMapDate(actives, findIdx)

          var marks = {}
          var idx = 0
          for (let i of dates) {
            i = i.replace("2020-", "")
            marks[idx] = i
            idx++
          }
        _this.slidermarks = marks
            // 绘制图表
            predictChart.setOption({
                xAxis: {
                    data: dates
                },
                legend: {
                    top: 40,
                data: ['真实累计确诊', '预测累计确诊', '预测累计治愈', '预测累计死亡']
                },
                yAxis: {},
                series: [{
                    name: '真实累计确诊',
                    type: 'scatter',
                    data: totalInfections
                },{
                    name: '预测累计确诊',
                    type: 'line',
                    data: predictTotal
                },{
                    name: '预测累计治愈',
                    type: 'line',
                    data: predictCure
                },{
                    name: '预测累计死亡',
                    type: 'line',
                    data: predictDeath
                }]
            });
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    onProvinceChange() {
      for (let i of this.form.options) {
        if (i.value == this.form.city) {
          this.selectedCity = i.label
        }
      }
    }
  },
    data () {
      this.newChartSettings = {
        xAxisType: 'category',
        yAxisName: ['新增数量']
      }
      return {
        beforeMapOption: {
            title: {
                text: "疫情初期形势"
            },
            visualMap: baseVisualMap,
            series: baseMapSeries
        },
        nowMapOption: {
            title: {
                text: "现在疫情形势"
            },
            visualMap: baseVisualMap,
            series: baseMapSeries
        },
        afterMapOption: {
            title: {
                text: "未来疫情形势"
            },
            visualMap: baseVisualMap,
            series: baseMapSeries
        },
        newChartData: {
          columns: ["date", '真实新增确诊', '预测新增确诊',],
          rows: []
        },
        slidermin: 0,
        slidermax: 1,
        slidervalue: [0, 1],
        slidermarks: {
        },
        lineMData: {
          columns: ['date', 'm'],
          rows: []
        },
        lineAlphaData: {
          columns: ['date', 'alpha'],
          rows: []
        },
        selectedCity: "广东省",
        modelResult: [],
        form: {
          beta: 0.04,
          te: 4,
          endDate: new Date(),
          city: '广东省',
          options: [{value:"湖北省",label:"湖北"},{value:"广东省",label:"广东"},{value:"河南省",label:"河南"},{value:"浙江省",label:"浙江"},{value:"湖南省",label:"湖南"},{value:"安徽省",label:"安徽"},{value:"江西省",label:"江西"},{value:"江苏省",label:"江苏"},{value:"重庆市",label:"重庆"},{value:"山东省",label:"山东"},{value:"四川省",label:"四川"},{value:"黑龙江省",label:"黑龙江"},{value:"北京市",label:"北京"},{value:"上海市",label:"上海"},{value:"河北省",label:"河北"},{value:"福建省",label:"福建"},{value:"广西壮族自治区",label:"广西"},{value:"陕西省",label:"陕西"},{value:"云南省",label:"云南"},{value:"海南省",label:"海南"},{value:"贵州省",label:"贵州"},{value:"山西省",label:"山西"},{value:"天津市",label:"天津"},{value:"辽宁省",label:"辽宁"},{value:"甘肃省",label:"甘肃"},{value:"吉林省",label:"吉林"},{value:"新疆维吾尔自治区",label:"新疆"},{value:"内蒙古自治区",label:"内蒙古"},{value:"宁夏回族自治区",label:"宁夏"},{value:"青海省",label:"青海"},{value:"西藏自治区",label:"西藏"}],
        comp: [20, 30]
        },
      timeline: 10

      }
    }
  }
</script>

<style lang="scss" scoped>
.chart-container {
    width: 100%;
    float: left;
}
/*.chart div {
    height: 400px;
    float: left;
}*/

.el-col {
    padding: 0px 10px;
}
.el-row {
  padding-bottom: 10px;
}

.panel-group {
  margin-top: 10px;
}

.H2 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.sim-input {
    margin-top: 10px;
}

.history {
    margin-top: 20px
}

.lschart {
  width: 700px;
  height: 500px;
}

.chinaMap {
  width: 100%;
  height: 350px;
  color: #ff0505
}

.slider {
    margin-bottom: 40px;
}
</style>