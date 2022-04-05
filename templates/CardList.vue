<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header
      class="fixed-bar"
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      :addDataFromHeader="addDataFromHeader"
      :isShowAddInfodialog="isShowAddInfodialog"
      :unshowAddInfodialog="unshowAddInfodialog"
    />
    <v-main class="pa-3">
      <v-container class="mb-10" :class="{ 'mt-2': $vuetify.breakpoint.smAndUp }">
        <!-- <v-row justify="start" class="align-center d-flex justify-space-between"> -->
        <!-- <span class="ml-auto ma-2 my-2" style="font-size: 1.1rem">Hello! {{ refUserName }}</span> -->
        <!-- <span class="mr-auto ma-2"> -->
        <!-- <v-btn to="/sign-in" class="text-non-trans" width="30%" color="gray lighten-5">Sign-in</v-btn> -->
        <!-- </span> -->
        <!-- </v-row> -->
        <div v-if="allCardInformationList" class="d-flex flex-row justify-center flex-wrap pb-4">
          <div v-for="i in 5">
            <div v-for="doc in sitesInfo" :key="doc.key" class="flex-column ma-4">
              <CardComponent
                :cardInfo="doc"
                @updateData="updateData"
                @confirmDeleteCardInformation="confirmDeleteCardInformation"
              />
            </div>
          </div>
        </div>
        <ConfirmDialog
          :is-opened="isShowingUpdateDataDialog"
          @closeDialog="closeDialog"
          @acceptMethod="deleteData"
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
    </v-main>
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
      updateData,
      isShowingUpdateDataDialog,
      closeDialog,
      sitesInfo,
      isShowAddInfodialog,
      unshowAddInfodialog,
      confirmMessage,
      confirmDeleteCardInformation,
      deleteData,
      addDataFromHeader
    } = domain()

    return {
      refUserName,
      refUserUid,
      allCardInformationList,
      updateData,
      deleteData,
      isShowingUpdateDataDialog,
      closeDialog,
      sitesInfo,
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
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0em;
  z-index: 2;
}
</style>
