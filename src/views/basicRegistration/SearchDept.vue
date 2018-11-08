<template>
  <div style="display: inline;">
    <org-tree style="position: fixed; top:70px;" @getOrgId="handleFilterByOrgId" />
    <div class="app-container searchDeptDiv">
      <div class="filter-container">
        <status-radio-check ref="searchDeptStatus" style="margin-left: 18px;" @getStatus="changeStatus"/>
        <span style="margin-left: 50px;">查询：</span>
        <el-input :placeholder="$t('basicRegistration.searchDeptPlaceholder')" v-model="condition" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button v-waves class="filter-item" style="margin-left: 6px;" type="primary" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <div style="float: right; margin-right: 20px;">
          <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleRefresh">{{ $t('table.refresh') }}</el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDownload">{{ $t('table.export') }}</el-button>
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
        style="width: 100%;">
        <el-table-column :label="$t('basicRegistration.belongorgname')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span style="color: #32A8EE;">{{ scope.row.orgname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.deptname')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.deptname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.deptcode')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.deptcode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.standarddeptname')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.standarddeptname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.parentdeptname')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.parentdeptname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.contactnumber')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contactnumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.status')" class-name="status-col" min-width="60px">
          <template slot-scope="scope">
            <span :class="scope.row.validtag == '1'? classEnable : classDisable ">{{ scope.row.validtag == '1'? '启用' : '停用' }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :pager-count="11" :page.sync="page" :limit.sync="limit" @pagination="getList" />

      <el-dialog :title="advancedQueryTitle" :visible.sync="advancedQueryFormVisible" class="searchDeptAdvancedQueryDivDialog" width="800px">
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
    </div>
  </div>
</template>
<script>
import OrgTree from './components/OrgTree'
import StatusRadioCheck from './components/StatusRadioCheck'

import { findDeptByPage } from '@/api/basicRegistration'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SearchDept',
  components: { OrgTree, Pagination, StatusRadioCheck },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      page: 1,
      limit: 10,
      listLoading: true,
      orgId: undefined,
      status: 'all',
      condition: undefined,
      fieldOptions: [{
        value: 'deptcode',
        label: '科室代码'
      }, {
        value: 'standarddeptname',
        label: '标准科室'
      }, {
        value: 'parentdeptname',
        label: '上级科室名称'
      }, {
        value: 'contactnumber',
        label: '联系电话'
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
      downloadLoading: false
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
    changeStatus: function(status) {
      this.status = status
    },
    getList() {
      this.cs = []
      if (this.orgId) {
        this.cs.push({ f: 'orgId', o: 'EQ', v: this.orgId })
      }
      if (this.status) {
        this.cs.push({ f: 'validtag', o: 'EQ', v: this.status })
      }
      if (this.condition) {
        this.cs.push({ f: 'deptname', o: 'LIKE', v: this.condition })
      }
      if (this.advancedQueryForm.cs && this.advancedQueryForm.cs[0].f) {
        this.cs = this.cs.concat(this.advancedQueryForm.cs)
      }
      this.listLoading = true
      findDeptByPage(this.page, this.limit, this.cs).then(response => {
        this.list = response.data.data.rows
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.page = 1
      this.getList()
    },
    handleRefresh() {
      this.page = 1
      this.limit = 10
      this.orgId = undefined
      this.status = 'all'
      this.$refs.searchDeptStatus.reset()
      this.condition = undefined
      this.advancedQueryForm = {
        cs: [{
          f: undefined,
          o: 'EQ',
          v: undefined
        }]
      }
      this.getList()
    },
    handleFilterByOrgId: function(orgId) {
      this.page = 1
      this.orgId = orgId
      this.getList()
    },
    handleAdvancedQuery() {
      this.page = 1
      this.getList()
      this.advancedQueryFormVisible = false
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
<style>
  .searchDeptDiv{
    height: 91%;
    margin-left: 220px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: white;
    border-radius: 6px;
  }
  .dialog-footer{
    text-align: center;
  }
  .classEnable{
    color: #01E19F;
  }
  .classDisable{
    color: red;
  }
  .searchDeptAdvancedQueryDivDialog span.el-dialog__title {
    font-size: 20px;
    color: #000033;
  }
</style>
