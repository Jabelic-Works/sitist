<template>
  <div id="search-dialog">
    <v-dialog v-model="open" transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" icon> <v-icon>mdi-magnify</v-icon> </v-btn>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click.stop="open = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance, watch } from "@nuxtjs/composition-api"

export default defineComponent({
  name: "SearchCard",
  setup(_, { emit }) {
    const open = ref<boolean>()
    return { open }
  }
})
</script>
<style scoped></style>
