/*
 * @Author: zhoulin
 * @Date: 2020-04-22 15:39:53
 * @LastEditors: your name
 * @LastEditTime: 2020-04-23 08:57:03
 * @Description: file content
 */
export const state = () => ({ position: {} })
export const mutations = {
  setPosition (state, val) {
    state.position = val
  }
}
export const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}
