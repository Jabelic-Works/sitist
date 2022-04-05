import createPersistedState from "vuex-persistedstate"

export const plugins = [createPersistedState({ key: "sitist", paths: ["auth", "data"] })]
