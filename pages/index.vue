<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">ほげ！</div>
      <div> hello, {{ guest }}</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup(_, {}) {
    const guest = '{{ Guest }}'
    return { guest }
  },
})
</script>
