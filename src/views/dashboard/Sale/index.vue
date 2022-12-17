<template>
  <el-card class="card">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="销售额"
        name="saleCount"
      />
      <el-tab-pane
        label="访问量"
        name="visitCount"
      />
    </el-tabs>
    <div class="date">
      <span @click="getDate">今日</span>
      <span @click="getWeek">本周</span>
      <span @click="getMonth">本月</span>
      <span @click="getYear">本年</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
      />
    </div>
    <el-row>
      <el-col :span="16">
        <div
          ref="barCharts"
          style="height:450px"
        />
      </el-col>
      <el-col :span="8">
        <span style="font-size:14px">门店销售额排名</span>
        <ul class="rank">
          <li>
            <div>
              <span class="rIndex">1</span><span>肯德基</span>
            </div>
            <div>
              <span>323,234</span>
            </div>
          </li>
          <li>
            <div>
              <span class="rIndex">2</span><span>麦当劳</span>
            </div>
            <div>
              <span>299,132</span>
            </div>
          </li>
          <li>
            <div>
              <span class="rIndex">3</span><span>华莱士</span>
            </div>
            <div>
              <span>283,234</span>
            </div>
          </li>
          <li>
            <div>
              <span>4</span><span>海底捞</span>
            </div>
            <div>
              <span>266,223</span>
            </div>
          </li>
          <li>
            <div>
              <span>5</span><span>汉堡王</span>
            </div>
            <div>
              <span>223,445</span>
            </div>
          </li>
          <li>
            <div>
              <span>6</span><span>沙县小吃</span>
            </div>
            <div>
              <span>219.663</span>
            </div>
          </li>
          <li>
            <div>
              <span>7</span><span>真功夫</span>
            </div>
            <div>
              <span>200,997</span>
            </div>
          </li>
          <li>
            <div>
              <span>8</span><span>杨国福</span>
            </div>
            <div>
              <span>188,758</span>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activeName: 'saleCount',
      // 日期
      date: '',
      //柱状图实例
      charts: null
    }
  },
  computed: {
    title() {
      return this.activeName == 'saleCount' ? '销售额趋势' : '访问量趋势'
    }
  },
  watch: {
    title(newVal, oldVal) {
      this.initBarCharts(newVal)
    }
  },
  mounted() {
    let barCharts = this.$refs.barCharts
    let charts = echarts.init(barCharts)
    this.charts = charts
    this.initBarCharts()
  },
  methods: {
    // 初始化柱状图数据
    initBarCharts(titie = '销售额趋势') {
      let option = null
      if (titie == '销售额趋势') {
        option = {
          title: {
            text: '销售额趋势',
            textStyle: {
              fontSize: '12px'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 40,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '销售额',
              type: 'bar',
              barWidth: '40%',
              data: [10, 52, 200, 334, 390, 330, 220, 50, 65, 88, 350, 85]
            }
          ]
        }
      } else if (titie == '访问量趋势') {
        option = {
          title: {
            text: '访问量趋势'
          },
          series: [
            {
              name: '访问量',
              data: [110, 82, 204, 33, 39, 380, 22, 80, 69, 80, 30, 85]
            }
          ]
        }
      }
      this.charts.setOption(option)
    },
    // 获取今日的日期
    getDate() {
      let date = dayjs().format('YYYY-MM-DD')
      this.date = [date, date]
    },
    //获取本周的日期段
    getWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 获取本月的日期段
    getMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 获取本年的日期段
    getYear() {
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style>
.card {
  position: relative;
}
.date {
  position: absolute;
  top: 20px;
  right: 20px;
}
.date span {
  padding: 0 10px;
  font-size: 14px;
}
.date span:hover {
  cursor: pointer;
}
.rIndex {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  background-color: #000;
  font-size: 14px;
}
.rank li div > span:nth-of-type(2) {
  padding: 10px;
  font-size: 14px;
}
.rank li {
  display: flex;
  justify-content: space-between;
  margin: 35px 0;
}
</style>