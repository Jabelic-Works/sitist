import { ref } from "@nuxtjs/composition-api"
import { db } from "~/plugins/firebase"

/** APIs */
export const use = () => {
  const docRef = ref<firebase.default.firestore.DocumentData>()
  // firestoreからデータを取得、それをstoreへdispatch
  const fetchAllData = (uid: string): any => {
    let docs: any = {}
    docRef.value = db
      .collection("userdata")
      .doc(uid)
      .collection("data")
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          //   console.log(doc.id, ' => ', doc.data())3
          docs[doc.id] = doc.data()
        })
        // console.debug(store.getters['data/setAllData'])
      })
      .catch((error: string) => {
        console.log("Error getting cached document:", error)
      })
    console.debug(docs)
    return docs
  }
  const addData = (data: any, uid: string) => {
    let addDb = {}
    db.collection("userdata")
      .doc(uid)
      .collection("data")
      .add(data)
      .then(() => {})
    addDb = fetchAllData(uid)
    return addDb
  }
  return { fetchAllData, addData }
}
