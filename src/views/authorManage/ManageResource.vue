<template>
  <div class="container">
    <el-row :gutter="10" style="margin-top: 10px;margin-left: 5px;">
      <el-col :span="6">
        <div class="searchOrgDiv">
          <div class="filter-container">
            <div>
              <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleDeptRefresh">{{ $t('table.refresh') }}</el-button>
              <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleDeptCreate(1)">{{ $t('table.add') }}</el-button>
              <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDeptUpdate(1)">{{ $t('table.edit') }}</el-button>
              <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleDeptDelete(1)">{{ $t('table.delete') }}</el-button>
            </div>
          </div>
          <div style="height: calc(100vh - 147px);">
            <div class="title">应用分组</div>
            <el-row :gutter="10">
              <div v-loading="dept.listLoading" v-for="(dd,index) in dept.dataList" :key="index" class="depts" @click="selectDept(dd)">
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div :class="dd == dept.currentData ? 'active' : ''">
                    <div><img :src="dd.resourceicon" ></div>
                    <div>{{ dd.resourcename }}</div>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="searchOrgDiv">
          <div class="filter-container">
            <div>
              <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleAppCreate(2)">{{ $t('table.add') }}</el-button>
              <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleAppCreateChild(2)">{{ $t('table.addChild') }}</el-button>
              <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleAppUpdate(2)">{{ $t('table.edit') }}</el-button>
              <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleAppDelete(2)">{{ $t('table.delete') }}</el-button>
            </div>
          </div>
          <div>
            <div class="title">应用</div>
            <el-table
              v-loading="app.listLoading"
              ref="appTable"
              :data="app.dataList"
              height="calc(100vh - 230px)"
              stripe
              fit
              highlight-current-row
              style="width: 100%"
              @current-change="selectApp">
              <el-table-column
                :label="$t('authorManage.icon')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;"><img :src="scope.row.resourceicon" style="width: 30px;"></span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appName')"
                prop="resourcename"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcename }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appCode')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcecode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appType')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;" >
                    <span v-if="scope.row.resourcetype === 1">应用分组</span>
                    <span v-else-if="scope.row.resourcetype === 2">应用</span>
                    <span v-else-if="scope.row.resourcetype === 3">菜单</span>
                    <span v-else-if="scope.row.resourcetype === 4">按钮</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.url')"
                align="center">

                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcepath }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="app.total"
              :page.sync="app.page"
              :limit.sync="app.limit"
              :pager-count="5"
              background
              layout="prev, pager, next"
              @pagination="getAppList" />
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="searchOrgDiv" style="margin-right: 10px;">
          <div class="filter-container">
            <div>
              <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleResCreate(3)">{{ $t('table.add') }}</el-button>
              <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleResCreateChild(3)">{{ $t('table.addChild') }}</el-button>
              <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleResUpdate(3)">{{ $t('table.edit') }}</el-button>
              <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;margin-left: 6px;" type="primary" @click="handleResDelete(3)">{{ $t('table.delete') }}</el-button>
            </div>
          </div>
          <div>
            <div class="title">菜单/按钮</div>
            <el-table
              v-loading="res.listLoading"
              ref="resTable"
              :data="res.dataList"
              height="calc(100vh - 230px)"
              stripe
              fit
              highlight-current-row
              style="width: 100%"
              @current-change="selectRes">
              <el-table-column
                :label="$t('authorManage.icon')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;"><img :src="scope.row.resourceicon" style="width: 30px;"></span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appName')"
                prop="resourcename"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcename }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appCode')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcecode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.appType')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">
                    <span v-if="scope.row.resourcetype === 1">应用分组</span>
                    <span v-else-if="scope.row.resourcetype === 2">应用</span>
                    <span v-else-if="scope.row.resourcetype === 3">菜单</span>
                    <span v-else-if="scope.row.resourcetype === 4">按钮</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('authorManage.url')"
                align="center">
                <template slot-scope="scope">
                  <span style="color: #32A8EE;">{{ scope.row.resourcepath }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="res.total"
              :page.sync="res.page"
              :limit.sync="res.limit"
              :pager-count="5"
              background
              layout="prev, pager, next"
              @pagination="getResList"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="createOrUpdateTextMap[createOrUpdateStatus]" :visible.sync="createOrUpdateFormVisible" class="manageUserCreateOrUpdateDivDialog" width="500px">
      <el-form ref="createOrUpdateForm" :rules="createOrUpdateRules" :model="createOrUpdateModel" label-position="right" label-width="80px" style="width: 400px; margin-left:30px;">
        <el-form-item v-if="parentShow" label="上级资源">
          <!--<el-input v-model="createOrUpdateModel.resourcepath"/>-->
          <el-cascader
            :options="options"
            placeholder="上级资源"
            filterable/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.resName')" prop="resourcename">
          <el-input v-model="createOrUpdateModel.resourcename"/>
        </el-form-item>
        <el-form-item v-if="resShow" label="资源类型" prop="resourcetype">
          <el-select v-model="createOrUpdateModel.resourcetype" placeholder="请选择">
            <el-option
              v-for="item in resourceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="medium"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('authorManage.resCode')" prop="resourcecode">
          <el-input v-model="createOrUpdateModel.resourcecode"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.icon')" prop="resourceicon">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="show" :label="$t('authorManage.url')" prop="resourcepath">
          <el-input v-model="createOrUpdateModel.resourcepath"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.sortNo')" prop="sortno">
          <el-input v-model="createOrUpdateModel.sortno"/>
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
import { advancedQuery } from '@/utils'
import { getResourceList, saveResource, updateResource, deleteResource } from '@/api/authorManage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'ManageResource',
  directives: { waves },
  components: { Pagination },
  data: function() {
    return {
      imageUrl: '',
      nodeType: 0,
      show: false,
      parentShow: false,
      resShow: false,
      options: [],
      resourceTypeOptions: [{
        value: '3',
        label: '菜单'
      }, {
        value: '4',
        label: '按钮'
      }],
      dept: {
        total: 0,
        page: 1,
        limit: 0,
        listLoading: true,
        currentData: null,
        dataList: [],
        advancedQueryForm: {
          defaultCs: [{ f: 'resourcetype', o: 'EQ', v: 1 }],
          cs: [],
          ss: [{ f: 'sortno', o: 'asc' }]
        }
      },
      app: {
        total: 0,
        page: 1,
        limit: 10,
        listLoading: true,
        currentData: null,
        dataList: [],
        advancedQueryForm: {
          defaultCs: [{ f: 'resourcetype', o: 'EQ', v: 2 }],
          cs: [],
          ss: [{ f: 'sortno', o: 'asc' }]
        }
      },
      res: {
        total: 0,
        page: 1,
        limit: 10,
        listLoading: true,
        currentData: null,
        dataList: [],
        advancedQueryForm: {
          defaultCs: [{ f: 'resourcetype', o: 'EQ', v: '3,4' }],
          cs: [],
          ss: [{ f: 'sortno', o: 'asc' }]
        }
      },
      createOrUpdateFormVisible: false,
      createOrUpdateRules: {
        resourcename: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        resourcecode: [{ required: true, message: '请输入资源编码', trigger: 'blur' }],
        sortno: [{ required: true, message: '请输入顺序号', trigger: 'blur' }]
      },
      createOrUpdateStatus: '',
      createOrUpdateTextMap: {
        update: '编辑',
        create: '新增',
        createChild: '新增子资源'
      },
      createOrUpdateModel: {
        id: null,
        'parentresourceid': null,
        'parentresourcename': '',
        'resourcename': '',
        'resourceicon': '',
        'resourcecode': '',
        'resourcetype': '',
        'resourcepath': '',
        'validtag': 1,
        'sortno': 1
      }
    }
  },
  computed: {
  },
  created() {
    this.getDeptList()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    resetModel() {
      this.createOrUpdateModel = {
        id: null,
        'parentresourceid': null,
        'parentresourcename': '',
        'resourcename': '',
        'resourceicon': '',
        'resourcecode': '',
        'resourcetype': '',
        'resourcepath': '',
        'validtag': 1,
        'sortno': 1
      }
    },
    selectDept(row) {
      this.dept.currentData = row
      this.getAppList()
    },
    selectApp(row) {
      this.app.currentData = row
      this.$refs.appTable.setCurrentRow(row)
      this.getResList()
    },
    selectRes(row) {
      this.res.currentData = row
      this.$refs.resTable.setCurrentRow(row)
    },
    handleDeptRefresh() { // 应用分组
      this.getDeptList()
      this.$message('刷新成功')
    },
    isShow(nodeType) {
      this.show = nodeType !== 1
      this.nodeType = nodeType
      this.resShow = nodeType === 3
      this.parentShow = false
    },
    getDeptList() { // 获取应用分组数据
      this.dept.advancedQueryForm.cs = []
      this.dept.advancedQueryForm.cs = this.dept.advancedQueryForm.defaultCs
      this.listLoading = true
      const param = advancedQuery(this.dept.advancedQueryForm)
      getResourceList(param, this.page, this.limit).then(response => {
        this.dept.dataList = response.data.data.rows
        this.dept.total = response.data.data.total
        this.dept.listLoading = false
        if (this.dept.dataList && this.dept.dataList.length > 0) {
          this.selectDept(this.dept.dataList[0])
        }
      })
    },
    getAppList: function() { // 获取应用数据
      this.app.advancedQueryForm.cs = []
      this.app.advancedQueryForm.cs = this.app.advancedQueryForm.defaultCs
      if (this.dept.currentData) {
        this.app.advancedQueryForm.cs.push({ f: 'parentresourceid', o: 'EQ', v: this.dept.currentData.id })
      }
      this.listLoading = true
      const param = advancedQuery(this.app.advancedQueryForm)
      getResourceList(param, this.page, this.limit).then(response => {
        this.app.dataList = response.data.data.rows
        this.app.total = response.data.data.total
        this.app.listLoading = false
        if (this.app.dataList && this.app.dataList.length > 0) {
          this.selectApp(this.app.dataList[0])
        }
      })
    },
    getResList() { // 获取菜单、按钮数据
      this.res.advancedQueryForm.cs = []
      this.res.advancedQueryForm.cs = this.res.advancedQueryForm.defaultCs
      if (this.app.currentData) {
        this.res.advancedQueryForm.cs.push({ f: 'parentresourceid', o: 'EQ', v: this.app.currentData.id })
      }
      this.listLoading = true
      const param = advancedQuery(this.res.advancedQueryForm)
      getResourceList(param, this.page, this.limit).then(response => {
        this.res.dataList = response.data.data.rows
        this.res.total = response.data.data.total
        this.res.listLoading = false
      })
    },
    handleDeptCreate(nodeType) { // 应用分组
      this.resetModel()
      this.isShow(nodeType)
      this.createOrUpdateModel.resourcetype = 1
      this.createOrUpdateModel.parentresourceid = null
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleDeptUpdate(nodeType) { // 应用分组
      // TODO 调用查询某个角色的API
      this.isShow(nodeType)
      this.createOrUpdateModel = this.dept.currentData
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleDeptDelete(nodeType) { // 应用分组
      if (!this.dept.currentData) {
        this.$message('请先选择一个应用分组')
        return
      }
      this.isShow(nodeType)
      this.$confirm('此操作将删除该应用分组，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        deleteResource(this.dept.currentData.resourcetype, this.dept.currentData.id).then((resp) => {
          if (resp.data.code === 0) {
            this.dept.dataList.splice(this.dept.dataList.indexOf(this.dept.currentData, 1))
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: resp.data.msg, type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAppCreate(nodeType) { // 应用
      this.resetModel()
      this.isShow(nodeType)
      this.createOrUpdateModel.resourcetype = 2
      this.createOrUpdateModel.parentresourceid = this.dept.currentData.id
      this.createOrUpdateModel.parentresourcename = this.dept.currentData.resourcename
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleAppCreateChild(nodeType) { // 应用
      this.resetModel()
      this.isShow(nodeType)
      this.parentShow = true
      this.createOrUpdateModel.resourcetype = 2
      this.createOrUpdateModel.parentresourceid = this.app.currentData.id
      this.createOrUpdateModel.parentresourcename = this.app.currentData.resourcename
      this.createOrUpdateStatus = 'createChild'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleAppUpdate(nodeType) { // 应用
      // TODO 调用查询API
      this.isShow(nodeType)
      this.createOrUpdateModel = this.app.currentData
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleAppDelete(nodeType) { // 应用
      if (!this.app.currentData) {
        this.$message('请先选择一个应用')
        return
      }
      this.isShow(nodeType)
      this.$confirm('此操作将删除该应用，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        deleteResource(this.app.currentData.resourcetype, this.app.currentData.id).then((resp) => {
          if (resp.data.code === 0) {
            this.app.dataList.splice(this.app.dataList.indexOf(this.app.currentData, 1))
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: resp.data.msg, type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleResCreate(nodeType) { // 应用
      this.resetModel()
      this.isShow(nodeType)
      this.createOrUpdateModel.resourcetype = 3
      this.createOrUpdateModel.parentresourceid = this.app.currentData.id
      this.createOrUpdateModel.parentresourcename = this.app.currentData.resourcename
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleResCreateChild(nodeType) { // 应用
      if (!this.res.currentData) {
        this.$message('请先选择父资源')
      }
      this.resetModel()
      this.isShow(nodeType)
      this.parentShow = true
      this.createOrUpdateModel.resourcetype = 3
      this.createOrUpdateModel.parentresourceid = this.res.currentData.id
      this.createOrUpdateModel.parentresourcename = this.res.currentData.resourcename
      this.createOrUpdateStatus = 'createChild'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleResUpdate(nodeType) { // 应用
      // TODO 调用查询API
      this.isShow(nodeType)
      this.createOrUpdateModel = this.res.currentData
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => { this.$refs['createOrUpdateForm'].clearValidate() })
    },
    handleResDelete(nodeType) { // 应用
      if (!this.res.currentData) {
        this.$message('请先选择一个应用')
        return
      }
      this.isShow(nodeType)
      this.$confirm('此操作将删除该应用，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        deleteResource(this.res.currentData.resourcetype, this.res.currentData.id).then((resp) => {
          if (resp.data.code === 0) {
            this.res.dataList.splice(this.res.dataList.indexOf(this.res.currentData, 1))
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: resp.data.msg, type: 'error' })
          }
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
          if (this.nodeType === 1) {
            this.createOrUpdateModel.resourcetype = 1
          } else if (this.nodeType === 2) {
            this.createOrUpdateModel.resourcetype = 2
          }
          if (!this.parentShow) {
            this.createOrUpdateModel.parentresourceid = null
          }
          // TODO 调用新增API
          saveResource(this.createOrUpdateModel.resourcetype, this.createOrUpdateModel).then((resp) => {
            if (resp.data.code === 0) {
              if (this.nodeType === 1) {
                this.dept.dataList.unshift(this.createOrUpdateModel)
              } else if (this.nodeType === 2) {
                this.app.dataList.unshift(this.createOrUpdateModel)
              } else if (this.nodeType === 3) {
                this.res.dataList.unshift(this.createOrUpdateModel)
              }
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
          updateResource(this.createOrUpdateModel).then((resp) => {
            if (resp.data.code === 0) {
              if (this.nodeType === 1) {
                for (const v of this.dept.dataList) {
                  if (v.id === this.createOrUpdateModel.id) {
                    const index = this.dept.dataList.indexOf(v)
                    this.dept.dataList.splice(index, 1, this.createOrUpdateModel)
                    break
                  }
                }
              } else if (this.nodeType === 2) {
                for (const v of this.app.dataList) {
                  if (v.id === this.createOrUpdateModel.id) {
                    const index = this.app.dataList.indexOf(v)
                    this.app.dataList.splice(index, 1, this.createOrUpdateModel)
                    break
                  }
                }
              } else if (this.nodeType === 3) {
                for (const v of this.res.dataList) {
                  if (v.id === this.createOrUpdateModel.id) {
                    const index = this.res.dataList.indexOf(v)
                    this.res.dataList.splice(index, 1, this.createOrUpdateModel)
                    break
                  }
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
    padding: 10px;
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
  .depts{
    text-align: center;
    /*width: 50%;*/
    /*float: left;*/
  }
  .depts div{
    /*margin: 10px;*/
    padding: 10px
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
  .pagination-container{padding: 5px 10px;}
  .el-cascader, .el-select{width: 100%;}
</style>
