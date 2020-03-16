<template>
<body
  lang="ZH-CN"
  link="#0563C1"
  vlink="#954F72"
  style="text-justify-trim:punctuation;margin-bottom:40px"
>
  <div class="WordSection1" style="layout-grid:15.6pt">
    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <b>
        <span style="font-size:20.0pt;line-height:150%;color:black">哈尔滨工业大学人工智能研究院疫情传播预测分析系统</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        哈尔滨工业大学人工智能研究院在基于中国疾病预防控制中心
        <span lang="EN-US">(CCDC)</span>公开疫情数据、黑龙江移动信令大数据、百度迁徙数据的基础上，对经典疫情传播
        <span lang="EN-US">SEIR</span>模型中的人员接触、传染率等关键指标进行了优化改进，提出了基于人员聚集度的
        <span lang="EN-US">SEIQR</span>模型，该模型较好地拟合了目前上海、北京、深圳、哈尔滨、杭州等城市已公布的疫情数据。并在模型基础上构建了可视化的疫情传播预测分析系统，可交互式对疫情发展关键元素（人员聚集度、收治率、传染率、恢复率、病死率）进行调节，分析计算元素影响权重，对疫情传播进行动态预测分析，通过仿真模拟对比，得到不同管控模式下疫情传播态势，为相关政策制定提供决策支持。
      </span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <span lang="EN-US" style="font-size:
12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">1.</span>
      </b>
      <b>
        <span style="font-size:12.0pt;line-height:150%;color:black">人员聚集度分析</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span
        style="font-size:12.0pt;line-height:150%;color:black"
      >很显然，疫情的发展不仅与城市间的人口流动密切相关，还与市内人员出行、人员聚集等因素密切相关，同时这些因素也是政府管控政策的制定依据。为此我们通过疫情数据、移动运营商人口流动数据及百度出行数据进行了如下分析。</span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="484" height="270" id="图片 5" src="static/assets/image/image001.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">1</span>哈尔滨每日新增确诊人数趋势
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">1</span>显示哈尔滨市新增确诊人数在
        <span lang="EN-US">2</span>月
        <span lang="EN-US">3</span>与
        <span lang="EN-US">2</span>月
        <span lang="EN-US">10</span>日有两个激增，考虑到潜伏天数（
        <span lang="EN-US">3~5</span>天）与确诊天数（
        <span lang="EN-US">3~5</span>），病毒感染发病人数与两个潜伏期有关（
        <span lang="EN-US">A</span>潜伏到发病要经历一个潜伏期，
        <span lang="EN-US">A</span>确诊收治前如传染了
        <span lang="EN-US">B</span>，
        <span lang="EN-US">B</span>发病还要经历一个潜伏期），故推测此两处的激增与
        <span lang="EN-US">1</span>月
        <span lang="EN-US">22</span>日
        <span lang="EN-US">~1</span>月
        <span lang="EN-US">26</span>日的感染人数有关。
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%">
        <img width="478" height="269" id="图片 4" src="static/assets/image/image002.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">2</span>湖北移动用户来哈人数
        <span lang="EN-US">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="466" height="354" src="static/assets/image/image003.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">3</span>哈尔滨百度出行强度
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        为此，我们调研了
        <span lang="EN-US">1</span>月
        <span lang="EN-US">22</span>日
        <span lang="EN-US">~1</span>月
        <span lang="EN-US">26</span>日从湖北来哈的人数，如图
        <span lang="EN-US">2</span>所示。以及此期间哈市人员的出行强度，如图
        <span lang="EN-US">3</span>所示。我们发现：（
        <span lang="EN-US">1</span>）虽然
        <span lang="EN-US">1</span>月
        <span lang="EN-US">22</span>日从湖北来哈的人数超过了
        <span lang="EN-US">200</span>但相对于去年
        <span lang="EN-US">12</span>月底来哈参观冰雪节的人数已有明显下降；（
        <span lang="EN-US">2</span>）然而，
        <span lang="EN-US">1</span>月
        <span lang="EN-US">22</span>日
        <span lang="EN-US">~1</span>月
        <span lang="EN-US">26</span>日的哈市出行强度较去年同期未有明显下降。这说明当时政府管控力度还未收紧。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        据报道，哈尔滨聚集性疫情发病人数占
        <span lang="EN-US">58.7%</span>。然而当前还缺乏一个指标来反映人群聚集度。为此，我们提出在模型中引入了一个人员聚集度指标
        <span lang="EN-US">m</span>，相比人口流动及出行强度，该指标更能综合反映政府的管控力度，因为人员聚集度越高，病毒的传染力就越强，而管理力度越强，聚集度则越小，疫情则将逐步得到控制。然而该指标并不能直接获得，可以通过历史数据反演计算得到，也可以在模拟仿真预测时进行动态调整。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        为了说明该指标的有效性，我们模拟了一个病例所引起的蝴蝶效应，如图
        <span lang="EN-US">4</span>及表
        <span lang="EN-US">1</span>所示，在无管控的条件下，病毒将快速传播，仅用
        <span lang="EN-US">21</span>天，染病人数可达
        <span lang="EN-US">500</span>人。而增强管控、减低人员聚集度对减少感染数量十分有效。
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="488" height="314" src="static/assets/image/image004.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">4</span>一个病例引起的蝴蝶效应
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        表
        <span lang="EN-US">1</span>不同管控级别下的疫情传播对比
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="576" height="104" src="static/assets/image/image005.png" />
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        同时，我们又对比了
        <span lang="EN-US">4</span>个真实城市的人员聚集度及其新增病例数，结果如图
        <span lang="EN-US">5</span>与表
        <span lang="EN-US">2</span>所示。我们发现相对于城市人口基数而言人员聚集度对疫情传播的影响更为重要。
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="457" height="341" id="图片 6" src="static/assets/image/image006.png" alt="四城m值对比" />
      </span>
    </p>

    <p
      class="MsoNormal"
      align="center"
      style="text-align:center;text-indent:22.0pt;
line-height:150%"
    >
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">5</span>四市人员聚集程度对比
      </span>
    </p>

    <p
      class="MsoNormal"
      align="center"
      style="text-align:center;text-indent:22.0pt;
line-height:150%"
    >
      <span style="font-size:11.0pt;line-height:150%;color:black">
        表
        <span lang="EN-US">2</span>四市
        <span lang="EN-US">2</span>月上旬新增确诊对比
      </span>
    </p>

    <p
      class="MsoNormal"
      align="center"
      style="text-align:center;text-indent:24.0pt;
line-height:150%"
    >
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;
color:black">
        <img width="516" height="139" id="图片 2" src="static/assets/image/image007.png" />
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span
        style="font-size:12.0pt;line-height:150%;color:black"
      >基于上述分析，疫情传播模型中需要有表征人员聚集程度的参数，且该参数对疫情预测及决策支持至关重要。</span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">2. SEIQR</span>
      </b>
      <b>
        <span style="font-size:12.0pt;line-height:150%;color:black">模型</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        基于上述分析，传统的
        <span lang="EN-US">SEIR</span>模型无法反映政府管控力度、人员聚集度对疫情传播的直接影响，所以对传统
        <span lang="EN-US">SEIR</span>模型引入人员聚集度
        <span lang="EN-US">m</span>值，对疾病传染率进行修正，图
        <span lang="EN-US">6</span>为优化之后的传播模型。
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="552" height="167" src="static/assets/image/image008.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">6 SEIQR</span>模型示意
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">模型中各类人群分为六类：</span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        S
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天易感人群人数，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        E
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天被感染但在潜伏期总人数，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        I
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天发病但未隔离总人数，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        Q
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天被确诊总人数，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        R
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天治愈总人数，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        D
        <sub>t</sub>:
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        第
        <span lang="EN-US">t</span>天死亡总人数。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">模型中各参数意义：</span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        m
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天人群聚集程度，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        β：传染系数
        <span lang="EN-US">(</span>病毒自身决定
        <span lang="EN-US">)</span>，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">Te</span>
      <span style="font-size:12.0pt;line-height:150%;color:black">：病毒潜伏期，</span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        α
        <sub>
          <span lang="EN-US">t</span>
        </sub>：第
        <span lang="EN-US">t</span>天发病患者隔离比例，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        γ
        <sub>
          <span lang="EN-US">t</span>
        </sub>：第
        <span lang="EN-US">t</span>天病死率，
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        y
        <sub>t</sub>
      </span>
      <span style="font-size:12.0pt;line-height:150%;color:black">
        ：第
        <span lang="EN-US">t</span>天治愈率
      </span>
    </p>

    <p class="MsoNormal" style="margin-left:21.0pt;text-indent:24.0pt;line-height:
150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">k</span>
      <span style="font-size:12.0pt;line-height:150%;color:black">：病毒潜伏期传染能力与发病期传染能力的比值</span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="text-indent:21.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">该模型的差分方程如下：</span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="380" height="200" id="图片 9" src="static/assets/image/image009.png" />
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span
        style="font-size:12.0pt;line-height:150%;color:black"
      >该模型可根据不同城市已公布的每日新增确诊人数，结合基于移动数据分析计算得出的人群聚集程度，可以对已有疫情发展趋势进行较好拟合，并可在设定一定参数条件下对未来疫情传播趋势进行模拟推演。</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <span lang="EN-US" style="font-size:
12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">3.</span>
      </b>
      <b>
        <span style="font-size:12.0pt;line-height:150%;color:black">疫情预测分析</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        根据哈尔滨市已公布的
        <span lang="EN-US">1</span>月
        <span lang="EN-US">25</span>号到
        <span lang="EN-US">2</span>月
        <span lang="EN-US">11</span>号的确诊人数，在疫情发展前期，政府管控措施较少、民众防控意识较弱，人员聚集度
        <span lang="EN-US">m</span>值较高。在疫情明显发展后，政府管控措施加强、民众防范意识提高，人员聚集度明显降低，
        <span lang="EN-US">m</span>值迅速减少。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        随着人员聚集度
        <span lang="EN-US">m</span>值对传播模型的影响权重不断增加，利用
        <span lang="EN-US">m</span>值优化的
        <span lang="EN-US">SEIQR</span>模型对哈尔滨的疫情数据进疫情传播仿真，预测结果如图
        <span lang="EN-US">7</span>及表
        <span lang="EN-US">3</span>所示，可见利用
        <span lang="EN-US">m</span>值优化的
        <span lang="EN-US">SEIQR</span>模型可以较好地预测官方数据。
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img
          width="465"
          height="295"
          id="图片 3"
          src="static/assets/image/image010.png"
          alt="haerbin"
        />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">7</span>哈尔滨确认人数预测分析
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        表
        <span lang="EN-US">3</span>预测人数与实际确诊人数对比
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="491" height="140" id="图片 1" src="static/assets/image/image011.png" />
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        再利用蒙特卡洛模拟，取潜伏期
        <span lang="EN-US">Te</span>为正态分布，正态分布的均值为
        <span lang="EN-US">4</span>，方差为
        <span lang="EN-US">0.0625</span>。对这组数据在
        <span lang="EN-US">95%</span>的置信区间进行采样，对得到的一组潜伏期数据进行仿真预测，又得到一组预测曲线，找到这组预测曲线中预测值最大最小的两条曲线，作为该预测的临界情况。由图
        <span lang="EN-US">7</span>蓝色区域可见，仿真数据区间可以覆盖真实数据。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        同时，如果保持当前的城市管控强度，即人员聚集度保持在当前的较低水平，根据模型对后续疫情传播的仿真预测，将在
        <span lang="EN-US">20</span>到
        <span lang="EN-US">30</span>天内逐步趋于平稳。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        该模型也可以较好拟合其它城市如上海、北京、广州、深圳的疫情传播趋势，可以大体得到类似的判断，即疫情将于
        <span lang="EN-US">20</span>天左右到达平稳期，如图
        <span lang="EN-US">8</span>所示。
      </span>
    </p>

    <p
      class="MsoNormal"
      align="center"
      style="text-align:center;text-indent:24.0pt;
line-height:150%"
    >
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;
color:black">
        <img width="734" height="550" id="图片 13" src="static/assets/image/image012.png" />
      </span>
    </p>

    <p
      class="MsoNormal"
      align="center"
      style="text-align:center;text-indent:22.0pt;
line-height:150%"
    >
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">8</span>四市确诊人数预测分析结果
      </span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <span lang="EN-US" style="font-size:
12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">4</span>
      </b>
      <b>
        <span style="font-size:12.0pt;line-height:150%;color:black">疫情敏感度分析</span>
      </b>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="411" height="304" id="图片 10" src="static/assets/image/image013.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">9</span>感染人数与收治比例关系
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="411" height="304" id="图片 8" src="static/assets/image/image014.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">10</span>感染人数与人员聚集度关系
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">9</span>和图
        <span lang="EN-US">10</span>可以看，模型模拟出发病
        <span lang="EN-US">30</span>天时黑龙江省感染人数随着收治比例的增加迅速减少，上面分析中提到
        <span lang="EN-US">alpha</span>为发病患者的隔离比例，则收治比例（
        <span lang="EN-US">1-alpha</span>）越大，则预测感染人数越低，符合实际情况。而人员聚集度
        <span lang="EN-US">m</span>越大，则感染人数越多。因此可以看出，为了有效控制疫情，人员聚集度
        <span lang="EN-US">m</span>值至少维持在
        <span lang="EN-US">0.6</span>以下。
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">5</span>
      </b>
      <b>
        <span style="font-size:12.0pt;line-height:150%;color:black">人员聚集度参数反演</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span lang="EN-US" style="font-size:12.0pt;line-height:150%;color:black">
        <img width="545" height="325" id="图片 16" src="static/assets/image/image015.png" />
      </span>
    </p>

    <p class="MsoNormal" align="center" style="text-align:center;line-height:150%">
      <span style="font-size:11.0pt;line-height:150%;color:black">
        图
        <span lang="EN-US">11</span>哈尔滨市人员聚集度与时间的关系
      </span>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        根据
        <span lang="EN-US">SEIQR</span>模型以及哈市卫健委公布的确诊病例数据，我们对本市人员聚集度
        <span lang="EN-US">m</span>进行了反演推算，如图
        <span lang="EN-US">11</span>所示。可见在
        <span lang="EN-US">2</span>月
        <span lang="EN-US">5</span>日前后
        <span lang="EN-US">m</span>有较明显的降低，这与
        <span lang="EN-US">2</span>月
        <span lang="EN-US">4</span>日哈尔滨政府公布的第
        <span lang="EN-US">8</span>号公告宣布对所有小区村屯实施封闭管理相符。另外，我们看到从
        <span lang="EN-US">1</span>月
        <span lang="EN-US">24</span>日至今，人员聚集度下降很快，这在一定程度上反应了省市政府应对疫情响应积极，管控有效，人民群众防控意识提升等事实。
      </span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <span lang="EN-US" style="font-size:
12.0pt;line-height:150%;color:black">&nbsp;</span>
    </p>

    <p class="MsoNormal" style="line-height:150%">
      <b>
        <span style="font-size:12.0pt;
line-height:150%;color:black">总结</span>
      </b>
    </p>

    <p class="MsoNormal" style="text-indent:24.0pt;line-height:150%">
      <span style="font-size:12.0pt;line-height:150%;color:black">
        在基于移动大数据分析得出的人员聚集度
        <span lang="EN-US">m</span>值的基础上，改进的
        <span lang="EN-US">SEIQR</span>模型对疫情传播趋势进行拟合仿真，设计了一套疫情传播预测分析系统。该系统能够基于城市前期传播数据对疫情曲线进行拟合，预测疫情传播关键时间点，也提供了多项对疫情发展关键元素的交互式干预控制，包括：人员聚集度、收治率、传染率、恢复率、病死率，可以模拟反映各城市当前防控政策措施对疫情发展的影响作用。基于城市的现有实际数据指标，通过设定不同的控制指标，可以对后续的疫情发展趋势进行动态模拟仿真，对防控政策有效性进行评估与推演，从而为疫情防控策略的制定提供辅助推演参考。
      </span>
    </p>
  </div>
</body>

<!-- <iframe ref="iframe" id="introIframe" src="static/intro.htm" frameborder="0" scrolling="yes" ></iframe> -->
</template>