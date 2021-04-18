<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Footer from '@/components/Footer'
export default defineComponent({
  components: { Footer },
  setup() {
    return {}
  },
})
</script>
