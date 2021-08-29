<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="" dark v-bind="attrs" v-on="on" icon>
            <!-- Open Dialog -->
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-center">
            <span class="headline">Add Page</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field label="URL" required v-model="url"></v-text-field>
              </v-row>
            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api'
import { db } from '~/plugins/firebase'
export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
  },
  setup(props, { root }) {
    const dialog = ref(false)
    const url = ref('')
    const closeDialog = () => {
      // TODO: urlを取得, moduleでscrayping, title, OGP,etc...を取得
      // TODO: moduleから{title, OGP}を取得, firestoreに格納
      // TODO: firestoreにaddする処理をmodule切り出し
      if (url.value) submitData(url.value)
      dialog.value = false
    }
    onMounted(() => {
      console.debug('mounted!!')
      // if (props.refUserName)
      //   props.refUserName.value = root.$store.getters['auth/getUserName']
      // if (props.refUserUid)
      //   props.refUserUid.value = root.$store.getters['auth/getUserUid']
      // console.debug('user name: ', props.refUserName.value)
    })
    // watch(
    //   () => root.$store.getters['auth/getUserName'],
    //   () => {
    //     // props.refUserName.value = root.$store.getters['auth/getUserName']
    //     // props.refUserUid.value = root.$store.getters['auth/getUserUid']
    //   }
    // )
    const submitData = (url: string) => {
      const data = {
        data: {
          URL: url,
          title: '',
          OGP: '',
          description: '',
        },
      }
      const uid = props.refUserUid
      if (props.refUserUid) root.$store.dispatch('data/setData', { data, uid })
    }

    return { dialog, url, closeDialog }
  },
})
</script>
