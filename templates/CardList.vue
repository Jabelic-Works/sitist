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
            <v-btn @click="comfirmForceFetch">fetchAllData: データの更新</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="allCardInformationList">
          <v-col v-for="doc in sitesInfo" :key="doc.key" cols="20">
            <CardComponent
              :cardInfo="doc"
              @afterPostData="afterPostData"
              @afterEditData="afterEditData"
              @comfirmDeleteCardInformation="comfirmDeleteCardInformation"
            />
          </v-col>
        </v-row>
      </div>

      <ConfirmDialog
        :is-opened="isShowingUpdateDataDialog"
        @closeDialog="closeDialog"
        @acceptMethod="acceptMethod"
        :confirmText="'データを更新しますか？'"
      />
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onActivated, ref, useFetch, useStore, watch } from "@nuxtjs/composition-api"
import { deleteCardInformation } from "~/modules/dataOperations"
import { use } from "~/modules/fetchData"
import { deepcopy } from "~/modules/utils"
import { CardInfo } from "~/types/custom"

export default defineComponent({
  setup() {
    const guest = "Guest"
    const refUserName = ref("")
    const refUserUid = ref("")
    const allCardInformationList = ref<{ data: CardInfo }>()
    const sitesInfo = ref([])
    const store = useStore()
    const { fetchAllData, addData } = use()
    // すでにstoreにデータがある場合は再取得はボタンで行う(回数制限/有料制にする？)
    const { $fetchState } = useFetch(() => {
      refUserUid.value = store.getters["auth/getUserUid"]
      if (refUserUid.value) {
        allCardInformationList.value = store.getters["data/getAllData"] // データがある場合
        console.debug("useFetch", allCardInformationList.value)
        // データがない場合
        // データを追加していない人だけがサーバーへのアクセスが増える、だめだこれ
        if (Object.keys(allCardInformationList.value).length === 0) {
          console.debug("data is empty")
          allCardInformationList.value = fetchAllData(refUserUid.value)
          store.dispatch("data/setAllData", allCardInformationList.value)
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
        allCardInformationList.value = deepcopy(store.getters["data/getAllData"])
      }
    )
    nextTick(async () => {
      allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
      console.debug("nextTick", allCardInformationList.value)
    })
    onActivated(() => {
      refUserName.value = store.getters["auth/getUserName"]
      refUserUid.value = store.getters["auth/getUserUid"]
      allCardInformationList.value = store.getters["data/getAllData"]
      console.debug("activate", allCardInformationList.value)
      afterPostData()
    })

    /** postした後にstoreの後の値を */
    const afterPostData = () => {
      setTimeout(() => checkGetters(), 500)
    }
    const afterEditData = () => {
      setTimeout(() => checkGetters(), 500)
    }

    const checkGetters = async () => {
      allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
      console.debug(JSON.stringify(allCardInformationList.value))
      let tmpArray = []
      for (const [key, value] of Object.entries(allCardInformationList.value)) {
        tmpArray.push({ key, data: value.data })
      }
      sitesInfo.value = tmpArray
    }
    const isShowingUpdateDataDialog = ref(false)

    const comfirmForceFetch = () => {
      statusOfConfirmDialog.value = "forceFetch"
      isShowingUpdateDataDialog.value = true
    }
    const comfirmDeleteCardInformation = (cardInfo: CardInfo) => {
      statusOfConfirmDialog.value = "deleteData"
      isShowingUpdateDataDialog.value = true
      deletedCardInfo.value = cardInfo
    }
    const deletedCardInfo = ref<CardInfo>()
    const deleteCard = (info: CardInfo) => {
      deleteCardInformation(info, store)
      afterPostData()
    }
    const closeDialog = () => {
      isShowingUpdateDataDialog.value = false
    }

    type modeOfConfirmDialog = "forceFetch" | "deleteData"
    const statusOfConfirmDialog = ref<modeOfConfirmDialog>("forceFetch")
    const acceptMethod = async () => {
      // 強制fetchの時
      if (statusOfConfirmDialog.value == "forceFetch") {
        await store.dispatch("data/setAllData", fetchAllData(refUserUid.value))
      }
      // データの削除
      else if (deletedCardInfo.value) {
        deleteCard(deletedCardInfo.value)
      }
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
      let allCardInformationList = {}
      if (refUserUid.value) {
        console.debug(refUserUid.value, "add data:", data)
        allCardInformationList = addData(data, refUserUid.value)
        console.debug("new data", allCardInformationList)
        store.dispatch("data/setAllData", allCardInformationList).finally(() => {
          afterPostData()
        })
      }
    }

    return {
      guest,
      refUserName,
      refUserUid,
      allCardInformationList,
      afterPostData,
      checkGetters,
      acceptMethod,
      isShowingUpdateDataDialog,
      comfirmForceFetch,
      closeDialog,
      sitesInfo,
      afterEditData,
      addDataFromHeader,
      comfirmDeleteCardInformation
    }
  }
})
</script>
<style lang="sass" scoped></style>
