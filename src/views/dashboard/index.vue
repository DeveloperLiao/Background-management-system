<template>
  <div class="dashboard-container">
    <el-row :gutter="5">
      <el-col :span="6">
        <el-card>
          <detail
            title="总销售额"
            count="￥126560"
          >
            <template slot="charts">
              <div>
                <span>周同比 &nbsp;&nbsp;56.67%</span><svg
                  t="1664688506552"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5606"
                  width="14"
                  height="14"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="5607"
                    fill="#d81e06"
                  />
                </svg>
              </div>
              <div style="margin-left: 10px">
                <span>日同比 &nbsp;&nbsp;19.16% </span>
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
            </template>
            <template slot="footer">
              <span>日销售额￥12423</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail
            title="访问量"
            count="88460"
          >
            <template slot="charts">
              <lineCharts />
            </template>
            <template slot="footer">
              <span>日访问量1234</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail
            title="支付笔数"
            count="88460"
          >
            <template slot="charts">
              <barCharts />
            </template>
            <template slot="footer">
              <span>转化率65%</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail
            title="运营活动效果"
            count="78%"
          >
            <template slot="charts">
              <progress-charts />
            </template>
            <template slot="footer">
              <div>
                <span>周同比 &nbsp;&nbsp;12%</span><svg
                  t="1664688506552"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5606"
                  width="14"
                  height="14"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="5607"
                    fill="#d81e06"
                  />
                </svg>
              </div>
              <div style="margin-left: 10px">
                <span>日同比 &nbsp;&nbsp;11% </span>
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
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>
    <sale />
    <observe />
  </div>
</template>

<script>
import Detail from './Card/Detail/index.vue'
import lineCharts from './Card/lineCharts/index.vue'
import barCharts from './Card/barCharts/index.vue'
import progressCharts from './Card/progressCharts/index.vue'
import Sale from './Sale/index.vue'
import Observe from './Observe/index.vue'
export default {
  name: 'Dashboard',
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
    Sale,
    Observe
  }
}
</script>

<style scoped>
.dashboard-container {
  margin-top: 10px;
}
</style>
