import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  ssr: false,
  modules: ["@pinia/nuxt"],

  css: [
    "~/assets/scss/index.scss",
    "~/assets/css/common.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.myeats.me/',
    },
  },
});
