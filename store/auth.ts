import firebase from '~/plugins/firebase'

export const state = () => {
    token: ''
};

// TODO: 型修正
export const mutations = {
    login (state: any, payload: any) {
        state.token = payload;
    },
    logoutM (state: any) {
        state.token = null;
    }
};
 
export const actions = {
    login({ commit }: any) {
        const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        console.log('success : ' + user)
      }).catch(function(error) {
        var errorCode = error.code;
        console.log('error : ' + errorCode)
      });
    commit('login')
    }
}

export const getters = {
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
};