import { reactive } from "@nuxtjs/composition-api"
export const state = () =>
  reactive<{ userUid: string; userName: string; userPhotoUrl: string }>({
    userUid: "",
    userName: "Guest",
    userPhotoUrl: ""
  })

// TODO: 型修正
export const mutations = {
  setUserUid(state: any, userUid: any) {
    state.userUid = userUid
  },
  setUserName(state: any, userName: any) {
    state.userName = userName
  },
  setUserPhoto(state: any, value: any) {
    state.userPhotoUrl = value
  },
  // 使ってない。
  login(state: any, payload: any) {
    state.token = payload
  },
  logoutM(state: any) {
    state.token = null
  }
}

export const actions = {
  login({ commit }: any, user: any) {
    commit("setUserName", user.displayName ? user.displayName : "Guest")
    commit("setUserUid", user.uid)
    commit("setUserPhoto", user.photoURL)
  },
  logout({ commit }: any) {
    commit("setUserName", null)
    commit("setUserUid", null)
  }
}

export const getters = {
  getUserUid(state: any) {
    return state.userUid
  },
  getUserName(state: any) {
    return state.userName
  },
  getUserPhotoUrl(state: any) {
    return state.userPhotoUrl
  }
}
