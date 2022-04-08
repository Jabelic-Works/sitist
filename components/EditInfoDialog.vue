<template>
  <div>
    <v-dialog v-model="isOpen" max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn color="" dark v-bind="attrs" icon v-on="on">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center">
          <span class="headline">Edit Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field v-model="url" label="URL" required />
            </v-row>
            <v-row>
              <v-text-field v-model="title" label="title" required />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, ref } from "@nuxtjs/composition-api"
import { CardInfo } from "~/types/custom"

export default defineComponent({
  props: {
    cardInfo: { type: Object as PropType<CardInfo> }
  },
  setup(props) {
    const { emit } = getCurrentInstance()
    const isOpen = ref(false)
    const title = ref("")
    title.value = props.cardInfo.data?.title
    const url = ref("")
    url.value = props.cardInfo.data?.URL

    const closeDialog = () => {
      emit("closeDialog", { url: url.value, title: title.value })
      isOpen.value = false
    }
    return { isOpen, title, url, closeDialog }
  }
})
</script>
<style lang="sass" scoped></style>
