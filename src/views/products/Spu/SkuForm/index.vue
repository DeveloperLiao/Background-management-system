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
                :label="item1.valueName"
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
                :label="item1.saleAttrValueName"
                :value="`${item1.id}:${item1.saleAttrValueName}`"
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
          @select="selectImageItem"
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
            <template slot-scope="{row,$index}">
              <el-button
                v-if="!row.default"
                type="primary"
                size="mini"
                @click="setDefault(row)"
              >
                设为默认
              </el-button>
              <el-tag
                v-else
                type="success"
              >
                默认
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="saveSku"
        >
          保存
        </el-button>
        <el-button @click="cancleBtn1">
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
        skuAttrValueList: [],
        // 图片列表
        skuImageList: [],
        // 销售属性
        skuSaleAttrValueList: []
      }
    }
  },
  methods: {
    // 获取spuImageList的数据
    async getSpuImageList(spuId) {
      let res = await this.$api.spu.getSpuImageList(spuId)
      if (res.code == 200) {
        this.spuImageList = res.data
      }
    },
    // 获取销售属性列表的数据
    async getSpuSaleAttrList(spuId) {
      let res = await this.$api.spu.getSpuSaleAttrList(spuId)
      if (res.code == 200) {
        this.SpuSaleAttrList = res.data
      }
    },
    // 获取属性信息列表
    async getattrInfoList(category1Id, category2Id, row) {
      let res = await this.$api.spu.getattrInfoList(category1Id, category2Id, row.category3Id)
      this.spuName = row.spuName
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      if (res.code == 200) {
        this.attrInfoList = res.data
      }
    },
    selectImageItem(selection, row) {
      // selection已选中的表格项的集合，返回值为一个数组，row当前选中的表格项
      this.skuInfo.skuImageList = selection
    },
    // 取消按钮
    cancleBtn1() {
      this.$emit('cancelBtn1', { showNum: 1 })
      // 重置数据
      Object.assign(this._data, this.$options.data())
    },
    // 设置默认项
    setDefault(row) {
      // 判断设置为默认的图片项是否在选中的图片项中
      let res = this.skuInfo.skuImageList.some(item => item.id == row.id)
      if (res) {
        // 将default设置为动态的数据
        this.skuInfo.skuImageList.forEach(item => {
          this.$set(item, 'default', false)
        })
        this.$set(row, 'default', true)
        this.skuInfo.skuDefaultImg = row.imgUrl
      } else {
        return
      }
    },
    // 保存sku,整理参数，发起请求
    async saveSku() {
      // 整理好skuImageList的数据
      this.skuInfo.skuImageList = this.skuInfo.skuImageList.map(item => {
        return { imgName: item.imgName, imgUrl: item.imgUrl, spuImgId: item.id, isDefault: this.skuInfo.skuDefaultImg }
      })
      // 过滤有SpuSaleAttrValueOrId属性的数组项
      this.skuInfo.skuAttrValueList = this.SpuSaleAttrList.filter(item => {
        return item.SpuSaleAttrValueOrId
      })
      // 处理SpuSaleAttrValueOrId
      this.skuInfo.skuAttrValueList.forEach(item => {
        let arr = item.SpuSaleAttrValueOrId.split(':')
        item.valueId = arr[0]
        item.valueName = arr[1]
      })
      // 整理好skuAttrValueList的数据
      this.skuInfo.skuAttrValueList = this.skuInfo.skuAttrValueList.map(item => {
        return {
          attrId: String(item.id),
          // attrName: item.saleAttrName,
          valueId: String(item.valueId)
          // valueName: item.valueName
        }
      })
      // 过滤有attrInfoValueOrId属性的数组项
      this.skuInfo.skuSaleAttrValueList = this.attrInfoList.filter(item => {
        return item.attrInfoValueOrId
      })
      // 处理SpuSaleAttrValueOrId
      this.skuInfo.skuSaleAttrValueList.forEach(item => {
        let arr = item.attrInfoValueOrId.split(':')
        item.saleAttrValueId = arr[0]
        item.saleAttrValueName = arr[1]
      })
      // 整理好skuAttrValueList的数据
      this.skuInfo.skuSaleAttrValueList = this.skuInfo.skuSaleAttrValueList.map(item => {
        return {
          saleAttrId: String(item.id),
          // saleAttrName: item.attrName,
          saleAttrValueId: String(item.saleAttrValueId)
          // saleAttrValueName: item.saleAttrValueName
        }
      })
      let res = await this.$api.spu.updateAttrInfoList(this.skuInfo)
      console.log(res)
      // 重置数据
      Object.assign(this._data, this.$options.data())
      console.log(this.skuInfo)
    }
  }
}
</script>

<style>
</style>
