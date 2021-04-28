<template>
  <div>
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
                <v-text-field label="URL" required v-model="url"></v-text-field>
              </v-row>
            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const dialog = ref(false)
    const url = ref('')
    const closeDialog = () => {
        // TODO: urlを取得, moduleでscrayping, title, OGP,etc...を取得
        // TODO: moduleから{title, OGP}を取得, firestoreに格納
        // TODO: firestoreにaddする処理をmodule切り出し
      dialog.value = false
    }
    return { dialog, url,closeDialog }
  },
})
</script>
