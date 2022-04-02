<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      :addDataFromHeader="addDataFromHeader"
      :isShowAddInfodialog="isShowAddInfodialog"
      :unshowAddInfodialog="unshowAddInfodialog"
    />
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
        :addDataFromHeader="addDataFromHeader"
        @unshowAddInfodialog="unshowAddInfodialog"
      />
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { use as domain } from "~/modules/Domain/viewModel/index"

export default defineComponent({
  setup() {
    const {
      refUserName,
      refUserUid,
      allCardInformationList,
      afterPostData,
      checkGetters,
      isShowingUpdateDataDialog,
      closeDialog,
      sitesInfo,
      afterEditData,
      isShowAddInfodialog,
      unshowAddInfodialog,
      confirmMessage,
      confirmDeleteCardInformation,
      statusOfConfirmDialog,
      fetchOrDeleteData,
      addDataFromHeader
    } = domain()

    return {
      refUserName,
      refUserUid,
      allCardInformationList,
      afterPostData,
      fetchOrDeleteData,
      isShowingUpdateDataDialog,
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
