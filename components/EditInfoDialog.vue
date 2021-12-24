<template>
  <div>
    <v-dialog v-model="open" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="" dark v-bind="attrs" v-on="on" icon>
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
              <v-text-field label="title" required v-model="title"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="URL" required v-model="url"></v-text-field>
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
import { defineComponent, PropType, ref, useContext } from "@nuxtjs/composition-api"
import { editCardInfomation } from "~/modules/dataOperations"
import { CardInfo, SiteInformation } from "~/types/custom"

export default defineComponent({
  props: {
    cardInfo: { type: Object as PropType<CardInfo> }
  },
  setup(props, { emit }) {
    const { store } = useContext()
    const open = ref(false)
    const title = ref("")
    title.value = props.cardInfo.data?.title
    const url = ref("")
    url.value = props.cardInfo.data?.URL
    const edittedInfo = ref<SiteInformation>()
    const closeDialog = () => {
      const info = {
        key: props.cardInfo.key,
        data: { title: title.value, URL: url.value, OGP: "", description: "" }
      }
      editCardInfomation(info, store)
      emit("afterEditData")
      open.value = false
    }
    return { open, edittedInfo, title, url, closeDialog }
  }
})
</script>
<style lang="sass" scoped></style>
