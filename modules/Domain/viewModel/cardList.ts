import { Ref, useStore } from "@nuxtjs/composition-api"
import { deepcopy, shuffleArray } from "~/modules/utils"
import { CardInfo } from "~/types/custom"

export const useCardList = (input: { allCardInformationList: Ref<{ data: CardInfo }>; sitesInfo: Ref<any[]> }) => {
  /** storeからデータを取ってきて, 表示するデータをセットする */
  const store = useStore()
  const checkGetters = async () => {
    input.allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
    let tmpArray = []
    for (const [key, value] of Object.entries(input.allCardInformationList.value)) {
      tmpArray.push({ key, data: value.data })
    }
    input.sitesInfo.value = tmpArray
  }
  return { checkGetters }
}
