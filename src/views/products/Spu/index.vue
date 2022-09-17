<template>
  <div class="Spu">
    <TypeBar
      :show="!show"
      @sendCategoryId="getCategoryId"
    />
    <el-card v-show="scence==1">
      <el-button
        type="primary"
        class="el-icon-plus"
        :disabled="addBtnShow"
        @click="addOrEditSpu"
      >
        添加SPU
      </el-button>
      <el-table
        style="width: 100%"
        border
        :data="spuList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        />
        <el-table-column
          header-align="center"
          align="center"
          label="spu名称"
        >
          <template slot-scope="{ row }">
            {{ row.spuName }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="spu描述"
        >
          <template slot-scope="{ row }">
            {{ row.description }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
        >
          <template slot-scope="{ row }">
            <HintButton
              type="success"
              class="el-icon-plus"
              title="添加sku"
              @click="addSku"
            />
            <HintButton
              type="warning"
              class="el-icon-edit"
              title="修改spu"
              @click="addOrEditSpu"
            />
            <HintButton
              type="info"
              class="el-icon-info"
              title="查看当前spu全部sku列表"
            />
            <HintButton
              type="danger"
              class="el-icon-delete"
              title="删除spu"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 7]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
        />
      </div>
    </el-card>
    <sku-form v-show="scence==2" />
    <spu-form v-show="scence==3" />
  </div>
</template>

<script>
import SkuForm from './SkuForm/index.vue'
import SpuForm from './SpuForm/index.vue'
export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      spuList: [],
      // 控制TypeBar的激活状态
      show: true,
      //当前页
      page: 1,
      // 每页显示几条数据
      limit: 3,
      // 三级商品的id
      category3Id: '',
      //总页数
      total: 0,
      // 控制多个场景的切换
      // 1显示sku列表 2添加sku  3添加或者修改spu
      scence: 1,
      // 添加spu按钮的禁用状态
      addBtnShow: true
    }
  },
  methods: {
    // 获取三级商品的Id
    async getCategoryId(categoryId) {
      this.category3Id = categoryId.category3Id
      this.addBtnShow = false
      this.getSpuList()
    },
    // 获取Spu列表
    async getSpuList(val = 1) {
      // 当页发生改变
      this.page = val
      let { page, limit, category3Id } = this
      let result = await this.$api.spu.getSpuList(page, limit, category3Id)
      if (result.code === 200) {
        let { records, total } = result.data
        this.spuList = records
        this.total = total
      }
    },
    //每页记录数发生改变
    handleSizeChange(val) {
      this.limit = val
      this.getSpuList()
    },
    // 添加sku
    addSku() {
      this.scence = 2
      this.show = false
    },
    // 添加Spu
    addOrEditSpu() {
      this.scence = 3
      this.show = false
    }
  }
}
</script>

<style></style>
