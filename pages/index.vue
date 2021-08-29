<template>
  <div>
    <Header
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      @updateData="updateData"
    />
    <div class="" justify="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center"></div>
          <h3>hello, {{ refUserName ? refUserName : guest }}</h3>
        </v-col>
      </v-row>
      <v-row v-if="documentLocalData">
        <v-col v-for="doc in documentLocalData" :key="doc.data.url" cols="12">
          <v-card>
            <v-card-title> data: {{ doc.data }} </v-card-title>
            <v-card-subtitle> data: {{ doc }} </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  onMounted,
  useContext,
  useFetch,
  onBeforeMount,
  onActivated,
  nextTick,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import { firestoreFetchData } from '@/modules/fetchData'
import { db } from '~/plugins/firebase'
export default defineComponent({
  //  {}: SetupContext
  setup(_) {
    const guest = 'Guest'
    const refUserName = ref('')
    const refUserUid = ref('')
    const documentLocalData = ref<any>({})
    const { store } = useContext()
    // const { fetchAllData, fetchData } = firestoreFetchData(
    //   refUserUid.value,
    //   store
    // )
    const { $fetch } = useFetch(() => {
      refUserUid.value = store.getters['auth/getUserUid']
      if (refUserUid.value) {
        // store.dispatch('data/setAllData', store.getters['auth/getUserUid'])
        documentLocalData.value = store.getters['data/getData']
        console.debug('useFetch', documentLocalData.value)
        if (Object.keys(documentLocalData.value).length === 0) {
          console.debug('data is empty')
          store.dispatch('data/setAllData', refUserUid.value)
          documentLocalData.value = store.getters['data/getData']
        }
      }
    })
    // ユーザーが変わった場合
    watch(
      () => store.getters['auth/getUserUid'],
      () => {
        if (refUserUid.value !== store.getters['auth/getUserUid']) {
          refUserName.value = store.getters['auth/getUserName']
          refUserUid.value = store.getters['auth/getUserUid']
          // store.dispatch('data/setAllData', refUserUid.value).then(() => {
          //   documentLocalData.value = store.getters['data/getData']
          //   console.debug('watch getUserName > data:', documentLocalData.value)
          // })
        }
      }
    )
    // データが更新された場合
    watch(
      () => store.getters['data/getData'],
      () => {
        documentLocalData.value = store.getters['data/getData']
      }
    )
    nextTick(async () => {
      documentLocalData.value = store.getters['data/getData']
      console.debug('nextTick', documentLocalData.value)
    })
    // onBeforeMount(() => {
    //   refUserName.value = store.getters['auth/getUserName']
    //   refUserUid.value = store.getters['auth/getUserUid']
    //   documentLocalData.value = store.getters['data/getData']
    // })
    onActivated(() => {
      refUserName.value = store.getters['auth/getUserName']
      refUserUid.value = store.getters['auth/getUserUid']
      documentLocalData.value = store.getters['data/getData']
      console.debug('activate', documentLocalData.value)
    })
    // onBeforeUnmount(() => {
    //   refUserName.value = store.getters['auth/getUserName']
    //   refUserUid.value = store.getters['auth/getUserUid']
    //   documentLocalData.value = store.getters['data/getData']
    // })
    const checkLocalData = () => {
      console.debug(
        documentLocalData.value,
        store.getters['data/getData'],
        refUserUid.value
      )
    }
    const updateData = () => {
      store.dispatch('data/setAllData', refUserUid.value)
      documentLocalData.value = store.getters['data/getData']
      console.debug('update data!', documentLocalData.value)
    }

    return {
      guest,
      refUserName,
      refUserUid,
      documentLocalData,
      checkLocalData,
      updateData,
    }
  },
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
