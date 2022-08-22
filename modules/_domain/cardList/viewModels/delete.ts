import { Ref, ref, useStore } from "@nuxtjs/composition-api"
import { dialogMessage } from "~/modules/utils/i18n"
import { deleteDataFS } from "~/repos/deleteData"
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

export const useDelete = ({
  updateData,
  getAllDataFromStoreThenArranged,
  confirmMessage,
  isShowingUpdateDataDialog
}: {
  updateData: Function
  getAllDataFromStoreThenArranged: Function
  confirmMessage: Ref<string>
  isShowingUpdateDataDialog: Ref<boolean>
}) => {
  const showConfirmDeleteDialog = () => {
    confirmMessage.value = dialogMessage.confirmDelete
    isShowingUpdateDataDialog.value = true
  }
  /** カードのゴミ箱アイコンで発火 */
  const confirmDeleteCardInformation = async (cardInfo: CardInfo) => {
    statusOfConfirmDialog.value = "deleteData"
    showConfirmDeleteDialog()
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
    updateData()
  }
  /** confirmDialogでacceptした時に発火するmethod */
  const deleteData = async (cardInfo: CardInfo) => {
    // データの削除
    if (deletedCardInfo.value) {
      deleteCard(deletedCardInfo.value)
    }
    setTimeout(() => getAllDataFromStoreThenArranged(true), 500)
  }
  return { deleteData, confirmDeleteCardInformation }
}
