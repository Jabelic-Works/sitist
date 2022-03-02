<template>
  <div>
    <Header>
      <template slot="AddInfoDialog">
        <AddInfoDialog
          :isShowAddInfodialog="isShowAddInfodialog"
          :refUserName="refUserName"
          :refUserUid="refUserUid"
          :update="afterPostData"
          @unshowAddInfodialog="unshowAddInfodialog"
        />
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
      <ConfirmDialog
        :is-opened="isShowingUpdateDataDialog"
        @closeDialog="closeDialog"
        @fechData="fData"
        :confirmText="'データを更新しますか？'"
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
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    return {}
  }

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
::v-deep .add-btn {
  position: -webkit-sticky;
  position: sticky;
  left: calc(90%);
}
</style>
