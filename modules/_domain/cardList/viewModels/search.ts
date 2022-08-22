import { Ref, useStore } from "@nuxtjs/composition-api"
import { deepCopy } from "~/modules/utils/custom"
import { SiteInformation } from "~/types/custom"

export const useSearch = (searchKeywords: Ref<string>) => {
  const store = useStore()
  const searchContents = async () => {
    if (!searchKeywords.value) return
    const allData = await deepCopy(store.getters["data/getAllData"])
    const filteredContents = Object.entries<SiteInformation>(allData).filter(([key, val]: [string, any]) =>
      val.data.title.toLowerCase().includes(searchKeywords.value.toLowerCase())
    )
    return filteredContents
  }
  return { searchContents }
}
