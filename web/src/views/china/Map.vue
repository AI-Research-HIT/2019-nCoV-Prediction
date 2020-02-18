<template>

    <section class="chart-container">

          <H2>最新数据</H2>
          <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存确诊
          </div>
          <count-to :start-val="0" :end-val="58036" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存疑似
          </div>
          <count-to :start-val="0" :end-val="6242" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存重症
          </div>
          <count-to :start-val="0" :end-val="11741" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            累计治愈
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('death')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            累计死亡
          </div>
          <count-to :start-val="0" :end-val="1870" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
		<!--工具条-->
			<el-form ref="form" :model="form" class="sim-input">
				<el-form-item label="计算参数: ">
          <el-col :span="5">
					  <el-input v-model="form.beta" placeholder="传染系数"></el-input>
          </el-col >
          <el-col :span="5">
          	<el-input v-model="form.num" placeholder="初始人数"></el-input>
          </el-col>


				</el-form-item>
                <el-form-item label="计算时间区间: ">
                <el-col :span="5">
          <el-date-picker v-model="form.startDate" type="date" placeholder="初始日期" style="width: 100%;"></el-date-picker>
                </el-col>
                    <el-col :span="5">
          <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
          </el-form-item>
          <el-form-item label="隔离策略: ">
            <el-radio-group v-model="form.qua">
              <el-radio label="1">无限制</el-radio>
              <el-radio label="2">居家隔离</el-radio>
              <el-radio label="3">强制隔离</el-radio>
            </el-radio-group>
          </el-form-item>
				<el-form-item label="选择地区: ">
              <el-select v-model="form.value" @change="onProvinceChange" clearable placeholder="请选择计算省份">
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
                      <el-col :span="24">
              <H2>疫情趋势预测</H2>

              <div>
                  <ve-line :data="chartData" :settings="lineChartSettings"></ve-line>
              </div>
            </el-col>
            <H2>疫情发展趋势节点时间对比</H2>
            <el-col :span="8">
              <div>
                <ve-heatmap :data="mapDataS" style="width:100%; height:100%;" :settings="chartSettings">
                </ve-heatmap>

              </div>
            </el-col>
                        <el-col :span="8">
              <div>
                <ve-heatmap :data="mapDataN" style="width:100%; height:100%;" :settings="chartSettings">
                </ve-heatmap>

              </div>
            </el-col>
                        <el-col :span="8">
              <div>
                <ve-heatmap :data="mapDataA" style="width:100%; height:100%;" :settings="chartSettings">
                </ve-heatmap>

              </div>
            </el-col>
              <div class="block">
    <span class="demonstration">时间轴</span>
    <div class="block">
    <el-slider v-model="form.comp" range :marks="marks" :max="max" @change="onMapDateChange"></el-slider>
    </div>
  </div>
        </el-row>
        
    </section>

</template>


<script>
import CountTo from 'vue-count-to'

	import { simulate } from '../../api/api';

  export default {
      components: {
    CountTo
  },
    methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
		onSubmit() {
      	var para = {
					beta: this.form.beta,
          num: this.form.num,
          startDate: this.form.startDate,
          endDate: this.form.endDate
        };

        
      	simulate(para).then(res => {
          console.log(res.result)
          //NProgress.done();
          this.chartData.rows = res.result
          this.timeline = res.result.length
          var val = res.result.length/2
                var s = val - 7
      if (s < 0) {
        s = 0
      }

      var a = val + 7 
      if (a > this.chartData.rows.length-1) {
        a = this.chartData.rows.length-1
      }

      this.form.comp = [0, this.chartData.rows.length-1]
      
      this.mapDataS.rows[0]['人数'] = this.chartData.rows[s].true
      this.mapDataN.rows[0]['人数'] = this.chartData.rows[val].true
      this.mapDataA.rows[0]['人数'] = this.chartData.rows[a].true

      this.max = this.chartData.rows.length-1
      this.marks = {}
      var num = 0
      for(var i of this.chartData.rows) {
        this.marks[num] = i.date
        num++
      }

        });
				console.log('submit!');
    },
    formatTooltip(val) {
        if (this.chartData.rows.length == 1) {
          return val
        }
        return this.chartData.rows[val].date;
    },
    onProvinceChange() {
      console.log(this.form.value)
      this.chartSettings.position = 'province/' + this.form.value
      console.log(this.chartSettings)

      if (this.mapDataS.rows[0]['人数'] != 0) {
        this.mapDataS.rows[0]['人数'] = 0
        this.mapDataN.rows[0]['人数'] = 0
        this.mapDataA.rows[0]['人数'] = 0
      } else {
        this.mapDataS.rows[0]['人数'] = 1
        this.mapDataN.rows[0]['人数'] = 1
        this.mapDataA.rows[0]['人数'] = 1
      }
    },
    onMapDateChange(val) {
      var s = val - 7
      if (s < 0) {
        s = 0
      }

      var a = val + 7 
      if (a > this.chartData.rows.length-1) {
        a = this.chartData.rows.length-1
      }
      
      this.mapDataS.rows[0]['人数'] = this.chartData.rows[s].true
      this.mapDataN.rows[0]['人数'] = this.chartData.rows[val].true
      this.mapDataA.rows[0]['人数'] = this.chartData.rows[a].true
    }
  },
    data () {
      this.chartSettings = {
        position: 'china',
        type: 'map',
        geo: {
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        }
      }
      this.lineChartSettings = {
        xAxisType: 'category'
      }
      return {
        mapDataS: {
          columns: ['lat', 'lng', '人数'],
          rows: [
            { 'lat': 13522737.951955654, 'lng': 3639354.061162123, '人数': 0 },
          ]
        },
        mapDataN: {
          columns: ['lat', 'lng', '人数'],
          rows: [
            { 'lat': 13522737.951955654, 'lng': 3639354.061162123, '人数': 0 },
          ]
        },
        mapDataA: {
          columns: ['lat', 'lng', '人数'],
          rows: [
            { 'lat': 13522737.951955654, 'lng': 3639354.061162123, '人数': 0 },
          ]
        },
        chartData: {
          columns: ['date', 'true', 'predict'],
          rows: [
            { 'date': '2018-01-01', 'true': 1393, 'predict': 1093}
          ]
        },
        marks: {
          0: '2020-01-22',
          1: '2020-01-23'
        },
        max: 2,
        form: {
          beta: '',
          num: '',
          qua: '1',
          startDate: '',
          endDate: '',
          value: '',
          options: [{
          value: 'shanghai',
          label: '上海'
        }, {
          value: 'beijing',
          label: '北京'
        }, {
          value: 'hubei',
          label: '湖北'
        }, {
          value: 'hunan',
          label: '湖南'
        }, {
          value: 'guangdong',
          label: '广东'
        }],
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

.H2 {
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
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
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
</style>