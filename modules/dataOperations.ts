import { CardInfo } from "~/types/custom"
import { deleteData } from "./deleteData"
import { commitEditedCardInfo } from "./editData"

/** viewModels */

const { deleteCard } = deleteData()
export const deleteCardInfomation = async (info: CardInfo, store, emit) => {
  // TODO: Dialogを表示して削除の警告を出す
  await deleteCard(store.getters["auth/getUserUid"], info.key)
  const storeData = await store.getters["data/getData"]
  for (const [key, item] of Object.entries(storeData)) {
    if (key == info.key) {
      delete storeData[key]
    }
  }
  store.dispatch("data/setAllData", storeData)
  emit("afterPostData")
}

export const editCardInfomation = async (info: CardInfo, store) => {
  await commitEditedCardInfo(info, store, info.key)
  const storeData = await store.getters["data/getData"]
  for (const [key, item] of Object.entries(storeData)) {
    if (key == info.key) {
      console.debug(storeData[key])
    }
  }
  store.dispatch("data/setAllData", storeData)
}
