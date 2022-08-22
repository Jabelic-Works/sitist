import { Context } from "@nuxt/types/app"
import { useStore } from "@nuxtjs/composition-api"
import { CardInfo } from "~/types/custom"
import { editDataFS } from "../../../../repos/editData"

export const editCardInformation = async (info: CardInfo, store: Context["store"]) => {
  await editDataFS(info, store, info.key)
  store.dispatch("data/setData", { data: info.data, id: info.key })
}
