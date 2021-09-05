import { reactive, ref } from '@nuxtjs/composition-api'
import { db } from '~/plugins/firebase'
const docRef = ref<firebase.default.firestore.DocumentData>()

export const state = () => ({
  data: {},
  timestamp: 0,
})

// TODO: 型修正
export const mutations = {
  // こりゃおかしいな=>いらない？moduleでやるので。
  setData(state: any, val: any) {
    const { data, uid } = val
  },
  setAllData(state: any, Data: any) {
    state.data = Data
  },
  setTimestamp(state: any) {},
}

export const actions = {
  setData({ commit }: any, val: any) {
    const { data, uid } = val
    console.debug(uid)
    commit('setData', { data, uid })
  },
  setAllData({ commit }: any, data: any) {
    commit('setAllData', data)
  },
  setTimestamp({ commit }: any) {
    commit('setTimestamp', 0)
  },
}

export const getters = {
  getData(state: any) {
    return state.data
  },
  getTimestamp(state: any) {
    return state.timestamp
  },
}
