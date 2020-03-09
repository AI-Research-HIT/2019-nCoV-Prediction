<template>
    <section class="chart-container">
		<!--工具条-->
			<el-form ref="form" :model="form" class="sim-input">
        <H3>哈尔滨疫情预测</H3>
                <el-form-item label="计算时间区间: ">
                    <el-col :span="5">
          <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
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
          <el-col>
          </el-col>
        </el-row>
         <!-- <el-row>
          <el-col :span="20">
          <H3>新增确诊预测趋势</H3>
          <ve-line :data="newChartData" :settings="chartSetting"></ve-line>
          </el-col>
        </el-row> -->
      <el-row>
        
        <el-col :span="20">
          <H3>哈尔滨人员聚集度分析</H3>
          <p>根据SEIQR模型以及哈市卫健委公布的确诊病例数据，我们对本市人员聚集度进行了反演推算，如图所示，可见在2月5日前后聚集度有较明显的降低，这与2月4日哈尔滨政府公布的第8号公告宣布对所有小区村屯实施封闭管理相符。另外，我们看到从1月24日至今，人员聚集度下降很快，这在一定程度上反应了省市政府应对疫情响应积极，管控有效，人民群众防控意识提升等事实。</p>
          <ve-line :data="mChartData" :settings="mChartSetting"></ve-line>
        </el-col>
      </el-row>
      <el-row>
        <h3>人口流动数据分析</h3>
        <p>疫情的发展不仅与城市间的人口流动密切相关，还与市内人员出行、人员聚集等因素密切相关，同时这些因素也是政府管控政策的制定依据。为此我们通过疫情数据、移动运营商人口流动数据及百度出行数据进行了如下分析。</p>
        <el-col :span="20">
          <H3>湖北移动来哈尔滨人数</H3>
          <ve-line :data="ChinaMobileChartData" :settings="chartSetting"></ve-line>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <H3>哈尔滨百度城市出行强度</H3>
          <ve-line :data="BaiduChartData" :settings="baiduChartSetting"></ve-line>
        </el-col>
      </el-row>
    </section>

</template>

<script>
  import echarts from "echarts";

  var predictChart

  export default {
    mounted () {
      this.drawLine()
      this.$axios.get("/api/mlist").then(s => {
        this.mChartData.rows = []
        for (let i of s.data.data) {
          var d = {
            "date": i.date,
            "人员聚集度": i.m
          }
          this.mChartData.rows.push(d)
        }
      });
      this.$axios.get("/api/chinamobile-data").then(s => {
        this.ChinaMobileChartData.rows = []
        for (let i of s.data.data) {
          var d = {
            "date": i.date,
            "新增人数": i.num
          }
          this.ChinaMobileChartData.rows.push(d)
        }
      });
      this.$axios.get("/api/baidu-incity").then(s => {
        this.BaiduChartData.rows = []
        for (let i of s.data.data) {
          var d = {
            "date": i.date,
            "出行强度": i.num
          }
          this.BaiduChartData.rows.push(d)
        }
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
      onSubmit() {
      var _this = this
      if (this.form.endDate == '') {
        this.$message({
            message: "请选择结束时间",
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

        data: JSON.stringify({province: "黑龙江省",
                          city: 230100,
                          template: 1,
                          predictDay: day})

        })
        .then(function (response) {
          _this.newChartData.rows = []
          var dates = []
          var totalInfections = []
          var predictTotal = []
          var predictCure = []
          var predictDeath = []
          for (let i of response.data.data.actives) {
            var dicNew = {}
            //var dicTotal = {}
            var newI = i['newInfection']
            var totalI = i['totalInfection']
            if (newI != 0) {
              dicNew['真实新增确诊'] = newI
            }
            dicNew['预测新增确诊'] = i['predictNew']
            predictTotal.push(i['predictTotal'])
            dates.push(i['date'])
            dicNew['date'] = i['date']
            if (totalI != 0) {
                //dicTotal['累计确诊'] = totalI
                totalInfections.push(totalI)
            } else {
              totalInfections.push('')
            }
            predictCure.push(i['predictRecover'])
            predictDeath.push(i['predictDeath'])
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
        xAxisType: 'category',
        yAxisName: ['人数']
      }
      this.mChartSetting = {
        xAxisType: 'category',
        yAxisName: ['聚集度']
      }
      this.baiduChartSetting = {
        xAxisType: 'category',
        yAxisName: ['出行强度']
      }
      return {
        form: {
          endDate: new Date()
        },
                newChartData: {
          columns: ["date", '真实新增确诊', '预测新增确诊',],
          rows: []
        },
        mChartData: {
          columns: ["date", "人员聚集度"],
          rows: []
        },
        ChinaMobileChartData: {
          columns: ["date", "新增人数"],
          rows: []
        },
        BaiduChartData: {
          columns: ["date", "出行强度"],
          rows: []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.lschart {
  width: 700px;
  height: 500px;
}
</style>