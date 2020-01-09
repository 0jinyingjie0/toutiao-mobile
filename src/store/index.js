import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const USER_KEY = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前用户登录状态
    // user: null
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem(USER_KEY)

  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 本地存储实现持久化
      // window.localStorage.setItem('uesr', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
