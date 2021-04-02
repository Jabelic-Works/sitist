<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">ほげ！</div>
      <div> hello, {{ guest }} {{userName }}</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
export default defineComponent({
  setup(_, { root }) {
    const guest = '{{ Guest }}'
    const userName = ref('')
    watch(()=>root.$store.getters.getUserName, ()=>{
      console.debug('mounted!!')
      userName.value = root.$store.getters.getUserName
      console.debug(userName.value)
    })
    computed(()=>{
      console.debug('mounted!!')
      userName.value = root.$store.getters.getUserName
      console.debug(userName.value)
    })
    return { guest, userName }
  },
})
</script>
