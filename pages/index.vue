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
                :counter="10"
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
        <v-btn>submit</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
export default defineComponent({
  setup(_, { root }) {
    const guest = 'Guest'
    const userName = ref('')
    const submitUrl = ref('')
    onMounted(() => {
      console.debug('mounted!!')
      userName.value = root.$store.getters['auth/getUserName']
      console.debug('user name: ', userName.value)
    })
    watch(
      () => root.$store.getters['auth/getUserName'],
      () => {
        userName.value = root.$store.getters['auth/getUserName']
      }
    )
    return { guest, userName, submitUrl }
  },
})
</script>
