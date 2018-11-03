<template>
  <div>
    <el-dialog :title="passwordChangeDialogTitle" :visible.sync="passwordChangeDialogVisible" :before-close="handleClose" class="passwordChangeDialogDiv">
      <el-form ref="passwordChangeForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 500px; margin-left:30px;">
        <el-form-item :label="$t('navbar.oldPassword')" prop="oldPassword">
          <el-input v-model="temp.oldPassword" auto-complete="off" placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item :label="$t('navbar.newPassword')" prop="newPassword">
          <el-input v-model="temp.newPassword" auto-complete="off" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item :label="$t('navbar.confirmPassword')" prop="confirmPassword">
          <el-input v-model="temp.confirmPassword" auto-complete="off" placeholder="请再次输入新密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" style="margin-left: -15px;" @click="changePassword">{{ $t('navbar.confirm') }}</el-button>
        <el-button style="margin-left: 35px;" @click="handleClose">{{ $t('navbar.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'PasswordChange',
  directives: { waves },
  data() {
    var validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      passwordChangeDialogTitle: '修改密码',
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
      }
    }
  },
  computed: {
    name() {
      return this.$store.getters.name
    },
    passwordChangeDialogVisible() {
      return this.$store.getters.passwordChangeDialogVisible
    }
  },
  watch: {
    passwordChangeDialogVisible: function() {
      if (!this.passwordChangeDialogVisible) {
        this.$refs['passwordChangeForm'].resetFields()
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('togglePasswordChangeDialog')
    },
    changePassword() {
      this.$refs['passwordChangeForm'].validate((valid) => {
        if (valid) {
          fetchList(this.listQuery).then(response => {
            this.$store.dispatch('togglePasswordChangeDialog')
            this.$notify({
              title: '成功',
              message: '密码修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
<style>
  .dialog-footer{
    text-align: center;
  }
  .passwordChangeDialogDiv div{
    width: 500px;
    line-height: 20px;
  }
  .passwordChangeDialogDiv input.el-input__inner {
    width: 250px;
  }
  .passwordChangeDialogDiv span.el-dialog__title {
    font-size: 20px;
    color: #000033;
  }
  .passwordChangeDialogDiv label.el-form-item__label{
    font-size: 16px;
    color: #666666;
  }
</style>
