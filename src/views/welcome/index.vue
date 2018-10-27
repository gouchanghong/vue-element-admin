<template>
  <div class="container">
    <div class="el-row up">
      <div class="admin-option">
        <div>
          <img src="../../../static/welcome-images/admin.png" >
          <a @click="userInfo">系统管理员</a>
        </div>
        <div>
          <img src="../../../static/welcome-images/pwd.png" >
          <a @click="modifyPwd">修改密码</a>
        </div>
        <div>
          <img src="../../../static/welcome-images/logout.png" >
          <a @click="logout">{{ $t('navbar.logOut') }}</a>
        </div>
      </div>
      <div class="nav-tabs">
        <a v-for="(p,index) in tabLists" :key="index" :class="p.selected ? 'active' : ''" class="tab" @click="changeActive(index)">
          <div class="title">{{ p.title }}</div>
          <div class="subtitle">{{ p.subtitle }}</div>
        </a>
      </div>
    </div>
    <div class="el-row down" >
      <div v-for="(parent,pIndex) in tabLists" :key="pIndex" :class="parent.selected ? 'show' : 'hide'" class="parent">
        <a v-for="(child,childIndex) in parent.children" :key="childIndex" class="child" @click="redirect(child.url)">
          <div class="img">
            <img :src="child.img" >&nbsp;
          </div>
          <div class="tb-title">{{ child.name }}&nbsp;</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Welcome',
  data() {
    return {
      tabLists: [
        { title: '基础平台', subtitle: '基础管理 区域服务', selected: true, children:
            [
              { 'name': '基础注册', 'img': '../../../static/welcome-images/zc.png', url: 'dashboard' },
              { 'name': '权限管理', 'img': '../../../static/welcome-images/qx.png', url: 'permission/page' }
            ]
        },
        { title: '数据中心', subtitle: '数据分析 统计管理', selected: false, children:
            [
              // { 'name': '基础注册', 'img': 'zc.png' },
              // { 'name': '权限管理', 'img': 'qx.png' }
            ]
        },
        { title: '业务应用', subtitle: '业务管理 应用中心', selected: false, children:
            [
              // { 'name': '基础注册', 'img': 'zc.png' },
              // { 'name': '权限管理', 'img': 'qx.png' }
            ]
        },
        { title: '综合监督', subtitle: '综合服务 监督管理', selected: false, children:
            [
              // { 'name': '基础注册', 'img': 'zc.png' },
              // { 'name': '权限管理', 'img': 'qx.png' }
            ]
        }
      ]
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    this.changeActive(0)
  },
  methods: {
    userInfo() {
      this.$store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        this.$store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
          // this.$next() // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      })
    },
    modifyPwd() {
      alert('modify')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    changeActive(index) {
      for (var i = 0; i < this.tabLists.length; i++) {
        this.tabLists[i].selected = false
      }
      this.tabLists[index].selected = true
    },
    redirect(url) {
      this.$router.push({ path: url })
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
      background-image: url("../../../static/welcome-images/up-bg.png");
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
