import { Ref, useStore, watch } from "@nuxtjs/composition-api"
import { deepCopy, shuffleArray } from "~/modules/utils"
import { fetchDataFS } from "@/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
import { useCardList } from "./cardList"

export const useUpdate = ({
  allCardInformationList,
  sitesInfo,
  refUserUid,
  refUserName
}: {
  allCardInformationList: Ref<{ data: CardInfo }>
  sitesInfo: Ref<CardInfo[]>
  refUserUid: Ref<string>
  refUserName: Ref<string>
}) => {
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
  const { fetchAllData } = fetchDataFS()
  const store = useStore()
  // NOTE: 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
  /** postした後にstoreの後の値を変更してから画面に反映 */
  const updateData = () => {
    setTimeout(() => getAllDataFromStoreThenArranged(), 500)
  }

  const updateDataAndShuffle = () => {
    setTimeout(async () => {
      await getAllDataFromStoreThenArranged()
      sitesInfo.value = await shuffleArray<CardInfo[]>(sitesInfo.value)
      console.debug(sitesInfo.value)
    }, 0)
  }

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

  return { updateData, updateDataAndShuffle }
}
