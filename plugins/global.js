import { handleNavigate } from '@/utils/utils'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.globalProperties.handleNavigate = handleNavigate
})
