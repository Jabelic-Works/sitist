<template>
  <div>
    <v-app-bar app absolute collapse-on-scroll color="primary lighten-1">
      <v-app-bar-title>
        <nuxt-link to="/" style="text-decoration: none; color: inherit">
          <v-btn text exact class="text-non-trans"> <span style="font-size: 1.5rem"> Sitist</span></v-btn>
        </nuxt-link>
      </v-app-bar-title>
      <nuxt-link to="/sign-in" style="text-decoration: none; color: inherit">
        <v-avatar color="primary" :size="$vuetify.breakpoint.smAndUp ? '56' : '40'">
          <img :src="photoUrl" alt="user photo" />
        </v-avatar>
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-app>
      <v-main>
        <div class="d-flex flex-row justify-center ma-3">
          <h1>Sitist</h1>
        </div>
        <div class="d-flex flex-row justify-center ma-5">
          <div id="desc" class="description">{{ info.description }}</div>
        </div>
        <div class="d-flex flex-row justify-center ma-10" />
        <div class="d-flex flex-row justify-center ma-5">
          <h3>Policy</h3>
          <br />
          <div>
            {{ info.policy }}
          </div>
        </div>
        <div class="d-flex flex-row justify-center ma-5">
          <h3>Owner</h3>
        </div>
        <div class="d-flex flex-row justify-center ma-5">
          <v-avatar color="primary mx-2" :size="$vuetify.breakpoint.smAndUp ? '56' : '40'">
            <img src="@/assets/jabelic-favicon.jpeg" alt=""
          /></v-avatar>
          <div class="mt-2">{{ info.author }}</div>
        </div>
        <div class="d-flex justify-center">
          <v-card elevation="5" outlined rounded>
            <v-card-title>Profile links</v-card-title>
            <v-card-text class="d-flex flex-column">
              <div class="d-flex flex-row my-2 align-center">
                <div class="pt-1">
                  <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg>
                </div>
                <v-btn raised href="https://github.com/jabelic" target="_blank" class="v-btn-text"
                  >Jabelic - github.com</v-btn
                >
              </div>
              <div class="d-flex flex-row my-2 align-center">
                <div class="pt-1">
                  <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />
                  </svg>
                </div>
                <v-btn raised href="https://jabelic.netlify.app/info/info.html" target="_blank" class="v-btn-text"
                  >About me - Jabelic Web Press
                </v-btn>
              </div></v-card-text
            >
          </v-card>
        </div>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, useStore } from "@nuxtjs/composition-api"
import { info } from "~/modules/Commons/i18n"
export default defineComponent({
  setup() {
    const photoUrl = ref("")
    const store = useStore()
    nextTick(() => {
      photoUrl.value = store.getters["auth/getUserPhotoUrl"]
    })
    return { photoUrl, info }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
.description {
  max-width: 60%;
  justify-content: center;
}
/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - デスクトップ（デフォルトのグリッド）
   1024-768    - タブレット横長
   768-480     - タブレット縦長
   480-less    - スマホ
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
}

@media all and (max-width: 480px) {
  .description {
    max-width: 80%;
    justify-content: center;
  }
}
.v-btn-text {
  text-transform: none;
}
</style>
