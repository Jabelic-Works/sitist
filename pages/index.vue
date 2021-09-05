<template>
  <div>
    <Header
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      :updateData="updateData"
    />
    <div class="" justify="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center"></div>
          <h3>hello, {{ refUserName ? refUserName : guest }}</h3>
          <v-btn @click="checkGetters">updateData</v-btn>
          <v-btn @click="fData">fetchAllData</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="documentLocalData">
        <v-col v-for="doc in documentLocalData" :key="doc.id" cols="12">
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
  useContext,
  useFetch,
  onActivated,
  nextTick,
} from '@nuxtjs/composition-api'
import { use } from '@/modules/fetchData'
export default defineComponent({
  setup() {
    const guest = 'Guest'
    const refUserName = ref('')
    const refUserUid = ref('')
    const documentLocalData = ref<any>({})
    const { store } = useContext()
    const { fetchAllData } = use()

    //　すでにstoreにデータがある場合は再取得はボタンで行う(回数制限/有料制にする？)
    const { $fetch } = useFetch(() => {
      refUserUid.value = store.getters['auth/getUserUid']
      if (refUserUid.value) {
        documentLocalData.value = store.getters['data/getData'] //データがある場合
        console.debug('useFetch', documentLocalData.value)
        //データがない場合
        // データを追加していない人だけがサーバーへのアクセスが増える、だめだこれ
        if (Object.keys(documentLocalData.value).length === 0) {
          console.debug('data is empty')
          // fetch
          documentLocalData.value = fetchAllData(refUserUid.value)
          store.dispatch('data/setAllData', documentLocalData.value)
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
        documentLocalData.value = deepcopy(store.getters['data/getData'])
      }
    )
    nextTick(async () => {
      documentLocalData.value = deepcopy(store.getters['data/getData'])
      console.debug('nextTick', documentLocalData.value)
    })
    onActivated(() => {
      refUserName.value = store.getters['auth/getUserName']
      refUserUid.value = store.getters['auth/getUserUid']
      documentLocalData.value = store.getters['data/getData']
      console.debug('activate', documentLocalData.value)
    })

    const checkLocalData = () => {
      console.debug(
        JSON.stringify(documentLocalData.value),
        store.getters['data/getData'],
        refUserUid.value
      )
    }

    // 多分storeの更新を待たなきゃいけない, watchではうまく動かない。
    // stateの更新の完了を検知したいんだけど...
    const updateData = async () => {
      setTimeout(() => checkGetters(), 500)
    }
    // store.watch(
    //   (state) => {
    //     return state.data
    //   },
    //   (val) => {
    //     console.debug('store.watch: ', val)
    //   }
    // )
    const deepcopy = (objs: any) => {
      return [objs].map((obj: any) => ({ ...obj }))[0]
    }
    const checkGetters = async () => {
      documentLocalData.value = deepcopy(store.getters['data/getData'])
      // deepcopyするようになったら fetch -> updatedataで表示されるようになった
      console.debug(JSON.stringify(documentLocalData.value)) //fetchの時は{}になってしまうなぁ
    }

    const fData = async () => {
      await store.dispatch('data/setAllData', fetchAllData(refUserUid.value))
      setTimeout(() => checkGetters(), 500)
    }

    return {
      guest,
      refUserName,
      refUserUid,
      documentLocalData,
      checkLocalData,
      updateData,
      checkGetters,
      fetchAllData,
      fData,
      deepcopy,
    }
  },
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
