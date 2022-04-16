import { Ref } from "@nuxtjs/composition-api"
import { shuffleArray } from "~/modules/utils"
import { CardInfo } from "~/types/custom"
import { useCardList } from "./cardList"

export const useUpdate = ({
  allCardInformationList,
  sitesInfo
}: {
  allCardInformationList: Ref<{ data: CardInfo }>
  sitesInfo: Ref<CardInfo[]>
}) => {
  const { getAllDataFromStoreThenArranged } = useCardList({ allCardInformationList, sitesInfo })
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

  return { updateData, updateDataAndShuffle }
}
