import { SiteInformation } from "~/types/custom"

export const deepcopy = (objs: any) => {
  return [objs].map((obj: any) => ({ ...obj }))[0]
}

export const isSiteInformation = (test: any): test is SiteInformation => {
  return (
    test.data &&
    typeof test.data.title == "string" &&
    typeof test.data.URL == "string" &&
    (typeof test.data.OGP == "string" || typeof test.data.OGP == undefined) &&
    (typeof test.data.description == "string" || typeof test.data.description == undefined)
  )
}
