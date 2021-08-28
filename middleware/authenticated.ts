import { auth } from '~/plugins/firebase'

export default ({ store, route, redirect }: any) => {
  auth.onAuthStateChanged((user: any) => {
    if (user) {
      store.dispatch('auth/login', user)
      console.debug(store.getters['auth/getUserName'])
    } else {
      if (route.name !== 'login') {
        // redirect('/sign-in')
        console.debug('sign-inに遷移させたい！')
        // XXX: Redirected when going from "/" to "/sign-in" via a navigation guard.
      }
    }
  })
}
