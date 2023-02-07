import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus, { size: 'small', locale: zhCn })
})
