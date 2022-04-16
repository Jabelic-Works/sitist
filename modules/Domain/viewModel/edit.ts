import { Context } from "@nuxt/types/app"
import { useStore } from "@nuxtjs/composition-api"
import { CardInfo } from "~/types/custom"
import { editDataFB } from "../../firestoreClient/editData"

export const editCardInformation = async (info: CardInfo, store: Context["store"]) => {
  await editDataFB(info, store, info.key)
  store.dispatch("data/setData", { data: info.data, id: info.key })
}
