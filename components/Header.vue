<template>
  <v-toolbar color="primary lighten-1">
    <v-toolbar-title>
      <nuxt-link to="/" style="text-decoration: none; color: inherit">
        <v-btn text exact class="text-non-trans">
          <span style="font-size: 1.5rem"> Sitist</span></v-btn
        >
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <AddInfoDialog :refUserName="refUserName" :refUserUid="refUserUid" />
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <!-- <v-btn @click="checkLocalData"> hoge </v-btn> -->
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
