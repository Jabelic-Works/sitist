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
            <!-- <v-btn
              class="fill-width mt-5 text-capitalize caption"
              color="#385184"
              dark
              depressed
              height="48px"
              tile
            >
              <img
                class="button-logo-img mr-4"
                src="http://placehold.it/350x150"
                style="height: 24px"
              />
              Facebookで登録
            </v-btn> -->
          </div>
          <!-- <div class="separator separator_login_page">
            <div class="middle_separator">または</div>
          </div> -->
          <div class="pt-6">
            <!-- <div>
              <v-text-field
                v-model="email"
                :rules="[emailRules.required, emailRules.regex]"
                autofocus
                dense
                height="48px"
                outlined
                placeholder="メールアドレス"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.regex]"
                :type="passwordShow ? 'text' : 'password'"
                dense
                height="48px"
                name="input-password"
                outlined
                placeholder="パスワード"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </div> -->
            <!-- <div class="login-btn pb-8">
              <v-btn
                class="fill-width caption"
                color="#FFCB00"
                depressed
                height="48px"
                tile
              >
                会員登録
              </v-btn>
            </div> -->
            <v-divider></v-divider>
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
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'auth',
  setup(_, { root }) {
    const login = () => {
        console.debug('login!')
        root.$store.dispatch('auth/login')
    }
    return {
      login,
    }
  },
})
</script>
<style scoped>
.btn-text-trans {
  text-transform: none;
}
</style>
