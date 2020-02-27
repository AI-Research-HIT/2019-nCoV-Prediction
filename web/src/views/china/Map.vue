<template>

    <section class="chart-container">

          <H3>最新数据</H3>
          <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存确诊
          </div>
          <count-to :start-val="0" :end-val="nowInfection" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存疑似
          </div>
          <count-to :start-val="0" :end-val="nowSusp" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存重症
          </div>
          <count-to :start-val="0" :end-val="nowHeavy" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper infection">
          <svg-icon icon-class="infection" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            累计确诊
          </div>
          <count-to :start-val="0" :end-val="totalInfection" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('death')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            累计死亡
          </div>
          <count-to :start-val="0" :end-val="totalDeath" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper cure">
          <svg-icon icon-class="cure" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            累计治愈
          </div>
          <count-to :start-val="0" :end-val="totalCure" :duration="500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col>
      <H3>城市聚集指数对比</H3>
      <p>我们在模型中引入了一个人员聚集度指标m，相比人口流动及出行强度，该指标更能综合反映政府的管控力度，因为人员聚集度越高，病毒的传染力就越强，而管理力度越强，聚集度则越小，疫情则将逐步得到控制。然而该指标并不能直接获得，可以通过历史数据反演计算得到，也可以在模拟仿真预测时进行动态调整。</p>
      <ve-histogram :data="veData"></ve-histogram>
    </el-col>
    <el-col>
                    <H3>全国各城市累计/新增人数</H3>

              <div class = 'mychart' id = 'mychart'>
                  <mycharts></mycharts>
              </div>
    </el-col>
  </el-row>
		<!--工具条-->
			<el-form ref="form" :model="form" class="sim-input">
        <H3>趋势预测</H3>
                <el-form-item label="仿真计算结束时间: ">
                    <el-col :span="5">
          <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
          </el-form-item>
				<el-form-item label="选择城市: ">
              <el-select v-model="form.value" clearable placeholder="请选择计算城市">
                <el-option
                  v-for="item in form.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始仿真模拟</el-button>
        </el-form-item>
			</el-form>
        <el-row>
            <el-col :span="20">
              <div class="lschart" id="predictChart"></div>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
          <H3>新增确诊预测趋势</H3>
          <ve-line :data="newChartData" :settings="chartSetting"></ve-line>
          </el-col>
        </el-row>
    </section>

</template>


<script>
  import CountTo from 'vue-count-to'
  import myCharts from './myChart.vue'
  import echarts from "echarts";

  //import { simulate } from '../../api/api';
  var predictChart
  export default {
      components: {
    CountTo,
    'mycharts':myCharts
  },
      mounted() {
      this.drawLine()
      this.$axios.get("/api/mdata").then(s => {
        var d = s.data.data
        for (let i of d) {
          var dict = {}
          dict["date"] = i['date']
          dict['哈尔滨'] = i['haerbin']
          dict['上海'] = i['shanghai']
          dict['武汉'] = i['wuhan']
          dict['深圳'] = i['shenzhen']
          this.veData.rows.push(dict)
        }
      });
      this.$axios.get("/api/latest").then(s => {
        var d = s.data.data
        this.nowInfection = d['nowInfaction']
        this.nowSusp = d['nowSusp']
        this.nowHeavy = d['nowHeavy']
        this.totalInfection = d['totalInfection']
        this.totalDeath = d['totalDeath']
        this.totalCure = d['totalCure']
      });
    },
    methods: {
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
            yAxis: {
              type: 'value'
            },
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
      if (this.form.value == '') {
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

        data: JSON.stringify({province:this.form.value,
                          predictDay: day})

        })
        .then(function (response) {
          //_this.lineTotalData.rows = []
          _this.newChartData.rows = []
          var dates = []
          var totalInfections = []
          var predictTotal = []
          var predictCure = []
          var predictDeath = []
          for (let i of response.data.data.actives) {
            //var dicTotal = {}
            var dicNew = {}
            var newI = i['newInfection']
            if (newI != 0) {
              dicNew['真实新增确诊'] = newI
            }
            dicNew['预测新增确诊'] = i['predictNew']
            var totalI = i['totalInfection']
            predictTotal.push(i['predictTotal'])
            //dicTotal['date'] = i['date']
            dicNew['date'] = i['date']
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
            _this.newChartData.rows.push(dicNew)
          }
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
    }
  },
    data () {
      this.chartSetting = {
        xAxisType: 'time',
        yAxisName: ['新增数量']
      }
      return {
        veData: {
          columns: ['date', '哈尔滨', '上海', '武汉', '深圳'],
          rows: []
        },
        lineTotalData: {
          columns: ['date', '累计确诊', '预测累计确诊', '预测累计治愈', '预测累计死亡'],
          rows: []
        },
        newChartData: {
          columns: ["date", '真实新增确诊', '预测新增确诊',],
          rows: []
        },
        lineAlphaData: {
          columns: ['date', 'alpha'],
          rows: []
        },
        marks: {
          0: '2020-01-22',
          1: '2020-01-23'
        },
        max: 2,
        nowInfection: 0,
        nowSusp: 0,
        nowHeavy: 0,
        totalInfection: 0,
        totalDeath: 0,
        totalCure: 0,
        form: {
          beta: '',
          num: '',
          endDate: new Date(),
          value: 'guangzhou',
          options: [{
            value: 'shanghai',
            label: '上海'
            }, {
              value: 'beijing',
              label: '北京'
            }, {
              value: 'chengdu',
              label: '成都'
            }, {
              value: 'fuzhou',
              label: '福州'
            }, {
              value: 'guangzhou',
              label: '广州'
            },{
              value: 'haerbin',
              label: '哈尔滨'
            }, {
              value: 'haikou',
              label: '海口'
            }, {
              value: 'hangzhou',
              label: '杭州'
            }, {
              value: 'hefei',
              label: '合肥'
            },{
              value: 'nanchang',
              label: '南昌'
            },{
              value: 'tianjing',
              label: '天津'
            },{
              value: 'xian',
              label: '西安'
            },{
              value: 'changsha',
              label: '长沙'
            },{
              value: 'zhengzhou',
              label: '郑州'
            },{
              value: 'chongqing',
              label: '重庆'
            },{
              value: 'wuhan',
              label: '武汉'
            }
            ],
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

.H3{
  margin-top: 0px;
  margin-bottom: 0px;
}

  .card-panel-col {
    margin-bottom: 10px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: rgb(247, 76, 49);
      }

      .icon-message {
        background: rgb(247, 130, 7);
      }

      .icon-money {
        background: rgb(162, 90, 78);
      }

      .infection {
        background: rgb(174, 33, 44);
      }

      .icon-shopping {
        background: rgb(93, 112, 146);
      }

      .cure {
        background: rgb(40, 183, 163);
      }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.lschart {
  width: 700px;
  height: 500px;
}
</style>