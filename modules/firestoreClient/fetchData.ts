import { db } from "~/plugins/firebase"

/** APIs */
export const use = () => {
  // firestoreからデータを取得、それをstoreへdispatch
  const fetchAllData = (uid: string): any => {
    let docs: any = {}
    db.collection("userdata")
      .doc(uid)
      .collection("data")
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          docs[doc.id] = doc.data()
        })
        console.debug("firestore: fetch All Data")
      })
      .catch((error: string) => {
        console.log("Error getting cached document:", error)
      })
    console.debug("fetchAllData: ", docs)
    return docs
  }
  const addData = (data: any, uid: string) => {
    let addDb = {}
    db.collection("userdata")
      .doc(uid)
      .collection("data")
      .add(data)
      .then(() => {
        console.debug("firestore: add Data")
      })
    addDb = fetchAllData(uid)
    return addDb
  }
  return { fetchAllData, addData }
}
