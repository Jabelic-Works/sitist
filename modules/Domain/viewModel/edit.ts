import { Context } from "@nuxt/types/app"
import { useStore } from "@nuxtjs/composition-api"
import { CardInfo } from "~/types/custom"
import { commitEditedCardInfo } from "../../firestoreClient/editData"

export const editCardInfomation = async (info: CardInfo, store: Context["store"]) => {
  await commitEditedCardInfo(info, store, info.key)
  store.dispatch("data/setData", { data: info.data, id: info.key })
}
