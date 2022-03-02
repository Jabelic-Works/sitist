<template>
  <div>
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import CardList from "~/templates/CardList.vue"

export default defineComponent({
  setup() {
    return {}
  },
  components: { CardList }
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
