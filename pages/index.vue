<template>
  <div>
    <Header>
      <template slot="AddInfoDialog">
        <AddInfoDialog :refUserName="refUserName" :refUserUid="refUserUid" :update="afterPostData" />
      </template>
    </Header>
    <v-container>
      <div class="" justify="center">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <div class="text-center"></div>
            <h3>hello, {{ refUserName }}</h3>
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
      <v-fab-transition>
        <v-btn dark fixed bottom right fab color="#BDBDBD88" class="add-btn">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <ConfirmDialog
        :is-opened="isShowingUpdateDataDialog"
        @closeDialog="closeDialog"
        @fechData="fData"
        :confirmText="'データを更新しますか？'"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { use } from "@/modules/Domain/index"
import AddFloatingButton from "~/components/AddFloatingButton.vue"

export default defineComponent({
  setup() {
    const {
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
      windowSize
    } = use()
    return {
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
      windowSize
    }
  },
  components: { AddFloatingButton }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
.add-btn {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  left: calc(90%);
}
</style>
