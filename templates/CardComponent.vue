<template>
  <div id="card-component" class="my-1 justify-center">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-h5 my-1" v-if="cardInfo.data && cardInfo.data.title">
            {{ cardInfo.data.title }}
          </div>
          <div class="caption" v-if="cardInfo.data && cardInfo.data.URL">
            {{ cardInfo.data.URL }}
          </div>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>
      <v-list-item class="d-flex justify-center" v-if="cardInfo.data && cardInfo.data.URL">
        <v-btn color="blue ma-3" :href="cardInfo.data.URL" target="_blank" rel="noopener noreferrer">ACCESS</v-btn>
        <v-spacer />
        <EditInfoDialog :cardInfo="cardInfo" @afterEditData="afterEditData" @closeDialog="closeDialog" />
        <v-spacer />
        <!-- TODO: confirmdialog! -->
        <button class="pt-1" @click="deleteCard(cardInfo)">
          <img src="https://img.icons8.com/material-outlined/28/000000/trash.png" class="trash-icon" />
        </button>
      </v-list-item>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, useContext } from "@nuxtjs/composition-api"
import { CardInfo } from "@/types/custom"
import { deleteCardInformation, editCardInfomation } from "@/modules/dataOperations"

export default defineComponent({
  props: {
    cardInfo: {
      type: Object as PropType<CardInfo>,
      default: () => ({ key: "00000", data: { title: "testCaseTitle", URL: "https://jabelic.netlify.app" } })
    }
  },
  setup(props, { emit }) {
    const { store } = useContext()
    const deleteCard = (info: CardInfo) => {
      deleteCardInformation(info, store)
      emit("afterPostData")
    }
    const afterEditData = () => {
      emit("afterEditData")
    }
    const closeDialog = (data: { url: string; title?: string }) => {
      const info = {
        key: props.cardInfo.key,
        data: { title: data.title, URL: data.url, OGP: "", description: "" }
      }
      editCardInfomation(info, store)
      emit("afterEditData")
    }
    return { deleteCard, afterEditData, closeDialog }
  }
})
</script>
<style scoped>
.trash-icon {
  background-color: rgba(250, 0, 20, 1);
  border-radius: 0.3em;
}
</style>
