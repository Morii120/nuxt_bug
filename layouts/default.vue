<template>
  <div id="app">
    <div :class="{'header-border':hasBorder, 'app-header': true}">
      <index-header />
    </div>
    <div class="app-main" :class="[footerLayoutEunm[footerType], hasBorder ? 'has_border' : '']">
      <slot />
    </div>
    <div class="app-footer">
      <index-footer />
    </div>
    <preview-resource
      v-if="ctrl.show"
      :id="ctrl.id"
      :model-value="ctrl.show"
      @close="ctrl.show = false"
    />
    <back-top />
    <suspense-box />
  </div>
</template>

<script setup>
import { useLayoutStore } from '@/stores/layout'
import cookie from '@/utils/cookies'
import { useUserStore } from '../stores/user'
import bus from '@/utils/bus'
const { getShopInfo, getUserView } = useUserStore()
getShopInfo()

const layoutStore = useLayoutStore()
const footerType = computed(() => layoutStore.footerType)
const footerLayoutEunm = ref({
  1: 'footer-style-one',
  2: 'footer-style-two',
  3: 'footer-style-three'
})

const route = useRoute()
const unBorderList = ['/search', '/search/result']
const hasBorder = computed(() => {
  return !unBorderList.includes(route.path)
})

const cookieData = cookie.getShop()
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: cookieData.shopIcon },
    { rel: 'stylesheet', type: 'text/css', href: '//live-cdn.baijiayun.com/www-video-jssdk/dep/videojs/0.0.5/dist/videojs.css' }
  ],
  script: [
    { src: '//lib.baomitu.com/jquery/3.5.1/jquery.min.js' },
    { src: '//live-cdn.baijiayun.com/bplayer/1.3.1/bplayer.js' },
    { src: '//live-cdn.baijiayun.com/bplayer/1.3.1/dep/ffplayer.js' },
    { src: '//player.polyv.net/script/player.js' }
  ]
})

const ctrl = reactive({
  show: false,
  id: ''
})

onMounted(() => {
  getUserView()
  bus.on('preview-resource', (resourceId) => {
    ctrl.id = resourceId
    ctrl.show = true
  })
  document.addEventListener('click', (e) => {
    if (e && e.target) {
      if (e.target.parentNode && e.target.parentNode.className === 'video_img') {
        ctrl.id = e.target.parentNode.parentNode.dataset.id
        ctrl.show = true
        return
      }
      if (e.target.className === 'video_img') {
        ctrl.id = e.target.parentNode.dataset.id
        ctrl.show = true
        return
      }
      if (e.target.className === 'audio_img') {
        ctrl.id = e.target.parentNode.dataset.id
        ctrl.show = true
        return
      }
      if (e.target.parentNode && e.target.parentNode.className === 'audio_img') {
        ctrl.id = e.target.parentNode.parentNode.dataset.id
        ctrl.show = true
      }
    }
  })
})
</script>
<style lang="scss" scoped>
@import url('@/assets/font/iconfont.css');
#app {
  position: relative;
  background-color: #f6f8fb;
}
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  &.header-border{
    border: 1px solid #EBEEF5;
  }
}
.app-main {
  min-height: 100vh;
  padding-top: 66px;
  background-color: #f6f8fb;
  &.has_border {
    padding-top: 68px;
  }
}

</style>
<style>
.footer-style-one.app-main{
  min-height: calc(100vh - 150px )
}
.footer-style-two.app-main{
  min-height: calc(100vh - 180px )

}
.footer-style-three.app-main{
  min-height: calc(100vh - 260px)
}
</style>
