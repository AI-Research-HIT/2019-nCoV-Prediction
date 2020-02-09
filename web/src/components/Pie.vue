<template>
  <ve-pie :data="chartData">
      <H2>疫情数量分布</H2>
  </ve-pie>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['分布', '数量'],
          rows: [
            { '分布': '疑似', '数量': 1393 },
            { '分布': '确诊', '数量': 3530 },
            { '分布': '死亡', '数量': 2923 }
          ]
        }
      }
    }
  }
</script>