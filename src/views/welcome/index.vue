<template>
  <div class="container">
    <div class="el-row up" style="height: 60%;min-height: 60%;">
      <div class="admin-option">
        <div>
          <img src="../../assets/welcome-images/admin.png" >
          <a @click="userInfo">系统管理员</a>
        </div>
        <div>
          <img src="../../assets/welcome-images/pwd.png" >
          <a @click="modifyPwd">修改密码</a>
        </div>
        <div>
          <img src="../../assets/welcome-images/logout.png" >
          <a @click="logout">注销登录</a>
        </div>
      </div>
      <div class="nav-tabs">
        <div class="tab tab0 active">
          <div class="title">基础平台</div>
          <div class="subtitle">基础管理 区域服务</div>
        </div>
        <div class="tab tab1">
          <div class="title">数据中心</div>
          <div class="subtitle">数据分析 统计管理</div>
        </div>
        <div class="tab tab2">
          <div class="title">业务应用</div>
          <div class="subtitle">业务管理 应用中心</div>
        </div>
        <div class="tab tab3">
          <div class="title">综合监督</div>
          <div class="subtitle">综合服务 监督管理</div>
        </div>
      </div>
    </div>
    <div class="el-row down" style="height: 40%;min-height: 40%;">
      &nbsp;
    </div>
  </div>
</template>
<script>

export default {
  name: 'Welcome',
  data() {
    return {
      activeName: 'tab1',
      createdTimes: 0
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    // this.refreshCode()
  },
  methods: {
    userInfo() {
      alert('userInfo')
    },
    modifyPwd() {
      alert('modify')
    },
    logout() {
      alert('logout')
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
      background-image: url("../../assets/welcome-images/up-bg.png");
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
        .tab0{
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
    }
  }
</style>
