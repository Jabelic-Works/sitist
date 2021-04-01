<template>
  <v-app>
    <v-app-bar height="128px" color="#F5F5F5" dense flat>
      <div class="header-title justify-center d-flex fill-width">
        <nuxt-link to="/">
            <!-- https://placeholder.com/ -->
          <img src="http://placehold.it/350x150" style="height:48px" />
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-content style="background:#F5F5F5;height: auto;" class="pa-0 fill-height">
      <v-container :class="{ 'pa-0': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs }">
        <nuxt />
      </v-container>
    </v-content>
    <footer style="background: #F5F5F5">
      <div class="pa-8 d-flex flex-warp justify-center fill-wdith">
        <nuxt-link to="privacy" class="link-caption mr-8">プライバシーポリシー</nuxt-link>
        <nuxt-link to="tos" class="link-caption mr-8">利用規約</nuxt-link>
      </div>
    </footer>
  </v-app>
</template>