<template>
  <div id="search-dialog">
    <v-dialog v-model="open" transition="dialog-bottom-transition" max-width="600">
      <template #activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" icon v-on="on"> <v-icon>mdi-magnify</v-icon> </v-btn>
      </template>
      <v-card>
        <v-toolbar color="primary lighten-1" dark>Search Links</v-toolbar>
        <v-card-text>
          <Input
            class="my-4"
            inputmode="rawinput"
            label="Tweet!"
            :placeholder="PLACEHOLDER_IN_SEARCH_DIALOG"
            :search="search"
            @setInputText="syncInputText"
          />
        </v-card-text>

        <v-simple-table height="300px">
          <template #default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">GoPage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataTableItems" :key="item.URL">
                <td>{{ item.title }}</td>
                <td><v-btn @click.stop="toPageLink(item.URL)">{{ GO_PAGE_IN_SEARCH_DIALOG }}</v-btn></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-card-actions class="justify-end">
          <v-btn text @click.stop="open = false">{{ CLOSE_IN_SEARCH_DIALOG }}</v-btn>
          <v-btn text @click.stop="search">{{ SEARCH_BUTTON_IN_SEARCH_DIALOG }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api"
import { useSearch } from "../modules/_domain/cardList/viewModels/search"
import { PLACEHOLDER_IN_SEARCH_DIALOG, SEARCH_BUTTON_IN_SEARCH_DIALOG,CLOSE_IN_SEARCH_DIALOG, GO_PAGE_IN_SEARCH_DIALOG } from '@/modules/constant'
export default defineComponent({
  name: "SearchCard",
  setup() {
    const open = ref<boolean>()
    const inputValue = ref("")
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
      console.debug(filtered)
      if (Array.isArray(filtered) && filtered.length) {
        dataTableItems.value.length = 0
        filtered.map(item => dataTableItems.value.push({ title: item[1].data.title, URL: item[1].data.URL }))
      } else {
        dataTableItems.value.splice(0)
      }
    }
    const toPageLink = (url: string) => window.open(url, "_blank")
    return {
      inputValue,
      syncInputText,
      open,
      searchContents,
      search,
      dataTableItems,
      headers,
      toPageLink,
      PLACEHOLDER_IN_SEARCH_DIALOG,
      SEARCH_BUTTON_IN_SEARCH_DIALOG,
      CLOSE_IN_SEARCH_DIALOG,
      GO_PAGE_IN_SEARCH_DIALOG
    }
  }
})
</script>
<style scoped></style>
