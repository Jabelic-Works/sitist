<template>
  <div id="card-component" class="my-1 justify-center">
    <v-card class="mx-auto" max-width="344" outlined :href="cardInfo.URL" target="_blank" rel="noopener noreferrer">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-1">
            {{ cardInfo.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ cardInfo.URL }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>
      <!-- <v-card-actions>
            </v-card-actions> -->
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"
import { CardInfo } from "@/types/custom"

export default defineComponent({
  props: {
    cardInfo: {
      type: Object as PropType<CardInfo>,
      default: () => ({ title: "testCaseTitle", URL: "https://jabelic.netlify.app" })
    }
  },
  setup(_, {}) {}
})
</script>
<style lang="sass" scoped></style>
