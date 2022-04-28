<template>
  <div>
    <CardList />
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
