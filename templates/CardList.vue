<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header :refUserName="refUserName" :refUserUid="refUserUid" :addDataFromHeader="addDataFromHeader" />
    <v-container>
      <!-- <div class="" justify="center"> -->
      <v-row justify="start" class="align-center ma-2 d-flex justify-space-between">
        <span class="ml-auto ma-2 my-2" style="font-size: 1.1rem">Hello! {{ refUserName }}</span>
        <span class="mr-auto ma-2">
          <v-btn to="/sign-in" class="text-non-trans" width="30%" color="gray lighten-5">Sign-in</v-btn>
        </span>
        <!-- <v-col
            ><v-btn @click="checkGetters">updateData: 画面の更新</v-btn>
            <v-btn @click="confirmForceFetch">fetchAllData: データの更新</v-btn>
          </v-col> -->
      </v-row>
      <v-row v-if="allCardInformationList">
        <v-col v-for="doc in sitesInfo" :key="doc.key" cols="20">
          <CardComponent
            :cardInfo="doc"
            @afterPostData="afterPostData"
            @afterEditData="afterEditData"
            @confirmDeleteCardInformation="confirmDeleteCardInformation"
          />
        </v-col>
      </v-row>
      <!-- </div> -->

      <ConfirmDialog
        :is-opened="isShowingUpdateDataDialog"
        @closeDialog="closeDialog"
        @acceptMethod="fetchOrDeleteData"
        :confirmText="confirmMessage"
      />
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onActivated, ref, useFetch, useStore, watch } from "@nuxtjs/composition-api"
import { deleteCardInformation } from "~/modules/dataOperations"
import { use } from "~/modules/fetchData"
import { use as domain } from "@/modules/Domain/index"
import { deepcopy } from "~/modules/utils"
import { CardInfo } from "~/types/custom"

export default defineComponent({
  setup() {
    const {
      refUserName,
      refUserUid,
      allCardInformationList,
      afterPostData,
      checkGetters,
      // fData,
      isShowingUpdateDataDialog,
      showDialog,
      closeDialog,
      sitesInfo,
      afterEditData,
      windowSize,
      isShowAddInfodialog,
      showAddInfodialog,
      unshowAddInfodialog
    } = domain()
    watch(
      () => isShowAddInfodialog,
      val => {
        console.debug(val)
      }
    )
    // const refUserName = ref("")
    // const refUserUid = ref("")
    // const allCardInformationList = ref<{ data: CardInfo }>()
    // const sitesInfo = ref([])
    const store = useStore()
    const { fetchAllData, addData } = use()

    // すでにstoreにデータがある場合は再取得はボタンで行う(回数制限/有料制にする？)
    // const { $fetchState } = useFetch(() => {
    //   refUserUid.value = store.getters["auth/getUserUid"]
    //   if (refUserUid.value) {
    //     allCardInformationList.value = store.getters["data/getAllData"] // データがある場合
    //     console.debug("useFetch", allCardInformationList.value)
    //     // データがない場合
    //     // データを追加していない人だけがサーバーへのアクセスが増える、だめだこれ
    //     if (Object.keys(allCardInformationList.value).length === 0) {
    //       console.debug("data is empty")
    //       allCardInformationList.value = fetchAllData(refUserUid.value)
    //       store.dispatch("data/setAllData", allCardInformationList.value)
    //     }
    //   }
    // })
    // // ユーザーが変わった場合
    // watch(
    //   () => store.getters["auth/getUserUid"],
    //   () => {
    //     if (refUserUid.value !== store.getters["auth/getUserUid"]) {
    //       refUserName.value = store.getters["auth/getUserName"]
    //       refUserUid.value = store.getters["auth/getUserUid"]
    //     }
    //   }
    // )
    // // データが更新された場合
    // watch(
    //   () => store.getters["data/getAllData"],
    //   () => {
    //     allCardInformationList.value = deepcopy(store.getters["data/getAllData"])
    //   }
    // )
    // nextTick(async () => {
    //   allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
    //   console.debug("nextTick", allCardInformationList.value)
    // })
    // onActivated(() => {
    //   refUserName.value = store.getters["auth/getUserName"]
    //   refUserUid.value = store.getters["auth/getUserUid"]
    //   allCardInformationList.value = store.getters["data/getAllData"]
    //   console.debug("activate", allCardInformationList.value)
    //   afterPostData()
    // })

    // // FIXME: watchでstoreを監視して、checkGettersして良いのでは？
    // /** postした後にstoreの後の値を変更してから画面に反映 */
    // const afterPostData = () => {
    //   setTimeout(() => checkGetters(), 500)
    // }
    // const afterEditData = () => {
    //   setTimeout(() => checkGetters(), 500)
    // }

    // /** storeからデータを取ってくる */
    // const checkGetters = async () => {
    //   allCardInformationList.value = await deepcopy(store.getters["data/getAllData"])
    //   console.debug(JSON.stringify(allCardInformationList.value))
    //   let tmpArray = []
    //   for (const [key, value] of Object.entries(allCardInformationList.value)) {
    //     tmpArray.push({ key, data: value.data })
    //   }
    //   sitesInfo.value = tmpArray
    // }
    // const isShowingUpdateDataDialog = ref(false)

    /** temporally unused. */
    // const confirmForceFetch = () => {
    //   statusOfConfirmDialog.value = "forceFetch"
    //   isShowingUpdateDataDialog.value = true
    //   confirmMessage.value = "データを更新しますか？"
    // }
    const confirmMessage = ref("カードを消去しますか？")

    /** カードのゴミ箱アイコンで発火 */
    const confirmDeleteCardInformation = (cardInfo: CardInfo) => {
      statusOfConfirmDialog.value = "deleteData"
      confirmMessage.value = "カードを消去しますか？"
      isShowingUpdateDataDialog.value = true
      deletedCardInfo.value = cardInfo
    }

    /** possible deleted data(when show confirm dialog) */
    const deletedCardInfo = ref<CardInfo>()

    const deleteCard = (info: CardInfo) => {
      deleteCardInformation(info, store)
      afterPostData()
    }
    // const closeDialog = () => {
    //   isShowingUpdateDataDialog.value = false
    // }

    type modeOfConfirmDialog = "forceFetch" | "deleteData"
    /** comfirmDialogで叩くmethodの中身の切り替えのためのStatusフラグ */
    const statusOfConfirmDialog = ref<modeOfConfirmDialog>("forceFetch")

    /** confirmDialogでacceptした時に発火するmethod */
    const fetchOrDeleteData = async () => {
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

    /** Headerの+ボタン経由で開かれるダイアログ */
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
      refUserName,
      refUserUid,
      allCardInformationList,
      afterPostData,
      // checkGetters,
      fetchOrDeleteData,
      isShowingUpdateDataDialog,
      // confirmForceFetch,
      closeDialog,
      sitesInfo,
      afterEditData,
      addDataFromHeader,
      confirmDeleteCardInformation,
      confirmMessage
    }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
