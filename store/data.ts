import { reactive, ref } from '@nuxtjs/composition-api'
import { db } from '~/plugins/firebase'
const docRef = ref<firebase.default.firestore.DocumentData>()
const documents = ref<any>({})

export const state = () => ({
  data: {},
  timestamp: 0,
})

// TODO: 型修正
export const mutations = {
  setData(state: any, val: any) {
    const { data, uid } = val
    /** ここでfirestoreにdataを登録 */
    const addDb = db
      .collection('userdata')
      .doc(uid)
      .collection('data')
      .add(data)
  },
  setAllData(state: any, refUserUid: string) {
    if (refUserUid) {
      console.debug('全件取得')
      // 全件取得
      docRef.value = db
        .collection('userdata')
        .doc(refUserUid)
        .collection('data')
        .get()
        .then((querySnapshot: any) => {
          console.debug('Data:', querySnapshot)
          querySnapshot.forEach((doc: any) => {
            console.log(doc.id, ' => ', doc.data())
            documents.value[doc.id] = doc.data()
          })
          console.debug('setAllData', documents.value)
        })
        .catch((error: string) => {
          console.log('Error getting cached document:', error)
        })
      state.data = documents.value
    }
  },
}

export const actions = {
  setData({ commit }: any, val: any) {
    const { data, uid } = val
    console.debug(uid)
    commit('setData', { data, uid })
  },
  setAllData({ commit }: any, refUserUid: string) {
    commit('setAllData', refUserUid)
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
