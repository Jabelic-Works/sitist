import firebase from '~/plugins/firebase'
import { reactive } from '@nuxtjs/composition-api'
export const state = () => reactive({
  userUid: '',
  userName: '',
})

// TODO: 型修正
export const mutations = {
  setUserUid(state: any, userUid: any) {
    state.userUid = userUid
  },
  setUserName(state: any, userName: any) {
    state.userName = userName
  },
  login(state: any, payload: any) {
    state.token = payload
  },
  logoutM(state: any) {
    state.token = null
  },
}

export const actions = {
  login({ commit }: any) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        console.log('success : ' + user)
        console.log('success : ' + user?.uid + ' : ' + user?.displayName)
        commit('setUserUid', user?.uid)
        commit('setUserName', user?.displayName)
      })
      .catch(function (error) {
        var errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
}

export const getters = {
  getUserUid(state: any) {
    return state.userUid
  },
  getUserName(state: any) {
    return state.userName
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
