<template>
  <div class="lineCharts">
    <div class="charts-top">
      <span style="font-size:14px;margin-right:10px;color:#bbb">{{ title }}</span>
      <svg
        t="1664764217269"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3153"
        width="16"
        height="16"
      >
        <path
          d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"
          p-id="3154"
        />
        <path
          d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
          p-id="3155"
        />
        <path
          d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"
          p-id="3156"
        />
      </svg>
    </div>
    <div class="charts-middle">
      <span>{{ count }}</span>
      <div style="margin-left:20px">
        <span style="font-size:12px;color:#bbb">{{ rate }}</span><svg
          t="1664688506552"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5606"
          width="12"
          height="12"
        >
          <path
            d="M768 384L512 128 256 384h192v512h128V384z"
            p-id="5607"
            fill="#d81e06"
          />
        </svg>
        <svg
          t="1664688599808"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6961"
          width="14"
          height="14"
        >
          <path
            d="M768 640l-256 256-256-256h192V128h128v512z"
            p-id="6962"
            fill="#1296db"
          />
        </svg>
      </div>
    </div>
    <div
      ref="charts"
      class="charts-bottom"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['title', 'count', 'rate'],
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
            data: [5, 55, 17, 55, 107, 20, 45.68, 45, 57, 48, 48, 77, 56, 82],
            // 点的样式
            itemStyle: {
              opacity: 0
            },
            // 折线的样式
            lineStyle: {
              color: 'blue'
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
                    color: 'blue' // 0% 处的颜色
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
.lineCharts {
  margin-top: 20px;
}
.charts-top {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.charts-middle {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.charts-bottom {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
</style>