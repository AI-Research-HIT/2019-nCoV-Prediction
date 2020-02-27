<template>

    <section class="chart-container">
		<!--工具条-->
            <el-form ref="form" :model="form" class="history">
                <el-form-item label="选择地区: ">
                  <el-row>
                    <el-col>
                    <p>只选择省份将计算该省疫情预测，选择省份下的城市将计算城市疫情预测</p>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="form.province" @change="onProvinceChange" placeholder="省份">
                          <el-option
                          v-for="item in form.provinceOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="form.city" @change="onCityChange" clearable placeholder="城市">
                          <el-option
                          v-for="item in form.cityOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
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
      if (this.form.province == '') {
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
      console.log(this.form.city)
      this.$axios({
        method: 'post',
        url: '/api/model-cal',

        data: JSON.stringify({province:this.form.province,
                          city: this.form.city,
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
      for (let i of this.form.provinceOptions) {
        if (i.value == this.form.province) {
          this.selectedCity = i.label
        }
      }
      this.form.cityOptions = this.citys[this.form.province]
      this.form.city = ''
      //console.log(this.cityOptions)
    },
    onCityChange() {
      
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
          province: '广东省',
          provinceOptions: [{value:"湖北省",label:"湖北"},{value:"广东省",label:"广东"},{value:"河南省",label:"河南"},{value:"浙江省",label:"浙江"},{value:"湖南省",label:"湖南"},{value:"安徽省",label:"安徽"},{value:"江西省",label:"江西"},{value:"江苏省",label:"江苏"},{value:"重庆市",label:"重庆"},{value:"山东省",label:"山东"},{value:"四川省",label:"四川"},{value:"黑龙江省",label:"黑龙江"},{value:"北京市",label:"北京"},{value:"上海市",label:"上海"},{value:"河北省",label:"河北"},{value:"福建省",label:"福建"},{value:"广西壮族自治区",label:"广西"},{value:"陕西省",label:"陕西"},{value:"云南省",label:"云南"},{value:"海南省",label:"海南"},{value:"贵州省",label:"贵州"},{value:"山西省",label:"山西"},{value:"天津市",label:"天津"},{value:"辽宁省",label:"辽宁"},{value:"甘肃省",label:"甘肃"},{value:"吉林省",label:"吉林"},{value:"新疆维吾尔自治区",label:"新疆"},{value:"内蒙古自治区",label:"内蒙古"},{value:"宁夏回族自治区",label:"宁夏"},{value:"青海省",label:"青海"},{value:"西藏自治区",label:"西藏"}],
          city: '',
          cityOptions: [{value:440300,label:"深圳"},{value:440600,label:"佛山"},{value:441300,label:"惠州"},{value:440800,label:"湛江"},{value:441900,label:"东莞"},{value:441400,label:"梅州"},{value:445100,label:"潮州"},{value:440100,label:"广州"},{value:440700,label:"江门"},{value:440900,label:"茂名"},{value:440500,label:"汕头"},{value:441600,label:"河源"},{value:441800,label:"清远"},{value:440400,label:"珠海"},{value:442000,label:"中山"},{value:441200,label:"肇庆"},{value:441700,label:"阳江"},{value:440200,label:"韶关"},{value:445200,label:"揭阳"},{value:441500,label:"汕尾"}],
        comp: [20, 30]
        },
        timeline: 10,
        citys: {"上海市":[{value:310104,label:"徐汇区"},{value:310117,label:"松江区"},{value:310120,label:"奉贤区"},{value:310101,label:"黄浦区"},{value:310118,label:"青浦区"},{value:310106,label:"静安区"},{value:310151,label:"崇明区"},{value:310116,label:"金山区"},{value:310113,label:"宝山区"},{value:310107,label:"普陀区"},{value:310110,label:"杨浦区"},{value:310109,label:"虹口区"},{value:310115,label:"浦东新区"},{value:310114,label:"嘉定区"},{value:310112,label:"闵行区"},{value:310105,label:"长宁区"}],"云南省":[{value:530900,label:"临沧"},{value:532901,label:"大理"},{value:530500,label:"保山"},{value:530800,label:"普洱"},{value:530600,label:"昭通"},{value:530400,label:"玉溪"},{value:532500,label:"红河"},{value:532301,label:"楚雄"},{value:532601,label:"文山"},{value:530300,label:"曲靖"},{value:530700,label:"丽江"},{value:533100,label:"德宏"},{value:530100,label:"昆明"},{value:532800,label:"西双版纳"}],"内蒙古自治区":[{value:152500,label:"锡林郭勒盟"},{value:150400,label:"赤峰"},{value:150200,label:"包头"},{value:150500,label:"通辽"},{value:150100,label:"呼和浩特"},{value:150700,label:"呼伦贝尔"},{value:150600,label:"鄂尔多斯"},{value:150800,label:"巴彦淖尔"},{value:150900,label:"乌兰察布"},{value:150300,label:"乌海市"},{value:152200,label:"兴安盟"}],"北京市":[{value:110116,label:"怀柔区"},{value:110118,label:"密云区"},{value:110114,label:"昌平区"},{value:110107,label:"石景山区"},{value:110109,label:"门头沟区"},{value:110119,label:"延庆区"},{value:110105,label:"朝阳区"},{value:110106,label:"丰台区"},{value:110115,label:"大兴区"},{value:110112,label:"通州区"},{value:110101,label:"东城区"},{value:110108,label:"海淀区"},{value:110102,label:"西城区"},{value:110111,label:"房山区"},{value:110113,label:"顺义区"}],"吉林省":[{value:220100,label:"长春"},{value:220300,label:"四平市"},{value:220200,label:"吉林市"},{value:220700,label:"松原"},{value:220581,label:"梅河口"},{value:220000,label:"吉林"},{value:220400,label:"辽源"},{value:220500,label:"通化"},{value:220381,label:"公主岭"},{value:220800,label:"白城"},{value:222400,label:"延边"}],"四川省":[{value:510400,label:"攀枝花"},{value:511400,label:"眉山"},{value:510300,label:"自贡"},{value:511000,label:"内江"},{value:510700,label:"绵阳"},{value:511500,label:"宜宾"},{value:512000,label:"资阳"},{value:510800,label:"广元"},{value:513200,label:"阿坝州"},{value:511700,label:"达州"},{value:511900,label:"巴中"},{value:511800,label:"雅安"},{value:513300,label:"甘孜州"},{value:511300,label:"南充"},{value:511600,label:"广安"},{value:510600,label:"德阳"},{value:510900,label:"遂宁"},{value:513400,label:"凉山州"},{value:511100,label:"乐山"},{value:510100,label:"成都"},{value:510500,label:"泸州"}],"天津市":[{value:120104,label:"南开区"},{value:120105,label:"河北区"},{value:120101,label:"和平区"},{value:120111,label:"西青区"},{value:120102,label:"河东区"},{value:120116,label:"滨海新区"},{value:120114,label:"武清区"},{value:120110,label:"东丽区"},{value:120103,label:"河西区"},{value:120106,label:"红桥区"},{value:120115,label:"宝坻区"},{value:120113,label:"北辰区"},{value:120117,label:"宁河区"},{value:120112,label:"津南区"}],"宁夏回族自治区":[{value:640200,label:"石嘴山"},{value:640100,label:"银川"},{value:640300,label:"吴忠"},{value:640400,label:"固原"},{value:640500,label:"中卫"}],"安徽省":[{value:341500,label:"六安"},{value:341600,label:"亳州"},{value:340500,label:"马鞍山"},{value:340600,label:"淮北"},{value:341000,label:"黄山"},{value:340700,label:"铜陵"},{value:341800,label:"宣城"},{value:340100,label:"合肥"},{value:340300,label:"蚌埠"},{value:341300,label:"宿州"},{value:341100,label:"滁州"},{value:341200,label:"阜阳"},{value:340800,label:"安庆"},{value:340400,label:"淮南"},{value:340200,label:"芜湖"},{value:341700,label:"池州"}],"山东省":[{value:370200,label:"青岛"},{value:371300,label:"临沂"},{value:370600,label:"烟台"},{value:371400,label:"德州"},{value:371600,label:"滨州"},{value:370100,label:"济南"},{value:370900,label:"泰安"},{value:371500,label:"聊城"},{value:370400,label:"枣庄"},{value:371100,label:"日照"},{value:371700,label:"菏泽"},{value:370800,label:"济宁"},{value:370700,label:"潍坊"},{value:370300,label:"淄博"},{value:371000,label:"威海"}],"山西省":[{value:140500,label:"晋城"},{value:140200,label:"大同"},{value:140600,label:"朔州"},{value:141100,label:"吕梁"},{value:140300,label:"阳泉"},{value:141000,label:"临汾"},{value:140700,label:"晋中"},{value:140100,label:"太原"},{value:140900,label:"忻州"},{value:140800,label:"运城"},{value:140400,label:"长治"}],"广东省":[{value:440300,label:"深圳"},{value:440600,label:"佛山"},{value:441300,label:"惠州"},{value:440800,label:"湛江"},{value:441900,label:"东莞"},{value:441400,label:"梅州"},{value:445100,label:"潮州"},{value:440100,label:"广州"},{value:440700,label:"江门"},{value:440900,label:"茂名"},{value:440500,label:"汕头"},{value:441600,label:"河源"},{value:441800,label:"清远"},{value:440400,label:"珠海"},{value:442000,label:"中山"},{value:441200,label:"肇庆"},{value:441700,label:"阳江"},{value:440200,label:"韶关"},{value:445200,label:"揭阳"},{value:441500,label:"汕尾"}],"广西壮族自治区":[{value:450700,label:"钦州"},{value:451100,label:"贺州"},{value:450600,label:"防城港"},{value:451300,label:"来宾"},{value:450900,label:"玉林"},{value:451200,label:"河池"},{value:450300,label:"桂林"},{value:451000,label:"百色"},{value:450800,label:"贵港"},{value:450400,label:"梧州"},{value:450100,label:"南宁"},{value:450500,label:"北海"},{value:450200,label:"柳州"}],"新疆维吾尔自治区":[{value:652901,label:"阿克苏"},{value:654201,label:"塔城"},{value:659001,label:"石河子"},{value:654000,label:"伊犁州"},{value:652301,label:"昌吉"},{value:652900,label:"阿克苏地区"},{value:659004,label:"五家渠"},{value:650100,label:"乌鲁木齐"},{value:650400,label:"吐鲁番市"},{value:511902,label:"巴州"}],"江苏省":[{value:320100,label:"南京"},{value:320700,label:"连云港"},{value:320800,label:"淮安"},{value:321000,label:"扬州"},{value:320600,label:"南通"},{value:320200,label:"无锡"},{value:320400,label:"常州"},{value:320900,label:"盐城"},{value:320500,label:"苏州"},{value:321300,label:"宿迁"},{value:320300,label:"徐州"},{value:321200,label:"泰州"},{value:321100,label:"镇江"}],"江西省":[{value:361100,label:"上饶"},{value:360900,label:"宜春"},{value:361000,label:"抚州"},{value:360800,label:"吉安"},{value:360200,label:"景德镇"},{value:360400,label:"九江"},{value:360500,label:"新余"},{value:360700,label:"赣州"},{value:360300,label:"萍乡"},{value:360600,label:"鹰潭"},{value:360100,label:"南昌"}],"河北省":[{value:130600,label:"保定"},{value:130800,label:"承德"},{value:130100,label:"石家庄"},{value:130700,label:"张家口"},{value:131000,label:"廊坊"},{value:130500,label:"邢台"},{value:130300,label:"秦皇岛"},{value:131100,label:"衡水"},{value:130200,label:"唐山"},{value:130900,label:"沧州"},{value:130400,label:"邯郸"}],"河南省":[{value:411500,label:"信阳"},{value:410500,label:"安阳"},{value:410100,label:"郑州"},{value:411400,label:"商丘"},{value:410300,label:"洛阳"},{value:411000,label:"许昌"},{value:411200,label:"三门峡"},{value:411481,label:"永城"},{value:410526,label:"滑县"},{value:411600,label:"周口"},{value:411100,label:"漯河"},{value:410200,label:"开封"},{value:410800,label:"焦作"},{value:419001,label:"济源"},{value:411300,label:"南阳"},{value:411700,label:"驻马店"},{value:410400,label:"平顶山"},{value:410900,label:"濮阳"},{value:410700,label:"新乡"},{value:410600,label:"鹤壁"},{value:411381,label:"邓州"},{value:410728,label:"长垣县"}],"浙江省":[{value:331000,label:"台州"},{value:330200,label:"宁波"},{value:330600,label:"绍兴"},{value:330900,label:"舟山"},{value:330800,label:"衢州"},{value:330300,label:"温州"},{value:330100,label:"杭州"},{value:330400,label:"嘉兴"},{value:330700,label:"金华"},{value:331100,label:"丽水"},{value:330500,label:"湖州"}],"海南省":[{value:469029,label:"保亭"},{value:469021,label:"定安"},{value:460200,label:"三亚"},{value:469006,label:"万宁"},{value:469026,label:"昌江"},{value:469002,label:"琼海"},{value:469007,label:"东方"},{value:469028,label:"陵水"},{value:469030,label:"琼中"},{value:460100,label:"海口"},{value:460400,label:"儋州"},{value:469023,label:"澄迈"},{value:469024,label:"临高"},{value:469005,label:"文昌"},{value:469027,label:"乐东"}],"湖北省":[{value:420100,label:"武汉"},{value:420700,label:"鄂州"},{value:421000,label:"荆州"},{value:420500,label:"宜昌"},{value:429004,label:"仙桃"},{value:421100,label:"黄冈"},{value:421300,label:"随州"},{value:420300,label:"十堰"},{value:429005,label:"潜江"},{value:422800,label:"恩施州"},{value:420600,label:"襄阳"},{value:420200,label:"黄石"},{value:429006,label:"天门"},{value:429021,label:"神农架林区"},{value:420900,label:"孝感"},{value:420800,label:"荆门"},{value:421200,label:"咸宁"},{value:422801,label:"恩施州"}],"湖南省":[{value:433100,label:"湘西自治州"},{value:431300,label:"娄底"},{value:430700,label:"常德"},{value:430500,label:"邵阳"},{value:431000,label:"郴州"},{value:431100,label:"永州"},{value:430800,label:"张家界"},{value:430100,label:"长沙"},{value:430600,label:"岳阳"},{value:430400,label:"衡阳"},{value:431200,label:"怀化"},{value:430200,label:"株洲"},{value:430300,label:"湘潭"},{value:430900,label:"益阳"}],"甘肃省":[{value:620500,label:"天水"},{value:620700,label:"张掖"},{value:621000,label:"庆阳"},{value:623000,label:"甘南"},{value:621200,label:"陇南"},{value:622900,label:"临夏"},{value:620100,label:"兰州"},{value:620800,label:"平凉"},{value:621100,label:"定西"},{value:620400,label:"白银"},{value:620300,label:"金昌"}],"福建省":[{value:350300,label:"莆田"},{value:350500,label:"泉州"},{value:350200,label:"厦门"},{value:350700,label:"南平"},{value:350800,label:"龙岩"},{value:350100,label:"福州"},{value:350900,label:"宁德"},{value:350600,label:"漳州"},{value:350400,label:"三明"}],"西藏自治区":[{value:540100,label:"拉萨"}],"贵州省":[{value:520400,label:"安顺"},{value:522300,label:"黔西南州"},{value:520300,label:"遵义"},{value:522700,label:"黔南州"},{value:520200,label:"六盘水"},{value:522600,label:"黔东南州"},{value:520100,label:"贵阳"},{value:520500,label:"毕节"},{value:520600,label:"铜仁"}],"辽宁省":[{value:210900,label:"阜新"},{value:211100,label:"盘锦"},{value:211200,label:"铁岭"},{value:211300,label:"朝阳"},{value:210100,label:"沈阳"},{value:210600,label:"丹东"},{value:211000,label:"辽阳"},{value:210200,label:"大连"},{value:210300,label:"鞍山"},{value:210500,label:"本溪"},{value:210800,label:"营口"},{value:211400,label:"葫芦岛"},{value:210700,label:"锦州"}],"重庆市":[{value:500116,label:"江津区"},{value:500152,label:"潼南区"},{value:500115,label:"长寿区"},{value:500235,label:"云阳县"},{value:500153,label:"荣昌区"},{value:500243,label:"彭水县"},{value:500113,label:"巴南区"},{value:500154,label:"开州区"},{value:500155,label:"梁平区"},{value:500101,label:"万州区"},{value:500117,label:"合川区"},{value:500111,label:"大足区"},{value:500233,label:"忠县"},{value:500114,label:"黔江区"},{value:500231,label:"垫江县"},{value:500120,label:"璧山区"},{value:500104,label:"大渡口区"},{value:500241,label:"秀山县"},{value:500106,label:"沙坪坝区"},{value:500112,label:"渝北区"},{value:500230,label:"丰都县"},{value:500240,label:"石柱县"},{value:500237,label:"巫山县"},{value:500238,label:"巫溪县"},{value:500102,label:"涪陵区"},{value:500229,label:"城口县"},{value:500110,label:"綦江区"},{value:500108,label:"南岸区"},{value:500151,label:"铜梁区"},{value:500242,label:"酉阳"},{value:500156,label:"武隆区"},{value:500105,label:"江北区"},{value:500236,label:"奉节县"},{value:500107,label:"九龙坡区"},{value:500103,label:"渝中区"},{value:500118,label:"永川区"}],"陕西省":[{value:610900,label:"安康"},{value:610500,label:"渭南"},{value:611000,label:"商洛"},{value:610300,label:"宝鸡"},{value:610800,label:"榆林"},{value:610700,label:"汉中"},{value:610200,label:"铜川"},{value:610400,label:"咸阳"},{value:610600,label:"延安"},{value:610581,label:"韩城"},{value:610100,label:"西安"}],"青海省":[{value:630100,label:"西宁"},{value:632200,label:"海北州"}],"黑龙江省":[{value:230800,label:"佳木斯"},{value:231200,label:"绥化"},{value:231000,label:"牡丹江"},{value:231100,label:"黑河"},{value:230300,label:"鸡西"},{value:230500,label:"双鸭山"},{value:230200,label:"齐齐哈尔"},{value:230900,label:"七台河"},{value:230100,label:"哈尔滨"},{value:230600,label:"大庆"},{value:230400,label:"鹤岗"},{value:230700,label:"伊春"},{value:232700,label:"大兴安岭"}]}
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