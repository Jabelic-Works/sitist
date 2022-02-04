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
</style>
