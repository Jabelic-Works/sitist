<template>
  <div id="addinfo">
    <v-dialog v-model="dialog" @close="cancelAction" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="kinds == 'floating'" color="#BDBDBD88" dark v-bind="attrs" v-on="on" fixed bottom right fab>
          <v-fab-transition class="add-btn">
            <v-icon>mdi-plus</v-icon>
          </v-fab-transition>
        </v-btn>
        <v-btn v-else color="" dark v-bind="attrs" v-on="on" icon>
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
              <v-text-field label="URL" required v-model="url"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="title" required v-model="title"></v-text-field>
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
    update: {
      type: Function as PropType<() => void>,
      required: true
    },
    isShowAddInfodialog: { type: Boolean, required: true },
    kinds: { type: String }
  },
  setup(props, { emit }) {
    const dialog = ref(false)
    watch(
      () => props.isShowAddInfodialog,
      val => {
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
      emit("unshowAddInfodialog")
    }
    const cancelAction = () => {
      console.debug("ppppp")
      emit("unshowAddInfodialog")
    }

    const submitData = (urlString: string, titleString?: string) => {
      const data = {
        data: {
          URL: urlString,
          title: titleString,
          OGP: "",
          description: ""
        }
      }
      const uid = props.refUserUid
      let documentLocalData = {}
      if (uid) {
        console.debug(uid, "add data:", data)
        documentLocalData = addData(data, uid)
        console.debug("new data", documentLocalData)
        store.dispatch("data/setAllData", documentLocalData).finally(() => {
          props.update()
        })
      }
    }

    return { dialog, url, title, closeDialog, submitData, cancelAction }
  }
})
</script>
