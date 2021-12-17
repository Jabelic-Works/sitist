<template>
  <v-app dark>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1> -->
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
