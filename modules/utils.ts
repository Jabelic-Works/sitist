import { SiteInformation } from "~/types/custom"

export const deepcopy = (objs: any) => {
  return [objs].map((obj: any) => ({ ...obj }))[0]
}

//FIXME: Type
export const shuffleArray = (arg: any[]) => {
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const indexs = [...Array(arg.length).keys()].map(it => it)
  const shuffledIndexs = shuffle(indexs)
  console.debug(indexs, shuffledIndexs)
  let ret = []
  for (let i of shuffledIndexs) ret.push(arg[i])
  return ret
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
