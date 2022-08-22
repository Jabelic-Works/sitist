import { nextTick, onActivated, ref, useFetch, useStore } from "@nuxtjs/composition-api"
import { fetchDataFS } from "~/repos/fetchData"
import { CardInfo } from "~/types/custom"
import { deepCopy } from "../../../utils/utils"
import { useCardList } from "./cardList"
import { useDelete } from "./delete"
import { useUpdate } from "./update"
import { useHeader } from "./header"
import { dialogMessage } from "~/modules/utils/i18n"
import { useFetchData } from "./fetch"

export const use = () => {
  const allCardInformationList = ref<{ data: CardInfo }>() // FIXME: type
  const sitesInfo = ref<CardInfo[]>([])
  const store = useStore()
  const userInfo = ref({ name: store.getters["auth/getUserName"], uid: store.getters["auth/getUserUid"] })
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
  const { updateDataAndShuffle, updateData } = useUpdate({ allCardInformationList, sitesInfo, userInfo })
  /** Header */
  const { addDataFromHeader } = useHeader({ userInfo, updateData })
  /** Delete */
  const { deleteData, confirmDeleteCardInformation } = useDelete({
    updateData,
    getAllDataFromStoreThenArranged,
    confirmMessage,
    isShowingUpdateDataDialog
  })
  /** Sign-in */
  const { fetchDataAfterSignIn } = useFetchData({ allCardInformationList, userInfo })

  useFetch(async () => {
    userInfo.value.uid = store.getters["auth/getUserUid"]
    userInfo.value.name = store.getters["auth/getUserName"]
    if (userInfo.value.uid) {
      allCardInformationList.value = await fetchAllData(userInfo.value.uid)
      store.dispatch("data/setAllData", allCardInformationList.value) // storeにデータを入れる
    }
  })
  onActivated(() => {
    userInfo.value.uid = store.getters["auth/getUserUid"]
    userInfo.value.name = store.getters["auth/getUserName"]
    allCardInformationList.value = store.getters["data/getAllData"]
    updateDataAndShuffle()
  })
  nextTick(async () => {
    allCardInformationList.value = await deepCopy(store.getters["data/getAllData"])
  })

  return {
    userInfo,
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
    addDataFromHeader,
    fetchDataAfterSignIn
  }
}
