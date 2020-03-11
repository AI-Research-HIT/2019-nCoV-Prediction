<template>
    <body style="tab-interval:21pt;text-justify-trim:punctuation;" ><!--StartFragment--><div class="Section0"  style="layout-grid:15.6000pt;" ><p class=MsoNormal  align=center  style="text-align:center;" ><b><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';color:rgb(0,0,0);font-weight:bold;font-size:16.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >自己动手！疫情传播与预测分析网站</font></span></b><b><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';color:rgb(0,0,0);font-weight:bold;font-size:16.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></b></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;text-align:center;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';color:rgb(156,194,229);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';color:rgb(46,117,181);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >哈尔滨工业大学人工智能研究院疫情传播预测分析系统：</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';color:rgb(46,117,181);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;mso-char-indent-count:2.0000;text-align:center;line-height:150%;" ><span><a href="https://ncov.embedded-ai.org" ><u><span class="19"  style="mso-spacerun:'yes';font-family:SimSun;line-height:150%;color:rgb(5,99,193);text-decoration:underline;text-underline:single;font-size:12.0000pt;" >https://ncov.embedded-ai.org</span></u></a></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >爆发于中国武汉的新型冠状病毒肺炎（</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >COVID-19），截止今日，已影响了上百个国家和地区，全球累计确诊病例突破十万例，全球范围风险级别已提至&#8220;非常高&#8221;。</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >在国内疫情逐步被控制但却仍不能全面复工复学的你，是否在考虑：</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;color:rgb(112,48,160);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >如何对比全球各国不同防疫力度下疫情发展的趋势？意大利、韩国会蹈武汉覆辙吗？万一复工人群中一个携带病毒者会带来多大的威胁？封城、自觉隔离、自觉戴口罩等措施对延缓疫情传播起到了多大的作用？</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;color:rgb(112,48,160);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >现在有了网上交互式疫情分析预测系统，</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >自己</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >调节参数</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >就可以进行模拟分析！</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >不妨来试试找到答案。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >仿真系统采用</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >哈尔滨工业大学人工智能研究院团队提出</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >的</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >基于人员聚集度和有效隔离政策的</font>SEIQR模型，</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;color:rgb(255,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >用户可交互式的对模型参数（传染系数、人员聚集度、潜伏期天数等）进行调整，从而对不同防控政策下的疫情发展进行预测分析。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;color:rgb(255,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;mso-char-indent-count:2.0000;text-align:center;line-height:150%;" ><span><a href="https://ncov.embedded-ai.org" ><u><span class="19"  style="mso-spacerun:'yes';font-family:SimSun;line-height:150%;color:rgb(5,99,193);text-decoration:underline;text-underline:single;font-size:12.0000pt;" >https://ncov.embedded-ai.org</span></u></a></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;background:rgb(0,255,255);mso-highlight:rgb(0,255,255);" ><font face="SimSun" >国内疫情实时动态</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >实时了解疫情最新数据，跟进最新动向，有助于广大民众采取针对性防护措施，避免疫情进一步扩散。该系统提供国内疫情最新数据，包括现存确诊人数、现存疑似数据、现存重症人数、累计确诊人数、累计死亡人数、累计治愈人数等；同时还对疫情数据进行分析统计，绘制出新型冠状病毒全国分布图、疫情累计</font>/新增确诊趋势图。</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >数据来源于国家卫健委、各省市区卫健委、各省市区政府官方渠道公开数据。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="242"  src="static/manual-img/网页操作宣传update737.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;color:rgb(255,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="856"  src="static/manual-img/网页操作宣传update739.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="786"  src="static/manual-img/网页操作宣传update741.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;background:rgb(0,255,255);mso-highlight:rgb(0,255,255);" ><font face="SimSun" >各省市疫情的预测分析</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >根据</font>SEIQR模型以及各省市区卫健委公布的确诊病例数据对模型参数进行反演，同时通过不同时期的政府防控政策对人员聚集度参数进行调整，最终能达到一个较好的拟合预测结果。</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >我们对</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >21个省市的疫情传播进行了建模与预测，平均精度达到92.5%</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >。下</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >图列举了主要城市的预测精度。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="724"  height="534"  src="static/manual-img/网页操作宣传update887.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >用户自主选择不同城市，指定仿真计算结束时间，预测不同城市疫情发展趋势，并输出曲线图。以上海为例，疫情传播预测分析系统显示如下。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="818"  height="722"  src="static/manual-img/网页操作宣传update953.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="366"  src="static/manual-img/网页操作宣传update956.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;background:rgb(0,255,255);mso-highlight:rgb(0,255,255);" ><font face="SimSun" >单独设置参数，实现交互式预测！</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >为了使用户能更直观地感受到在整个疫情传播过程中不同因素对疫情发展趋势影响，在网站的疫情发展状态模拟模块可选择不同的省份、城市或者其他国家地区通过调整模型的关键参数值进行疫情的模拟预测，其中主要可供调整的参数有：</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&#8560;.由病毒自身决定的传染系数</span><img width="62"  height="48"  src="static/manual-img/网页操作宣传update1095.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&#8561;.人员聚集度（即每人每天的平均接触人数）</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&#8562;.潜伏期天数</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >通过调节关键参数数值，可以直接观测到预测曲线与实际数据的偏离变化关系，因此可以在后期政策变化、防控措施调整时，通过确定模型中部分数据的变化情况，可以较为直观地看到政策调整对于各个地区疫情发展趋势的影响。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="500"  src="static/manual-img/网页操作宣传update1229.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >此外，可以同步显示各个省市在不同疫情时间节点的预测人数对比图。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="364"  src="static/manual-img/网页操作宣传update1264.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;background:rgb(0,255,255);mso-highlight:rgb(0,255,255);" ><font face="SimSun" >直击哈尔滨：疫情深入分析</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >将哈尔滨的确诊病例数据输入</font>SEIQR模型反演得到人员聚集度参数变化趋势，同时通过统计哈尔滨移动用户数据和百度迁徙指数数据得到哈尔滨在疫情期间的人口流动数据。将两个数据整合对比发现数据变化趋势吻合程度较高，与政府的高强度防控措施相契合。</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="304"  src="static/manual-img/网页操作宣传update1398.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="314"  src="static/manual-img/网页操作宣传update1401.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="808"  src="static/manual-img/网页操作宣传update1403.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;text-align:center;line-height:150%;" ><b><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;background:rgb(0,255,255);mso-highlight:rgb(0,255,255);" ><font face="SimSun" >总结</font></span></b><b><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></b></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >哈尔滨工业大学人工智能研究院团队对经典疫情传播</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >SEIR模型中的人员接触、传染率等关键指标进行了优化改进，提出了基于人员聚集度和有效隔离政策的SEIQR模型，</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >该模型能较好的拟合</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >21</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >个省市已公布的疫情数据，并上线了交互式可视化的疫情传播预测分析系统（</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >https://ncov.embedded-ai.org</span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >）。</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >在今后的工作中我们将不断完善并改进模型，同时尽快在疫情传播预测分析网站上更新成果，敬请期待！</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >最后，让我们齐心协力，勤洗手，戴口罩，从每个人做起，携手战胜疫情！</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:24.0000pt;mso-char-indent-count:2.0000;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >武汉加油！中国加油！人类加油！</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-align:center;line-height:150%;" ><img width="832"  height="354"  src="static/manual-img/网页操作宣传update1655.png" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;text-align:center;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="SimSun" >疫情预测网站看这里：</font></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  align=center  style="text-indent:21.0000pt;mso-char-indent-count:2.0000;text-align:center;line-height:150%;" ><span><a href="https://ncov.embedded-ai.org" ><u><span class="19"  style="mso-spacerun:'yes';font-family:SimSun;line-height:150%;color:rgb(5,99,193);text-decoration:underline;text-underline:single;font-size:12.0000pt;" >https://ncov.embedded-ai.org</span></u></a></span><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p></o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p><p class=MsoNormal  style="text-indent:21.0000pt;line-height:150%;" ><span style="mso-spacerun:'yes';font-family:SimSun;mso-bidi-font-family:'Times New Roman';line-height:150%;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><o:p>&nbsp;</o:p></span></p></div><!--EndFragment--></body>
</template>

<style>
@font-face{
font-family:"Times New Roman";
}

@font-face{
font-family:"宋体";
}

@font-face{
font-family:"等线";
}

@font-face{
font-family:"Wingdings";
}

@font-face{
font-family:"SimSun";
}

@font-face{
font-family:"等线";
}

p.MsoNormal{
mso-style-name:Normal;
mso-style-parent:"";
margin:0pt;
margin-bottom:.0001pt;
mso-pagination:none;
text-align:justify;
text-justify:inter-ideograph;
font-family:等线;
mso-bidi-font-family:'Times New Roman';
font-size:10.5000pt;
mso-font-kerning:1.0000pt;
}

span.10{
font-family:等线;
}

span.15{
font-family:等线;
font-size:9.0000pt;
}

span.16{
font-family:等线;
color:rgb(96,94,92);
background:rgb(225,223,221);
mso-shading:rgb(225,223,221);
}

span.17{
font-family:等线;
font-size:9.0000pt;
}

span.18{
font-family:等线;
color:rgb(128,128,128);
}

span.19{
font-family:等线;
color:rgb(5,99,193);
text-decoration:underline;
text-underline:single;
}

p.20{
mso-style-name:msonormal;
margin-top:5.0000pt;
margin-bottom:5.0000pt;
mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;
mso-pagination:widow-orphan;
text-align:left;
font-family:SimSun;
font-size:12.0000pt;
}

p.MsoHeader{
mso-style-name:Header;
mso-style-noshow:yes;
margin:0pt;
margin-bottom:.0001pt;
border-bottom:1.0000pt solid windowtext;
mso-border-bottom-alt:0.7500pt solid windowtext;
padding:0pt 0pt 1pt 0pt ;
layout-grid-mode:char;
mso-pagination:none;
text-align:center;
font-family:等线;
mso-bidi-font-family:'Times New Roman';
font-size:9.0000pt;
mso-font-kerning:1.0000pt;
}

p.MsoFooter{
mso-style-name:Footer;
mso-style-noshow:yes;
margin:0pt;
margin-bottom:.0001pt;
layout-grid-mode:char;
mso-pagination:none;
text-align:left;
font-family:等线;
mso-bidi-font-family:'Times New Roman';
font-size:9.0000pt;
mso-font-kerning:1.0000pt;
}

span.msoIns{
mso-style-type:export-only;
mso-style-name:"";
text-decoration:underline;
text-underline:single;
color:blue;
}

span.msoDel{
mso-style-type:export-only;
mso-style-name:"";
text-decoration:line-through;
color:red;
}

table.MsoNormalTable{
mso-style-name:"Table Normal";
mso-style-parent:"";
mso-style-noshow:yes;
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-padding-alt:0.0000pt 5.4000pt 0.0000pt 5.4000pt;
mso-para-margin:0pt;
mso-para-margin-bottom:.0001pt;
mso-pagination:widow-orphan;
font-family:'Times New Roman';
font-size:10.0000pt;
mso-ansi-language:#0400;
mso-fareast-language:#0400;
mso-bidi-language:#0400;
}
@page{mso-page-border-surround-header:no;
	mso-page-border-surround-footer:no;}@page Section0{
margin-top:72.0000pt;
margin-bottom:72.0000pt;
margin-left:90.0000pt;
margin-right:90.0000pt;
size:595.3000pt 841.9000pt;
layout-grid:15.6000pt;
}
div.Section0{page:Section0;}</style>