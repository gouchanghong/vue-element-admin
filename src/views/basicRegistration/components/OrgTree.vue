<template>
  <div class="orgTreeDiv">
    <i :style="img" class="search-input-img"/>
    <el-input
      v-model="filterText"
      placeholder="请输入机构名称"
      class="orgTreeInput"/>

    <el-tree
      ref="orgTree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      accordion
      node-key="nodeid"
      class="filter-tree orgTreeElDiv"
      @node-click="sendOrgCode"/>
  </div>
</template>
<script>

import { getOrgTree } from '@/api/basicRegistration'

export default {

  data() {
    return {
      filterText: '',
      img: { background: "url('../../../static/imgs/search-1.png')" },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'nodename'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.orgTree.filter(val)
    }
  },
  created() {
    getOrgTree().then(response => {
      this.data = response.data.data
    })
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.nodename.indexOf(value) !== -1
    },

    sendOrgCode(data) {
      this.$emit('getOrgId', data.nodeid) // 第一参数自定义事件，第二参数就是传递消息
    }
  }
}
</script>
<style>
  .orgTreeDiv{
    height: 92%;
    width: 200px;
    margin-left: 10px;
    background-color: white;
    border-radius: 6px;
  }
  .search-input-img{
    width: 18px;
    height: 18px;
    position: absolute;
    top: 16px;
    right: 20px;
    z-index: 100;
  }
  .orgTreeInput input.el-input__inner {
    width: 180px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 100px;
    background-color: #F4F4F4;
    padding-right: 30px;
    outline:none;
    /*border-color: #dcdfe6;*/
  }
  .orgTreeElDiv {
    padding-left: 20px;
    padding-top: 25px;
  }
</style>
