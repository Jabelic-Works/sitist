<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header :refUserName="refUserName" :refUserUid="refUserUid" :addDataFromHeader="addDataFromHeader" />
    <v-container>
      <v-row justify="start" class="align-center ma-2 d-flex justify-space-between">
        <span class="ml-auto ma-2 my-2" style="font-size: 1.1rem">Hello! {{ refUserName }}</span>
        <span class="mr-auto ma-2">
          <v-btn to="/sign-in" class="text-non-trans" width="30%" color="gray lighten-5">Sign-in</v-btn>
        </span>
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
      <AddInfoDialog
        :kinds="'floating'"
        :isShowAddInfodialog="isShowAddInfodialog"
        :refUserName="refUserName"
        :refUserUid="refUserUid"
        :update="afterPostData"
        @unshowAddInfodialog="unshowAddInfodialog"
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
      // showDialog,
      closeDialog,
      sitesInfo,
      afterEditData,
      // windowSize,
      isShowAddInfodialog,
      // showAddInfodialog,
      unshowAddInfodialog
    } = domain()

    const store = useStore()
    const { fetchAllData, addData } = use()

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
      confirmMessage,
      isShowAddInfodialog,
      unshowAddInfodialog
    }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
