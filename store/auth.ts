import { reactive } from "@nuxtjs/composition-api"
export const state = () =>
  reactive({
    userUid: "",
    userName: "Guest"
  })

// TODO: 型修正
export const mutations = {
  setUserUid(state: any, userUid: any) {
    state.userUid = userUid
  },
  setUserName(state: any, userName: any) {
    state.userName = userName
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
  }
}
