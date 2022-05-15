import { onActivated, Ref, useStore, watch } from "@nuxtjs/composition-api"
import { deepCopy, shuffleArray } from "~/modules/utils"
import { fetchDataFS } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { useCardList } from "./cardList"

export const useUpdate = ({
  allCardInformationList,
  sitesInfo,
  userInfo
}: {
  allCardInformationList: Ref<{ data: CardInfo }>
  sitesInfo: Ref<CardInfo[]>
  userInfo: Ref<{ name: string; uid: string }>
}) => {
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
  const { fetchAllData } = fetchDataFS()
  const store = useStore()
  // NOTE: 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
  /** postした後にstoreの後の値を変更してから画面に反映 */
  const updateData = () => {
    setTimeout(() => getAllDataFromStoreThenArranged(true), 500)
  }

  const updateDataAndShuffle = () => {
    setTimeout(async () => {
      await getAllDataFromStoreThenArranged(true)
      sitesInfo.value = await shuffleArray<CardInfo[]>(sitesInfo.value)
      console.debug(sitesInfo.value)
    }, 0)
  }
  // ユーザーが変わった場合
  watch(
    () => store.getters["auth/getUserUid"],
    async val => {
      if (userInfo.value.uid != val) {
        console.debug("===== User changed =====")
        userInfo.value.uid = store.getters["auth/getUserUid"]
        userInfo.value.name = store.getters["auth/getUserName"]
        allCardInformationList.value = await fetchAllData(userInfo.value.uid)
        await store.dispatch("data/setAllData", allCardInformationList.value)
        updateData()
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
    { immediate: true, deep: true }
  )

  return { updateData, updateDataAndShuffle }
}
