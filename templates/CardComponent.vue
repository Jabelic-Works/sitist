<template>
  <div id="card-component" class="my-1 justify-center">
    <v-card
      v-if="$vuetify.breakpoint.smAndUp"
      class="d-flex mx-auto"
      :width="$vuetify.breakpoint.smAndUp ? 344 : 300"
      height="160"
      outlined
    >
      <div class="flex-row title-style">
        <div v-if="cardInfo.data" class="flex-wrap text-h6 ma-5 my-2">
          <div v-if="cardInfo.data && cardInfo.data.title">
            {{ cardInfo.data.title }}
          </div>
          <div v-else class="pink--text lighten-4">
            {{ noTitle }}
          </div>
          <div class="text-caption pb-1">
            <div v-if="cardInfo.data && cardInfo.data.URL">{{ cardInfo.data.URL }}</div>
            <div v-else class="pink--text lighten-4">{{ noUrl }}</div>
          </div>
        </div>
      </div>
      <!--  ===== buttons ===== -->
      <div v-if="cardInfo.data" class="flex-row ml-auto ma-3">
        <div class="flex-column">
          <v-btn color="blue" :href="cardInfo.data.URL" target="_blank" rel="noopener noreferrer">ACCESS</v-btn>
        </div>
        <div class="flex-column align-self-center pl-6 py-3 ml-auto">
          <EditInfoDialog :card-info="cardInfo" @closeDialog="closeDialog" />
        </div>
        <button class="pt-1 pl-7 py-3 ml-auto" @click="$emit('confirmDeleteCardInformation', cardInfo)">
          <img src="https://img.icons8.com/material-outlined/28/000000/trash.png" class="trash-icon" />
        </button>
      </div>
    </v-card>
    <v-card
      v-if="$vuetify.breakpoint.xs"
      class="d-flex mx-auto"
      :width="$vuetify.breakpoint.smAndUp ? 344 : 300"
      height="100"
      outlined
    >
      <div class="flex-row title-style">
        <div v-if="cardInfo.data">
          <div
            v-if="cardInfo.data && cardInfo.data.title"
            class="text-subtitle-1 pt-2 px-3 text-height smartphone-title"
          >
            {{ cardInfo.data.title }}
          </div>
          <div v-else class="pink--text lighten-4 text-height">
            {{ noTitle }}
          </div>
          <div class="py-1 tiny-font px-3">
            <div v-if="cardInfo.data && cardInfo.data.URL">{{ cardInfo.data.URL }}</div>
            <div v-else class="pink--text lighten-4">{{ noUrl }}</div>
          </div>
        </div>
      </div>
      <!--  ===== buttons ===== -->
      <div v-if="cardInfo.data" class="flex-row ml-auto mx-2 my-1">
        <div class="d-flex flex-column justify-center">
          <v-btn color="blue" :href="cardInfo.data.URL" target="_blank" rel="noopener noreferrer">ACCESS</v-btn>
        </div>
        <div class="d-flex ml-auto flex-row my-3 justify-center">
          <div class="px-2">
            <EditInfoDialog :card-info="cardInfo" @closeDialog="closeDialog" />
          </div>
          <button class="px-2 ma-1 pt-1" @click="$emit('confirmDeleteCardInformation', cardInfo)">
            <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" class="trash-icon" />
          </button>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, ref, useContext } from "@nuxtjs/composition-api"
import { CardInfo } from "@/types/custom"
import { editCardInformation } from "~/modules/Domain/viewModel/edit"
import { noTitle, noUrl } from "~/modules/Commons/i18n"

export default defineComponent({
  props: {
    cardInfo: {
      type: Object as PropType<CardInfo>,
      default: () => ({ key: "00000", data: { title: "testCaseTitle", URL: "https://jabelic.netlify.app" } })
    }
  },
  setup(props) {
    const { emit } = getCurrentInstance()
    const { store } = useContext()
    const closeDialog = async (data: { url: string; title?: string }) => {
      const info = {
        key: props.cardInfo.key,
        data: { title: data.title, URL: data.url, OGP: "", description: "" }
      }
      editCardInformation(info, store)
      emit("updateData")
    }
    return { closeDialog, noTitle, noUrl }
  }
})
</script>
<style scoped>
.trash-icon {
  background-color: rgba(250, 50, 20, 1);
  border-radius: 1em;
  overflow: auto;
}
.title-style {
  text-overflow: ellipsis;
  max-width: 70%;
  overflow: auto;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
}
.tiny-font {
  font-size: 0.5rem;
  margin: 0%;
  margin-inline-end: 0%;
  padding-inline-start: 0%;
  padding-inline-end: 0%;
}
.text-height {
  height: 50%;
}
.smartphone-title {
  line-height: 1.1rem;
}
</style>
