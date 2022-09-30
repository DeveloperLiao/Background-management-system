<template>
  <div>
    <el-table
      :data="skuList"
      style="width: 100%"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
        align="center"
      />
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
        align="center"
      />
      <el-table-column
        prop="skuDefaultImg"
        label="默认图片"
        width="100"
        align="center"
      >
        <template slot-scope="{row}">
          <img
            :src="row.skuDefaultImg"
            alt="!"
            width="80"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="width"
        align="center"
      />
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80"
        align="center"
      />
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button
            v-if="row.isSale===1"
            type="success"
            class="el-icon-sort-up"
            size="mini"
            @click="cancleSale(row)"
          />
          <el-button
            v-else
            type="success"
            class="el-icon-sort-down"
            size="mini"
            @click="onSale(row)"
          />
          <el-button
            type="primary"
            size="mini"
            class="el-icon-edit"
            @click="edit"
          />
          <el-button
            size="mini"
            class="el-icon-info"
            type="info"
            @click="watchSpuInfo(row)"
          />
          <el-button
            type="danger"
            size="mini"
            class="el-icon-delete"
          />
          <el-drawer
            :visible.sync="drawer"
            :before-close="handleClose"
            :show-close="false"
          >
            <el-row>
              <el-col :span="5">
                名称
              </el-col>
              <el-col :span="16">
                {{ skuInfo.skuName }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                描述
              </el-col>
              <el-col :span="16">
                {{ skuInfo.skuDesc }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                价格
              </el-col>
              <el-col :span="16">
                {{ skuInfo.price }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                平台属性
              </el-col>
              <el-col :span="16">
                <el-tag
                  v-for="(attr,index) in skuInfo.skuAttrValueList"
                  :key="attr.id"
                  type="success"
                  style="margin:0 2px"
                >
                  {{ attr.valueName }}
                </el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                商品属性
              </el-col>
              <el-col :span="16">
                <el-carousel>
                  <el-carousel-item
                    v-for="item in skuInfo.skuImageList"
                    :key="item.id"
                  >
                    <img
                      :src="item.imgUrl"
                      alt="!"
                      width="384px"
                      height="300px"
                    >
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[3, 5, 7]"
      :page-size.sync="size"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      align="center"
      :current-page.sync="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // sku列表
      skuList: [],
      // 当前页
      page: 1,
      // 每页的记录数
      size: 5,
      // 总记录数
      total: 0,
      // 控制drawer的显示
      drawer: false,
      //sku列表
      skuInfo: []
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取skuList的数据
    async getSkuList() {
      let { page, size } = this
      let res = await this.$api.sku.getSkuList(page, size)
      if (res.code == 200) {
        let { records, total } = res.data
        this.skuList = records
        this.total = total
      }
    },
    // 当前每页记录数发生改变
    handleSizeChange(size) {
      this.size = size
      this.getSkuList()
    },
    // 当前页发生改变
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    // 上架
    async onSale(row) {
      row.isSale = 1
      let res = await this.$api.sku.getOnSale(row.id)
      if (res.code == 200) {
        this.$message({ type: 'success', message: '上架成功！' })
      }
    },
    // 下架
    async cancleSale(row) {
      row.isSale = 0
      let res = await this.$api.sku.getCancleSale(row.id)
      if (res.code == 200) {
        this.$message({ type: 'success', message: '下架成功！' })
      }
    },
    // 编辑
    edit() {
      this.$message('正在开发中...')
    },
    //查看spu详细信息
    async watchSpuInfo(row) {
      let res = await this.$api.sku.getSkuInfoList(row.id)
      if (res.code == 200) {
        this.skuInfo = res.data
        console.log(this.skuInfo)
      }
      this.drawer = true
    },
    //
    handleClose(done) {
      this.skuInfo = []
      done()
    }
  }
}
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  margin-right: 20px;
}
.el-row {
  margin: 20px 0;
}
.el-row .el-col-16 {
  text-align: left;
}
/* 深度选择器 */
>>> .el-carousel__button {
  background-color: #f00;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
