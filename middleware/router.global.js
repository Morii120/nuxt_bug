export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    document.querySelector('#app') && (document.querySelector('#app').scrollTop = 0)
  }
})
