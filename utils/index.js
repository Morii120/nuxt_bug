/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {Object}
 * @returns {string} url
 */

export function obj2Param (obj) {
  if (!obj) return ''
  const arr = Object.keys(obj)
  if (!arr.length) return ''
  return arr.map(function (key) {
    return '?'.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key]))
  }).join('&')
}

/**
 * 获取时长
 * @param mss
 * @returns {string}
 */
export const formatDuring = (mss) => {
  // const days = parseInt(mss / (1000 * 60 * 60 * 24));
  const day = ''
  const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = parseInt((mss % (1000 * 60)) / 1000)
  if (hours > 0) {
    return (hours < 10 ? '0' + hours : hours) + ' : ' + (minutes < 10 ? '0' + minutes : minutes) + ' : ' + (seconds <
    10
      ? '0' + seconds
      : seconds)
  } else {
    return (minutes < 10 ? '0' + minutes : minutes) + ' : ' + (seconds < 10 ? '0' + seconds : seconds)
  }
}

/**
 * @param {number} time
 * @returns {string}
 */
export const formatDay = (time) => {
  const d = new Date(time).getTime()
  const now = Date.now()
  const diffValue = now - d
  let result = ''
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const halfamonth = day * 15
  const month = day * 30
  const year = month * 12

  const _year = diffValue / year
  const _month = diffValue / month
  const _week = diffValue / (7 * day)
  const _day = diffValue / day
  const _hour = diffValue / hour
  const _min = diffValue / minute

  if (_year >= 1) result = Math.floor(_year) + '年前'
  else if (_month >= 1) result = Math.floor(_month) + '个月前'
  else if (_week >= 1) result = Math.floor(_week) + '周前'
  else if (_day >= 1) result = Math.floor(_day) + '天前'
  else if (_hour >= 1) result = Math.floor(_hour) + '小时前'
  else if (_min >= 1) result = Math.floor(_min) + '分钟前'
  else result = '刚刚'
  return result
}

export const formatSecond = (second) => {
  const hour = 3600
  const minute = 60
  const unit = ''
  if (second > hour) {
    return [parseInt(second / hour), 'h']
  } else if (second > minute && second < hour) {
    return [parseInt(second / minute), 'min']
  } else {
    return [second, 's']
  }
}
// 获取文件大小
export function getSize (limit) {
  let size = ''
  if (limit < 0.1 * 1024) { // 小于0.1KB，则转化成B
    size = limit.toFixed(2) + 'B'
  } else if (limit < 0.1 * 1024 * 1024) { // 小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + 'KB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024 * 1024) { // 小于0.1TB，则转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  } else { // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB'
  }

  const sizeStr = size + '' // 转成字符串
  const index = sizeStr.indexOf('.') // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou === '00') { // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}

// 禁止复制功能
export function forbidCopy (dom = '') {
  if (typeof dom === 'string') {
    dom = document.querySelector(dom)
  }
  if (dom) {
    // 禁止文字选择
    if (dom.onselectstart) {
      dom.onselectstart = e => {
        return false
      }
    }
    if (dom.oncopy) {
      // 禁止复制
      dom.oncopy = e => {
        return false
      }
    }
    dom.className = dom.className + ' no_select'
  } else {
    console.error('禁止复制功能失败，dom 没有生成')
  }
}

/**
 * @param 富文本
 * @returns {string} 没有标签的文字,排除img标签
 */
export function parseHTML (html) {
  return html.replace(/<(?!img).*?>/g, '')
}

/**
 * @param 数字
 * @returns {string} 中文数字
 */
export function changeNumToHan (num) {
  const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  if (!num || isNaN(num)) return '零'
  const english = num.toString().split('')
  let result = ''
  for (let i = 0; i < english.length; i++) {
    const des_i = english.length - 1 - i// 倒序排列设值
    result = arr2[i] + result
    const arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
  result = result.replace(/零+$/, '') // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}
