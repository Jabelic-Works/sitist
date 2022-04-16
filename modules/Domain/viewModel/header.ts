import { Ref, useStore } from "@nuxtjs/composition-api"
import { fetchDataFS } from "@/modules/firestoreClient/fetchData"
export const useHeader = ({
  userInfo,
  updateData
}: {
  userInfo: Ref<{ name: string; uid: string }>
  updateData: Function
}) => {
  const { addData } = fetchDataFS()
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
    if (userInfo.value.uid) {
      allCardInformationList = await addData(data, userInfo.value.uid)
      console.debug("new data", allCardInformationList)
      store.dispatch("data/setAllData", allCardInformationList).finally(() => {
        updateData()
      })
    }
  }
  return { addDataFromHeader }
}
