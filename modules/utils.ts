export const deepcopy = (objs: any) => {
  return [objs].map((obj: any) => ({ ...obj }))[0]
}
