<template>
  <v-toolbar dense>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>
      <nuxt-link to="/">
        <v-btn flat exact class="text-convert"> <span style="font-size:1.5rem;"> Sitist</span></v-btn>
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <!-- 

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style>
.text-convert {
  text-transform: none;
}
</style>
