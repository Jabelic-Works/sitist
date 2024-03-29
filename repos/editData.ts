// import { ref } from "@nuxtjs/composition-api"
import { db } from "~/plugins/firebase"
import { Context } from "@nuxt/types"
import { CardInfo } from "~/types/custom"
/** APIs */
export const editDataFS = async (info: CardInfo, store: Context["store"], keyid: string) => {
  const uid = store.getters["auth/getUserUid"]
  const userRef = db
    .collection("userdata")
    .doc(uid)
    .collection("data")
    .doc(keyid)
    .update({ data: info.data })
    .then(() => {
      console.log("firestore: Document successfully updated!")
    })
    .catch(error => {
      console.error("Error removing document: ", error)
    })
}
