import { Ref, useStore } from "@nuxtjs/composition-api"
import { fetchDataFB } from "@/modules/firestoreClient/fetchData"
export const useHeader = ({ refUserUid, updateData }: { refUserUid: Ref<string>; updateData: Function }) => {
  const { addData, fetchAllData } = fetchDataFB()
  const store = useStore()
  /** Headerの+ボタン経由で開かれるダイアログ */
  const addDataFromHeader = async (urlString: string, titleString?: string) => {
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
      allCardInformationList = await addData(data, refUserUid.value)
      console.debug("new data", allCardInformationList)
      store.dispatch("data/setAllData", allCardInformationList).finally(() => {
        updateData()
      })
    }
  }
  return { addDataFromHeader }
}
