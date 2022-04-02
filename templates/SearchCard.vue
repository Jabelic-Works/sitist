<template>
  <div id="search-dialog">
    <v-dialog v-model="open" transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" icon> <v-icon>mdi-magnify</v-icon> </v-btn>
      </template>
      <v-card>
        <v-toolbar color="primary lighten-1" dark>検索して、どうぞ。</v-toolbar>
        <v-card-text>
          <!-- <div class="text-h4 pa-1">Hello world!</div> -->
          <Input
            class="my-4"
            inputmode="rawinput"
            label="Tweet!"
            placeholder="タイトルで検索"
            @setInputText="syncInputText"
          />
        </v-card-text>
        <v-data-table :headers="headers" :items="dataTableItems"></v-data-table>
        <v-card-actions class="justify-end">
          <v-btn text @click.stop="open = false">Close</v-btn>
          <v-btn text @click.fstop="search">検索</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api"
import { useSearch } from "../modules/Domain/viewModel/search"

export default defineComponent({
  name: "SearchCard",
  setup(_, {}) {
    const open = ref<boolean>()
    const inputValue = ref("")
    // const setInputText = (args: string) => {
    //   inputValue.value = args
    // }
    const syncInputText = (args: string) => {
      inputValue.value = args
    }
    const { searchContents } = useSearch(inputValue)
    const dataTableItems = ref([])
    const headers = ref([
      { text: "Title", value: "title" },
      { text: "URL", value: "URL" },
      { text: "GO", value: "goAction" }
    ])
    const search = async () => {
      const filtered = await searchContents()
      if (Array.isArray(filtered) && filtered.length) {
        dataTableItems.value.length = 0
        filtered.map(item => dataTableItems.value.push({ title: item[1].data.title, URL: item[1].data.URL }))
      } else {
        dataTableItems.value.splice(0)
      }
    }
    return {
      inputValue,
      // setInputText,
      syncInputText,
      open,
      searchContents,
      search,
      dataTableItems,
      headers
    }
  }
})
</script>
<style scoped></style>
