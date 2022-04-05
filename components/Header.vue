<template>
  <v-app-bar app absolute collapse-on-scroll color="primary lighten-1">
    <v-app-bar-title>
      <nuxt-link to="/" style="text-decoration: none; color: inherit">
        <v-btn text exact class="text-non-trans"> <span style="font-size: 1.5rem"> Sitist</span></v-btn>
      </nuxt-link>
    </v-app-bar-title>
    <v-spacer />
    <AddInfoDialog
      :refUserName="refUserName"
      :refUserUid="refUserUid"
      :addDataFromHeader="addDataFromHeader"
      :isShowAddInfodialog="isShowAddInfodialog"
      @unshowAddInfodialog="unshowAddInfodialog"
    />
    <SearchCard />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api"

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
    const collapseOnScroll = ref(true)
    return { collapseOnScroll }
  }
})
</script>

<style scoped>
.text-non-trans {
  text-transform: none;
}
</style>
