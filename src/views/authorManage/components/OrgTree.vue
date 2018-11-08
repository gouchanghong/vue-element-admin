<template>
  <div class="orgTreeDiv">
    <div class="filter-container" style="padding: 10px 0 0 10px;">
      <el-button class="filter-item" style="background-color: #409EFF; border-color: #409EFF;" type="primary" @click="handleSave">{{ $t('table.save') }}</el-button>
    </div>
    <!--<el-input
      v-model="filterText"
      placeholder="请输入机构名称"
      class="orgTreeInput"/>-->

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      show-checkbox
      class="filter-tree orgTreeElDiv"
      @node-click="sendOrgCode"/>
  </div>
</template>
<script>
export default {

  data() {
    return {
      filterText: '',
      img: { background: "url('../../../static/imgs/search-1.png')" },
      data2: [{
        id: 1,
        label: 'Ho',
        children: [{
          id: 4,
          label: 'Cl',
          children: [{
            id: 9,
            label: 'Jh'
          }, {
            id: 10,
            label: 'Fu'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    sendOrgCode(data) {
      this.$emit('getOrgCode', data.label) // 第一参数自定义事件，第二参数就是传递消息
    },
    handleSave() {
      //
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
