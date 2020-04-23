/*
 * @Author: zhoulin
 * @Date: 2020-04-22 16:02:51
 * @LastEditors: your name
 * @LastEditTime: 2020-04-23 08:58:09
 * @Description: file content
 */
export const state = () => ({
  menu: [],
  hotPlace: []
})
export const mutations = {
  setMenu (state, val) {
    state.menu = val
  },
  setHotPlace (state, val) {
    state.hotPlace = val
  }
}
export const actions = {
  setPosition: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

// export default { namespaced: true, state, mutations, actions }
