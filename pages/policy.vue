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
      <v-main class="">
        <div class="d-flex flex-row justify-center ma-3">
          <h1>Sitist</h1>
        </div>
        <div class="d-flex flex-row justify-center ma-5">
          <div class="description" id="desc">{{ description }}</div>
        </div>
        <div class="d-flex flex-row justify-center ma-10"></div>
        <div class="d-flex flex-row justify-center ma-5">
          <h3>Owner</h3>
        </div>
        <div class="d-flex flex-row justify-center ma-5">Jabelic</div>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, useStore } from "@nuxtjs/composition-api"
export default defineComponent({
  setup() {
    const photoUrl = ref("")
    const store = useStore()
    const description = ref<any>(
      "このアプリはRSSリーダーライクな、WebサイトをまとめておくWebアプリケーションです。日々の技術のキャッチアップやブックマークツールとしてお使いください。"
    )
    nextTick(() => {
      photoUrl.value = store.getters["auth/getUserPhotoUrl"]
    })
    return { photoUrl, description }
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
</style>
