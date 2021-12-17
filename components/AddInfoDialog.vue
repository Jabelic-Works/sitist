<template>
  <div id="addinfo">
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="" dark v-bind="attrs" v-on="on" icon>
            <!-- Open Dialog -->
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
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, useContext } from "@nuxtjs/composition-api"
import { use } from "@/modules/fetchData"
export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
    update: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const dialog = ref(false)
    const url = ref("")
    const title = ref("")
    const { store } = useContext()
    const { addData } = use()
    const closeDialog = () => {
      // TODO: urlを取得, moduleでscrayping, title, OGP,etc...を取得
      // TODO: moduleから{title, OGP}を取得, firestoreに格納
      // TODO: firestoreにaddする処理をmodule切り出し
      if (url.value || title.value) {
        submitData(url.value, title.value)
        url.value = ""
        title.value = ""
      }
      dialog.value = false
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

    return { dialog, url, title, closeDialog, submitData }
  }
})
</script>
