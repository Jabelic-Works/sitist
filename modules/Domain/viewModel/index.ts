import { nextTick, onActivated, ref, useFetch, useStore } from "@nuxtjs/composition-api"
import { fetchDataFB } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { deepCopy } from "../../utils"
import { useCardList } from "./cardList"
import { useDelete } from "./delete"
import { useUpdate } from "./update"
import { useHeader } from "./header"

export const use = () => {
  const refUserName = ref("Guest")
  const refUserUid = ref("")
  const allCardInformationList = ref<{ data: CardInfo }>() // FIXME: type
  const sitesInfo = ref<CardInfo[]>([])
  const store = useStore()
  const { fetchAllData } = fetchDataFB()
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
  const { updateDataAndShuffle, updateData } = useUpdate({ allCardInformationList, sitesInfo, refUserUid, refUserName })
  const { addDataFromHeader } = useHeader({ refUserUid, updateData })

  const isShowingUpdateDataDialog = ref(false)
  const showConfirmDeleteDialog = () => {
    confirmMessage.value = "カードを消去しますか？"
    isShowingUpdateDataDialog.value = true
  }
  const closeDialog = () => {
    isShowingUpdateDataDialog.value = false
  }
  const isShowAddInfodialog = ref(false)
  const unshowAddInfodialog = () => {
    isShowAddInfodialog.value = false
  }

  const confirmMessage = ref("カードを消去しますか？")

  const { deleteData, confirmDeleteCardInformation } = useDelete({
    showConfirmDeleteDialog,
    updateData,
    getAllDataFromStoreThenArranged
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
    isShowAddInfodialog,
    unshowAddInfodialog,
    confirmMessage,
    confirmDeleteCardInformation,
    deleteData,
    addDataFromHeader
  }
}
