import { onActivated, ref, Ref, useStore } from "@nuxtjs/composition-api"
import { deepCopy } from "~/modules/utils/custom"
import { CardInfo } from "~/types/custom"

export const useCardList = (input: { allCardInformationList: Ref<{ data: CardInfo }>; sitesInfo: Ref<any[]> }) => {
  /** storeからデータを取ってきて, 表示するデータをセットする */
  const store = useStore()
  const newData = ref<{ data: CardInfo }>()
  const getAllDataFromStoreThenArranged = async (force?: boolean) => {
    newData.value = await deepCopy(store.getters["data/getAllData"])
    const tmpArray = Object.entries(input.allCardInformationList.value).map(([key, value]) => {
      return { key: key, data: value.data }
    })
    const newDataArray = Object.entries(newData.value).map(([key, value]) => {
      return { key: key, data: value.data }
    })
    if (force || newDataArray.some(it => !tmpArray.some(el => el.key === it.key))) {
      input.sitesInfo.value = [...newDataArray]
      input.allCardInformationList.value = deepCopy(newData.value)
    }
  }
  return { getAllDataFromStoreThenArranged }
}
