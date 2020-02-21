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
                <el-row>
            <el-col :span="12">
              <H3>接触人数与感染数量关系</H3>

              <div>
                  <ve-line :data="lineMData" :settings="valLineSettings"></ve-line>
              </div>
            </el-col>
            <el-col :span="12">
              <H3>Alpha与感染数量关系</H3>

              <div>
                  <ve-line :data="lineAlphaData" :settings="valLineSettings"></ve-line>
              </div>
            </el-col>
        </el-row>
            <el-row>
                <H2>疫情时间节点对比</H2>
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
            console.log(this.slidervalue)
            if (this.modelResult.length > 0) {
                if (this.slidervalue[0] >= 0 && this.slidervalue[0] < this.modelResult.length) {
                    var before = {name:this.selectedCity, value:this.modelResult[this.slidervalue[0]]['predictTotal']}
                    console.log(before)
                    this.beforeMapOption.series[0].data = []
                    this.beforeMapOption.series[0].data.push(before)
                    this.beforeMapOption.title.text = "疫情初期形势 " + this.modelResult[this.slidervalue[0]]['date'] + "：预测确诊" + before.value
                    chinaChartBefore.setOption(this.beforeMapOption)
                }

                if (this.slidervalue[1] >= 0 && this.slidervalue[1] < this.modelResult.length) {
                    var after = {name:this.selectedCity, value:this.modelResult[this.slidervalue[1]]['predictTotal']}
                    console.log(after)
                    this.afterMapOption.title.text = "未来疫情形势 " + this.modelResult[this.slidervalue[1]]['date'] + "：预测确诊" + after.value
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
            this.beforeMapOption.title.text = "疫情初期形势 " + data[0]['date']  + "：预测确诊" + before.value
            chinaChartBefore.setOption(this.beforeMapOption)

            if (idx == 0) {
                idx = data.length/2
            }
            var now = {name:this.selectedCity, value:data[idx]['predictTotal']}
            this.nowMapOption.series[0].data = []
            this.nowMapOption.series[0].data.push(now)
            this.nowMapOption.title.text = "现在疫情形势 " + data[idx]['date']  + "：预测确诊" + now.value
            chinaChartNow.setOption(this.nowMapOption)

            var after = {name:this.selectedCity, value:data[data.length-1]['predictTotal']}
            this.afterMapOption.title.text = "未来疫情形势 " + data[data.length-1]['date']  + "：预测确诊" + after.value
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
                interval: 0,
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
            var dicM = {}
            var dicAlpha = {}
            var newI = i['newInfection']
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
        this.selectedCity = this.form.options[this.form.city].label
    }
  },
    data () {
        this.valLineSettings = {
        xAxisType: 'category'
      }
      this.lineChartSettings = {
        xAxisType: 'category'
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
        selectedCity: "广东",
        modelResult: [],
        form: {
          beta: 0.04,
          te: 4,
          endDate: new Date(),
          city: '1',
          options: [{value:'0',label:'湖北'},{value:'1',label:'广东'},{value:'2',label:'河南'},{value:'3',label:'浙江'},{value:'4',label:'湖南'},{value:'5',label:'安徽'},{value:'6',label:'江西'},{value:'7',label:'江苏'},{value:'8',label:'重庆'},{value:'9',label:'山东'},{value:'10',label:'四川'},{value:'11',label:'黑龙江'},{value:'12',label:'北京'},{value:'13',label:'上海'},{value:'14',label:'河北'},{value:'15',label:'福建'},{value:'16',label:'广西'},{value:'17',label:'陕西'},{value:'18',label:'云南'},{value:'19',label:'海南'},{value:'20',label:'贵州'},{value:'21',label:'山西'},{value:'22',label:'天津'},{value:'23',label:'辽宁'},{value:'24',label:'甘肃'},{value:'25',label:'吉林'},{value:'26',label:'新疆'},{value:'27',label:'内蒙古'},{value:'28',label:'宁夏'},{value:'29',label:'青海'},{value:'30',label:'西藏'}],
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
</style>