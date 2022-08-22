import { useStore, ref } from "@nuxtjs/composition-api"
import { fetchDataFS } from "~/repos/fetchData"
import { CardInfo } from "~/types/custom"
export const useSignin = () => {
  const { fetchAllData } = fetchDataFS()
  const store = useStore()
  const allCardInformationList = ref<{ data: CardInfo }>(null)
  const fetchDataAfterSignIn = async (uid?: string) => {
    const userUid = store.getters["auth/getUserUid"]
    allCardInformationList.value = await fetchAllData(uid ? uid : userUid)
    store.dispatch("data/setAllData", allCardInformationList.value)
  }
  return { fetchDataAfterSignIn }
}
