<template>
  <div id="updateDataDialog">
    <v-dialog v-model="openStatus" persistent class="" @close="_closeDialog" max-width="290">
      <v-card>
        <v-divider />
        <div class="ma-3">データを更新しますか？</div>
        <v-divider />
        <v-card-actions>
          <v-btn color="green darken-1" text @click="_closeDialog"> Disagree </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="accept"> accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@nuxtjs/composition-api"

export default defineComponent({
  props: { isOpened: { type: Boolean, default: false } },
  setup(props, { emit }) {
    const openStatus = ref(props.isOpened)
    watch(
      () => props.isOpened,
      val => (openStatus.value = val)
    )
    const _closeDialog = () => {
      emit("closeDialog")
    }
    const accept = () => {
      emit("fechData")
      emit("closeDialog")
    }
    return {
      accept,
      _closeDialog,
      openStatus
    }
  }
})
</script>
<style scoped></style>
