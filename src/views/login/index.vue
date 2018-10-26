<template>
  <div class="login-container">

    <div class="title-container">
      <div class="title">{{ $t('login.sysname') }}</div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="login-form-div">
        <div class="login-form-container">
          <div class="login-title">{{ $t('login.title') }}</div>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <img src="../../assets/login-images/account.png" >
          </span>
          <el-input
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            auto-complete="on"
            unselectable=""
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <img src="../../assets/login-images/pwd.png" >
          </span>
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item prop="verifycode">
          <span class="svg-container">
            <img src="../../assets/login-images/check.png" >
          </span>
          <el-input
            v-model="loginForm.verifycode"
            :placeholder="$t('login.verifyCode')"
            name="verifyCode"
            type="text"
            auto-complete="on"/>
          <a @click="refreshCode" ><img :src="verifyUrl" class="verify-img" ></a>
          <a type="text" class="change-verify-code" @click="refreshCode">换一张</a>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" class="btn-submit" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="clearfix"/>
    <div class="copyright">copyright@2018-2024 By linksoft 版权所有</div>
  </div>
</template>
<script>
var verifyCodeUrl = 'http://nj.gynjzx.cn/cas-webapp/auth_image.jsp'
var currVeriftCodeUrl = verifyCodeUrl

import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位以上密码'))
      } else {
        callback()
      }
    }
    // 验证码自定义验证规则
    const validateVerifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== '1234') {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111',
        verifycode: '1234',
        verifyUrl: currVeriftCodeUrl
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifycode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    this.refreshCode()
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    // this.refreshCode()
  },
  methods: {
    refreshCode() {
      var dt = new Date().getTime()
      // 切换验证码
      currVeriftCodeUrl = verifyCodeUrl + '?r=' + dt
      this.verifyUrl = currVeriftCodeUrl
      this.loading = !this.loading
      this.loading = !this.loading
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss">
  .login-container .el-input input::first-line{
    color: #999999 !important;
  }
  .btn-submit{
    width:100%;margin-top:30px;border-radius:24px;background: #5753f5;
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#999;
  $cursor: #999;

  *{
    font-family: "Microsoft YaHei" !important;
  }
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        /*padding: 12px 5px 12px 15px;*/
        color: #999999;
        height: 47px;
        font-size: 16px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 0px solid rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0);
      border-radius: 2px;
      color: #454545;
      border-bottom: 1px solid #dfdfdf;
    }
    .copyright{
      text-align: center;
      position: absolute;
      bottom: 50px;
      left: 50%;
      margin-left: -150px;
      color: #ffffff;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#fff;
$block_gray:#000;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../assets/login-images/bg.png") no-repeat;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    right: 0;
    width: 500px;
    height: 540px;
    max-width: 100%;
    margin: -270px auto auto auto;
    background: url("../../assets/login-images/login.png") no-repeat;
    .login-form-div{
      padding: 70px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      position: absolute;
      left: 73px;
      top: 55px;
      font-size: 40px;
      color: $light_gray;
      text-align: center;
      font-family: "Microsoft YaHei";
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }

  .login-form-container {
    position: relative;
    .login-title {
      left: 73px;
      top: 55px;
      font-size: 23px;
      color: $block_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-family: "Microsoft YaHei";
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .verify-img{
    position: absolute;
    right: 60px;
    bottom: 0;
  }
  .change-verify-code{
    position: absolute;float: right;bottom: 0;width: 45px;right: 0;color: #6bce00;
  }
}
</style>
