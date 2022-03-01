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
import { defineComponent, ref, PropType } from "@nuxtjs/composition-api"
export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
    addDataFromHeader: {
      type: Function as PropType<(urlString: string, titleString?: string) => void>
    }
  },
  setup(props) {
    const dialog = ref(false)
    const url = ref("")
    const title = ref("")
    const closeDialog = () => {
      if (url.value || title.value) {
        props.addDataFromHeader(url.value, title.value)
        url.value = ""
        title.value = ""
      }
      dialog.value = false
    }

    return { dialog, url, title, closeDialog }
  }
})
</script>
