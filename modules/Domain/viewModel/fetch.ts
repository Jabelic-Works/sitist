import { watch, Ref, useStore } from "@nuxtjs/composition-api"
import { fetchDataFS } from "~/modules/firestoreClient/fetchData"
import { CardInfo } from "~/types/custom"
export const useFetchData = ({
  allCardInformationList,
  userInfo
}: {
  allCardInformationList: Ref<{ data: CardInfo }>
  userInfo: Ref<{
    name: string
    uid: string
  }>
}) => {
  const { fetchAllData } = fetchDataFS()
  const store = useStore()
  const fetchDataAfterSignIn = async () => {
    allCardInformationList.value = await fetchAllData(userInfo.value.uid)
    store.dispatch("data/setAllData", allCardInformationList.value)
  }
  return { fetchDataAfterSignIn }
}
