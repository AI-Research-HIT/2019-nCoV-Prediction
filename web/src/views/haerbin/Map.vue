<template>
    <section class="chart-container">
              <el-row :gutter="40" class="panel-group">
                <H2>最新数据</H2>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            现存确诊
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
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
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
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
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            治愈
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
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
            死亡
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters">
				<el-form-item>
          <el-col :span="11">
					<el-input placeholder="传染系数"></el-input>
          </el-col >
          <el-col :span="11">
          					<el-input placeholder="初始人数"></el-input>
          </el-col>


				</el-form-item>
                <el-form-item>
                <el-col :span="11">
          <el-date-picker type="date" placeholder="初始日期" style="width: 100%;"></el-date-picker>
                </el-col>
                    <el-col :span="11">
          <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
          </el-form-item>
				<el-form-item>
					<el-button type="primary">开始仿真模拟</el-button>
				</el-form-item>

			</el-form>
		</el-col>
        <el-row>
            <el-col :span="24">
              <div>
                <ve-heatmap :data="mapData" style="width:100%; height:400px;" :settings="chartSettings">
                </ve-heatmap>
                <H2>疫情扩散情况</H2>

              </div>
            </el-col>
            <el-col :span="24">
              <div>
                  <ve-line :data="chartData"></ve-line>
                  <H2>疫情数量预测</H2>
              </div>
            </el-col>
        </el-row>
    </section>

</template>

<script>
import CountTo from 'vue-count-to'

  export default {
          components: {
    CountTo
  },
    methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  },
    data () {
      this.chartSettings = {
        position: 'province/heilongjiang',
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
      return {
        mapData: {
          columns: ['lat', 'lng', '人数'],
          rows: [
            { 'lat': 115.892151, 'lng': 28.676493, '人数': 1000 },
            { 'lat': 117.000923, 'lng': 36.675807, '人数': 400 },
            { 'lat': 113.665412, 'lng': 34.757975, '人数': 800 },
            { 'lat': 114.298572, 'lng': 30.584355, '人数': 200 },
            { 'lat': 112.982279, 'lng': 28.19409, '人数': 100 },
            { 'lat': 113.280637, 'lng': 23.125178, '人数': 300 },
            { 'lat': 110.33119, 'lng': 20.031971, '人数': 800 },
            { 'lat': 104.065735, 'lng': 30.659462, '人数': 700 },
            { 'lat': 108.948024, 'lng': 34.263161, '人数': 300 },
            { 'lat': 103.823557, 'lng': 36.058039, '人数': 500 }
          ]
        },
        chartData: {
          columns: ['日期', '确诊数量', '疑似数量', '死亡率'],
          rows: [
            { '日期': '1/1', '确诊数量': 1393, '疑似数量': 1093, '死亡率': 0.32 },
            { '日期': '1/2', '确诊数量': 3530, '疑似数量': 3230, '死亡率': 0.26 },
            { '日期': '1/3', '确诊数量': 2923, '疑似数量': 2623, '死亡率': 0.76 },
            { '日期': '1/4', '确诊数量': 1723, '疑似数量': 1423, '死亡率': 0.49 },
            { '日期': '1/5', '确诊数量': 3792, '疑似数量': 3492, '死亡率': 0.323 },
            { '日期': '1/6', '确诊数量': 4593, '疑似数量': 4293, '死亡率': 0.78 }
          ]
        }
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
        padding: 30px 20px;
    }
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
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

    &:hover {
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