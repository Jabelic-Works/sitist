import { ref, useStore } from "@nuxtjs/composition-api"
import { deleteDataFS } from "~/modules/firestoreClient/deleteData"
import { CardInfo } from "~/types/custom"

export const deleteCardInformation = async (info: CardInfo, store) => {
  const { deleteCard } = deleteDataFS() // api client

  await deleteCard(store.getters["auth/getUserUid"], info.key)
  const storeData = await store.getters["data/getAllData"]
  for (const [key, item] of Object.entries(storeData)) {
    if (key == info.key) {
      delete storeData[key]
    }
  }
  store.dispatch("data/setAllData", storeData)
}

export const useDelete = (input: {
  showConfirmDeleteDialog: Function
  updateData: Function
  checkGetters: Function
}) => {
  /** カードのゴミ箱アイコンで発火 */
  const confirmDeleteCardInformation = async (cardInfo: CardInfo) => {
    statusOfConfirmDialog.value = "deleteData"
    input.showConfirmDeleteDialog()
    deletedCardInfo.value = cardInfo
  }
  const store = useStore()
  type modeOfConfirmDialog = "forceFetch" | "deleteData"
  /** comfirmDialogで叩くmethodの中身の切り替えのためのStatusフラグ */
  const statusOfConfirmDialog = ref<modeOfConfirmDialog>("forceFetch")
  /** possible deleted data(when show confirm dialog) */
  const deletedCardInfo = ref<CardInfo>()
  const deleteCard = async (info: CardInfo) => {
    await deleteCardInformation(info, store)
    input.updateData()
  }
  /** confirmDialogでacceptした時に発火するmethod */
  const deleteData = async (cardInfo: CardInfo) => {
    // データの削除
    if (deletedCardInfo.value) {
      deleteCard(deletedCardInfo.value)
    }
    setTimeout(() => input.checkGetters(), 500)
  }
  return { deleteData, confirmDeleteCardInformation }
}
