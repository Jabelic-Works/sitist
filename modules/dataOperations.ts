import { CardInfo } from "~/types/custom"
import { deleteData } from "./deleteData"

/** viewModels */

const { deleteCard } = deleteData()
export const deleteCardInfomation = async (info: CardInfo, store, emit) => {
  // TODO: Dialogを表示して削除の警告を出す
  //   await deleteCard(store.getters["auth/getUserUid"], info.key)
  const storeData = await store.getters["data/getData"]
  console.debug(storeData)
  for (const [key, item] of Object.entries(storeData)) {
    console.debug(key, info.key)
    if (key == info.key) {
      console.debug(storeData[key])
      delete storeData[key]
    }
  }
  store.dispatch("data/setAllData", storeData)
  emit("afterPostData")
}
