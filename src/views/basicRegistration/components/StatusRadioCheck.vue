<template>
  <div>
    <span>状态：</span>
    <el-radio-group v-model="statusRadio">
      <el-radio :label="all">全部</el-radio>
      <el-radio :label="0">停用</el-radio>
      <el-radio :label="1">启用</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusRadio: 'all'
    }
  }
}
</script>
