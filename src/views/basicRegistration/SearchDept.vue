<template>
  <div style="display: inline;">
    <org-tree style="position: fixed; top:70px;" @getOrgCode="handleFilterByOrgCode" />
    <div class="app-container searchDeptDiv">
      <div class="filter-container">
        <status-radio-check style="margin-left: 18px;"/>
        <span style="margin-left: 50px;">查询：</span>
        <el-input :placeholder="$t('basicRegistration.searchPlaceholder')" v-model="listQuery.author" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button v-waves class="filter-item" style="margin-left: 6px;" type="primary" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <div style="float: right; margin-right: 20px;">
          <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleFilter">{{ $t('table.refresh') }}</el-button>
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
        <el-table-column :label="$t('basicRegistration.belongOrgName')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span style="color: #32A8EE;">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.belongOfficeName')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.name')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.jobNum')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.birthday')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.IDNO')" min-width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.political')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.educationBackground')" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.postCategory')" min-width="130px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.personType')" min-width="130px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('basicRegistration.status')" class-name="status-col" min-width="60px">
          <template slot-scope="scope">
            <span :class="scope.row.author == 'Joseph'? classEnable : classDisable ">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :pager-count="11" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

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

import { fetchList } from '@/api/article'
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
      listLoading: true,
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
