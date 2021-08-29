import { reactive, ref } from '@nuxtjs/composition-api'
import { db } from '~/plugins/firebase'
const docRef = ref<firebase.default.firestore.DocumentData>()
const documentLocalData = ref<any>({})

export const state = () => ({
  data: reactive({}),
  timestamp: 0,
})

// TODO: 型修正
export const mutations = {
  setData(state: any, data: any, refUserUid: string) {
    const thisId = data.id
    state.data[thisId] = data
    /** ここでfirestoreにdataを登録 */
    db.collection('userdata').doc(refUserUid).collection('data').add(data)
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
          console.debug('Data:', querySnapshot.data)
          querySnapshot.forEach((doc: any) => {
            console.log(doc.id, ' => ', doc.data())
            documentLocalData.value[doc.id] = doc.data()
          })
          console.debug(documentLocalData.value)
        })
        .catch((error: string) => {
          console.log('Error getting cached document:', error)
        })
      state.data = documentLocalData.value
    }
  },
}

export const actions = {
  setData({ commit }: any, data: any, refUserUid: string) {
    commit('setData', data, refUserUid)
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
