import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { httpEquiv: 'Content-Type', content: 'text/html;charset=utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: '',
      link: [
        {
          rel: 'stylesheet',
          href: '//at.alicdn.com/t/font_3161429_rjm4nb6jgk.css'
        }
      ],
      script: [
        { src: '/tracking/tracking.js' },
        { src: '/tracking/data/face.js' },
        { src: '/tracking/data/eye.js' },
        { src: '/wangEditor.min.js' }
      ]
    }
  },

  // css
  css: ['@/styles/element-plus.scss', '@/styles/main.scss'],

  // build
  build: {
    transpile: ['element-plus/es']
  },

  typescript: {
    strict: true,
    shim: false
  },
  // build modules
  modules: ['@vueuse/nuxt', '@pinia/nuxt'],
  nitro: {
    devProxy: {
      '/gateway': {
        target: 'https://www.baidu.com/',
        changeOrigin: true,
        prependPath: true,
        rewrite: (path) => path.replace(/^\/gateway/, '')
      }
    }
  },
  // auto import components
  components: true,
  // vueuse
  vueuse: {
    ssrHandlers: true
  },
  vite: {
    devBundler: "legacy",
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [IconsResolver({})]
      })
    ]
  }
})
