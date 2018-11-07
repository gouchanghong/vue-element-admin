import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
