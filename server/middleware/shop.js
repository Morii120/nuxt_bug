import axios from 'axios'
import config from '@/config/index'
import cookie from '@/utils/cookies'
import { defineEventHandler } from 'h3'
const writeRouter = ['/wx/wx', '/wx/success']
export default defineEventHandler(async function (event) {
  const req = event.node.req
  const res = event.node.res
  let host = req.headers.host
  const router = req.url
  if (process.env.NODE_ENV === 'development') {
    host = config.url
  }

  if (/^[\/mp].*\.txt$/gi.test(router)) {
    const { data: txtContent } = await axios.post(`${config.baseUrl}/base/api/wx/mp/verify`, { websiteDomain: host })
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    res.write(txtContent.data)
    return res.end()
  }

  if (req.originalUrl.indexOf('/h5') != -1) {
    return
  }

  const { data: domainRes } = await axios.get(`${config.baseUrl}/base/api/shop/website/domain?domain=${host}`)
  if (domainRes.code === 200) {
    const deviceAgent = req.headers['user-agent'] && req.headers['user-agent'].toLowerCase()
    const agentID = deviceAgent?.match(/Android|iPhone|iPad|iPod/i)
    if (agentID) {
      const pathMap = {
        '/': '/',
        '/course/list': '/pages/course/list',
        '/course/graphic': '/pages/course/detail',
        '/course/video': '/pages/course/detail',
        '/course/subject': '/pages/course/detail',
        '/course/audio': '/pages/course/detail',
        '/course/combine': '/pages/course/detail',
        '/course/live': '/pages/course/detail',
        '/course/topic': '/pages/course/detail',
        '/course/single': '/pages/course/detail',
        '/grade/list': '/pages/grade/list',
        '/grade/view': '/pages/grade/view',
        '/teacher/list': '/pages/teacher/list',
        '/teacher/view': '/pages/teacher/view',
        '/article/list': '/pages/article/list',
        '/article/view': '/pages/article/view',
        '/search': '/pages/search/index',
        '/search/result': '/pages/search/result',
        '/account/info': '/user/mine',
        '/vip': '/vip/index'
      }

      const param = req.originalUrl.split('?')[1] || ''
      const path = req.originalUrl.split('?')[0]
      const url = (pathMap[path] || '/') + (param ? ('?' + param) : '')
      res.writeHead(302, {
        Location: (domainRes.data && domainRes.data.supportWapAccess) ? ('/h5' + url) : '/error.html?type=2'
      })
      return res.end()
    }

    // 不支持pc端访问跳转错误页面
    if (!domainRes.data.supportWebAccess) {
      res.writeHead(302, {
        Location: '/error.html?type=1'
      })
      return res.end()
    }

    // const http = axios.create({
    //   headers: {
    //     sid: domainRes.data.id,
    //   }
    // })
    // const {data: navRes} = await http.get(`${config.baseUrl}/base/api/page/web/nav`)
    // 第一个导航页面为项目内页面时，默认访问第一个导航页面
    // if (navRes.code === 200 && navRes.data && navRes.data.contentList.length) {
    //   if (navRes.data.contentList[0].targetType < 9 && navRes.data.contentList[0].path !== '/') {
    //     const url = handleNavigate(navRes.data.contentList[0])
    //     const path = req.originalUrl.split('?')[0]
    //     if (url !== path) {
    //       res.writeHead(302 , {
    //         'Location' : url
    //       });
    //       res.end();
    //       return next()
    //     }
    //   }
    // }

    const reqCookie = cookie.getInServer(req)
    reqCookie.shopId = domainRes.data.id
    reqCookie.shopIcon = domainRes.data.shopIcon
    reqCookie.shopName = encodeURIComponent(domainRes.data.shopName)
    cookie.setInServer(reqCookie, req)
    res.setHeader('Set-Cookie', [
      `shopId=${domainRes.data.id}; path=/;`,
      `shopIcon=${domainRes.data.shopIcon}; path=/;`,
      `shopName=${encodeURIComponent(domainRes.data.shopName)}; path=/;`
    ])
  } else {
    const reqUrl = req.url.split('?')[0]
    if (writeRouter.indexOf(reqUrl) === -1) {
      return
    }
    // console.log(domainRes,'domainRes')
    if (writeRouter.indexOf(reqUrl) === -1) {
      res.writeHead(302, {
        Location: '/error.html' // This is your url which you want
      })
      return res.end()
    }
  }
})
