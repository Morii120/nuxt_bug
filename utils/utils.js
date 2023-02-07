export function handleNavigate (options, isTo = false) {
  let url = ''
  const { targetType, targetAddr, courseType, targetAddrType } = options
  if (!targetType || targetType === 99) return 'javascript:;'
  if (targetType === 1) {
    const functionEnum = {
      1: '/',
      2: '/course/list',
      3: '/grade/list',
      4: '/teacher/list',
      5: '/article/list',
      6: '/account/info',
      7: '/paper/list'
    }
    if (functionEnum[targetAddr]) {
      url = functionEnum[targetAddr]
    } else {
      url = '/'
    }
  }
  // 课程
  if (targetType === 2) {
    if (targetAddr) {
      if (courseType || targetAddrType) {
        const type = courseType || targetAddrType
        // (1:直播、2:视频、3:音频、4:图文、5:专题课、6:套餐 )
        const typeObj = {
          1: 'live',
          2: 'video',
          3: 'audio',
          4: 'graphic',
          5: 'subject',
          6: 'topic'
        }
        if (type) {
          url = `/course/${typeObj[type]}?id=${targetAddr}`
        }
      }
    } else {
      url = '/course/list'
    }
  }

  if ([3, 5, 8, 10].includes(targetType)) {
    // 3.课程分类,5.班级分类,8.资讯分类,10.试卷分类
    const targetEnum = {
      3: '/course/list',
      5: '/grade/list',
      8: '/article/list',
      10: '/paper/list'
    }
    if (targetEnum[targetType]) {
      url = `${targetEnum[targetType]}?categoryId=${targetAddr}`
    } else {
      url = '/'
    }
  }

  if ([4, 6, 7].includes(targetType)) {
    // 4.班级，6.教师，7.资讯
    const targetEnum = { 4: 'grade', 6: 'teacher', 7: 'article' }
    if (targetAddr) {
      url = `/${targetEnum[targetType]}/view?id=${targetAddr}`
    } else {
      url = `/${targetEnum[targetType]}/list`
    }
  }
  // 自定义链接
  if (targetType === 90) {
    if (targetAddr) {
      url = targetAddr
    }
  }
  if (isTo) {
    return navigateTo(url)
  } else {
    return url
  }
}

// 获取url中的参数
export function getUrlParam (path, name) {
  const reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
  if (reg.test(path)) { return unescape(RegExp.$2.replace(/\+/g, ' ')) }
  return ''
}
