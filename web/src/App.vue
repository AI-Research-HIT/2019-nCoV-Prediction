<template>
  <div id="app">
    <H1>疫情预测系统</H1>
    <Map></Map>
    <Chartline style="margin-top:100px"> </Chartline>
        <H2>疫情趋势</H2>

    <Pie></Pie>
  </div>
</template>

<script>
import Chartline from './components/Chart-line'
import Pie from './components/Pie.vue'
import Map from './components/Map.vue'
export default {
  name: 'app',
  components: {
    Chartline,
    Pie,
    Map
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
