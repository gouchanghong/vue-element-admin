<template>
  <div class="app-container manageUserDiv">
    <div class="filter-container">
      <status-radio-check style="margin-left: 18px;"/>
      <span style="margin-left: 50px;">查询：</span>
      <el-input :placeholder="$t('basicRegistration.searchPlaceholder')" v-model="listQuery.author" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" style="margin-left: 6px;" type="primary" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <div style="float: right; margin-right: 20px;">
        <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleFilter">{{ $t('table.refresh') }}</el-button>
        <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleCreate">{{ $t('table.add') }}</el-button>
        <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleUpdate">{{ $t('table.edit') }}</el-button>
        <el-button class="filter-item" style="background-color: #32A8EE; border-color: #32A8EE;" type="primary" @click="logoutUser">{{ $t('table.logout') }}</el-button>
        <el-button class="filter-item" style="background-color: #FF8484; border-color: #FF8484;" type="primary" @click="resetPassword">{{ $t('authorManage.resetPassword') }}</el-button>
        <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleFilter">{{ $t('authorManage.allotOrg') }}</el-button>
        <el-button class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" >{{ $t('authorManage.allotRole') }}</el-button>
        <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleAdvanced">{{ $t('table.advancedQuery') }}</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      height="calc(100vh - 227px)"
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      @current-change="handleCurrentChange">
      <el-table-column :label="$t('authorManage.account')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span style="color: #32A8EE;">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.name')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.IDNum')" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.sex')" min-width="50px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.email')" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.mobilePhone')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.loginCount')" min-width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.lastLoginTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.nearLoginTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('authorManage.status')" class-name="status-col" min-width="60px">
        <template slot-scope="scope">
          <span :class="scope.row.author.length > 5 ? classEnable : classDisable ">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :pager-count="11" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="advancedQueryTitle" :visible.sync="advancedQueryFormVisible" class="manageUserAdvancedQueryDivDialog" width="800px">
      <el-form ref="advancedQueryForm" :model="advancedQueryForm" label-position="right" label-width="70px" style="width: 700px; margin-left:30px;">
        <el-form-item v-for="(obj, index) in advancedQueryForm.cs" :label="'条件' + (index + 1) + '：'" :key="index">
          <el-col :span="7">
            <el-select v-model="obj.f" class="filter-item" placeholder="请选择">
              <el-option v-for="item in fieldOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :span="7" style="margin-left: 5px;">
            <el-select v-model="obj.o" class="filter-item" placeholder="请选择">
              <el-option v-for="item in searchOperator" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :span="7" style="margin-left: 5px;">
            <el-input v-model="obj.v" :placeholder="operatorTips(obj.o)"/>
          </el-col>
          <el-col :span="2" style="margin-left: 5px;">
            <el-button @click.prevent="removeAdvanced(obj)">{{ $t('table.delete') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" style="margin-left: -15px;" @click="handleAdvancedQuery">{{ $t('table.search') }}</el-button>
        <el-button style="margin-left: 35px;" @click="addAdvanced">{{ $t('table.addAdvancedCondition') }}</el-button>
        <el-button style="margin-left: 35px;" @click="advancedQueryFormVisible = false">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="createOrUpdateTextMap[createOrUpdateStatus]" :visible.sync="createOrUpdateFormVisible" class="manageUserCreateOrUpdateDivDialog" width="500px">
      <el-form ref="createOrUpdateForm" :rules="createOrUpdateRules" :model="createOrUpdateModel" label-position="right" label-width="70px" style="width: 400px; margin-left:30px;">
        <el-form-item :label="$t('authorManage.account')" prop="loginname">
          <el-input v-model="createOrUpdateModel.loginname"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.name')" prop="name">
          <el-input v-model="createOrUpdateModel.name"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.IDNum')" prop="idnumber">
          <el-input v-model="createOrUpdateModel.idnumber"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.sex')">
          <el-select v-model="createOrUpdateModel.sex" class="filter-item">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('authorManage.email')" prop="email">
          <el-input v-model="createOrUpdateModel.email"/>
        </el-form-item>
        <el-form-item :label="$t('authorManage.mobilePhone')" prop="phonenumber">
          <el-input v-model="createOrUpdateModel.phonenumber"/>
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
import StatusRadioCheck from './components/StatusRadioCheck'

import { fetchList, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ManageUser',
  components: { Pagination, StatusRadioCheck },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      currentRow: null,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        author: undefined,
        type: undefined,
        sort: '+id'
      },
      fieldOptions: [{
        value: 'loginname',
        label: '登录名'
      }, {
        value: 'name',
        label: '姓名'
      }, {
        value: 'idnumber',
        label: '身份证号'
      }, {
        value: 'sex',
        label: '性别'
      }, {
        value: 'email',
        label: '电子邮箱'
      }, {
        value: 'phonenumber',
        label: '手机号码'
      }],
      advancedQueryForm: {
        cs: [{
          f: undefined,
          o: 'EQ',
          v: undefined
        }]
      },
      classEnable: 'classEnable',
      classDisable: 'classDisable',
      advancedQueryFormVisible: false,
      advancedQueryTitle: '高级查询',

      sexOptions: [{
        value: 'm',
        label: '男'
      }, {
        value: 'f',
        label: '女'
      }],
      createOrUpdateStatus: '',
      createOrUpdateTextMap: {
        update: '编辑',
        create: '新增'
      },
      createOrUpdateFormVisible: false,
      createOrUpdateRules: {
        loginname: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      createOrUpdateModel: {
        id: 1,
        loginname: '',
        name: '',
        idnumber: '',
        sex: 'm',
        email: '',
        phonenumber: '',
        status: 1
      }
    }
  },
  computed: {
    searchOperator() {
      return this.$store.getters.searchOperator
    },
    operatorTips() {
      return function(operator) {
        if (operator === 'IN') {
          return '请使用逗号区分多个值'
        }
        return ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resize() {
      console.log('resize')
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleFilterByOrgCode: function(orgCode) {
      this.listQuery.page = 1
      this.listQuery.author = orgCode
      this.getList()
    },
    handleAdvancedQuery() {
      this.listQuery.page = 1
      this.getList()
      this.advancedQueryFormVisible = false
    },
    resetModel() {
      this.createOrUpdateModel = {
        loginname: '',
        name: '',
        idnumber: '',
        sex: 'm',
        email: '',
        phonenumber: ''
      }
    },
    handleCreate() {
      this.resetModel()
      this.createOrUpdateStatus = 'create'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => {
        this.$refs['createOrUpdateForm'].clearValidate()
      })
    },
    handleUpdate() {
      // TODO 调用查询某个用户的API
      this.createOrUpdateStatus = 'update'
      this.createOrUpdateFormVisible = true
      this.$nextTick(() => {
        this.$refs['createOrUpdateForm'].clearValidate()
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
    handleCurrentChange(val) {
      this.currentRow = val
    },
    logoutUser() {
      if (!this.currentRow) {
        this.$message('请先选择一个用户')
        return
      }
      this.$confirm('此操作将注销该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用注销API
        this.$message({
          type: 'success',
          message: '注销成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    },
    resetPassword() {
      if (!this.currentRow) {
        this.$message('请先选择一个用户')
        return
      }
      this.$confirm('此操作将重置该用户密码，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 调用重置密码API
        this.$message({
          type: 'success',
          message: '重置成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    handleAdvanced() {
      this.advancedQueryFormVisible = true
    },
    removeAdvanced(item) {
      var index = this.advancedQueryForm.cs.indexOf(item)
      if (index !== -1) {
        this.advancedQueryForm.cs.splice(index, 1)
      }
    },
    addAdvanced() {
      this.advancedQueryForm.cs.push({
        f: undefined,
        o: 'EQ',
        v: undefined
      })
    }
  }
}
</script>
<style >
  .manageUserDiv{
    height: 91%;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: white;
    border-radius: 6px;
  }
  .dialog-footer{
    text-align: center;
  }
  .manageUserAdvancedQueryDivDialog span.el-dialog__title {
    font-size: 20px;
    color: #000033;
  }
  .classEnable{
    color: #01E19F;
  }
  .classDisable{
    color: red;
  }
  .manageUserAdvancedQueryDivDialog span.el-dialog__title {
    font-size: 20px;
    color: #000033;
  }
</style>
