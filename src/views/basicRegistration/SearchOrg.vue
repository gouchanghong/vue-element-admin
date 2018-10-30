<template>
  <div style="display: inline;">
    <org-tree style="position: fixed; top:70px;" @getOrgCode="handleFilterByOrgCode" />
    <div class="app-container searchDiv">
      <div class="filter-container">
        <status-radio-check style="margin-left: 18px;"/>
        <span style="margin-left: 50px;">查询：</span>
        <el-input :placeholder="$t('basicRegistration.searchPlaceholder')" v-model="listQuery.author" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button v-waves class="filter-item" style="margin-left: 6px;" type="primary" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <div style="float: right; margin-right: 20px;">
          <el-button class="filter-item" style="background-color: #7D83FE; border-color: #7D83FE;" type="primary" @click="handleFilter">{{ $t('table.refresh') }}</el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" style="background-color: #FFA45A; border-color: #FFA45A;" type="primary" @click="handleDownload">{{ $t('table.export') }}</el-button>
          <el-button class="filter-item" style="background-color: #01E19F; border-color: #01E19F;" type="primary" @click="handleCreate">{{ $t('table.advancedQuery') }}</el-button>
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
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :pager-count="11" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="searchDivDialog">
        <el-form ref="dataForm" :model="condition" label-position="left" label-width="80px" style="width: 500px; margin-left:67px;">
          <el-form-item :label="$t('basicRegistration.condition1')" prop="condition1">
            <el-input v-model="condition.condition1"/>
          </el-form-item>
          <el-form-item :label="$t('basicRegistration.condition2')" prop="condition2">
            <el-input v-model="condition.condition2"/>
          </el-form-item>
          <el-form-item :label="$t('basicRegistration.condition3')" prop="condition3">
            <el-input v-model="condition.condition3"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" style="margin-left: -15px;" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.search') }}</el-button>
          <el-button style="margin-left: 35px;" @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import OrgTree from './components/OrgTree'
import StatusRadioCheck from './components/StatusRadioCheck'

import { fetchList, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SearchOrg',
  components: { OrgTree, Pagination, StatusRadioCheck },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
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
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      condition: {
        condition1: undefined,
        condition2: undefined,
        condition3: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitle: '高级查询',
      downloadLoading: false
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
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
    }
  }
}
</script>
<style>
  .searchDiv{
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
  .searchDivDialog div{
    width: 500px;
  }
  .searchDivDialog input.el-input__inner {
    width: 250px;
  }
  .searchDivDialog span.el-dialog__title {
    font-size: 20px;
    color: #000033;
  }
  .searchDivDialog label.el-form-item__label{
    font-size: 16px;
    color: #666666;
  }
  /*.searchDivDialog div.el-dialog__header{*/
    /*background-color: #EEEEEE;*/
  /*}*/
  /*.searchDivDialog div.el-dialog__header{*/
    /*background-color: #EEEEEE;*/
  /*}*/
</style>
