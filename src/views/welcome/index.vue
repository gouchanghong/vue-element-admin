<template>
  <div class="container">
    <password-change/>
    <logout-confirm/>
    <div class="el-row up">
      <div class="admin-option">
        <div>
          <img src="/images/admin.png" >
          <a>系统管理员</a>
        </div>
        <div>
          <img src="/images/pwd.png" >
          <a @click="togglePasswordChangeDialog">{{ $t('navbar.changePassword') }}</a>
        </div>
        <div>
          <img src="/images/logout.png" >
          <a @click="toggleLogoutConfirmDialog">{{ $t('navbar.logOut') }}</a>
        </div>
      </div>
      <div class="nav-tabs">
        <a v-for="(p,index) in tabLists" :key="index" :class="index === currentIndex ? 'active' : ''" class="tab" @click="changeActive(index)">
          <div class="title">{{ p.nodename }}</div>
          <div class="subtitle">{{ p.subtitle }}</div>
        </a>
      </div>
    </div>
    <div class="el-row down" >
      <div v-for="(parent,pIndex) in tabLists" :key="pIndex" :class="pIndex === currentIndex ? 'show' : 'hide'" class="parent">
        <a v-for="(child,childIndex) in parent.children" :key="childIndex" class="child" @click="redirect(child.nodeattr.path,pIndex,childIndex)">
          <div class="img">
            <img :src="child.nodeicon" >&nbsp;
          </div>
          <div class="tb-title">{{ child.nodename }}&nbsp;</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import PasswordChange from '@/components/PasswordChange'
import LogoutConfirm from '@/components/LogoutConfirm'

export default {
  name: 'Welcome',
  components: {
    PasswordChange,
    LogoutConfirm
  },
  data() {
    return {
      currentIndex: 0,
      currentPIndex: 0,
      passwordChangeDialogVisible: false,
      tabLists: []
    }
  },
  computed: {
    //
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.tabLists = this.$store.getters.resources
    this.changeActive(0)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
  },
  methods: {
    changeActive(index, cIndex) {
      this.currentIndex = index
      let selectNode = this.tabLists[index]
      if (cIndex !== undefined) {
        selectNode = selectNode.children[cIndex]
      }

      const children = selectNode.children
      const roles = []
      this.getRoles(roles, children)
      this.$store.dispatch('setSystemName', selectNode.nodename)
      this.$store.dispatch('SetChildResources', selectNode)

      this.$store.dispatch('ChangeRoles', roles).then(() => { // 根据roles权限生成可访问的路由表
        const routerData = this.$store.getters.addRouters
        this.$router.addRoutes(routerData) // 动态添加可访问路由表
      })
    },
    getRoles: function(roles, children) {
      children.forEach((item) => {
        const path = item.nodeattr.path
        roles.push(path)
        // if (item.children && item.children.length > 0) {
        //   this.getRoles(roles, item.children)
        // }
      })
    },
    redirect: function(url, pIndex, cIndex) {
      this.changeActive(pIndex, cIndex)
      this.$router.push({ path: url })
    },
    togglePasswordChangeDialog() {
      this.$store.dispatch('togglePasswordChangeDialog')
    },
    toggleLogoutConfirmDialog() {
      this.$store.dispatch('toggleLogoutConfirmDialog')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  body{font-family: "Microsoft YaHei"}

  .container{
    height: 100%;
    .up{
      height: 60%;
      min-height: 60%;
      background-image: url("/images/up-bg.png");
      background-size:100% 100%;
      .admin-option{
        text-align: right;
        color: #ffffff;
        font-size: 14px;
        position: absolute;
        top: 20px;
        right: 30px;
        div{
          float: left;
          line-height: 50px;
          margin-right: 20px;
          display:flex;
          align-items: center;//子元素垂直居中
          justify-content: center;//子元素水平居中
          img{
            margin: 10px;
          }
        }
      }
      .nav-tabs{
        position: absolute;
        bottom: 1px;
        left: 50%;
        width: 1200px;
        color: #ffffff;
        margin-left: -600px;
        .tab{
          float: left;
          width: 300px;
          text-align: center;
          background: transparent;
          height: 120px;
          border-right: 1px solid #979bcd;
          .title{
            margin-top: 15px;
            font-size: 25px;
            line-height: 60px;
          }
          .subtitle{
            font-size: 18px;
          }
        }
        .tab:first-child{
          border-left: 1px solid #979bcd;
        }
        .tab.active{
          background: #ffffff;
          color: #706bf9;
        }
      }
    }
    .down{
      height: 40%;
      min-height: 40%;
      .show{
        display: block;
      }
      .hide{
        display: none;
      }
      .parent{
        margin-left: 105px;
        .child{
          width: 150px;
          margin-left: 120px;
          margin-top: 100px;
          float: left;
          text-align: center;
        }
      }
    }
  }
</style>
