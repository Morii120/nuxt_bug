<template>
  <div id="app">
    <div :class="{'header-border':hasBorder, 'app-header': true}">
    </div>
    <div class="app-main" :class="[footerLayoutEunm[1], hasBorder ? 'has_border' : '']">
      <slot />
    </div>
    <div class="app-footer">
    </div>
  </div>
</template>

<script setup>

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

useHead({
  link: [
    { rel: 'stylesheet', type: 'text/css', href: '//live-cdn.baijiayun.com/www-video-jssdk/dep/videojs/0.0.5/dist/videojs.css' }
  ],
  script: [
    { src: '//lib.baomitu.com/jquery/3.5.1/jquery.min.js' },
    { src: '//live-cdn.baijiayun.com/bplayer/1.3.1/bplayer.js' },
    { src: '//live-cdn.baijiayun.com/bplayer/1.3.1/dep/ffplayer.js' },
    { src: '//player.polyv.net/script/player.js' }
  ]
})


</script>
<style lang="scss" scoped>
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
