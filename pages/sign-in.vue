<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title> sign-in </v-card-title>
        <v-card-actions>
          <v-btn @click="login"> sign-in </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'auth',
  setup(_, {}) {
    const login = () => {}
    return {
      login,
    }
  },
})
</script>
