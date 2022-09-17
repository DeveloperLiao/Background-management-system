<template>
  <el-card>
    <el-form
      ref="form"
      label-width="80px"
    >
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-input placeholder="请选择品牌" />
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          placeholder="spu描述"
          type="textarea"
          rows="3"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
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
          v-model="model"
          placeholder="你还有3未选择"
        >
          <el-option value="" />
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
          />
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
        <el-button>
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
      model: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
</style>