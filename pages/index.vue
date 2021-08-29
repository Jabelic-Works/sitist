<template>
  <div>
    <Header />
    <div class="" justify="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center"></div>
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

              <!-- <v-col cols="12" md="4">
                <v-text-field
                  v-model="refSubmitUrl"
                  :counter="100"
                  label="url"
                  required
                ></v-text-field>
              </v-col> -->

              <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                label="title"
                required
              ></v-text-field>
            </v-col> -->
            </v-row>
          </v-form>
          <!-- <v-btn @click="submitData" class="text-non-trans">submit</v-btn> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
import Header from '~/components/Header.vue'
export default defineComponent({
  components: { Header },
  //  {}: SetupContext
  setup(_, { root }) {
    const guest = 'Guest'
    const refUserName = ref('')
    watch(
      () => root.$store.getters['auth/getUserName'],
      () => {
        refUserName.value = root.$store.getters['auth/getUserName']
      }
    )
    onMounted(() => {
      refUserName.value = root.$store.getters['auth/getUserName']
    })
    return { guest, refUserName }
  },
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
