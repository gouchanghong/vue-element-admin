<template>
  <div class="container">
    <div class="searchOrgDiv" style="position: fixed;width: 350px;margin-left: 10px;">
      <div class="filter-container">
        <div>
          <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleDeptRefresh">{{ $t('table.refresh') }}</el-button>
          <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleDeptCreate">{{ $t('table.add') }}</el-button>
          <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDeptUpdate">{{ $t('table.edit') }}</el-button>
          <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleDeptDelete">{{ $t('table.delete') }}</el-button>
        </div>
      </div>
      <div>
        <div class="title">应用分组</div>
        <div v-for="(role,index) in deptList" :key="index" class="roles" @click="selectDept(role)">
          <div :class="role == currentDept ? 'active' : ''">
            <div><img :src="role.img" ></div>
            <div>{{ role.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="10" style="margin-top: 10px;margin-left: 365px;">
      <el-col :span="12">
        <div class="searchOrgDiv">
          <div class="filter-container">
            <div>
              <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleDeptCreate">{{ $t('table.add') }}</el-button>
              <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleCreateChild">{{ $t('table.addChild') }}</el-button>
              <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDeptUpdate">{{ $t('table.edit') }}</el-button>
              <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleDeptDelete">{{ $t('table.delete') }}</el-button>
            </div>
          </div>
          <div>
            <div class="title">应用</div>
            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="appData"
              height="calc(100vh - 182px)"
              stripe
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column
                :label="$t('authorManage.icon')"
                prop="resourceicon"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.appName')"
                prop="resourcename"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.appCode')"
                prop="resourcecode"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.appType')"
                prop="resourcetype"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.url')"
                prop="resourcepath"
                align="center"/>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="searchOrgDiv" style="margin-right: 10px;">
          <div class="filter-container">
            <div>
              <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleDeptCreate">{{ $t('table.add') }}</el-button>
              <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleCreateChild">{{ $t('table.addChild') }}</el-button>
              <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDeptUpdate">{{ $t('table.edit') }}</el-button>
              <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleDeptDelete">{{ $t('table.delete') }}</el-button>
            </div>
          </div>
          <div>
            <div class="title">菜单/按钮</div>
            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="appData"
              height="calc(100vh - 182px)"
              stripe
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column
                :label="$t('authorManage.icon')"
                prop="resourceicon"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.resName')"
                prop="resourcename"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.resCode')"
                prop="resourcecode"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.resType')"
                prop="resourcetype"
                align="center"/>
              <el-table-column
                :label="$t('authorManage.url')"
                prop="resourcepath"
                align="center"/>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="createOrUpdateTextMap[createOrUpdateStatus]" :visible.sync="createOrUpdateFormVisible" class="manageUserCreateOrUpdateDivDialog" width="500px">
      <el-form ref="createOrUpdateForm" :rules="createOrUpdateRules" :model="createOrUpdateModel" label-position="right" label-width="70px" style="width: 400px; margin-left:30px;">
        <el-form-item :label="$t('authorManage.resName')" prop="resourcename">
          <el-input v-model="createOrUpdateModel.resourcename"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.resCode')" prop="resourcecode">
          <el-input v-model="createOrUpdateModel.resourcecode"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.icon')" prop="resourceicon">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
          <el-input v-model="createOrUpdateModel.resourceicon" style="display:none;"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.url')" prop="resourcepath">
          <el-input v-model="createOrUpdateModel.resourcepath"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.sortNo')" prop="sorno">
          <el-input v-model="createOrUpdateModel.sorno"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.status')" prop="validtag">
          <el-radio-group v-model="createOrUpdateModel.validtag">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>停用</el-radio>
          </el-radio-group>
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
import { createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'ManageResource',
  directives: { waves },
  data() {
    return {
      imageUrl: '',
      currentDept: null,
      deptList: [
        { 'name': '基础平台', 'img': '../../../static/imgs/manage-resource-basic.png', url: 'dashboard' },
        { 'name': '数据中心', 'img': '../../../static/imgs/manage-resource-data.png', url: 'permission' },
        { 'name': '业务应用', 'img': '../../../static/imgs/manage-resource-mis.png', url: 'permission' },
        { 'name': '综合监督', 'img': '../../../static/imgs/manage-resource-syn.png', url: 'permission' }
      ],
      appData: [{
        'id': 1,
        'resourcename': 'xxxxxxxxxx',
        'resourceicon': 'xxxxxxxxxx',
        'resourcecode': '1001',
        'resourcetype': '2',
        'resourcepath': 'url'
      }, {
        'id': 2,
        'resourcename': 'xxxxxxxxxx',
        'resourceicon': 'xxxxxxxxxx',
        'resourcecode': '1001',
        'resourcetype': '2',
        'resourcepath': 'url'
      }, {
        'id': 3,
        'resourcename': 'xxxxxxxxxx',
        'resourceicon': 'xxxxxxxxxx',
        'resourcecode': '1001',
        'resourcetype': '2',
        'resourcepath': 'url'
      }, {
        'id': 4,
        'resourcename': 'xxxxxxxxxx',
        'resourceicon': 'xxxxxxxxxx',
        'resourcecode': '1001',
        'resourcetype': '2',
        'resourcepath': 'url'
      }],
      resData: [
      ],
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
        id: 1,
        'resourcename': 'xxxxxxxxxx',
        'resourceicon': 'xxxxxxxxxx',
        'resourcecode': '1001',
        'resourcetype': '2',
        'resourcepath': 'url',
        'validtag': '0',
        'sortno': '1'
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    resetModel() {
      this.createOrUpdateModel = {
        rolename: '',
        remarks: ''
      }
    },
    selectDept(role) {
      this.currentDept = role
    },
    handleDeptRefresh() { // 应用分组
      this.$message('刷新成功')
    },
    handleDeptCreate() { // 应用分组
      this.resetModel()
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => {
        this.$refs['createOrUpdateForm'].clearValidate()
      })
    },
    handleDeptUpdate() { // 应用分组
      // TODO 调用查询某个角色的API
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => {
        this.$refs['createOrUpdateForm'].clearValidate()
      })
    },
    handleDeptDelete() { // 应用分组
      if (!this.currentDept) {
        this.$message('请先选择一个应用分组')
        return
      }
      this.$confirm('此操作将删除该应用分组\'，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    createData() {
      this.$refs['createOrUpdateForm'].validate((valid) => {
        if (valid) {
          // TODO 调用新增API
          createArticle(this.createOrUpdateModel).then(() => {
            this.list.unshift(this.createOrUpdateModel)
            this.createOrUpdateFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['createOrUpdateForm'].validate((valid) => {
        if (valid) {
          // TODO 调用修改API
          updateArticle(this.createOrUpdateModel).then(() => {
            for (const v of this.list) {
              if (v.id === this.createOrUpdateModel.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.createOrUpdateModel)
                break
              }
            }
            this.createOrUpdateFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleCreateChild() {
      this.resetModel()
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => {
        this.$refs['createOrUpdateForm'].clearValidate()
      })
    }
  }
}
</script>
<style scoped>
  .searchOrgDiv{
    padding-top: 10px;
    padding-left: 10px;
    height: 91%;
    background-color: white;
    border-radius: 6px;
  }
  .title{
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    color: #FF8484;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
