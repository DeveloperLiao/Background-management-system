<template>
  <div
    class="observe"
    style="margin-top:10px"
  >
    <el-row :gutter="10">
      <el-col :span="12">
        <searcher />
      </el-col>
      <el-col :span="12">
        <category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Searcher from '../Observe/Serarch/index.vue'
import Category from '../Observe/Category/index.vue'
export default {
  name: 'Observe',
  components: {
    Searcher,
    Category
  }
}
</script>

<style>
</style>