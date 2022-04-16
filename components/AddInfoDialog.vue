<template>
  <div id="addinfo">
    <v-dialog v-model="dialog" max-width="600px" @close="cancelAction">
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="kinds == 'floating'"
          class="mb-12"
          color="#BDBDBD88"
          dark
          v-bind="attrs"
          fixed
          bottom
          right
          fab
          v-on="on"
        >
          <v-fab-transition class="add-btn">
            <v-icon>mdi-plus</v-icon>
          </v-fab-transition>
        </v-btn>
        <v-btn v-else color="" dark v-bind="attrs" icon v-on="on">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center">
          <span class="headline">Add Page</span>
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
import { defineComponent, ref, PropType, watch } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
    addDataFromHeader: {
      type: Function as PropType<(urlString: string, titleString?: string) => void>
    },
    isShowAddInfoDialog: { type: Boolean },
    kinds: { type: String }
  },
  setup(props, { emit }) {
    const dialog = ref(false)
    watch(
      () => props.isShowAddInfoDialog,
      val => {
        console.debug("isShowAddInfoDialog", props.isShowAddInfoDialog)
        dialog.value = val
      }
    )
    const url = ref("")
    const title = ref("")
    const closeDialog = () => {
      if (url.value || title.value) {
        props.addDataFromHeader(url.value, title.value)
        url.value = ""
        title.value = ""
      }
      dialog.value = false
      emit("unshowAddInfodialog")
    }
    const cancelAction = () => {
      console.debug("ppppp")
      emit("unshowAddInfodialog")
    }

    return { dialog, url, title, closeDialog, cancelAction }
  }
})
</script>
