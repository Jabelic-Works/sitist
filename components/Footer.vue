<template>
  <div>
    <v-footer color="primary lighten-1" padless fixed>
      <v-row justify="center" no-gutters class="d-flex justify-space-around">
        <v-btn
          v-for="link in linksInFooter"
          :key="link.title"
          :to="link.link"
          color="white"
          text
          raised
          exact
          min
          min-width="40%"
          class="ma-1 text-non-trans white--text"
          :class="{ 'button-block': link.link !== '/', 'button-block-home': link.link === '/' }"
        >
          {{ link.title }}
        </v-btn>
      </v-row>
    </v-footer>
  </div>
</template>
<script lang="ts">
import { useRoute, computed, defineComponent, useStore } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore()
    const user = store.getters["auth/getUserUid"]

    const linksInFooter = computed(() => {
      if (route.value.path === "/" && !user) {
        // Userなし.しかしおそらくこのケースはない(sign in にredirectされるから)
        return [
          {
            title: "Sign in",
            link: "/sign-in"
          },
          { title: "What's Sitist?", link: "/info" }
        ]
      } else if (route.value.path === "/") {
        return [
          {
            title: "Switch Account",
            link: "/sign-in"
          },
          { title: "What's Sitist?", link: "/info" }
        ]
      } else if (route.value.path === "/info" && !user) {
        // Userなし.しかしおそらくこのケースはない(sign in にredirectされるから)
        return [
          {
            title: "Switch Account",
            link: "/sign-in"
          },
          { title: "What's Sitist?", link: "/info" }
        ]
      } else if (route.value.path === "/info") {
        return [
          {
            title: "Sign in",
            link: "/sign-in"
          },
          { title: "Home", link: "/" }
        ]
      } else {
        // Sign-in
        return [
          {
            title: "Home",
            link: "/"
          }
        ]
      }
    })
    return {
      linksInFooter
    }
  }
})
</script>
<style scoped>
.text-non-trans {
  text-transform: none;
}
.button-block {
  outline-style: solid;
  outline-width: 1px;
}
.button-block-home {
  outline-style: double;
  outline-width: 4px;
}
</style>
