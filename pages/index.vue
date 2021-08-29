<template>
  <div>
    <Header :refUserName="refUserName" :refUserUid="refUserUid" />
    <div class="" justify="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center"></div>
          <h3>hello, {{ refUserName ? refUserName : guest }}</h3>
        </v-col>
        <v-btn @click="checkLocalData"> hoge </v-btn>
      </v-row>
      <v-row>
        <v-col v-for="doc in documentLocalData" :key="doc.id" cols="12">
          hoge
          <v-card>
            <v-card-title> data: {{ doc.data }} </v-card-title>
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
} from '@nuxtjs/composition-api'
import { firestoreFetchData } from '@/modules/fetchData'

export default defineComponent({
  //  {}: SetupContext
  setup(_) {
    const guest = 'Guest'
    const refUserName = ref('')
    const refUserUid = ref('')
    const documentLocalData = ref<any>({})
    const { store } = useContext()
    const { fetchAllData, fetchData } = firestoreFetchData(
      refUserUid.value,
      store
    )
    const { $fetch } = useFetch(() => {
      // store.dispatch('data/setAllData', store.getters['auth/getUserUid'])
      // console.debug(
      //   store.getters['auth/getUserUid'],
      //   store.getters['data/getData']
      // )
    })
    watch(
      () => store.getters['auth/getUserName'],
      () => {
        refUserName.value = store.getters['auth/getUserName']
        refUserUid.value = store.getters['auth/getUserUid']
        store.dispatch('data/setAllData', refUserUid.value).then(() => {
          documentLocalData.value = store.getters['data/getData']
          console.debug(documentLocalData.value)
        })
      }
    )
    onBeforeMount(() => {
      refUserName.value = store.getters['auth/getUserName']
      refUserUid.value = store.getters['auth/getUserUid']
    })
    onMounted(() => {
      // refUserName.value = root.$store.getters['auth/getUserName']
      // store.dispatch('data/setAllData', refUserUid.value)
      // documentLocalData.value = store.getters['data/getData']
      // if (refUserUid.value) {
      //   console.debug('mounted.....')
      //   docRef.value = db
      //     .collection('userdata')
      //     .doc(refUserUid.value)
      //     .collection('data')
      //   // 全件取得
      //   docRef.value
      //     .get()
      //     .then((querySnapshot: any) => {
      //       console.debug('Data:', querySnapshot.data)
      //       querySnapshot.forEach((doc: any) => {
      //         console.log(doc.id, ' => ', doc.data())
      //         documentLocalData.value[doc.id] = doc.data()
      //       })
      //       console.debug(documentLocalData.value)
      //       store.dispatch('data/setAllData', documentLocalData.value)
      //     })
      //     .catch((error: string) => {
      //       console.log('Error getting cached document:', error)
      //     })
      // }
    })
    const checkLocalData = () => {
      // store.dispatch('data/setAllData', refUserUid.value)
      console.debug(
        documentLocalData.value,
        store.getters['data/getData'],
        refUserUid.value
      )
    }
    return { guest, refUserName, refUserUid, documentLocalData, checkLocalData }
  },
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
