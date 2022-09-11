<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      class="el-icon-plus btn"
      style="margin:10px 0"
      @click="dialogVisible=!dialogVisible"
    >
      添加
    </el-button>
    <!-- 品牌表格 -->
    <el-table
      style="width: 100%"
      border
      :data="trademark"
    >
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="品牌名称"
      >
        <template slot-scope="{$index,row}">
          <span :key="row.id">{{ row.tmName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="品牌LOGO"
      >
        <template slot-scope="{$index,row}">
          <img
            :key="row.id"
            :src="row.logoUrl"
            width="70"
            height="70"
          >
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="操作"
      >
        <el-button
          type="warning"
          class="el-icon-edit"
          @click="updateTradeMarkList"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          class="el-icon-delete"
        >
          删除
        </el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        style="textAlign:center"
        :page-sizes="[3, 5, 7]"
        :page-size.sync="limit"
        layout="prev,pager,next,jumper,->,sizes,total"
        :total="total"
        :current-page.sync="page"
        @size-change="getTradeMarkList"
        @current-change="getTradeMarkList"
        @prev-click="getTradeMarkList"
        @next-click="getTradeMarkList"
      />
    </div>
    <!-- 添加|修改品牌对话框 -->
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <!-- 收集信息的表单 -->
      <el-form
        ref="tmForm"
        label-width="100px"
        :model="tmFrom"
        :rules="rules"
      >
        <el-form-item
          label="商品名称"
          prop="tmName"
        >
          <el-input
            v-model="tmFrom.tmName"
            type="text"
            autocomplete="off"
            style="width:80%"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tmFrom.logoUrl"
              :src="tmFrom.logoUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
          <span>只能上传.jpg/png文件,且不能超过500kb</span>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancle">取 消</el-button>
        <el-button
          type="primary"
          @click="addTradeMarkList"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 品牌名称的校验规则
    var checktmName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('品牌名称不能为空！'))
      }
      setTimeout(() => {
        if (value.length < 2 || value.length > 8) {
          callback(new Error('品牌名称的长度在2-8'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checklogoUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('品牌LOGO不能为空！'))
      } else {
        callback()
      }
    }
    return {
      // 存储品牌列表数据
      trademark: [],
      // 当前页
      page: 1,
      // 每页显示多少条
      limit: 3,
      // 总条数
      total: 0,
      // 是否显示对话框
      dialogVisible: false,
      // 上传图片的url
      imageUrl: '',
      // 表单收集的数据
      tmFrom: {
        logoUrl: '',
        tmName: ''
      },
      rules: {
        tmName: [{ required: true, validator: checktmName, trigger: 'blur' }],
        logoUrl: [{ required: true, validator: checklogoUrl }]
      }
    }
  },
  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    // 获取品牌列表
    async getTradeMarkList() {
      let { page, limit } = this
      let result = await this.$api.trademark.getTradeMarkList(page, limit)
      if (result.code == 200 || result.code == 20000) {
        let { data } = result
        this.trademark = data.records
        this.total = data.total
      } else {
        alert('失败！')
      }
    },
    // 添加品牌列表
    async addTradeMarkList() {
      let tmForm = this.$refs.tmForm
      tmForm.validate(async valid => {
        // 如果表单验证为真
        if (valid) {
          // 关闭对话框
          this.dialogVisible = false
          // 提交数据
          let result = await this.$api.trademark.addTradeMarkList(this.tmFrom)
          if (result.code == 200) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            tmForm.resetFields()
          } else {
            this.$message.error('添加失败！')
          }
        } else {
          this.$message.error('添加失败！')
          return false
        }
      })
    },
    // 上传成功之后
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        this.tmFrom.logoUrl = res.data
      } else {
        this.$message.error('上传失败')
      }
    },
    // 在未上传图片之前校验规则
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传品牌图片只能是 JPG 格式或者png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传品牌图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //取消按钮
    cancle() {
      // 重置表单
      this.$refs.tmForm.resetFields()
      // 关闭对话框
      this.dialogVisible = false
    },
    updateTradeMarkList() {}
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
