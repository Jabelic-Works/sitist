<template>
  <div id="signin" class="pa-4 ma-10">
    <v-card :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs" class="mx-auto" flat max-width="640">
      <v-card-title class="text-center pa-8">
        <h3 class="fill-width">Sign in</h3>
      </v-card-title>
      <v-divider />
      <div class="px-6 py-8 d-flex">
        <div style="max-width: 344px" class="mx-auto">
          <v-btn
            class="h6 fill-width text-capitalize caption"
            height="48px"
            outlined
            style="border-color: #979797"
            tile
            @click="signIn"
          >
            <img
              class="button-logo-img mr-4"
              src="https://madeby.google.com/static/images/google_g_logo.svg"
              style="height: 24px"
            />
            Sign in with Google
          </v-btn>
        </div>
      </div>
      <div class="pt-6">
        <v-divider />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter, useStore } from "@nuxtjs/composition-api"
import { useSignin } from "~/modules/Domain/sign-in/viewModel"
import firebase from "~/plugins/firebase"
export default defineComponent({
  layout: "auth",
  setup(_, {}) {
    const { fetchDataAfterSignIn } = useSignin()
    const store = useStore()
    const router = useRouter()
    const signIn = async () => {
      const user = ref<any>()
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          user.value = result.user
          console.log("success : " + user.value)
          console.log("success : " + user.value.uid + " : " + user.value.displayName)
          store.dispatch("auth/login", user.value)
          console.debug("welcome!")
        })
        .catch(function (error) {
          const errorCode = error.code
          console.log("error : " + errorCode) // NOTE: 登録されたドメインでないとエラーを吐く
        })
        .then(async () => {
          await fetchDataAfterSignIn(user.value.uid)
          router.push("/")
        })
    }
    return {
      signIn
    }
  }
})
</script>
<style scoped>
.btn-text-trans {
  text-transform: none;
}
</style>
