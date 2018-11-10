<template>
  <div class="orgTreeDiv">
    <div class="filter-container" style="padding: 10px 0 0 10px;">
      <el-button class="filter-item" style="background-color: #409EFF; border-color: #409EFF;" type="primary" @click="handleSave">{{ $t('table.save') }}</el-button>
    </div>
    <el-tree
      v-loading="listLoading"
      ref="tree"
      :data="resourceList"
      :props="defaultProps"
      :default-checked-keys="checkedNode"
      :default-expand-all= "true"
      :check-on-click-node="true"
      node-key="nodeid"
      show-checkbox
      class="filter-tree orgTreeElDiv"/>
  </div>
</template>
<script>
import { getResouceTreeByRoleId, saveRoleResources } from '@/api/authorManage'
export default {
  data() {
    return {
      listLoading: false,
      checkedNode: [],
      resourceList: [],
      defaultProps: {
        children: 'children',
        label: 'nodename'
      }
    }
  },
  watch: {
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys()
    },
    getResource(id) {
      this.listLoading = true
      getResouceTreeByRoleId(id).then(response => {
        this.resourceList = response.data.data
        this.listLoading = false
        // 设置选中项
        this.checkedNode = []
        this.getCheckNodes(this.resourceList)
      })
    },
    getCheckNodes(resources) {
      resources.forEach((item, index) => {
        if (item.nodechecked === '1') {
          this.checkedNode.push(item.nodeid)
        }
        if (item.children) {
          this.getCheckNodes(item.children)
        }
      })
    },
    handleSave() {
      const roleid = this.$parent.currentRole.id
      const resourceid = this.getCheckedKeys()
      if (!roleid) {
        this.$message({
          message: '请选择角色',
          type: 'error'
        })
        return false
      }
      if (!resourceid && resourceid.length === 0) {
        this.$message({
          message: '请选择资源信息',
          type: 'error'
        })
        return false
      }
      this.listLoading = true
      saveRoleResources(roleid, resourceid).then(response => {
        if (response.data.code === 0) {
          this.$message('角色权限保存成功')
          this.getResource(roleid)
        } else {
          this.$message({
            message: response.data.msg,
            type: 'error'
          })
        }
      })
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
