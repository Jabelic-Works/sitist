<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">ほげ！</div>
      <h3> hello, {{ userName ? userName : guest }}</h3>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
export default defineComponent({
  setup(_, { root }) {
    const guest = 'Guest'
    const userName = ref('')

    onMounted(()=>{
      console.debug('mounted!!')
      userName.value = root.$store.getters['auth/getUserName']
      console.debug('user name: ', userName.value)
    })
    watch(()=>root.$store.getters['auth/getUserName'], ()=>{
      userName.value = root.$store.getters['auth/getUserName']
    })
    return { guest, userName }
  },
})
</script>
