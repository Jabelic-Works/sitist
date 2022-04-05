<template>
  <v-app>
    <!-- color="#F5F5F5" -->
    <div>
      <v-toolbar color="primary lighten-1">
        <v-toolbar-title>
          <nuxt-link to="/" style="text-decoration: none; color: inherit">
            <v-btn text exact class="text-non-trans"> <span style="font-size: 1.5rem"> Sitist</span></v-btn>
          </nuxt-link>
        </v-toolbar-title>
      </v-toolbar>
      <v-main style="height: auto" class="pa-0 fill-height" color="primary lighten-1">
        <v-container :class="{ 'pa-0': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs }">
          <nuxt />
        </v-container>
      </v-main>
      <Footer />
    </div>
  </v-app>
</template>
<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api"
export default defineComponent({
  setup(_, {}) {
    // const { $vuetify } = useContext()
    // return { $vuetify }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
