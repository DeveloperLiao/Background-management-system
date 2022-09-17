<template>
  <div class="typebar">
    <el-card>
      <span>一级分类</span>
      <el-select
        v-model="category1Id"
        placeholder="请选择"
        :disabled="show"
        @change="getCategory2List"
      >
        <el-option
          v-for="(item1,index) in list1"
          :key="item1.id"
          :label="item1.name"
          :value="item1.id"
        />
      </el-select>
      <span>二级分类</span>
      <el-select
        v-model="category2Id"
        placeholder="请选择"
        :disabled="show"
        @change="getCategory3List"
      >
        <el-option
          v-for="(item2,index) in list2"
          :key="item2.id"
          :label="item2.name"
          :value="item2.id"
        />
      </el-select>
      <span>三级分类</span>
      <el-select
        v-model="category3Id"
        placeholder="请选择"
        :disabled="show"
        @change="sendCategoryId"
      >
        <el-option
          v-for="(item3,index) in list3"
          :key="item3.id"
          :label="item3.name"
          :value="item3.id"
        />
      </el-select>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TypeBar',
  // 控制typebar的激活状态
  props: ['show'],
  data() {
    return {
      // 一级分类列表的数据
      list1: [],
      // 二级分类列表的数据
      list2: [],
      // 三级分类列表的数据
      list3: [],
      // 绑定值
      value: '',
      //一级分类中商品的id值
      category1Id: '',
      //二级分类中商品id值
      category2Id: '',
      //三级分类中商品id值
      category3Id: ''
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    //获取一级分类列表
    async getCategory1List() {
      let result = await this.$api.attr.getCategory1List()
      if (result.code == 200) {
        let { data } = result
        this.list1 = data
      } else {
        this.$message.error('获取失败！')
      }
    },
    // 获取二级分类列表
    async getCategory2List() {
      let result = await this.$api.attr.getCategory2List(this.category1Id)
      if (result.code == 200) {
        let { data } = result
        this.list2 = data
        // 重置二、三级input的数据
        this.category2Id = ''
        this.category3Id = ''
      } else {
        this.$message.error('获取失败！')
      }
    },
    // 获取三级分类列表
    async getCategory3List() {
      let result = await this.$api.attr.getCategory3List(this.category2Id)
      if (result.code == 200) {
        let { data } = result
        this.list3 = data
        // 重置三级input的数据
        this.category3Id = ''
      } else {
        this.$message.error('获取失败！')
      }
    },
    // 发送一、二、三级的商品id给父组件
    sendCategoryId() {
      let data = { category1Id: this.category1Id, category2Id: this.category2Id, category3Id: this.category3Id }
      this.$emit('sendCategoryId', data)
    }
  }
}
</script>

<style  scoped>
.typebar {
  padding: 10px 0;
}
span {
  display: inline-block;
  padding: 10px;
  font-weight: bold;
}
</style>