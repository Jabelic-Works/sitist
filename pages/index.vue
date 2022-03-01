<template>
  <div>
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "@nuxtjs/composition-api"
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
      windowSize,
      isShowAddInfodialog,
      showAddInfodialog,
      unshowAddInfodialog
    } = use()
    watch(
      () => isShowAddInfodialog,
      val => {
        console.debug(val)
      }
    )
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
      windowSize,
      isShowAddInfodialog,
      showAddInfodialog,
      unshowAddInfodialog
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
::v-deep .add-btn {
  position: -webkit-sticky;
  position: sticky;
  left: calc(90%);
}
</style>
