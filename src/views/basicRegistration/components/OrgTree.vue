<template>
  <div>
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"/>

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      default-expand-all
      class="filter-tree"
      @node-click="sendOrgCode"/>
  </div>
</template>
<script>
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
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
      console.info(data.id + '11111111111')
      this.$emit('getOrgCode', data.id) // 第一参数自定义事件，第二参数就是传递消息
    }
  }
}
</script>
