import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import store from '../index'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    resources: [], // 所有权限资源信息
    childResources: {}, // 子分组所有权限资源信息
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_RESOURCES: (state, resources) => {
      state.resources = resources
    },
    SET_CHILD_RESOURCES: (state, childResources) => {
      state.childResources = childResources
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit, state }, userInfo) {
      // const resources = []
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const data = response.data
          if (data.code === 0) {
            const resources = data.data.resources
            commit('SET_TOKEN', data.data.access_token)
            commit('SET_RESOURCES', resources)
            commit('SET_CHILD_RESOURCES', resources[0])
            commit('SET_NAME', data.data.user.name)
            setToken(data.data.access_token)

            resolve()
          } else {
            reject(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      if (window.localStorage.getItem('userResources')) {
        commit('SET_RESOURCES', JSON.parse(window.localStorage.getItem('userResources')))
      }
      if (window.localStorage.getItem('userChildResources')) {
        commit('SET_CHILD_RESOURCES', JSON.parse(window.localStorage.getItem('userChildResources')))
      }
      window.localStorage.clear()
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        //   if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //     reject('error')
        //   }
        const childResources = state.childResources

        const roles = []
        childResources.children.forEach((item, index) => {
          roles.push(item.nodeattr.path)
        })
        if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }

        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.avatar)
        // commit('SET_INTRODUCTION', data.introduction)
        resolve(roles)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, roles) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', roles)
        // setToken(roles)
        // getUserInfo(role).then(response => {
        // const roles = store.getters.roles // response.data
        commit('SET_ROLES', roles)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.avatar)
        // commit('SET_INTRODUCTION', data.introduction)
        dispatch('GenerateRoutes', { roles }) // 动态修改权限后 重绘侧边菜单
        resolve()
        // })
      })
    },
    // 设置权限
    SetRole({ commit }, roles) {
      commit('SET_ROLES', roles)
    },
    // 设置权限
    SetResources({ commit }, resouces) {
      commit('SET_RESOURCES', resouces)
    },
    // 设置子分组资源
    SetChildResources({ commit }, childResources) {
      commit('SET_CHILD_RESOURCES', childResources)
    }
  }
}
export default user
