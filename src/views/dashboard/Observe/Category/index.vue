<template>
  <el-card>
    <div class="header">
      <span>
        销售额类别占比
      </span>
      <el-radio-group
        v-model="radio1"
        size="mini"
      >
        <el-radio-button label="全部渠道" />
        <el-radio-button label="线上" />
        <el-radio-button label="门店" />
      </el-radio-group>
    </div>
    <div
      ref="charts"
      class="pad"
    />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      radio1: '',
      // 环形图实例
      pid: ''
    }
  },
  mounted() {
    let charts = this.$refs.charts
    this.pid = echarts.init(charts)
    this.initPid()
  },
  methods: {
    // 初始化环形图
    initPid() {
      let option = {
        title: {
          text: '搜索引擎',
          textStyle: {
            fontSize: '14px'
          },
          textAlign: 'center',
          subtext: 1048,
          subtextStyle: {
            fontSize: '30px',
            align: 'center',
            color: '#000'
          },
          top: 130,
          left: 387
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }
        ]
      }
      this.pid.setOption(option)
      // 给pid实例绑定事件
      this.pid.on('mouseover', param => {
        let { name, value } = param.data
        this.pid.setOption({
          title: {
            text: name,
            subtext: value
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.pad {
  width: 100%;
  height: 315px;
}
</style>