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
        :disabled="spuList.length==0"
        @click="addOrEditSpu(row='')"
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
              @click="addSku(row)"
            />
            <HintButton
              type="warning"
              class="el-icon-edit"
              title="修改spu"
              @click="addOrEditSpu(row)"
            />
            <HintButton
              type="info"
              class="el-icon-info"
              title="查看当前spu全部sku列表"
              @click="watchAllSku(row)"
            />
            <HintButton
              type="danger"
              class="el-icon-delete"
              title="删除spu"
              @click="delSpu(row)"
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
    <sku-form
      v-show="scence==2"
      ref="skuForm"
      @cancelBtn1="changeSencefrom2"
    />
    <spu-form
      v-show="scence==3"
      ref="spuForm"
      :category3id="category3Id"
      @cancelBtn2="changeSencefrom3"
    />
    <!-- 对话框，显示全部的sku列表 -->
    <el-dialog
      :title="spuName"
      :visible.sync="dialogVisible"
      width="width"
      :before-close="dialogBeforeClose"
      :show-close="false"
    >
      <el-table
        v-loading="loading"
        :data="skuList"
        style="width: 100%"
      >
        <el-table-column
          prop="skuName"
          label="名称"
          width="width"
        />
        <el-table-column
          prop="price"
          label="价格 "
          width="width"
        />
        <el-table-column
          prop="weight"
          label="重量"
          width="width"
        />
        <el-table-column
          label="默认图片"
          width="width"
        >
          <template slot-scope="{row}">
            <img
              :src="row.skuDefaultImg "
              alt="!"
              width="100"
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { done } from 'nprogress'
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
      // 一级商品的id
      category1Id: '',
      // 二级商品的id
      category2Id: '',
      // 三级商品的id
      category3Id: '',
      //总页数
      total: 0,
      // 控制多个场景的切换
      // 1显示sku列表 2添加sku  3添加或者修改spu
      scence: 1,
      //对话框的显示与隐藏
      dialogVisible: false,
      // spu下的所有的sku
      skuList: [],
      // spu的名字
      spuName: '',
      // 页面加载效果
      loading: true
    }
  },
  methods: {
    // 获取一、二、三级商品的Id
    async getCategoryId(categoryId) {
      this.category1Id = categoryId.category1Id
      this.category2Id = categoryId.category2Id
      this.category3Id = categoryId.category3Id
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
    addSku(row) {
      this.scence = 2
      this.show = false
      this.$refs.skuForm.getSpuImageList(row.id)
      this.$refs.skuForm.getSpuSaleAttrList(row.id)
      this.$refs.skuForm.getattrInfoList(this.category1Id, this.category2Id, row)
    },
    // 添加或者编辑Spu
    addOrEditSpu(row) {
      this.scence = 3
      this.show = false
      if (row == '') {
        this.$refs.spuForm.initSpuForm()
      } else {
        this.$refs.spuForm.initSpuForm(row.id)
      }
      // 初始化spuForm
    },
    // 从场景3切换场景1
    changeSencefrom3(obj) {
      // showNum控制多个场景的切换，page表示当前页
      this.scence = obj.showNum
      this.show = true
      // 如果有obj.page,则是添加Spu，需要跳转到第一页，反之是修改Spu
      if (obj.page) {
        this.page = obj.page
      }
      // 重新刷新页面
      this.getSpuList(this.page)
    },
    // 从场景2切换场景1
    changeSencefrom2(obj) {
      this.scence = obj.showNum
      this.show = true
      this.getSpuList(this.page)
    },
    // 删除Spu
    async delSpu(row) {
      let res = await this.$api.spu.delSpu(row.id)
      if (res.code == 200) {
        this.$message({ type: 'success', message: '删除成功！' })
        this.getSpuList(this.page)
      } else {
        this.$message.error('删除失败！')
      }
    },
    //查看当前的spu的sku列表
    async watchAllSku(row) {
      this.dialogVisible = true
      this.spuName = row.spuName
      let res = await this.$api.spu.watchAllSku(row.id)
      if (res.code == 200) {
        let { data } = res
        this.skuList = data
        this.loading = false
      }
    },
    // 关闭对话框前的事件
    dialogBeforeClose(done) {
      this.skuList = []
      this.spuName = ''
      this.loading = true
      done()
    }
  }
}
</script>

<style></style>
