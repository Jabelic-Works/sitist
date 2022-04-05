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
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, useStore } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    const photoUrl = ref("")
    const store = useStore()
    nextTick(() => {
      photoUrl.value = store.getters["auth/getUserPhotoUrl"]
    })
    return { photoUrl }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
