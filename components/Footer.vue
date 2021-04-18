<template>
  <div>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in linksInFooter"
          :key="link.title"
          :to="link.link"
          color="white"
          text
          rounded
          class="my-1"
        >
          {{ link.title }}
        </v-btn>
      </v-row>
    </v-footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const linksInFooter = [
      { title: 'プライバシーポリシー', link: '/policy' },
      { title: '利用規約', link: '/regulation' },
      { title: `${new Date().getFullYear()} — Sitist`, link: '/' },
    ]
    return {
      linksInFooter,
    }
  },
})
</script>
