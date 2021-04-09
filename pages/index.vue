<template>
  <div class="" justify="center">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">ほげ！</div>
        <h3>hello, {{ userName ? userName : guest }}</h3>
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
                v-model="submitUrl"
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
    const userName = ref('')
    const userUid = ref('')
    const submitUrl = ref('')
    onMounted(() => {
      console.debug('mounted!!')
      userName.value = root.$store.getters['auth/getUserName']
      userUid.value = root.$store.getters['auth/getUserUid']
      console.debug('user name: ', userName.value)
    })
    watch(
      () => root.$store.getters['auth/getUserName'],
      () => {
        userName.value = root.$store.getters['auth/getUserName']
        userUid.value = root.$store.getters['auth/getUserUid']
      }
    )
    const submitData = () => {
      const data = {
        // userName: userName.value,
        data: {
          URL: submitUrl.value,
          // title: ''
        },
      }
      /** ここでfirestoreにdataを登録 */
      db.collection('userdata').doc(userUid.value).set(data)
    }
    return { guest, userName, submitUrl, submitData }
  },
})
</script>
