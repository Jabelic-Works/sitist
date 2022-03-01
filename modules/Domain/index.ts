import {
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  useContext,
  useFetch,
  useStore,
  watch
} from "@nuxtjs/composition-api"
import { use as useFetchData } from "@/modules/fetchData"
import { CardInfo } from "~/types/custom"
import { deepcopy } from "../utils"

export const use = () => {
  const refUserName = ref("Guest")
  const refUserUid = ref("")
  const documentLocalData = ref<{ data: CardInfo }>() // FIXME: type
  const sitesInfo = ref([])
  const { store } = useContext()
  const { fetchAllData } = useFetchData()
  useFetch(() => {
    refUserUid.value = store.getters["auth/getUserUid"]
    if (refUserUid.value) {
      documentLocalData.value = store.getters["data/getAllData"] // データがある場合
      console.debug("useFetch", documentLocalData.value)
      // データがない場合
      if (Object.keys(documentLocalData.value).length === 0) {
        console.debug("data is empty")
        documentLocalData.value = fetchAllData(refUserUid.value)
        store.dispatch("data/setAllData", documentLocalData.value)
      }
    }
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
      documentLocalData.value = deepcopy(store.getters["data/getAllData"])
    }
  )
  nextTick(async () => {
    documentLocalData.value = await deepcopy(store.getters["data/getAllData"])
    console.debug("nextTick", documentLocalData.value)
  })
  onActivated(() => {
    refUserName.value = store.getters["auth/getUserName"]
    refUserUid.value = store.getters["auth/getUserUid"]
    documentLocalData.value = store.getters["data/getAllData"]
    console.debug("activate", documentLocalData.value)
    afterPostData()
  })
  // 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
  // stateの更新の完了を検知したいんだけど...
  /** postした後にstoreの後の値を */
  const afterPostData = () => {
    setTimeout(() => checkGetters(), 500)
  }
  const afterEditData = () => {
    setTimeout(() => checkGetters(), 500)
  }
  const checkGetters = async () => {
    documentLocalData.value = await deepcopy(store.getters["data/getAllData"])
    let tmpArray = []
    for (const [key, value] of Object.entries(documentLocalData.value)) {
      tmpArray.push({ key, data: value.data })
    }
    sitesInfo.value = tmpArray
  }
  const isShowingUpdateDataDialog = ref(false)
  const showDialog = () => {
    isShowingUpdateDataDialog.value = true
  }
  const closeDialog = () => {
    isShowingUpdateDataDialog.value = false
  }
  const fData = async () => {
    await store.dispatch("data/setAllData", fetchAllData(refUserUid.value))
    setTimeout(() => checkGetters(), 500)
  }
  const width = window.innerWidth
  const height = window.innerHeight
  const windowSize = reactive({ width, height })
  const isShowAddInfodialog = ref(false)
  const showAddInfodialog = () => {
    isShowAddInfodialog.value = true
    console.debug(isShowAddInfodialog.value)
  }
  const unshowAddInfodialog = () => {
    isShowAddInfodialog.value = false
    console.debug("sdfsdf")
  }
  return {
    refUserName,
    refUserUid,
    documentLocalData,
    afterPostData,
    checkGetters,
    fData,
    isShowingUpdateDataDialog,
    showDialog,
    closeDialog,
    sitesInfo,
    afterEditData,
    windowSize,
    isShowAddInfodialog,
    showAddInfodialog,
    unshowAddInfodialog
  }
}
