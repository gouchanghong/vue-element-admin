<template>
  <div>
    <div class="app-container searchOrgDiv" style="position: fixed;width: 350px;margin-left: 10px;">
      <div class="filter-container" style="padding: 0 10px;">
        <div>
          <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleRefresh">{{ $t('table.refresh') }}</el-button>
          <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleCreate">{{ $t('table.add') }}</el-button>
          <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleUpdate">{{ $t('table.edit') }}</el-button>
          <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleDelete">{{ $t('table.delete') }}</el-button>
        </div>
      </div>
      <div>
        <div v-loading="listLoading" v-for="(role,index) in roleList" :key="index" class="roles" @click="selectRole(role)">
          <div :class="role == currentRole ? 'active' : ''">
            <div><img :src="role.path" ></div>
            <div>{{ role.rolename }}</div>
          </div>
        </div>
      </div>
    </div>
    <resource-tree ref="resourcesTree" style="position: fixed; margin-left: 370px;margin-top: 10px;width: 100%;" />

    <el-dialog :title="createOrUpdateTextMap[createOrUpdateStatus]" :visible.sync="createOrUpdateFormVisible" class="manageUserCreateOrUpdateDivDialog" width="500px">
      <el-form ref="createOrUpdateForm" :rules="createOrUpdateRules" :model="createOrUpdateModel" label-position="right" label-width="70px" style="width: 400px; margin-left:30px;">
        <el-form-item :label="$t('authorManage.roleName')" prop="rolename">
          <el-input v-model="createOrUpdateModel.rolename"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.remarks')" prop="remarks">
          <el-input
            :rows="3"
            v-model="createOrUpdateModel.remarks"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createOrUpdateStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
        <el-button @click="createOrUpdateFormVisible = false">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ResourceTree from './components/ResourceTree'
import { advancedQuery } from '@/utils'
import { getRoleList, saveRole, updateRole, deleteRole } from '@/api/authorManage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'ManageRole',
  components: { ResourceTree, Pagination },
  directives: { waves },
  data() {
    return {
      total: 0,
      page: 1,
      limit: 0,
      listLoading: true,
      status: 'all',
      currentRole: null,
      roleList: [
        // { 'id': '1', 'rolename': '机构管理员', 'path': '../../../static/imgs/manage-org.png', url: 'dashboard' },
        // { 'id': '2', 'rolename': '系统管理员', 'path': '../../../static/imgs/manage-sys.png', url: 'permission' }
      ],
      fieldOptions: [{
        value: 'rolename',
        label: '角色名'
      }, {
        value: 'remarks',
        label: '备注'
      }],
      createOrUpdateFormVisible: false,
      createOrUpdateRules: {
        rolename: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      },
      createOrUpdateStatus: '',
      createOrUpdateTextMap: {
        update: '编辑',
        create: '新增'
      },
      createOrUpdateModel: {
        id: null,
        rolename: '',
        remarks: ''
      },
      advancedQueryForm: {
        cs: [{
          f: undefined,
          o: 'EQ',
          v: undefined
        }],
        ss: [{
          f: undefined,
          o: undefined
        }]
      }
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    resetModel() {
      this.createOrUpdateModel = {
        rolename: '',
        remarks: ''
      }
    },
    selectRole(role) {
      this.currentRole = role
      this.createOrUpdateModel = role
      this.$refs['resourcesTree'].getResource(role.id)
    },
    handleRefresh() {
      this.getList()
      this.$message('刷新成功')
    },
    getList() {
      this.advancedQueryForm.cs = []
      this.advancedQueryForm.ss = []
      // if (this.orgId) {
      //   this.advancedQueryForm.push({ f: 'orgId', o: 'EQ', v: this.orgId })
      // }
      this.listLoading = true
      const param = advancedQuery(this.advancedQueryForm)
      getRoleList(param, this.page, this.limit).then(response => {
        this.roleList = response.data.data.rows
        this.total = response.data.data.total
        this.listLoading = false
        if (this.roleList && this.roleList.length > 0) {
          this.selectRole(this.roleList[0])
        }
      })
    },
    handleCreate() {
      this.resetModel()
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => this.$refs['createOrUpdateForm'].clearValidate())
    },
    handleUpdate() {
      // TODO 调用查询某个角色的API
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => this.$refs['createOrUpdateForm'].clearValidate())
    },
    handleDelete() {
      if (!this.currentRole) {
        this.$message('请先选择一个角色')
        return
      }
      this.$confirm('此操作将删除该角色，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        deleteRole(this.createOrUpdateModel.id).then((resp) => {
          if (resp.data.code === 0) {
            this.roleList.splice(this.roleList.indexOf(this.currentRole, 1))
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: resp.data.msg, type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    createData() {
      this.$refs['createOrUpdateForm'].validate((valid) => {
        if (valid) {
          // TODO 调用新增API
          saveRole(this.createOrUpdateModel).then((resp) => {
            if (resp.data.code === 0) {
              this.roleList.unshift(this.createOrUpdateModel)
              this.createOrUpdateFormVisible = false
              this.$message({ message: '创建成功', type: 'success' })
            } else {
              this.$message({ message: resp.data.msg, type: 'error' })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['createOrUpdateForm'].validate((valid) => {
        if (valid) {
          // TODO 调用修改API
          updateRole(this.createOrUpdateModel).then((resp) => {
            if (resp.data.code === 0) {
              for (const v of this.roleList) {
                if (v.id === this.createOrUpdateModel.id) {
                  const index = this.roleList.indexOf(v)
                  this.roleList.splice(index, 1, this.createOrUpdateModel)
                  break
                }
              }
              this.createOrUpdateFormVisible = false
              this.$message({ message: '更新成功', type: 'success' })
            } else {
              this.$message({ message: resp.data.msg, type: 'error' })
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .searchOrgDiv{
    height: 91%;
    margin-left: 220px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: white;
    border-radius: 6px;
  }
  .roles{
    text-align: center;
    width: 50%;
    float: left;
  }
  .roles div{
    margin: 10px;
    padding: 5px
  }
  .active{background: #eee;}
</style>
