import { nextTick, onActivated, ref, useContext, useFetch, useStore, watch } from "@nuxtjs/composition-api"
import { use as useFetchData } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { deepcopy } from "../../utils"
import { useCardList } from "./cardList"
import { useDelete } from "./delete"

export const use = () => {
  const refUserName = ref("Guest")
  const refUserUid = ref("")
  const allCardInformationList = ref<{ data: CardInfo }>() // FIXME: type
  const sitesInfo = ref([])
  const store = useStore()
  const { addData, fetchAllData } = useFetchData()
  const { checkGetters } = useCardList({ allCardInformationList, sitesInfo })

  // NOTE: 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
  /** postした後にstoreの後の値を変更してから画面に反映 */
  const afterPostData = () => {
    setTimeout(() => checkGetters(), 500)
  }
  const afterEditData = () => {
    setTimeout(() => checkGetters(), 500)
  }

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
    afterPostData,
    checkGetters
  })

  /** Headerの+ボタン経由で開かれるダイアログ */
  const addDataFromHeader = (urlString: string, titleString?: string) => {
    const data = {
      data: {
        URL: urlString,
        title: titleString,
        OGP: "",
        description: ""
      }
    }
    let allCardInformationList = {}
    if (refUserUid.value) {
      allCardInformationList = addData(data, refUserUid.value)
      console.debug("new data", allCardInformationList)
      store.dispatch("data/setAllData", allCardInformationList).finally(() => {
        afterPostData()
      })
    }
  }

  /** init */
  useFetch(() => {
    refUserUid.value = store.getters["auth/getUserUid"]
    if (refUserUid.value) {
      allCardInformationList.value = store.getters["data/getAllData"] // データがある場合
      console.debug("useFetch", allCardInformationList.value)
      // データがない場合
      if (Object.keys(allCardInformationList.value).length === 0) {
        console.debug("data is empty")
        allCardInformationList.value = fetchAllData(refUserUid.value)
        store.dispatch("data/setAllData", allCardInformationList.value)
      }
    }
  })
  onActivated(() => {
    refUserName.value = store.getters["auth/getUserName"]
    refUserUid.value = store.getters["auth/getUserUid"]
    allCardInformationList.value = store.getters["data/getAllData"]
    console.debug("activate", allCardInformationList.value)
    afterPostData()
  })
  nextTick(async () => {
    allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
    console.debug("nextTick", allCardInformationList.value)
  })
  // ユーザーが変わった場合
  watch(
    () => store.getters["auth/getUserUid"],
    () => {
      if (refUserUid.value !== store.getters["auth/getUserUid"]) {
        refUserName.value = store.getters["auth/getUserName"]
        refUserUid.value = store.getters["auth/getUserUid"]
      }
    }
  )
  // データが更新された場合
  watch(
    () => store.getters["data/getAllData"],
    () => {
      allCardInformationList.value = deepcopy(store.getters["data/getAllData"])
    }
  )
  return {
    refUserName,
    refUserUid,
    allCardInformationList,
    afterPostData,
    checkGetters,
    isShowingUpdateDataDialog,
    closeDialog,
    sitesInfo,
    afterEditData,
    isShowAddInfodialog,
    unshowAddInfodialog,
    confirmMessage,
    confirmDeleteCardInformation,
    deleteData,
    addDataFromHeader
  }
}
