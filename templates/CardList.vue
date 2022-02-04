<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      :updateData="afterPostData"
      :addDataFromHeader="addDataFromHeader"
    />
    <v-container>
      <div class="" justify="center">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <div class="text-center"></div>
            <h3>hello, {{ refUserName ? refUserName : guest }}</h3>
          </v-col>
          <v-col
            ><v-btn @click="checkGetters">updateData: 画面の更新</v-btn>
            <v-btn @click="showDialog">fetchAllData: データの更新</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="documentLocalData">
          <v-col v-for="doc in sitesInfo" :key="doc.key" cols="20">
            <CardComponent :cardInfo="doc" @afterPostData="afterPostData" @afterEditData="afterEditData" />
          </v-col>
        </v-row>
      </div>

      <ConfirmDialog
        :is-opened="isShowingUpdateDataDialog"
        @closeDialog="closeDialog"
        @fetchData="fData"
        :confirmText="'データを更新しますか？'"
      />
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onActivated, ref, useContext, useFetch, watch } from "@nuxtjs/composition-api"
import { use } from "~/modules/fetchData"
import { deepcopy } from "~/modules/utils"
import { CardInfo } from "~/types/custom"

export default defineComponent({
  setup() {
    const guest = "Guest"
    const refUserName = ref("")
    const refUserUid = ref("")
    const documentLocalData = ref<{ data: CardInfo }>() // FIXME: type
    const sitesInfo = ref([])
    const { store } = useContext()
    const { fetchAllData, addData } = use()
    // すでにstoreにデータがある場合は再取得はボタンで行う(回数制限/有料制にする？)
    const { $fetchState } = useFetch(() => {
      refUserUid.value = store.getters["auth/getUserUid"]
      if (refUserUid.value) {
        documentLocalData.value = store.getters["data/getAllData"] // データがある場合
        console.debug("useFetch", documentLocalData.value)
        // データがない場合
        // データを追加していない人だけがサーバーへのアクセスが増える、だめだこれ
        if (Object.keys(documentLocalData.value).length === 0) {
          console.debug("data is empty")
          documentLocalData.value = fetchAllData(refUserUid.value)
          store.dispatch("data/setAllData", documentLocalData.value)
        }
      }
    })
    // ユーザーが変わった場合
    watch(
      () => store.getters["auth/getUserUid"],
      () => {
        if (refUserUid.value !== store.getters["auth/getUserUid"]) {
          refUserName.value = store.getters["auth/getUserName"]
          refUserUid.value = store.getters["auth/getUserUid"]
        }
      }
    )
    // データが更新された場合
    watch(
      () => store.getters["data/getAllData"],
      () => {
        documentLocalData.value = deepcopy(store.getters["data/getAllData"])
      }
    )
    nextTick(async () => {
      documentLocalData.value = await deepcopy(store.getters["data/getAllData"])
      console.debug("nextTick", documentLocalData.value)
    })
    onActivated(() => {
      refUserName.value = store.getters["auth/getUserName"]
      refUserUid.value = store.getters["auth/getUserUid"]
      documentLocalData.value = store.getters["data/getAllData"]
      console.debug("activate", documentLocalData.value)
      afterPostData()
    })
    // 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
    // stateの更新の完了を検知したいんだけど...
    /** postした後にstoreの後の値を */
    const afterPostData = () => {
      setTimeout(() => checkGetters(), 500)
    }
    const afterEditData = () => {
      setTimeout(() => checkGetters(), 500)
    }
    const checkGetters = async () => {
      documentLocalData.value = await deepcopy(store.getters["data/getAllData"])
      console.debug(JSON.stringify(documentLocalData.value))
      let tmpArray = []
      for (const [key, value] of Object.entries(documentLocalData.value)) {
        tmpArray.push({ key, data: value.data })
      }
      sitesInfo.value = tmpArray
    }
    const isShowingUpdateDataDialog = ref(false)
    const showDialog = () => {
      isShowingUpdateDataDialog.value = true
    }
    const closeDialog = () => {
      isShowingUpdateDataDialog.value = false
    }
    const fData = async () => {
      await store.dispatch("data/setAllData", fetchAllData(refUserUid.value))
      setTimeout(() => checkGetters(), 500)
    }
    const addDataFromHeader = (urlString: string, titleString?: string) => {
      const data = {
        data: {
          URL: urlString,
          title: titleString,
          OGP: "",
          description: ""
        }
      }
      let documentLocalData = {}
      if (refUserUid.value) {
        console.debug(refUserUid.value, "add data:", data)
        documentLocalData = addData(data, refUserUid.value)
        console.debug("new data", documentLocalData)
        store.dispatch("data/setAllData", documentLocalData).finally(() => {
          afterPostData()
        })
      }
    }

    return {
      guest,
      refUserName,
      refUserUid,
      documentLocalData,
      afterPostData,
      checkGetters,
      fData,
      isShowingUpdateDataDialog,
      showDialog,
      closeDialog,
      sitesInfo,
      afterEditData,
      addDataFromHeader
    }
  }
})
</script>
<style lang="sass" scoped></style>
