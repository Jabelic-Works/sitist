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
                <v-text-field label="URL" required></v-text-field>
              </v-row>
            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Save</v-btn
            >
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
    return { dialog }
  },
})
</script>
