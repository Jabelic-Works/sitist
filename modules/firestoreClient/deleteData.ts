import { ref } from "@nuxtjs/composition-api"
import { db } from "~/plugins/firebase"

/** APIs */
export const deleteData = () => {
  const docRef = ref<firebase.default.firestore.DocumentData>()
  const deleteCard = (uid: string, keyId: string) => {
    db.collection("userdata")
      .doc(uid)
      .collection("data")
      .doc(keyId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!")
      })
      .catch(error => {
        console.error("Error removing document: ", error)
      })
  }
  return { deleteCard }
}
