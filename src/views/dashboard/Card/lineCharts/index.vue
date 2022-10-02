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
            type: 'line',
            data: [5, 55, 17, 55, 107, 20, 45.68, 45, 57, 48],
            // 点的样式
            itemStyle: {
              opacity: 0
            },
            // 折线的样式
            lineStyle: {
              color: 'purple'
            },
            //  区域填充样式
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'purple' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#fff' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            // 平滑
            smooth: true
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>