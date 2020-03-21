<template>
    <section class="chart-container">
        <!--工具条-->
        <!-- <el-form ref="form" :model="form" class="history">
            <el-form-item label="选择地区: ">
                <el-row>
                    <el-col>
                        <el-radio
                            v-model="areaRadio"
                            label="1"
                            @change="onAreaRadioChange"
                        >根据省份或者城市数据计算，只选择省份将计算该省疫情预测，选择省份下的城市将计算城市疫情预测</el-radio>
                    </el-col>
                    <el-col :span="5">
                        <el-select
                            v-model="form.province"
                            @change="onProvinceChange"
                            placeholder="省份"
                        >
                            <el-option
                                v-for="item in form.provinceOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select
                            v-model="form.city"
                            @change="onCityChange"
                            clearable
                            placeholder="城市"
                        >
                            <el-option
                                v-for="item in form.cityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-radio
                            v-model="areaRadio"
                            @change="onAreaRadioChange"
                            label="2"
                        >选择其他国家或者地区数据进行计算</el-radio>
                    </el-col>
                    <el-col :span="5">
                        <el-select
                            v-model="form.country"
                            @change="onCountryChange"
                            placeholder="国家和地区"
                        >
                            <el-option
                                v-for="item in countryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>-->
        <el-form ref="form" :model="form" class="sim-input">
            <h4>仿真条件</h4>
            <el-form-item label="初始感染人数">
                <el-row>
                    <el-col :span="5">
                        <el-input-number v-model="form.initNum" :min="1" :max="1000"></el-input-number>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="传染系数">
                <el-row>
                    <el-col>
                        <p
                            class="text"
                        >传染系数列表格式为:0-0.05;3-0.02;8-0.01, 表示从第0天开始传染系数为0.05, 第3天开始传染系数为0.02, 第8天开始人员传染系数0.01, 其中天数必须为整数</p>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="form.betaList" placeholder="样例: 0-0.05;3-0.02;8-0.01"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="人员聚集度">
                <el-row>
                    <el-col>
                        <p class="text">人员聚集度定义：平均每人每天接触人数</p>
                        <p
                            class="text"
                        >人员聚集度列表格式为:0-10.0;3-4.0;8-1.0, 表示从第0天开始人员聚集度为10.0, 第3天开始人员聚集度为4.0, 第8天开始人员聚集度为1.0, 其中天数必须为整数</p>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="form.mlist" placeholder="样例: 0-10.0;3-4.0;8-1.0"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="从发病到就诊时间">
                <el-row>
                    <el-col>
                        <p
                            class="text"
                        >发病到就诊时间列表格式为:0-10;3-4;8-1, 表示从第0天开始发病到就诊时间为10天, 第3天开始发病到就诊时间为4天, 第8天开始发病到就诊时间为1天</p>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="form.trementlist" placeholder="样例: 0-10.0;3-4.0;8-1.0"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="医疗系统同时收纳患者数量">
                <el-row>
                    <el-col :span="5">
                        <el-input-number v-model="form.medicalNum" :min="1000" :max="20000"></el-input-number>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="是否隔离密切接触者">
                <el-switch v-model="form.isQuarantine"></el-switch>
            </el-form-item>
            <el-form-item label="结束日期">
                <el-col :span="5">
                    <el-date-picker v-model="form.endDate" type="date" placeholder="计算结束时间"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="仿真次数">
                <el-row>
                    <el-col>
                        <el-input-number v-model="form.simNum" :min="1" :max="100" label="仿真次数"></el-input-number>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">开始仿真</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="20">
                <div class="lschart" id="predictChart"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <H3>不同状态下的人群预测趋势</H3>
                <ve-line :data="statusChartData" :setting="newChartSettings"></ve-line>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <H3>医疗资源模拟</H3>
                <ve-line :data="medicalChartData" :setting="newChartSettings"></ve-line>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <H3>死亡率预测</H3>
                <ve-line :data="deadProbChartData" :setting="deadProbChartSettings"></ve-line>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <H3>新增确诊预测趋势</H3>
                <ve-line :data="newChartData" :setting="newChartSettings"></ve-line>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <H3>疫情传播途径</H3>
                <p>选择几个初始感染者，显示每个感染者的传播路径，每簇同样颜色的个体表示从同一个感染者传播而来</p>

                <div class="schart" id="schart">
                    <spreadChart :graphData="graphData"></spreadChart>
                </div>
            </el-col>
        </el-row>
    </section>
</template>


<script>
import CountTo from "vue-count-to";
import { simulate } from "../../api/api";
import echarts from "echarts";
import spreadChart from "./spreadChart";

var predictChart;
var dates = [];

export default {
    components: {
        CountTo,
        spreadChart: spreadChart
    },
    mounted() {
        this.InitPredictLine();
        this.autoResize();
    },
    methods: {
        autoResize() {
            var pchart = document.getElementById("predictChart");
            var schart = document.getElementById("schart");
            pchart.style.width = document.body.clientWidth * 0.7 + "px";
            schart.style.width = document.body.clientWidth * 0.7 + "px";
            predictChart.resize();

            window.onresize = () => {
                return (() => {
                    pchart.style.width = document.body.clientWidth * 0.7 + "px";
                    schart.style.width = document.body.clientWidth * 0.7 + "px";
                    predictChart.resize();
                })();
            };
        },
        parsePairlist(strlist) {
            if (strlist == "") {
                return {};
            }
            var mlistStr = strlist.replace(" ", "");

            var mlist = mlistStr.split(";");

            var list = {};

            for (let m of mlist) {
                var mpair = m.split("-");
                if (mpair.length != 2) {
                    throw "格式错误：天数与值必须成对";
                }

                var day = Number(mpair[0]);
                var m = Number(mpair[1]);
                if (isNaN(day) || isNaN(m)) {
                    throw "格式错误：天数与值必须为数字";
                }

                if (!Number.isInteger(day)) {
                    throw "格式错误：天数必须为整数";
                }

                list[day] = m;
            }

            return list;
        },
        parseTreamentList() {
            if (this.form.trementlist == "") {
                return {};
            }

            var mlistStr = this.form.trementlist.replace(" ", "");

            var mlist = mlistStr.split(";");

            var list = {};

            for (let m of mlist) {
                var mpair = m.split("-");
                if (mpair.length != 2) {
                    throw "格式错误：天数与发病到就诊时间";
                }

                var day = Number(mpair[0]);
                var m = Number(mpair[1]);
                if (isNaN(day) || isNaN(m)) {
                    throw "格式错误：天数与发病到就诊时间必须为整数";
                }

                if (!Number.isInteger(day)) {
                    throw "格式错误：天数必须为整数";
                }
                if (!Number.isInteger(m)) {
                    throw "格式错误：发病到就诊时间必须为整数";
                }

                list[day] = m;
            }

            return list;
        },
        formatTooltip(val) {
            if (val >= 0 && val < dates.length) return dates[val];
        },
        InitPredictLine() {
            // 基于准备好的dom，初始化echarts实例
            predictChart = echarts.init(document.getElementById("predictChart"));

            predictChart.setOption({
                title: { text: "累计疫情趋势预测", top: 0 },
                grid: {
                    top: 100
                },
                tooltip: {
                    show: true,
                    trigger: "axis"
                },
                xAxis: {
                    data: [],
                    axisLabel: {
                        interval: 5,
                        rotate: 40
                    }
                },
                yAxis: {},
                series: [],
                color: ["#ee0000", "#00aa00", "#000099", "#eeaa00"]
            });
        },
        handleSetLineChartData(type) {
            this.$emit("handleSetLineChartData", type);
        },
        onSubmit() {
            var _this = this;
            if (this.form.endDate == "") {
                this.$message({
                    message: "请选择结束时间",
                    type: "warning"
                });
                return;
            }
            var province = "";
            var city = 0;
            if (this.areaRadio == "1") {
                province = this.form.province;
                if (this.form.city != "") {
                    city = this.form.city;
                }
            } else {
                province = this.form.country;
            }
            if (province == "" || province == null) {
                this.$message({
                    message: "请选择一个城市或者地区",
                    type: "warning"
                });
                return;
            }
            var startDate = new Date();
            var day = Math.round(
                (this.form.endDate - startDate) / (1000 * 60 * 60 * 24)
            );
            if (day < 0) {
                this.$message({
                    message: "日期不能早于2020年1月21日",
                    type: "warning"
                });
                return;
            }
            var mlist = {};
            try {
                mlist = this.parsePairlist(this.form.mlist);
            } catch (err) {
                this.$message({
                    message: err,
                    type: "warning"
                });
                return;
            }

            var treamentlist = {};
            try {
                treamentlist = this.parseTreamentList();
            } catch (err) {
                this.$message({
                    message: err,
                    type: "warning"
                });
                return;
            }

            var betaList = {};
            try {
                betaList = this.parsePairlist(this.form.betaList);
            } catch (err) {
                this.$message({
                    message: err,
                    type: "warning"
                });
                return;
            }

            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.9)'
            })

            this.$axios({
                method: "post",
                url: "/api/simulate",

                data: JSON.stringify({
                    province: province,
                    city: city,
                    predictDay: day,
                    initNum: this.form.initNum,
                    betaList: betaList,
                    mlist: mlist,
                    simNum: this.form.simNum,
                    treamentList: treamentlist,
                    isQuarantineCloser: this.form.isQuarantine,
                    medicalNum: this.form.medicalNum,
                })
            })
                .then(function (response) {
                    loading.close();
                    if (response.data.code != 0) {
                        _this.$message({
                            message: response.data.msg,
                            type: "warning"
                        });
                        return;
                    }

                    _this.graphData = response.data.data.spreadTrack;

                    _this.newChartData.rows = [];
                    _this.statusChartData.rows = [];
                    _this.medicalChartData.rows = []
                    _this.deadProbChartData.rows = []
                    dates = [];
                    var totalConfirms = [];
                    var predictTotalConfirm = [];
                    var predictCure = [];
                    var predictDeath = [];
                    var predictTotalInfections = [];
                    var predictInfectedMin = [];
                    var predictInfectedMax = [];
                    var actives = response.data.data.statistic;
                    _this.modelResult = actives;
                    for (let i of actives) {
                        //var dicTotal = {}
                        var dicNew = {};
                        var dicPredictNew = {};
                        var dicPredictStatus = {}
                        var dicPredictMedical = {}
                        var dicPredictDead = {}
                        var dicM = {};
                        var dicAlpha = {};
                        // var newI = i["realConfirmNew"];
                        // dicPredictNew["真实新增确诊"] = newI;
                        dicPredictNew["预测新增确诊"] = i["confirmNew"];
                        dicPredictNew["预测新增治愈"] = i["cureNew"];
                        dicPredictNew["预测新增感染"] = i["infectedNew"];
                        dicPredictNew["预测新增死亡"] = i["deadNew"];
                        dicPredictStatus["目前被感染人数"] = i["infectingCount"];
                        dicPredictStatus["目前正治疗人数"] = i["treamentingCount"];
                        dicPredictStatus["目前被确诊人数"] = i["confirmingCount"]
                        dicPredictStatus["目前被感染未隔离人数"] = i["infectedNotQuarantineCount"];
                        dicPredictStatus["被隔离密切接触者人数"] = i["closerQuarantineCount"];
                        dicPredictMedical["目前正治疗人数"] = i["treamentingCount"];
                        dicPredictMedical["目前已发病但未接受治疗人数"] = i["attackedNotTreamenting"];
                        dicPredictMedical["医疗资源容量"] = _this.form.medicalNum
                        dicPredictDead["死亡率"] = i["deadProb"] * 100
                        predictTotalInfections.push(i["infectedCount"]);
                        var totalI = i["realConfirmCount"];
                        predictTotalConfirm.push(i["infectedCount"]);
                        //dicTotal['date'] = i['date']
                        dates.push(i["date"]);
                        dicPredictNew["date"] = i["date"];
                        dicPredictStatus["date"] = i["date"];
                        dicPredictMedical["date"] = i["date"];
                        dicPredictDead["date"] = i["date"]
                        if (totalI != 0) {
                            //dicTotal['累计确诊'] = totalI
                            totalConfirms.push(totalI);
                        } else {
                            totalConfirms.push("");
                        }
                        predictCure.push(i["cureCount"]);
                        predictDeath.push(i["deadCount"]);
                        predictInfectedMin.push(i["infectedMin"]);
                        predictInfectedMax.push(i["infectedMax"]);
                        // dicTotal['预测累计确诊'] = i['predictTotal']
                        // dicTotal['预测累计治愈'] = i['predictRecover']
                        // dicTotal['预测累计死亡'] = i['predictDeath']
                        dicM["m"] = i["mval"];
                        dicAlpha["alpha"] = i["alpha"];
                        //_this.lineTotalData.rows.push(dicTotal)

                        _this.newChartData.rows.push(dicPredictNew)
                        _this.statusChartData.rows.push(dicPredictStatus)
                        _this.medicalChartData.rows.push(dicPredictMedical)
                        _this.deadProbChartData.rows.push(dicPredictDead)
                    }
                    // 绘制图表
                    predictChart.setOption({
                        xAxis: {
                            data: dates,
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false
                        },
                        legend: {
                            top: 40,
                            data: [
                                //"真实累计确诊",
                                "预测累计感染",
                                //"预测累计确诊",
                                "预测累计治愈",
                                "预测累计死亡"
                            ]
                        },
                        yAxis: {

                        },
                        series: [
                            // {
                            //     name: "真实累计确诊",
                            //     type: "scatter",
                            //     data: totalConfirms
                            // },
                            {
                                name: "预测累计感染",
                                type: "line",
                                data: predictTotalInfections
                            },
                            // {
                            //     name: "预测累计确诊",
                            //     type: "line",
                            //     data: predictTotalConfirm
                            // },
                            {
                                name: "预测累计治愈",
                                type: "line",
                                data: predictCure
                            },
                            {
                                name: "预测累计死亡",
                                type: "line",
                                data: predictDeath
                            },
                            {
                                name: "Min",
                                type: "line",
                                lineStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                symbol: "none",
                                tooltip: {
                                    show: false
                                },
                                data: predictInfectedMin,
                                stack: "confidence-band"
                            },
                            {
                                name: "Max",
                                type: "line",
                                lineStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: "#ccc"
                                    }
                                },
                                tooltip: {
                                    show: false
                                },
                                symbol: "none",
                                data: predictInfectedMax,
                                stack: "confidence-band"
                            }
                        ]
                    });

                })
                .catch(function (error) {
                    loading.close();
                    console.log(error);
                });
        },
        onProvinceChange() {
            for (let i of this.form.provinceOptions) {
                if (i.value == this.form.province) {
                    this.selectedCity = i.label;
                }
            }
            this.form.cityOptions = this.citys[this.form.province];
            this.form.city = "";
            //console.log(this.cityOptions)
        },
        onCityChange() { },
        onCountryChange() { },
        onAreaRadioChange() { }
    },
    data() {
        this.newChartSettings = {
            xAxisType: "category",
            yAxisName: ["数量"]
        };
        this.deadProbChartSettings = {
            xAxisType: "category",
            yAxisName: ["数量"],
            yAxisType: ["percent"]
        };
        return {
            graphData: {},
            deadProbChartData: {
                columns: [
                    "date",
                    "死亡率",
                ],
                rows: []
            },
            statusChartData: {
                columns: [
                    "date",
                    "目前被感染人数",
                    "目前正治疗人数",
                    "目前被感染未隔离人数",
                    "目前被确诊人数",
                    "被隔离密切接触者人数"
                ],
                rows: []
            },
            medicalChartData: {
                columns: [
                    "date",
                    "目前正治疗人数",
                    "目前已发病但未接受治疗人数",
                    "医疗资源容量"
                ],
                rows: []
            },
            newChartData: {
                columns: [
                    "date",
                    //                    "真实新增确诊",
                    "预测新增感染",
                    "预测新增确诊",
                    "预测新增治愈",
                    "预测新增死亡",

                ],
                rows: []
            },
            slidermin: 0,
            slidermax: 1,
            slidervalue: [0, 1],
            slidermarks: {},
            lineMData: {
                columns: ["date", "m"],
                rows: []
            },
            lineAlphaData: {
                columns: ["date", "alpha"],
                rows: []
            },
            selectedCity: "广东省",
            modelResult: [],
            form: {
                betaList: "0-0.05;10-0.04",
                trementlist: "0-8;10-4;20-2",
                mlist: "0-15;10-8;20-3",
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                province: "广东省",
                simNum: 5,
                isQuarantine: false,
                initNum: 1,
                medicalNum: 1000,
                provinceOptions: [
                    { value: "湖北省", label: "湖北" },
                    { value: "广东省", label: "广东" },
                    { value: "河南省", label: "河南" },
                    { value: "浙江省", label: "浙江" },
                    { value: "湖南省", label: "湖南" },
                    { value: "安徽省", label: "安徽" },
                    { value: "江西省", label: "江西" },
                    { value: "江苏省", label: "江苏" },
                    { value: "重庆市", label: "重庆" },
                    { value: "山东省", label: "山东" },
                    { value: "四川省", label: "四川" },
                    { value: "黑龙江省", label: "黑龙江" },
                    { value: "北京市", label: "北京" },
                    { value: "上海市", label: "上海" },
                    { value: "河北省", label: "河北" },
                    { value: "福建省", label: "福建" },
                    { value: "广西壮族自治区", label: "广西" },
                    { value: "陕西省", label: "陕西" },
                    { value: "云南省", label: "云南" },
                    { value: "海南省", label: "海南" },
                    { value: "贵州省", label: "贵州" },
                    { value: "山西省", label: "山西" },
                    { value: "天津市", label: "天津" },
                    { value: "辽宁省", label: "辽宁" },
                    { value: "甘肃省", label: "甘肃" },
                    { value: "吉林省", label: "吉林" },
                    { value: "新疆维吾尔自治区", label: "新疆" },
                    { value: "内蒙古自治区", label: "内蒙古" },
                    { value: "宁夏回族自治区", label: "宁夏" },
                    { value: "青海省", label: "青海" },
                    { value: "西藏自治区", label: "西藏" }
                ],
                city: "",
                cityOptions: [
                    { value: 440300, label: "深圳" },
                    { value: 440600, label: "佛山" },
                    { value: 441300, label: "惠州" },
                    { value: 440800, label: "湛江" },
                    { value: 441900, label: "东莞" },
                    { value: 441400, label: "梅州" },
                    { value: 445100, label: "潮州" },
                    { value: 440100, label: "广州" },
                    { value: 440700, label: "江门" },
                    { value: 440900, label: "茂名" },
                    { value: 440500, label: "汕头" },
                    { value: 441600, label: "河源" },
                    { value: 441800, label: "清远" },
                    { value: 440400, label: "珠海" },
                    { value: 442000, label: "中山" },
                    { value: 441200, label: "肇庆" },
                    { value: 441700, label: "阳江" },
                    { value: 440200, label: "韶关" },
                    { value: 445200, label: "揭阳" },
                    { value: 441500, label: "汕尾" }
                ],
                comp: [20, 30]
            },
            timeline: 10,
            citys: {
                上海市: [
                    { value: 310104, label: "徐汇区" },
                    { value: 310117, label: "松江区" },
                    { value: 310120, label: "奉贤区" },
                    { value: 310101, label: "黄浦区" },
                    { value: 310118, label: "青浦区" },
                    { value: 310106, label: "静安区" },
                    { value: 310151, label: "崇明区" },
                    { value: 310116, label: "金山区" },
                    { value: 310113, label: "宝山区" },
                    { value: 310107, label: "普陀区" },
                    { value: 310110, label: "杨浦区" },
                    { value: 310109, label: "虹口区" },
                    { value: 310115, label: "浦东新区" },
                    { value: 310114, label: "嘉定区" },
                    { value: 310112, label: "闵行区" },
                    { value: 310105, label: "长宁区" }
                ],
                云南省: [
                    { value: 530900, label: "临沧" },
                    { value: 532901, label: "大理" },
                    { value: 530500, label: "保山" },
                    { value: 530800, label: "普洱" },
                    { value: 530600, label: "昭通" },
                    { value: 530400, label: "玉溪" },
                    { value: 532500, label: "红河" },
                    { value: 532301, label: "楚雄" },
                    { value: 532601, label: "文山" },
                    { value: 530300, label: "曲靖" },
                    { value: 530700, label: "丽江" },
                    { value: 533100, label: "德宏" },
                    { value: 530100, label: "昆明" },
                    { value: 532800, label: "西双版纳" }
                ],
                内蒙古自治区: [
                    { value: 152500, label: "锡林郭勒盟" },
                    { value: 150400, label: "赤峰" },
                    { value: 150200, label: "包头" },
                    { value: 150500, label: "通辽" },
                    { value: 150100, label: "呼和浩特" },
                    { value: 150700, label: "呼伦贝尔" },
                    { value: 150600, label: "鄂尔多斯" },
                    { value: 150800, label: "巴彦淖尔" },
                    { value: 150900, label: "乌兰察布" },
                    { value: 150300, label: "乌海市" },
                    { value: 152200, label: "兴安盟" }
                ],
                北京市: [
                    { value: 110116, label: "怀柔区" },
                    { value: 110118, label: "密云区" },
                    { value: 110114, label: "昌平区" },
                    { value: 110107, label: "石景山区" },
                    { value: 110109, label: "门头沟区" },
                    { value: 110119, label: "延庆区" },
                    { value: 110105, label: "朝阳区" },
                    { value: 110106, label: "丰台区" },
                    { value: 110115, label: "大兴区" },
                    { value: 110112, label: "通州区" },
                    { value: 110101, label: "东城区" },
                    { value: 110108, label: "海淀区" },
                    { value: 110102, label: "西城区" },
                    { value: 110111, label: "房山区" },
                    { value: 110113, label: "顺义区" }
                ],
                吉林省: [
                    { value: 220100, label: "长春" },
                    { value: 220300, label: "四平市" },
                    { value: 220200, label: "吉林市" },
                    { value: 220700, label: "松原" },
                    { value: 220581, label: "梅河口" },
                    { value: 220000, label: "吉林" },
                    { value: 220400, label: "辽源" },
                    { value: 220500, label: "通化" },
                    { value: 220381, label: "公主岭" },
                    { value: 220800, label: "白城" },
                    { value: 222400, label: "延边" }
                ],
                四川省: [
                    { value: 510400, label: "攀枝花" },
                    { value: 511400, label: "眉山" },
                    { value: 510300, label: "自贡" },
                    { value: 511000, label: "内江" },
                    { value: 510700, label: "绵阳" },
                    { value: 511500, label: "宜宾" },
                    { value: 512000, label: "资阳" },
                    { value: 510800, label: "广元" },
                    { value: 513200, label: "阿坝州" },
                    { value: 511700, label: "达州" },
                    { value: 511900, label: "巴中" },
                    { value: 511800, label: "雅安" },
                    { value: 513300, label: "甘孜州" },
                    { value: 511300, label: "南充" },
                    { value: 511600, label: "广安" },
                    { value: 510600, label: "德阳" },
                    { value: 510900, label: "遂宁" },
                    { value: 513400, label: "凉山州" },
                    { value: 511100, label: "乐山" },
                    { value: 510100, label: "成都" },
                    { value: 510500, label: "泸州" }
                ],
                天津市: [
                    { value: 120104, label: "南开区" },
                    { value: 120105, label: "河北区" },
                    { value: 120101, label: "和平区" },
                    { value: 120111, label: "西青区" },
                    { value: 120102, label: "河东区" },
                    { value: 120116, label: "滨海新区" },
                    { value: 120114, label: "武清区" },
                    { value: 120110, label: "东丽区" },
                    { value: 120103, label: "河西区" },
                    { value: 120106, label: "红桥区" },
                    { value: 120115, label: "宝坻区" },
                    { value: 120113, label: "北辰区" },
                    { value: 120117, label: "宁河区" },
                    { value: 120112, label: "津南区" }
                ],
                宁夏回族自治区: [
                    { value: 640200, label: "石嘴山" },
                    { value: 640100, label: "银川" },
                    { value: 640300, label: "吴忠" },
                    { value: 640400, label: "固原" },
                    { value: 640500, label: "中卫" }
                ],
                安徽省: [
                    { value: 341500, label: "六安" },
                    { value: 341600, label: "亳州" },
                    { value: 340500, label: "马鞍山" },
                    { value: 340600, label: "淮北" },
                    { value: 341000, label: "黄山" },
                    { value: 340700, label: "铜陵" },
                    { value: 341800, label: "宣城" },
                    { value: 340100, label: "合肥" },
                    { value: 340300, label: "蚌埠" },
                    { value: 341300, label: "宿州" },
                    { value: 341100, label: "滁州" },
                    { value: 341200, label: "阜阳" },
                    { value: 340800, label: "安庆" },
                    { value: 340400, label: "淮南" },
                    { value: 340200, label: "芜湖" },
                    { value: 341700, label: "池州" }
                ],
                山东省: [
                    { value: 370200, label: "青岛" },
                    { value: 371300, label: "临沂" },
                    { value: 370600, label: "烟台" },
                    { value: 371400, label: "德州" },
                    { value: 371600, label: "滨州" },
                    { value: 370100, label: "济南" },
                    { value: 370900, label: "泰安" },
                    { value: 371500, label: "聊城" },
                    { value: 370400, label: "枣庄" },
                    { value: 371100, label: "日照" },
                    { value: 371700, label: "菏泽" },
                    { value: 370800, label: "济宁" },
                    { value: 370700, label: "潍坊" },
                    { value: 370300, label: "淄博" },
                    { value: 371000, label: "威海" }
                ],
                山西省: [
                    { value: 140500, label: "晋城" },
                    { value: 140200, label: "大同" },
                    { value: 140600, label: "朔州" },
                    { value: 141100, label: "吕梁" },
                    { value: 140300, label: "阳泉" },
                    { value: 141000, label: "临汾" },
                    { value: 140700, label: "晋中" },
                    { value: 140100, label: "太原" },
                    { value: 140900, label: "忻州" },
                    { value: 140800, label: "运城" },
                    { value: 140400, label: "长治" }
                ],
                广东省: [
                    { value: 440300, label: "深圳" },
                    { value: 440600, label: "佛山" },
                    { value: 441300, label: "惠州" },
                    { value: 440800, label: "湛江" },
                    { value: 441900, label: "东莞" },
                    { value: 441400, label: "梅州" },
                    { value: 445100, label: "潮州" },
                    { value: 440100, label: "广州" },
                    { value: 440700, label: "江门" },
                    { value: 440900, label: "茂名" },
                    { value: 440500, label: "汕头" },
                    { value: 441600, label: "河源" },
                    { value: 441800, label: "清远" },
                    { value: 440400, label: "珠海" },
                    { value: 442000, label: "中山" },
                    { value: 441200, label: "肇庆" },
                    { value: 441700, label: "阳江" },
                    { value: 440200, label: "韶关" },
                    { value: 445200, label: "揭阳" },
                    { value: 441500, label: "汕尾" }
                ],
                广西壮族自治区: [
                    { value: 450700, label: "钦州" },
                    { value: 451100, label: "贺州" },
                    { value: 450600, label: "防城港" },
                    { value: 451300, label: "来宾" },
                    { value: 450900, label: "玉林" },
                    { value: 451200, label: "河池" },
                    { value: 450300, label: "桂林" },
                    { value: 451000, label: "百色" },
                    { value: 450800, label: "贵港" },
                    { value: 450400, label: "梧州" },
                    { value: 450100, label: "南宁" },
                    { value: 450500, label: "北海" },
                    { value: 450200, label: "柳州" }
                ],
                新疆维吾尔自治区: [
                    { value: 652901, label: "阿克苏" },
                    { value: 654201, label: "塔城" },
                    { value: 659001, label: "石河子" },
                    { value: 654000, label: "伊犁州" },
                    { value: 652301, label: "昌吉" },
                    { value: 652900, label: "阿克苏地区" },
                    { value: 659004, label: "五家渠" },
                    { value: 650100, label: "乌鲁木齐" },
                    { value: 650400, label: "吐鲁番市" },
                    { value: 511902, label: "巴州" }
                ],
                江苏省: [
                    { value: 320100, label: "南京" },
                    { value: 320700, label: "连云港" },
                    { value: 320800, label: "淮安" },
                    { value: 321000, label: "扬州" },
                    { value: 320600, label: "南通" },
                    { value: 320200, label: "无锡" },
                    { value: 320400, label: "常州" },
                    { value: 320900, label: "盐城" },
                    { value: 320500, label: "苏州" },
                    { value: 321300, label: "宿迁" },
                    { value: 320300, label: "徐州" },
                    { value: 321200, label: "泰州" },
                    { value: 321100, label: "镇江" }
                ],
                江西省: [
                    { value: 361100, label: "上饶" },
                    { value: 360900, label: "宜春" },
                    { value: 361000, label: "抚州" },
                    { value: 360800, label: "吉安" },
                    { value: 360200, label: "景德镇" },
                    { value: 360400, label: "九江" },
                    { value: 360500, label: "新余" },
                    { value: 360700, label: "赣州" },
                    { value: 360300, label: "萍乡" },
                    { value: 360600, label: "鹰潭" },
                    { value: 360100, label: "南昌" }
                ],
                河北省: [
                    { value: 130600, label: "保定" },
                    { value: 130800, label: "承德" },
                    { value: 130100, label: "石家庄" },
                    { value: 130700, label: "张家口" },
                    { value: 131000, label: "廊坊" },
                    { value: 130500, label: "邢台" },
                    { value: 130300, label: "秦皇岛" },
                    { value: 131100, label: "衡水" },
                    { value: 130200, label: "唐山" },
                    { value: 130900, label: "沧州" },
                    { value: 130400, label: "邯郸" }
                ],
                河南省: [
                    { value: 411500, label: "信阳" },
                    { value: 410500, label: "安阳" },
                    { value: 410100, label: "郑州" },
                    { value: 411400, label: "商丘" },
                    { value: 410300, label: "洛阳" },
                    { value: 411000, label: "许昌" },
                    { value: 411200, label: "三门峡" },
                    { value: 411481, label: "永城" },
                    { value: 410526, label: "滑县" },
                    { value: 411600, label: "周口" },
                    { value: 411100, label: "漯河" },
                    { value: 410200, label: "开封" },
                    { value: 410800, label: "焦作" },
                    { value: 419001, label: "济源" },
                    { value: 411300, label: "南阳" },
                    { value: 411700, label: "驻马店" },
                    { value: 410400, label: "平顶山" },
                    { value: 410900, label: "濮阳" },
                    { value: 410700, label: "新乡" },
                    { value: 410600, label: "鹤壁" },
                    { value: 411381, label: "邓州" },
                    { value: 410728, label: "长垣县" }
                ],
                浙江省: [
                    { value: 331000, label: "台州" },
                    { value: 330200, label: "宁波" },
                    { value: 330600, label: "绍兴" },
                    { value: 330900, label: "舟山" },
                    { value: 330800, label: "衢州" },
                    { value: 330300, label: "温州" },
                    { value: 330100, label: "杭州" },
                    { value: 330400, label: "嘉兴" },
                    { value: 330700, label: "金华" },
                    { value: 331100, label: "丽水" },
                    { value: 330500, label: "湖州" }
                ],
                海南省: [
                    { value: 469029, label: "保亭" },
                    { value: 469021, label: "定安" },
                    { value: 460200, label: "三亚" },
                    { value: 469006, label: "万宁" },
                    { value: 469026, label: "昌江" },
                    { value: 469002, label: "琼海" },
                    { value: 469007, label: "东方" },
                    { value: 469028, label: "陵水" },
                    { value: 469030, label: "琼中" },
                    { value: 460100, label: "海口" },
                    { value: 460400, label: "儋州" },
                    { value: 469023, label: "澄迈" },
                    { value: 469024, label: "临高" },
                    { value: 469005, label: "文昌" },
                    { value: 469027, label: "乐东" }
                ],
                湖北省: [
                    { value: 420100, label: "武汉" },
                    { value: 420700, label: "鄂州" },
                    { value: 421000, label: "荆州" },
                    { value: 420500, label: "宜昌" },
                    { value: 429004, label: "仙桃" },
                    { value: 421100, label: "黄冈" },
                    { value: 421300, label: "随州" },
                    { value: 420300, label: "十堰" },
                    { value: 429005, label: "潜江" },
                    { value: 422800, label: "恩施州" },
                    { value: 420600, label: "襄阳" },
                    { value: 420200, label: "黄石" },
                    { value: 429006, label: "天门" },
                    { value: 429021, label: "神农架林区" },
                    { value: 420900, label: "孝感" },
                    { value: 420800, label: "荆门" },
                    { value: 421200, label: "咸宁" },
                    { value: 422801, label: "恩施州" }
                ],
                湖南省: [
                    { value: 433100, label: "湘西自治州" },
                    { value: 431300, label: "娄底" },
                    { value: 430700, label: "常德" },
                    { value: 430500, label: "邵阳" },
                    { value: 431000, label: "郴州" },
                    { value: 431100, label: "永州" },
                    { value: 430800, label: "张家界" },
                    { value: 430100, label: "长沙" },
                    { value: 430600, label: "岳阳" },
                    { value: 430400, label: "衡阳" },
                    { value: 431200, label: "怀化" },
                    { value: 430200, label: "株洲" },
                    { value: 430300, label: "湘潭" },
                    { value: 430900, label: "益阳" }
                ],
                甘肃省: [
                    { value: 620500, label: "天水" },
                    { value: 620700, label: "张掖" },
                    { value: 621000, label: "庆阳" },
                    { value: 623000, label: "甘南" },
                    { value: 621200, label: "陇南" },
                    { value: 622900, label: "临夏" },
                    { value: 620100, label: "兰州" },
                    { value: 620800, label: "平凉" },
                    { value: 621100, label: "定西" },
                    { value: 620400, label: "白银" },
                    { value: 620300, label: "金昌" }
                ],
                福建省: [
                    { value: 350300, label: "莆田" },
                    { value: 350500, label: "泉州" },
                    { value: 350200, label: "厦门" },
                    { value: 350700, label: "南平" },
                    { value: 350800, label: "龙岩" },
                    { value: 350100, label: "福州" },
                    { value: 350900, label: "宁德" },
                    { value: 350600, label: "漳州" },
                    { value: 350400, label: "三明" }
                ],
                西藏自治区: [{ value: 540100, label: "拉萨" }],
                贵州省: [
                    { value: 520400, label: "安顺" },
                    { value: 522300, label: "黔西南州" },
                    { value: 520300, label: "遵义" },
                    { value: 522700, label: "黔南州" },
                    { value: 520200, label: "六盘水" },
                    { value: 522600, label: "黔东南州" },
                    { value: 520100, label: "贵阳" },
                    { value: 520500, label: "毕节" },
                    { value: 520600, label: "铜仁" }
                ],
                辽宁省: [
                    { value: 210900, label: "阜新" },
                    { value: 211100, label: "盘锦" },
                    { value: 211200, label: "铁岭" },
                    { value: 211300, label: "朝阳" },
                    { value: 210100, label: "沈阳" },
                    { value: 210600, label: "丹东" },
                    { value: 211000, label: "辽阳" },
                    { value: 210200, label: "大连" },
                    { value: 210300, label: "鞍山" },
                    { value: 210500, label: "本溪" },
                    { value: 210800, label: "营口" },
                    { value: 211400, label: "葫芦岛" },
                    { value: 210700, label: "锦州" }
                ],
                重庆市: [
                    { value: 500116, label: "江津区" },
                    { value: 500152, label: "潼南区" },
                    { value: 500115, label: "长寿区" },
                    { value: 500235, label: "云阳县" },
                    { value: 500153, label: "荣昌区" },
                    { value: 500243, label: "彭水县" },
                    { value: 500113, label: "巴南区" },
                    { value: 500154, label: "开州区" },
                    { value: 500155, label: "梁平区" },
                    { value: 500101, label: "万州区" },
                    { value: 500117, label: "合川区" },
                    { value: 500111, label: "大足区" },
                    { value: 500233, label: "忠县" },
                    { value: 500114, label: "黔江区" },
                    { value: 500231, label: "垫江县" },
                    { value: 500120, label: "璧山区" },
                    { value: 500104, label: "大渡口区" },
                    { value: 500241, label: "秀山县" },
                    { value: 500106, label: "沙坪坝区" },
                    { value: 500112, label: "渝北区" },
                    { value: 500230, label: "丰都县" },
                    { value: 500240, label: "石柱县" },
                    { value: 500237, label: "巫山县" },
                    { value: 500238, label: "巫溪县" },
                    { value: 500102, label: "涪陵区" },
                    { value: 500229, label: "城口县" },
                    { value: 500110, label: "綦江区" },
                    { value: 500108, label: "南岸区" },
                    { value: 500151, label: "铜梁区" },
                    { value: 500242, label: "酉阳" },
                    { value: 500156, label: "武隆区" },
                    { value: 500105, label: "江北区" },
                    { value: 500236, label: "奉节县" },
                    { value: 500107, label: "九龙坡区" },
                    { value: 500103, label: "渝中区" },
                    { value: 500118, label: "永川区" }
                ],
                陕西省: [
                    { value: 610900, label: "安康" },
                    { value: 610500, label: "渭南" },
                    { value: 611000, label: "商洛" },
                    { value: 610300, label: "宝鸡" },
                    { value: 610800, label: "榆林" },
                    { value: 610700, label: "汉中" },
                    { value: 610200, label: "铜川" },
                    { value: 610400, label: "咸阳" },
                    { value: 610600, label: "延安" },
                    { value: 610581, label: "韩城" },
                    { value: 610100, label: "西安" }
                ],
                青海省: [
                    { value: 630100, label: "西宁" },
                    { value: 632200, label: "海北州" }
                ],
                黑龙江省: [
                    { value: 230800, label: "佳木斯" },
                    { value: 231200, label: "绥化" },
                    { value: 231000, label: "牡丹江" },
                    { value: 231100, label: "黑河" },
                    { value: 230300, label: "鸡西" },
                    { value: 230500, label: "双鸭山" },
                    { value: 230200, label: "齐齐哈尔" },
                    { value: 230900, label: "七台河" },
                    { value: 230100, label: "哈尔滨" },
                    { value: 230600, label: "大庆" },
                    { value: 230400, label: "鹤岗" },
                    { value: 230700, label: "伊春" },
                    { value: 232700, label: "大兴安岭" }
                ]
            },
            countryOptions: [
                { value: "以色列", Label: "以色列" },
                { value: "伊拉克", Label: "伊拉克" },
                { value: "伊朗", Label: "伊朗" },
                { value: "俄罗斯", Label: "俄罗斯" },
                { value: "克罗地亚", Label: "克罗地亚" },
                { value: "加拿大", Label: "加拿大" },
                { value: "印度", Label: "印度" },
                { value: "台湾", Label: "台湾" },
                { value: "埃及", Label: "埃及" },
                { value: "奥地利", Label: "奥地利" },
                { value: "尼泊尔", Label: "尼泊尔" },
                { value: "巴林", Label: "巴林" },
                { value: "德国", Label: "德国" },
                { value: "意大利", Label: "意大利" },
                { value: "斯里兰卡", Label: "斯里兰卡" },
                { value: "新加坡", Label: "新加坡" },
                { value: "日本", Label: "日本" },
                { value: "柬埔寨", Label: "柬埔寨" },
                { value: "比利时", Label: "比利时" },
                { value: "法国", Label: "法国" },
                { value: "泰国", Label: "泰国" },
                { value: "澳大利亚", Label: "澳大利亚" },
                { value: "澳门", Label: "澳门" },
                { value: "瑞典", Label: "瑞典" },
                { value: "瑞士", Label: "瑞士" },
                { value: "科威特", Label: "科威特" },
                { value: "美国", Label: "美国" },
                { value: "芬兰", Label: "芬兰" },
                { value: "英国", Label: "英国" },
                { value: "菲律宾", Label: "菲律宾" },
                { value: "西班牙", Label: "西班牙" },
                { value: "越南", Label: "越南" },
                { value: "钻石公主号邮轮", Label: "钻石公主号邮轮" },
                { value: "阿富汗", Label: "阿富汗" },
                { value: "阿尔及利亚", Label: "阿尔及利亚" },
                { value: "阿曼", Label: "阿曼" },
                { value: "阿联酋", Label: "阿联酋" },
                { value: "韩国", Label: "韩国" },
                { value: "香港", Label: "香港" },
                { value: "马来西亚", Label: "马来西亚" },
                { value: "黎巴嫩", Label: "黎巴嫩" }
            ],
            areaRadio: "1"
        };
    }
};
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
    margin-top: 20px;
}

.lschart {
    width: 900px;
    height: 500px;
}

.schart {
    width: 900px;
    height: 600px;
}

.chinaMap {
    width: 100%;
    height: 350px;
    color: #ff0505;
}

.slider {
    margin-bottom: 40px;
}

.text {
    margin: 0px;
}
</style>