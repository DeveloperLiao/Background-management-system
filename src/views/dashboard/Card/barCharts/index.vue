<template>
  <div
    ref="charts"
    style="width:100%;height:50px"
  />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted() {
    this.echartsInit()
  },
  methods: {
    // 初始化折线图
    echartsInit() {
      let charts = this.$refs.charts
      let myCharts = echarts.init(charts)
      myCharts.setOption({
        // 布局
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        // x轴
        xAxis: {
          show: false,
          type: 'category'
        },
        // y轴
        yAxis: { show: false },
        // 系列
        series: [
          {
            type: 'bar',
            data: [5, 55, 17, 55, 107, 20, 41, 45, 87, 14, 44, 88, 14]
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>