import {
  defineComponent,
  watch,
  ref,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'
import { db } from '~/plugins/firebase'

export const firestoreFetchData = (refUserUid: any, store: any) => {
  const docRef = ref<firebase.default.firestore.DocumentData>()
  const documentLocalData = ref<any>({})
  const fetchAllData = () => {
    // useFetch(async () => {
    docRef.value = db
      .collection('userdata')
      .doc(refUserUid.value)
      .collection('data')
    docRef.value
      .get()
      .then((querySnapshot: any) => {
        console.debug('Data:', querySnapshot.data)
        querySnapshot.forEach((doc: any) => {
          console.log(doc.id, ' => ', doc.data())
          documentLocalData.value[doc.id] = doc.data()
        })
        console.debug(documentLocalData.value)
        store.dispatch('data/setAllData', documentLocalData.value)
        console.debug(store.getters['data/setAllData'])
      })
      .catch((error: string) => {
        console.log('Error getting cached document:', error)
      })
    // })
    return documentLocalData.value
  }
  const fetchData = () => {
    // useFetch(async () => {
    docRef.value = db
      .collection('userdata')
      .doc(refUserUid.value)
      .collection('data')
    docRef.value.where('state', '==', 'CA').onSnapshot((querySnapshot: any) => {
      var cities: any[] = []
      querySnapshot.forEach((doc: any) => {
        cities.push(doc.data().name)
      })
      console.log('Current cities in CA: ', cities.join(', '))
    })
    // })
    return documentLocalData.value
  }
  return { fetchAllData, fetchData }
}
