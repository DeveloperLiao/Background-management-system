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
          // 隐藏x轴
          show: false,
          //   最小值
          min: 0,
          //   最大值
          max: 100
        },
        // y轴
        yAxis: {
          // 隐藏y轴
          show: false,
          // 均分
          type: 'category'
        },
        // 系列
        series: [
          {
            type: 'bar',
            data: [78],
            // 柱条的颜色
            color: 'yellowgreen',
            showBackground: true,
            // 柱条的背景颜色
            backgroundStyle: {
              color: '#eee'
            },
            // 柱条的宽度
            barWidth: 10,

            label: {
              show: true,
              // 标签内容格式器
              formatter: '|',
              // 标签的位置。
              position: 'right',
              fontSize: '10px'
            }
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>