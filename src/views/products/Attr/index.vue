<template>
  <div class="attr">
    <TypeBar
      :show="!show"
      @sendCategoryId="getCategoryId"
    />
    <!-- 商品属性列表 -->
    <el-card v-if="show">
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="attrBtn"
        @click="showAddAttr"
      >
        添加属性
      </el-button>
      <el-table
        style="width: 100%"
        border
        :data="attrInfoList"
      >
        <el-table-column
          prop="prop"
          label="序号"
          width="100"
          align="center"
          type="index"
        />
        <el-table-column
          prop="prop"
          label="属性名称"
          width="200"
        >
          <template slot-scope="{row,$index}">
            {{ row.attrName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="属性值列表"
          width="width"
        >
          <template slot-scope="{row}">
            <el-tag
              v-for="(item,index) in row.attrValueList"
              :key="item.id"
              type="success"
              style="margin:0 10px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="200"
        >
          <template slot-scope="{row}">
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="updateAttr(row)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加商品属性 -->
    <el-card v-if="!show">
      <el-form ref="form">
        <el-form-item>
          <label for="attName">属性名</label>
          <el-input
            id="attName"
            v-model="attrInfo.attrName"
            placeholder="请输入属性名"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled="attrInfo.attrName==''"
            @click="addAttr"
          >
            添加属性值
          </el-button>
          <el-button @click="cancle">
            取消
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-table
            border
            :data="attrInfo.attrValueList"
          >
            <el-table-column
              header-align="center"
              align="center"
              label="序号"
              width="100"
              type="index"
            />
            <el-table-column
              header-align="center"
              align="center"
              label="属性值名称"
            >
              <template slot-scope="{row,$index}">
                <!-- 查看模式和编辑模式的切换 -->
                <el-input
                  v-if="row.flag"
                  :ref="$index"
                  v-model="row.valueName"
                  placeholder="请输入属性值"
                  size="mini"
                  @blur="showSpan(row)"
                  @keyup.native.enter="row.flag=false"
                />
                <span
                  v-else
                  style="display:block"
                  @click="flagChange(row,$index)"
                >{{ row.valueName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="操作"
            >
              <template slot-scope="{row,$index}">
                <el-popconfirm
                  ref="popconfirm"
                  :title="`确定删除${row.valueName}吗？`"
                  @onConfirm="delAttr($index)"
                >
                  <el-button
                    slot="reference"
                    type="danger"
                    class="el-icon-delete"
                  />
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="attrInfo.attrValueList.length==0"
            @click="saveOrUpdateAttrInfoList"
          >
            保存
          </el-button>
          <el-button @click="cancle">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入lodash的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      // 品牌列表信息
      attrInfoList: [],
      // 控制商品属性页面的显示与隐藏
      show: true,
      // 控制添加属性按钮的活动状态
      attrBtn: true,
      // 一、二、三级商品的id
      valId: '',
      // 传递的属性参数
      attrInfo: {
        // 需要添加属性的属性名
        attrName: '',
        // 属性值的数组
        attrValueList: [],
        // 三级商品的id
        categoryId: '',
        categoryLevel: 3
      }
    }
  },
  methods: {
    // 获取一、二、三级商品的id
    async getCategoryId(val) {
      this.valId = val
      //获取商品的属性
      let result = await this.$api.attr.getattrInfoList(val)
      if (result.code == 200) {
        this.attrInfoList = result.data
        // 激活添加属性值按钮
        this.attrBtn = false
        this.attrInfo.categoryId = val.category3Id
      } else {
        this.$message.error('获取失败！')
      }
    },
    //添加属性的按钮
    showAddAttr() {
      // 显示添加属性的页面
      this.show = false
    },
    //取消按钮
    cancle() {
      // 显示属性列表
      this.show = true
      // 置空
      this.attrInfo.attrName = ''
      this.attrInfo.attrValueList = []
    },
    //保存或者修改属性值
    async saveOrUpdateAttrInfoList() {
      // 过滤数组
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        delete item.flag
        return item.valueName !== ''
      })
      let result = await this.$api.attr.saveOrUpdateAttrInfoList(this.attrInfo)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '添加成功！' })
        this.show = true
        // 置空
        this.attrInfo.attrName = ''
        this.attrInfo.attrValueList = []
        this.getCategoryId(this.valId)
      }
    },
    // 添加属性值
    addAttr() {
      let arr = this.attrInfo.attrValueList
      arr.push({
        // 控制查看模式和编辑模式的切换,true编辑模式,反之查看模式
        flag: true,
        // 属性值的id
        attrId: this.attrInfo.id,
        // 需要添加属性的属性值
        valueName: ''
      })
      // 在input渲染后添加自动聚焦
      this.$nextTick(() => {
        this.$refs[arr.length - 1].focus()
      })
    },
    // 删除属性
    delAttr(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 修改属性值
    updateAttr(row) {
      this.show = false
      // attrInfo=row导致attrInfo和row都指向同一个对象attrInfo,再加上数据的双向绑定修改attrInfo的值会导致attrInfo的数据也修改，此时数据比较复杂，需要用到深拷贝
      this.attrInfo = cloneDeep(row)
      // 给每个attrValueList项添加flag
      this.attrInfo.attrValueList.forEach(item => {
        // 这样书写也可以给属性值添加flag,但是会发现视图不会跟着变化(因为flag不是响应式的数组)
        // item.flag = true
        //因为vue无法探测普通的新增的 Property,这样书写的属性并非响应式的数据
        this.$set(item, 'flag', false)
      })
    },
    //显示input
    flagChange(row, index) {
      row.flag = true
      // 切换span和input时需要重排和重绘，需要点时间，不能马上获取到对应的序号的input，所以需要在下一次Dom更新循环之后再获取
      this.$nextTick(() => {
        // input自动聚焦
        this.$refs[index].focus()
      })
    },
    //失去焦点的事件，即展示span
    showSpan(row) {
      if (row.valueName.trim() == '') {
        this.$message({ type: 'warning', message: '属性值不能为空！' })
        return
      }
      let result = this.attrInfo.attrValueList.some(item => {
        // 在attValueList中遍历不等于row的item项
        if (item !== row) {
          // 校验输入的是否有重复项
          return item.valueName == row.valueName
        }
      })
      if (result) {
        this.$message({ type: 'warning', message: '不能输入重复项！' })
        return
      }
      // 显示span
      row.flag = false
    }
  }
}
</script>

<style scoped>
</style>
