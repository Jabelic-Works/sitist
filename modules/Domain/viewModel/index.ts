import { nextTick, onActivated, ref, useFetch, useStore } from "@nuxtjs/composition-api"
import { fetchDataFS } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { deepCopy } from "../../utils"
import { useCardList } from "./cardList"
import { useDelete } from "./delete"
import { useUpdate } from "./update"
import { useHeader } from "./header"
import { dialogMessage } from "~/modules/Commons/i18n"

export const use = () => {
  const refUserName = ref("Guest")
  const refUserUid = ref("")
  const allCardInformationList = ref<{ data: CardInfo }>() // FIXME: type
  const sitesInfo = ref<CardInfo[]>([])
  const store = useStore()
  const isShowingUpdateDataDialog = ref(false)
  const closeDialog = () => {
    isShowingUpdateDataDialog.value = false
  }
  const isShowAddInfoDialog = ref(false)
  const unShowAddInfoDialog = () => {
    isShowAddInfoDialog.value = false
  }
  /** カード削除時の confirm message */
  const confirmMessage = ref(dialogMessage.confirmDelete)
  const { fetchAllData } = fetchDataFS()
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
  /** Updates */
  const { updateDataAndShuffle, updateData } = useUpdate({ allCardInformationList, sitesInfo, refUserUid, refUserName })
  /** Header */
  const { addDataFromHeader } = useHeader({ refUserUid, updateData })
  /** Delete */
  const { deleteData, confirmDeleteCardInformation } = useDelete({
    updateData,
    getAllDataFromStoreThenArranged,
    confirmMessage,
    isShowingUpdateDataDialog
  })

  /** ===== init ====== */

  useFetch(async () => {
    refUserUid.value = store.getters["auth/getUserUid"]
    if (refUserUid.value) {
      allCardInformationList.value = store.getters["data/getAllData"] // データがある場合
      console.debug("useFetch", allCardInformationList.value)
      // データがない場合
      if (Object.keys(allCardInformationList.value).length === 0) {
        console.debug("data is empty")
        allCardInformationList.value = await fetchAllData(refUserUid.value)
        store.dispatch("data/setAllData", allCardInformationList.value)
      }
    }
  })
  onActivated(() => {
    refUserName.value = store.getters["auth/getUserName"]
    refUserUid.value = store.getters["auth/getUserUid"]
    allCardInformationList.value = store.getters["data/getAllData"]
    console.debug("onActivate: ", allCardInformationList.value)
    updateDataAndShuffle()
  })
  nextTick(async () => {
    allCardInformationList.value = await deepCopy(store.getters["data/getAllData"])
    console.debug("nextTick: ", allCardInformationList.value)
  })

  return {
    refUserName,
    refUserUid,
    allCardInformationList,
    updateData,
    getAllDataFromStoreThenArranged,
    isShowingUpdateDataDialog,
    closeDialog,
    sitesInfo,
    isShowAddInfoDialog,
    unShowAddInfoDialog,
    confirmMessage,
    confirmDeleteCardInformation,
    deleteData,
    addDataFromHeader
  }
}
