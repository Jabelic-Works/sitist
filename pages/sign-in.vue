<template>
  <div id="signin">
    <!-- <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title> sign-in </v-card-title>
          <v-card-actions>
            <v-btn class="blue lighten-3 btn-text-trans" @click="login">
              Google sign-in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
    <v-card
      :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mx-auto fill-width"
      flat
      max-width="640"
    >
      <v-card-title class="text-center pa-8">
        <h3 class="fill-width">Sign in</h3>
      </v-card-title>
      <v-divider> </v-divider>
      <div class="px-6 py-8">
        <div style="max-width: 344px" class="mx-auto">
          <div　justify="center">
            <v-btn
              class="h6 fill-width text-capitalize caption"
              height="48px"
              outlined
              style="border-color: #979797"
              tile
              @click="login"
            >
              <img
                class="button-logo-img mr-4"
                src="https://madeby.google.com/static/images/google_g_logo.svg"
                style="height: 24px"
              />
              Sign in with Google
            </v-btn>
          </div>
          <div class="pt-6">
            <v-divider></v-divider>
            username: {{userName}}
            <div class="pt-8 pb-4">
              <span>すでにアカウントをお持ちですか？</span>
              <nuxt-link to="/login">ログインに移動</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import firebase from '~/plugins/firebase'
export default defineComponent({
  layout: 'auth',
  setup(_, { root }) {
    const userName = ref('')
    const login = () => {
        console.debug('login!')
        const user = ref<any>()
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            user.value = result.user
            console.log('success : ' + user.value)
            console.log('success : ' + user.value.uid + ' : ' + user.value.displayName)
          })
          .catch(function (error) {
            var errorCode = error.code
            console.log('error : ' + errorCode)
          }).then(()=>{
            root.$store.dispatch('auth/login', user.value)
          }).then(()=>{
            userName.value = root.$store.getters.getUserName
          }).then(()=>{root.$router.push('/')})
    }
    return {
      login,
      userName
    }
  },
})
</script>
<style scoped>
.btn-text-trans {
  text-transform: none;
}
</style>
