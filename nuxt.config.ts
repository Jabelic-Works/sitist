import colors from "vuetify/es5/util/colors"
import Context from "@nuxtjs/vuetify" // for $vuetify
require("dotenv").config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - sitist",
    title: "sitist",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: "@/components", pathPrefix: false },
    { path: "@/templates", pathPrefix: false }
  ], // Auto import の設定

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/composition-api",
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv",
    "@nuxtjs/pwa"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "https://sitist-97169.web.app/"
  },
  privateRuntimeConfig: {
    env_api_key: process.env.FB_API_KEY,
    env_auth_domain: process.env.FB_AUTHDOMAIN,
    env_project_id: process.env.FB_PROJECT_ID,
    env_storage_bucket: process.env.FB_STORAGE_BUCKET,
    env_messaging_sender_id: process.env.FB_MESSAGEING_SENDER_ID,
    env_app_id: process.env.FB_APP_ID,
    env_measurement_id: process.env.FB_MEASUREMENT_ID
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "sitist",
      short_name: "sitist",
      lang: "ja",
      start_url: "/?standalone=true",
      display: "standalone",
      background_color: "#ffffff",
      description: "",
      orientation: "any",
      theme_color: "#fff",
      icons: [
        {
          src: "/android-chrome-36x36.png",
          sizes: "36x36",
          type: "image/png"
        },
        {
          src: "/android-chrome-48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/android-chrome-72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/android-chrome-96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/android-chrome-128x128.png",
          sizes: "128x128",
          type: "image/png"
        },
        {
          src: "/android-chrome-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/android-chrome-152x152.png",
          sizes: "152x152",
          type: "image/png"
        },
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/android-chrome-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.node = {
        fs: "empty"
      }
    }
  },
  router: {
    middleware: "authenticated"
  }
}
