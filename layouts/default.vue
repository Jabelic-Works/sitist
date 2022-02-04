<template>
  <v-app dark>
    <v-main>
      <nuxt keep-alive />
    </v-main>
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
