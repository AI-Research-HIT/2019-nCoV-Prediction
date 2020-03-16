<template>
  <div class="spreadChart" id="spreadChart"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";

var spreadChart;

export default {
  props: ["graphData"],
  name: "spreadChart",
  mounted() {
    spreadChart = echarts.init(document.getElementById("spreadChart"));
  },
  watch: {
    graphData() {
      //箭头函数  不然会发生this改变
      this.drawGraph();
    }
  },
  methods: {
    drawGraph() {
      // 基于准备好的dom，初始化echarts实例
      // spreadChart.showLoading();
      //                     spreadChart.hideLoading();
      if (this.graphData.nodes == null) {
        this.$message({
          message: "传播路径节点太多，传播途径图不予显示",
          type: "warning"
        });
      }
      var option = {
        legend: {
          data: this.graphData.legends
        },
        series: [
          {
            type: "graph",
            layout: "force",
            animation: false,
            // label: {
            //     position: 'right',
            //     formatter: '{b}'
            // },
            draggable: true,
            data: this.graphData.nodes,
            // data: webkitDep.nodes.map(function (node, idx) {
            //     node.id = idx;
            //     return node;
            // }),
            categories: this.graphData.categories,
            force: {
              edgeLength: 5,
              repulsion: 20,
              gravity: 0.2
            },
            //edges: webkitDep.links
            edges: this.graphData.links
          }
        ]
      };

      spreadChart.setOption(option);
    }
  },
  data() {
    return {
      nodes: [
        {
          name: "1",
          value: 3
        },
        {
          name: "2",
          value: 1
        },
        {
          name: "3",
          value: 1
        }
      ],
      links: [
        {
          source: "1",
          target: "2"
        },
        {
          source: "1",
          target: "3"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.spreadChart {
  width: 900px;
  height: 600px;
}
</style>