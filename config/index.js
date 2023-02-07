// 生产环境
let config = {
  tokenName: 'EDU_WEB_TOKEN',
  baseUrl: 'http://localhost:9900',
  tokenExpires: 60 * 60 * 1000 // token 过期时间为1个小时
}

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  config = {
    ...config,
    url: 'edusrl2acewwu5e0.roncoos.com', // 测试的店铺域名
    baseUrl: 'https://dev-edu.roncoos.com/gateway/' // 这里写的是访问接口的域名和端口号
  }
}
export default config
