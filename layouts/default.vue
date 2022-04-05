<template>
  <v-app dark>
    <nuxt keep-alive :keep-alive-props="{ max: 5 }" />
    <Footer />
  </v-app>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"
import Footer from "@/components/Footer"
export default defineComponent({
  components: { Footer },
  setup() {
    return {}
  }
})
</script>
