import { Context } from "@nuxt/types"
import { CardInfo } from "~/types/custom"
import { deleteData } from "../../firestoreClient/deleteData"
import { commitEditedCardInfo } from "../../firestoreClient/editData"

/** viewModels */

const { deleteCard } = deleteData()
export const deleteCardInformation = async (info: CardInfo, store) => {
  // TODO: Dialogを表示して削除の警告を出す
  await deleteCard(store.getters["auth/getUserUid"], info.key)
  const storeData = await store.getters["data/getAllData"]
  for (const [key, item] of Object.entries(storeData)) {
    if (key == info.key) {
      delete storeData[key]
    }
  }
  store.dispatch("data/setAllData", storeData)
}

export const editCardInfomation = async (info: CardInfo, store: Context["store"]) => {
  await commitEditedCardInfo(info, store, info.key)
  store.dispatch("data/setData", { data: info.data, id: info.key })
}
