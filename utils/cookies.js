// import VueCookie from 'vue-cookie'
import Cookies from 'js-cookie'
export default {
  getShop () {
    let cookieData = {}
    if (process.server) {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.ssrContext && nuxtApp.ssrContext.event && nuxtApp.ssrContext.event.req) {
        cookieData = this.getInServer(nuxtApp.ssrContext.event.req)
      }
    } else {
      cookieData = {
        shopIcon: this.getInClient('shopIcon'),
        shopName: this.getInClient('shopName')
      }
    }
    return cookieData
  },
  // 获取服务端cookie
  getInServer (req) {
    const serviceCookie = {}
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      const parts = val.split('=')
      serviceCookie[parts[0].trim()] = decodeURIComponent((parts[1] || '').trim())
    })
    return serviceCookie
  },

  setInServer (Cookie, req) {
    if (Cookie.constructor == Object) {
      let cssStr = ''
      for (const key in Cookie) {
        cssStr += key + '=' + Cookie[key] + ';'
      }
      req.headers.cookie = cssStr.slice(0, cssStr.length - 1)
      return cssStr.slice(0, cssStr.length - 1)
    }
  },
  // 获取客户端cookie
  getInClient (key) {
    const tokenInfo = Cookies.get(key)
    return tokenInfo
  },
  // 获取客户端cookie
  setInClient ({ key, val, expires = 1 }) {
    const hostname = window.location.hostname
    const option = {
      expires
    }
    if (hostname !== 'localhost') {
      option.domain = hostname
    }
    if (hostname === '127.0.0.1') {
      delete option.domain
    }
    Cookies.set(key, val, option)
  },
  // 删除客户端cookie
  delInClient (key) {
    const hostname = window.location.hostname
    const option = {
      expires: 1
    }
    if (hostname !== 'localhost') {
      option.domain = hostname
    }
    if (hostname === '127.0.0.1') {
      delete option.domain
    }
    Cookies.remove(key, option)
  }
}
