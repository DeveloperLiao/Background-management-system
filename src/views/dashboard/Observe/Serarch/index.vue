<template>
  <div>
    <el-card>
      <div class="header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <svg
              t="1664763024651"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1974"
              width="16"
              height="16"
            >
              <path
                d="M213.333333 512a85.333333 85.333333 0 1 1-85.333333-85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333z m298.666667-85.333333a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 0a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
                fill="#5C5C66"
                p-id="1975"
              />
            </svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>
              双皮奶
            </el-dropdown-item>
            <el-dropdown-item divided>
              蚵仔煎
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <el-row>
          <el-col :span="12">
            <lineCharts
              title="搜索用户数"
              rate="17.1"
              count="12321"
            />
          </el-col>
          <el-col :span="12">
            <lineCharts
              title="人均搜索次数"
              rate="26.2"
              count="2.7"
            />
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width:100%"
        >
          <el-table-column
            label="排名"
            type="index"
            width="80"
            align="center"
          />
          <el-table-column
            label="搜索关键字"
            width="width"
          />
          <el-table-column
            label="用户数"
            sortable
            width="width"
          />
          <el-table-column
            label="周涨幅"
            sortable
            width="width"
          />
        </el-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        style="text-align:right;margin-top:10px"
        :total="50"
      />
    </el-card>
  </div>
</template>

<script>
import lineCharts from './lineCharts/index.vue'
export default {
  name: 'Search',
  components: {
    lineCharts
  },
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
</style>