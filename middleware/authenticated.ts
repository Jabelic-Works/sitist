import { auth } from "~/plugins/firebase"

export default ({ store, route, redirect }: any) => {
  auth.onAuthStateChanged((user: any) => {
    if (user) {
      store.dispatch("auth/login", user)
      console.debug(store.getters["auth/getUserName"])
    } else if (route.name !== "sign-in") {
      redirect("/sign-in")
    }
  })
}
