import { db } from "~/plugins/firebase"

/** APIs */
export const fetchDataFS = () => {
  // firestoreからデータを取得、それをstoreへdispatch
  const fetchAllData = async (uid: string) => {
    let docs: any = {}
    await db
      .collection("userdata")
      .doc(uid)
      .collection("data")
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          docs[doc.id] = doc.data()
        })
      })
      .catch((error: string) => {
        console.log("Error getting cached document:", error)
      })

    return docs
  }
  const addData = async (data: any, uid: string) => {
    db.collection("userdata").doc(uid).collection("data").add(data)
    return fetchAllData(uid)
  }
  return { fetchAllData, addData }
}
