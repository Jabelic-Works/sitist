<template>
  <v-app-bar app absolute collapse-on-scroll color="primary lighten-1">
    <v-app-bar-title>
      <nuxt-link to="/" style="text-decoration: none; color: inherit">
        <v-btn text exact class="text-non-trans">
          <span style="font-size: 1.5rem"> Sitist</span>
        </v-btn>
      </nuxt-link>
    </v-app-bar-title>
    <nuxt-link to="/sign-in" style="text-decoration: none; color: inherit">
      <v-avatar color="grey" :size="$vuetify.breakpoint.smAndUp ? '56' : '40'">
        <img v-if="photoUrl" :src="photoUrl" alt="user photo" />
      </v-avatar>
    </nuxt-link>
    <v-spacer />
    <AddInfoDialog
      :ref-user-name="refUserName"
      :ref-user-uid="refUserUid"
      :add-data-from-header="addDataFromHeader"
      :is-show-add-infodialog="isShowAddInfodialog"
      @unshowAddInfodialog="unshowAddInfodialog"
    />
    <SearchCard />
  </v-app-bar>
</template>

<script lang="ts">
import { nextTick } from "process"
import { defineComponent, PropType, ref, useStore } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    refUserName: String,
    refUserUid: String,
    addDataFromHeader: {
      type: Function as PropType<(urlString: string, titleString?: string) => void>
    },
    isShowAddInfodialog: {
      type: Boolean,
      required: true
    },
    unshowAddInfodialog: {
      type: Function,
      required: true
    }
  },
  setup(props, { emit }) {
    const photoUrl = ref("")
    const store = useStore()
    nextTick(() => {
      photoUrl.value = store.getters["auth/getUserPhotoUrl"]
    })
    return { photoUrl }
  }
})
</script>

<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
