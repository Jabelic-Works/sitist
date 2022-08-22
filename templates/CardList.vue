<template>
  <div class="card-list">
    <!-- FIXME: Headerはpages/indexに移動 -->
    <Header
      class="fixed-bar"
      :ref-user-uid="userInfo.uid"
      :add-data-from-header="addDataFromHeader"
      :is-show-add-info-dialog="isShowAddInfoDialog"
      :un-show-add-info-dialog="unShowAddInfoDialog"
    />
    <v-main class="pa-3">
      <v-container class="mb-10" :class="{ 'mt-2': $vuetify.breakpoint.smAndUp }">
        <div v-if="allCardInformationList" class="d-flex flex-row justify-center flex-wrap pb-4">
          <div
            v-for="doc in sitesInfo"
            :key="doc.key"
            class="flex-column"
            :class="{ 'ma-4': $vuetify.breakpoint.smAndUp, 'ma-1': $vuetify.breakpoint.xs }"
          >
            <CardComponent
              :card-info="doc"
              @updateData="updateData"
              @confirmDeleteCardInformation="confirmDeleteCardInformation"
            />
          </div>
        </div>
        <ConfirmDialog
          :is-opened="isShowingUpdateDataDialog"
          :confirm-text="confirmMessage"
          @closeDialog="closeDialog"
          @acceptMethod="deleteData"
        />
        <AddInfoDialog
          :kinds="'floating'"
          :is-show-add-info-dialog="isShowAddInfoDialog"
          :user-info="userInfo"
          :add-data-from-header="addDataFromHeader"
          @unShowAddInfoDialog="unShowAddInfoDialog"
        />
      </v-container>
    </v-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { use as domain } from "@/modules/_domain/cardList/viewModels"
export default defineComponent({
  setup() {
    const {
      userInfo,
      allCardInformationList,
      updateData,
      isShowingUpdateDataDialog,
      closeDialog,
      sitesInfo,
      isShowAddInfoDialog,
      unShowAddInfoDialog,
      confirmMessage,
      confirmDeleteCardInformation,
      deleteData,
      addDataFromHeader
    } = domain()

    return {
      userInfo,
      allCardInformationList,
      updateData,
      deleteData,
      isShowingUpdateDataDialog,
      closeDialog,
      sitesInfo,
      addDataFromHeader,
      confirmDeleteCardInformation,
      confirmMessage,
      isShowAddInfoDialog,
      unShowAddInfoDialog
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
