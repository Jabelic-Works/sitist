import { nextTick, onActivated, ref, useContext, useFetch, useStore, watch } from "@nuxtjs/composition-api"
import { use as useFetchData } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { deepCopy, shuffleArray } from "../../utils"
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
  const { addData, fetchAllData } = useFetchData()
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
  const { updateDataAndShuffle, updateData } = useUpdate({ allCardInformationList, sitesInfo })
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

  /** init */
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
  // ユーザーが変わった場合
  watch(
    () => store.getters["auth/getUserUid"],
    async val => {
      if (refUserUid.value !== val) {
        console.debug("===== User changed =====")
        refUserName.value = store.getters["auth/getUserName"]
        refUserUid.value = store.getters["auth/getUserUid"]
        allCardInformationList.value = await fetchAllData(refUserUid.value)
        store.dispatch("data/setAllData", allCardInformationList.value)
      }
    },
    { immediate: true }
  )
  // データが更新された場合
  watch(
    () => store.getters["data/getAllData"],
    () => {
      allCardInformationList.value = deepCopy(store.getters["data/getAllData"])
    },
    { immediate: true }
  )
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
