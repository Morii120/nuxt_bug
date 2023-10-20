// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [['nuxt-electron', {}]],
  ssr: false,
  app: {
    baseURL: './',
    buildAssetsDir: '/',
  },
  router: {
    options: {
      hashMode: true,
    },
  },
  runtimeConfig: {
    app: {
      baseURL: './',
      buildAssetsDir: '/',
    },
  },
  electron: {
    build: [
      {
        entry: 'electron/main.ts',
      },
    ],
  },
})
