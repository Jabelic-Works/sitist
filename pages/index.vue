<template>
  <div>
    <Header :refUserName="refUserName" :refUserUid="refUserUid" :updateData="afterPostData" />
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
        <v-col v-for="doc in documentLocalData" :key="doc.id" cols="20">
          <CardComponent :cardInfo="doc.data" />
        </v-col>
      </v-row>
    </div>

    <UpdateDataDialog :is-opened="isShowingUpdateDataDialog" @closeDialog="closeDialog" @fechData="fData"
      >閉じる</UpdateDataDialog
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, useContext, useFetch, onActivated, nextTick } from "@nuxtjs/composition-api"
import { use } from "@/modules/fetchData"
import { deepcopy } from "~/modules/utils"
import UpdateDataDialog from "~/components/UpdateDataDialog.vue"

export default defineComponent({
  setup() {
    const guest = "Guest"
    const refUserName = ref("")
    const refUserUid = ref("")
    const documentLocalData = ref<any>({})
    const { store } = useContext()
    const { fetchAllData } = use()
    // すでにstoreにデータがある場合は再取得はボタンで行う(回数制限/有料制にする？)
    // const { $fetch } =
    useFetch(() => {
      refUserUid.value = store.getters["auth/getUserUid"]
      if (refUserUid.value) {
        documentLocalData.value = store.getters["data/getData"] // データがある場合
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
      () => store.getters["data/getData"],
      () => {
        documentLocalData.value = deepcopy(store.getters["data/getData"])
      }
    )
    nextTick(async () => {
      documentLocalData.value = await deepcopy(store.getters["data/getData"])
      console.debug("nextTick", documentLocalData.value)
    })
    onActivated(() => {
      refUserName.value = store.getters["auth/getUserName"]
      refUserUid.value = store.getters["auth/getUserUid"]
      documentLocalData.value = store.getters["data/getData"]
      console.debug("activate", documentLocalData.value)
      afterPostData()
    })
    // 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
    // stateの更新の完了を検知したいんだけど...
    /** postした後にstoreの後の値を */
    const afterPostData = () => {
      setTimeout(() => checkGetters(), 500)
    }
    const checkGetters = async () => {
      documentLocalData.value = await deepcopy(store.getters["data/getData"])
      console.debug(JSON.stringify(documentLocalData.value))
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
      closeDialog
    }
  },
  components: { UpdateDataDialog }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
