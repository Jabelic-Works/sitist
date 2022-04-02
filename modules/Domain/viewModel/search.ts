import { Ref, useStore } from "@nuxtjs/composition-api"
import { deepcopy } from "~/modules/utils"

export const useSearch = (searchKeywords: Ref<string>) => {
  const store = useStore()
  type storeAllData = Array<{
    id: { title?: string; url: string; OGP?: string | undefined; description?: string | undefined } | undefined
  }>
  type contentsType = {
    data: { title?: string; url: string; OGP?: string | undefined; description?: string | undefined } | undefined
  }
  // FIXME: 型
  const searchContents = async () => {
    if (!searchKeywords.value) return
    const allData = await deepcopy(store.getters["data/getAllData"])
    const filteredContents = Object.entries(allData).filter(([key, val]: any) =>
      val.data.title.includes(searchKeywords.value)
    )
    console.debug("検索：", filteredContents)
    return filteredContents
  }
  return { searchContents }
}
