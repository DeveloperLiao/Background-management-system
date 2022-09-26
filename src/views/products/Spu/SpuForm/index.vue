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
          action="/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
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
          :placeholder="`你还有${noSelectAttrValueList.length}未选择`"
        >
          <el-option
            v-for="(item,index) in noSelectAttrValueList"
            :key="item.id"
            :value="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          class="el-icon-plus"
          :disabled="tmAttr===''"
          @click="addTradeAttr"
        >
          添加销售属性
        </el-button>
        <el-table
          style="width: 100%"
          border
          :data="spuSaleAttrList"
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
            <template slot-scope="{row}">
              {{ row.saleAttrName }}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="left"
            label="属性名称列表"
            width="width"
          >
            <template slot-scope="{row,$index}">
              <el-tag
                v-for="(item,index) in row.spuSaleAttrValueList"
                :key="item.id"
                type="success"
                style="margin:0 5px"
                closable
                @close="delSaleAttr(row,index)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button
                v-if="row.btnShow"
                size="mini"
                @click="changeInputShow(row,$index)"
              >
                添加
              </el-button>
              <el-input
                v-else
                :ref="$index"
                v-model="saleAttrValueName"
                type="text"
                style="display:inline-block;width:56px;"
                size="mini"
                @blur="changeBtntShow(row,$index)"
                @keyup.native.enter="changeBtntShow(row,$index)"
              />
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="120"
          >
            <el-button
              type="danger"
              class="el-icon-delete"
            />
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updateInfo"
        >
          保存
        </el-button>
        <el-button @click="cancelBtn">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'SpuForm',
  props: ['category3id'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 品牌名称
      tmName: '',
      // spu名称
      tmAttr: '',
      // 需要添加的销售属性值
      saleAttrValueName: '',
      // 平台全部的销售属性
      baseSaleAttrList: [],
      //收集的spuInfo信息
      spuInfo: {
        category3Id: 0,
        // spu名称
        spuName: '',
        // spu描述
        description: '',
        // spu图标的列表
        spuImageList: [],
        spuSaleAttrList: [
          {
            spuSaleAttrValueList: []
          }
        ]
      },
      // spu图标的接口
      spuImageList: [],
      // 品牌列表信息
      tradeMarkList: [],
      // 品牌售卖属性值列表
      spuSaleAttrList: []
    }
  },
  computed: {
    // 剩余未选的属性值列表
    noSelectAttrValueList() {
      return this.baseSaleAttrList.filter(item1 => this.spuSaleAttrList.every(item2 => item1.name !== item2.saleAttrName))
    }
  },
  methods: {
    // 移除图片
    handleRemove(file, fileList) {
      // file被移除的图片
      // 将最新的图片列表赋值给spuImageList
      this.spuImageList = fileList
    },
    // 添加图片
    handleSuccess(response, file, fileList) {
      // 上传成功后将最新的图片列表赋值给spuImageList
      if (response.code == 200) {
        this.spuImageList = fileList
      } else {
        this.$message.error('上传失败！')
      }
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化spuForm页面
    async initSpuForm(id) {
      if (id) {
        // 获取获取spu基本信息
        let res1 = await this.$api.spu.getSpuBaseInfo(id)
        if (res1.code == 200) {
          let { data } = res1
          this.spuInfo = data
          this.spuSaleAttrList = data.spuSaleAttrList
          this.spuSaleAttrList.forEach(item => {
            // btnShow在创建实例的时候 缺少了vue 监听的 set、get属性，所以将btnShow设置为响应式数据
            this.$set(item, 'btnShow', true)
          })
        }
        // 获取spu图标的接口
        let res3 = await this.$api.spu.getSpuImageList(id)
        if (res3.code == 200) {
          this.spuImageList = res3.data
          this.spuImageList.forEach(item => {
            // 添加name和url属性
            item.name = item.imageName
            item.url = item.imgUrl
          })
        }
      }
      //获取品牌的列表
      let res2 = await this.$api.spu.getTrademarkList()
      if (res2.code == 200) {
        this.tradeMarkList = res2.data
      }
      // 获取平台全部的销售属性
      let res4 = await this.$api.spu.getBaseSaleAttrList()
      if (res4.code == 200) {
        this.baseSaleAttrList = res4.data
      }
    },
    //切换为input
    changeInputShow(row, index) {
      row.btnShow = false
      this.$nextTick(() => {
        //切换span和input时需要重排和重绘，需要点时间，不能马上获取到对应的序号的input，所以需要在下一次Dom更新循环之后再获取
        this.$refs[index].focus()
      })
    },
    // 切换为btn
    changeBtntShow(row, index) {
      let saleAttrValueName = this.saleAttrValueName.trim()
      // 寻找是否有重复值
      let res = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === saleAttrValueName)
      if (saleAttrValueName !== '' && !res) {
        row.spuSaleAttrValueList.push({
          saleAttrName: row.saleAttrName,
          saleAttrValueName: this.saleAttrValueName     
        })
      } else {
        this.$message.error('输入为空或者重复！')
      }
      // 置空
      this.saleAttrValueName = ''
      row.btnShow = true
    },
    // 取消按钮
    cancelBtn() {
      this.$emit('cancelBtn', { showNum: 1 })
      // 置空
      this.tmName = ''
      this.tmAttr = ''
      this.spuInfo.spuName = ''
      delete this.spuInfo.id
      delete this.spuInfo.tmId
      this.spuInfo.description = ''
      this.spuImageList = []
      this.spuSaleAttrList = []
    },
    // 添加销售属性
    addTradeAttr() {
      this.spuSaleAttrList.push({
        // id: 0,
        saleAttrName: this.tmAttr,
        btnShow: true,
        // baseSaleAttrId: this.spuSaleAttrList.length + 1,
        // spuId: this.spuInfo.id,
        spuSaleAttrValueList: []
      })
    },
    // 删除销售属性
    delSaleAttr(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    //更改spuInfo信息
    async updateInfo() {
      // 遍历数组中的每一个元素，返回函数处理后的结果，不改变原数组
      this.spuInfo.spuImageList = this.spuImageList.map(item => {
        return { imageName: item.name, imageUrl: (item.response && item.response.data) || item.url }
      })
      // 去除多余的btnShow属性
      this.spuSaleAttrList.forEach(item => {
        delete item.btnShow
      })
      this.spuInfo.spuSaleAttrList = cloneDeep(this.spuSaleAttrList)
      // 拿到category3Id
      this.spuInfo.category3Id = this.category3id
      let res = await this.$api.spu.updateOrsaveSpuInfo(this.spuInfo)
      if (res.code == 200) {
        // 有id说明是编辑模式
        if (this.spuInfo.id) {
          this.$message({ type: 'success', message: '修改成功！' })
          this.$emit('cancelBtn', { showNum: 1 })
        } else {
          this.$message({ type: 'success', message: '添加成功！' })
          this.$emit('cancelBtn', { showNum: 1, page: 1 })
        }
      }
    }
  }
}
</script>

<style>
</style>


