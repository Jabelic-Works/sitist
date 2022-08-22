import { db } from "~/plugins/firebase"

/** APIs */
export const deleteDataFS = () => {
  const deleteCard = (uid: string, keyId: string) => {
    db.collection("userdata")
      .doc(uid)
      .collection("data")
      .doc(keyId)
      .delete()
      .then(() => {
        console.debug("firestore: deleteCard")
      })
      .catch(error => {
        console.error("Error removing document: ", error)
      })
  }
  return { deleteCard }
}
