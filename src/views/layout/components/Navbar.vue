<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <password-change/>
    <logout-confirm/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../../../static/welcome-images/admin-nav.png" style="width: 30px; height: 30px;vertical-align:middle;" class="user-avatar">
            <span style="margin-left: 14px;display:inline-block;">{{ name }}</span>
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!--<router-link to="/">-->
            <el-dropdown-item>
              <img src="../../../../static/welcome-images/password-change.png" style="width: 16px; height: 16px;vertical-align:middle; display: inline-block;" class="user-avatar">
              <span style="display: inline-block; margin-left: 7px;" @click="togglePasswordChangeDialog">{{ $t('navbar.changePassword') }}</span>
            </el-dropdown-item>
            <!--</router-link>-->
            <el-dropdown-item divided>
              <img src="../../../../static/welcome-images/logout-drop-down-list.png" style="width: 16px; height: 16px;vertical-align:middle; display: inline-block;" class="user-avatar">
              <span style="display: inline-block; margin-left: 7px;" @click="toggleLogoutConfirmDialog">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div style="float: right;" class="right-menu-item">
          <a @click="toggleLogoutConfirmDialog">
            <img src="../../../../static/welcome-images/close.png" style="width: 22px; height: 24px;">
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import PasswordChange from '@/components/PasswordChange'
import LogoutConfirm from '@/components/LogoutConfirm'

export default {
  components: {
    Hamburger,
    PasswordChange,
    LogoutConfirm
  },
  data() {
    return {
      passwordChangeDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    // logout() {
    //   this.$store.dispatch('LogOut').then(() => {
    //     location.reload()// In order to re-instantiate the vue-router object to avoid bugs
    //   })
    // },
    togglePasswordChangeDialog() {
      this.$store.dispatch('togglePasswordChangeDialog')
    },
    toggleLogoutConfirmDialog() {
      console.info('2222222222222')
      this.$store.dispatch('toggleLogoutConfirmDialog')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 60px;
    float: left;
    padding: 5px 10px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    /*width: 15%;*/
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 5px 8px;
      float: left;
    }
    .avatar-container {
      height: 60px;
      margin-right: 30px;
      .avatar-wrapper {
        vertical-align:middle;
        cursor: pointer;
        margin-top: -6px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
