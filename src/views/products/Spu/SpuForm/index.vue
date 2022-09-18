<template>
  <el-card>
    <el-form
      ref="form"
      label-width="80px"
    >
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfo.spuName"
          placeholder="SPU名称"
        />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select
          v-model="tmName"
          placeholder="请选择品牌"
        >
          <el-option
            v-for="(item,index) in tradeMarkList"
            :key="item.id"
            :value="item.tmName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfo.description"
          placeholder="spu描述"
          type="textarea"
          rows="3"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuInfo.spuImageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="tmAttr"
          placeholder="你还有3未选择"
        >
          <el-option
            v-for="(item,index) in baseSaleAttrList"
            :key="item.id"
            :value="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          class="el-icon-plus"
        >
          添加销售属性
        </el-button>
        <el-table
          style="width: 100%"
          border
          :data="baseSaleAttrList"
        >
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="属性名"
            width="120"
          >
            <template slot-scope="row">
              <span :key="row.id"> {{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="属性名称列表"
            width="width"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="120"
          />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          保存
        </el-button>
        <el-button @click="$emit('cancelBtn',1)">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 品牌名称
      tmName: '',
      // 品牌属性
      tmAttr: '',
      // 平台全部的销售属性
      baseSaleAttrList: [],
      //收集的spuInfo信息
      spuInfo: {
        category3Id: 0,
        tmId: 0,
        // spu名称
        spuName: '',
        // spu描述
        description: '',
        id: 0,
        // spu图标的列表
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: '',
                saleAttrName: '',
                saleAttrValueName: '',
                spuId: 0
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化spuForm页面
    async initSpuForm(id) {
      // 获取获取spu基本信息
      let res1 = await this.$api.spu.getSpuBaseInfo(id)
      if (res1.code == 200) {
        this.spuInfo.tmId = id
        this.spuInfo.spuName = res1.data.spuName
        this.spuInfo.description = res1.data.description
      }
      //
      let res2 = await this.$api.spu.getTrademarkList()
      if (res2.code == 200) {
        this.tradeMarkList = res2.data
      }
      // 获取spu图标的接口
      let res3 = await this.$api.spu.getSpuImageList(id)
      if (res3.code == 200) {
        this.spuInfo.spuImageList = res3.data
        for (let i = 0; i < res3.data.length; i++) {
          this.spuInfo.spuImageList[i].name = res3.data[i].imgName
          this.spuInfo.spuImageList[i].url = res3.data[i].imgUrl
        }
      }
      // 获取平台全部的销售属性
      let res4 = await this.$api.spu.getBaseSaleAttrList()
      if (res4.code == 200) {
        this.baseSaleAttrList = res4.data
        console.log(this.baseSaleAttrList)
      }
    }
  }
}
</script>

<style>
</style>