<template>
  <div id="card-component" class="my-1 justify-center">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-1">
            {{ cardInfo.data.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ cardInfo.data.URL }}
            {{ cardInfo.key }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>
      <v-list-item class="d-flex justify-center">
        <v-btn color="blue ma-3" :href="cardInfo.data.URL" target="_blank" rel="noopener noreferrer">ACCESS</v-btn>
        <v-spacer />
        <button class="pt-1" @click="deleteCardInfomation(cardInfo)">
          <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" class="trash-icon" />
        </button>
      </v-list-item>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, useContext } from "@nuxtjs/composition-api"
import { CardInfo } from "@/types/custom"
import { deleteData } from "@/modules/deleteData"
export default defineComponent({
  props: {
    cardInfo: {
      type: Object as PropType<CardInfo>,
      default: () => ({ key: "00000", data: { title: "testCaseTitle", URL: "https://jabelic.netlify.app" } })
    }
  },
  setup(_, {}) {
    // https://qiita.com/ksyunnnn/items/bfe2b9c568e97bb6b494
    // console.debug(_.cardInfo)
    const { store } = useContext()
    const { deleteCard } = deleteData()
    const deleteCardInfomation = (info: CardInfo) => {
      console.debug(info.key)
      deleteCard(store.getters["auth/getUserUid"], info.key)
    }
    return { deleteCardInfomation }
  }
})
</script>
<style scoped>
.trash-icon {
  background-color: rgba(250, 0, 20, 1);
  border-radius: 0.3em;
}
</style>
