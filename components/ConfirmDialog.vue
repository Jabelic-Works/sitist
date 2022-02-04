<template>
  <div id="updateDataDialog">
    <v-dialog v-model="openStatus" persistent class="" @close="closeDialog" max-width="290">
      <v-card>
        <v-divider />
        <div class="ma-3">{{ confirmText }}</div>
        <v-divider />
        <v-card-actions>
          <v-btn color="green darken-1" text @click="closeDialog"> Disagree </v-btn>
          <v-spacer />
          <v-btn color="primary" text @click="accept"> accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from "@nuxtjs/composition-api"

export default defineComponent({
  props: { isOpened: { type: Boolean, default: false }, confirmText: { type: String } },
  setup(props) {
    const openStatus = ref(props.isOpened)
    const { emit } = getCurrentInstance()
    watch(
      () => props.isOpened,
      val => (openStatus.value = val)
    )
    const closeDialog = () => {
      emit("closeDialog")
    }
    const accept = () => {
      emit("acceptMethod")
      emit("closeDialog")
    }
    return {
      accept,
      closeDialog,
      openStatus
    }
  }
})
</script>
<style scoped></style>
