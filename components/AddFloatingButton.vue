<template>
  <div>
    <v-fab-transition>
      <v-btn dark fixed bottom right fab color="#BDBDBD88" class="add-btn">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"

export default defineComponent({
  props: { windowSize: { type: Object as PropType<{ width: number; height: number }> } },
  setup() {}
})
</script>
<style scoped>
.add-btn {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  /* left: calc(90%); */
  left: calc();
}
</style>
