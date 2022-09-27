<template>
  <div class="skuForm">
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{ spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuInfo.skuName"
          placeholder="SKU名称"
        />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuInfo.price"
          placeholder="价格(元)"
          type="Number"
        />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model="skuInfo.weight"
          placeholder="重量(千克)"
        />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          placeholder="规格描述"
          rows="5"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form
          label-width="80px"
          inline
        >
          <el-form-item
            v-for="(item,index) in attrInfoList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select
              v-model="item.attrInfoValueOrId"
              placeholder="请选择"
            >
              <el-option
                v-for="(item1,index) in item.attrValueList"
                :key="item1.id"
                :value="`${item1.id}:${item1.valueName}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form
          label-width="80px"
          inline
        >
          <el-form-item
            v-for="(item,index) in SpuSaleAttrList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              v-model="item.SpuSaleAttrValueOrId"
              placeholder="请选择"
            >
              <el-option
                v-for="(item1,index) in item.spuSaleAttrValueList"
                :key="item1.id"
                :value="`${item1.id}:${item1.saleAttrName}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
        >
          <el-table-column
            type="selection"
            width="width"
          />
          <el-table-column
            label="图片"
            width="width"
            align="center"
          >
            <template slot-scope="{row,$index}">
              <img
                :src="row.imgUrl"
                alt="!"
                width="100"
              >
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="width"
            align="center"
          >
            <template slot-scope="{row,$index}">
              {{ row.imgName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="width"
            align="center"
          >
            <el-button
              type="primary"
              size="mini"
            >
              设为默认
            </el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          保存
        </el-button>
        <el-button>
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // spu的名称
      spuName: '',
      // spu图片的数据
      spuImageList: [],
      //spu销售属性的数据
      SpuSaleAttrList: [],
      // 属性信息列表
      attrInfoList: [],
      skuInfo: {
        // 三级分类的id
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 商品的价格
        price: 0,
        //sku的名字
        skuName: '',
        // sku默认的图片
        skuDefaultImg: '',
        //sku的描述
        skuDesc: '',
        // 商品重量
        weight: '',
        // 平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            attrName: '',
            valueId: 0,
            valueName: ''
          }
        ],
        // 图片列表
        skuImageList: [
          {
            imgName: '',
            imgUrl: '',
            isDefault: '',
            spuImgId: 0
          }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          {
            saleAttrId: 0,
            saleAttrName: '',
            saleAttrValueId: 0,
            saleAttrValueName: ''
          }
        ]
      }
    }
  },
  methods: {
    // 获取spuImageList的数据
    async getSpuImageList(spuId) {
      let res = await this.$api.sku.getSpuImageList(spuId)
      if (res.code == 200) {
        this.spuImageList = res.data
      }
    },
    // 获取销售属性列表的数据
    async getSpuSaleAttrList(spuId) {
      let res = await this.$api.sku.getSpuSaleAttrList(spuId)
      if (res.code == 200) {
        this.SpuSaleAttrList = res.data
      }
    },
    // 获取属性信息列表
    async getattrInfoList(category1Id, category2Id, row) {
      let res = await this.$api.sku.getattrInfoList(category1Id, category2Id, row.category3Id)
      this.spuName = row.spuName
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      if (res.code == 200) {
        this.attrInfoList = res.data
      }
    }
  }
}
</script>

<style>
</style>