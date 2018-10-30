import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      systemLogoClass: 'systemLogo',
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    size: Cookies.get('size') || 'Small',
    passwordChangeDialogVisible: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
        state.sidebar.systemLogoClass = 'systemLogo-small'
      } else {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.systemLogoClass = 'systemLogo'
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    TOGGLE_PASSWORD_CHANGE_DIALOG: state => {
      if (state.passwordChangeDialogVisible) {
        state.passwordChangeDialogVisible = false
      } else {
        state.passwordChangeDialogVisible = true
      }
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    togglePasswordChangeDialog({ commit }) {
      commit('TOGGLE_PASSWORD_CHANGE_DIALOG')
    }
  }
}

export default app
