<template>
  <div class="" justify="center">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">ほげ！</div>
        <h3>hello, {{ refUserName ? refUserName : guest }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-row>
            <!-- <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="Name"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
        </v-col> -->

            <v-col cols="12" md="4">
              <v-text-field
                v-model="refSubmitUrl"
                :counter="100"
                label="url"
                required
              ></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                label="title"
                required
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-form>
        <v-btn @click="submitData">submit</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { db } from '~/plugins/firebase'
export default defineComponent({
  setup(_, { root }) {
    const guest = 'Guest'
    const refUserName = ref('')
    const refUserUid = ref('')
    const refSubmitUrl = ref('')
    onMounted(() => {
      console.debug('mounted!!')
      refUserName.value = root.$store.getters['auth/getUserName']
      refUserUid.value = root.$store.getters['auth/getUserUid']
      console.debug('user name: ', refUserName.value)
    })
    watch(
      () => root.$store.getters['auth/getUserName'],
      () => {
        refUserName.value = root.$store.getters['auth/getUserName']
        refUserUid.value = root.$store.getters['auth/getUserUid']
      }
    )
    const submitData = () => {
      const data = {
        data: {
          URL: refSubmitUrl.value,
          title: '',
          OGP: '',
          description: ''
        }
      }
      /** ここでfirestoreにdataを登録 */
      db.collection('userdata').doc(refUserUid.value).collection('data').add(data)
    }
    return { guest, refUserName, refSubmitUrl, submitData }
  },
})
</script>
