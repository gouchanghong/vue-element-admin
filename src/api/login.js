import request from '@/utils/request'

// 获取验证码
export function verificationCode() {
  return request({
    url: '/auth/verificationcode',
    method: 'post'
  })
}

// 登录校验
export function loginByUsername(data) {
  const dd = data
  dd.password = this.$md5(data.password)
  return request({
    url: '/auth/login',
    method: 'post',
    dd
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

