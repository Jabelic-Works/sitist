export type CardInfo = {
  key: string
  data: {
    title?: string
    URL: string
    OGP?: string | undefined
    description?: string | undefined
  }
}

export type SiteInformation = {
  data: {
    title?: string
    URL: string
    OGP?: string | undefined
    description?: string | undefined
  }
}
