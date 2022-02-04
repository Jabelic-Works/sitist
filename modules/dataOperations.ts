import { Context } from "@nuxt/types"
import { CardInfo, SiteInformation } from "~/types/custom"
import { deleteData } from "./deleteData"
import { commitEditedCardInfo } from "./editData"

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

const isSiteInformation = (test: any): test is SiteInformation => {
  return (
    test.data &&
    typeof test.data.title == "string" &&
    typeof test.data.URL == "string" &&
    (typeof test.data.OGP == "string" || typeof test.data.OGP == undefined) &&
    (typeof test.data.description == "string" || typeof test.data.description == undefined)
  )
}

export const editCardInfomation = async (info: CardInfo, store: Context["store"]) => {
  await commitEditedCardInfo(info, store, info.key)
  store.dispatch("data/setData", { data: info.data, id: info.key })
}
