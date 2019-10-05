import { timeRefreshIntervalSeconds } from '../../utils/constants'

const state = {
  nowTime: new Date().getTime()
}

const getters = {
  getNowTime (state) {
    return state.nowTime
  }
}

const mutations = {
  setNowTime (state) {
    state.nowTime = new Date().getTime()
  }
}

const actions = {
  setNowTime ({ commit }) {
    setInterval(() => {
      commit('setNowTime')
    }, 1000 * timeRefreshIntervalSeconds)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
