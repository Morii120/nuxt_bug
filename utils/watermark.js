export default class WaterMark {
  constructor (elem, options) {
    this.elem = elem || document.querySelector('body')
    const defaultOptions = {
      text: '文字内容', // 文字内容
      color: '#fff', // 文字颜色
      fontSize: 12, // 文字大小
      opacity: 0.1, // 透明度
      spaceX: 120, // 文字水平方向间距
      spaceY: 120, // 文字垂直方向间距
      textRotate: -30, // 旋转角度
      fontFamily: 'Helvetica Neue' // 文字字体
    }
    this.options = { ...defaultOptions, ...options }
    this.init()
  }

  init () {
    this.calcTextSize()
    const options = this.options
    const width = options.spaceX + options.txtAttr.width
    const height = options.spaceY + options.txtAttr.height
    const height_2 = height * 2
    const width_0_5 = width / 2
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
      <defs>
        <pattern id="pattern1" x="0" y="0" width="${width}" height="${height_2}" patternUnits="userSpaceOnUse" patternTransform="rotate(${options.textRotate})">
          <text x="0" y="${options.fontSize}" style="font-family:${options.fontFamily}; font-size:${options.fontSize}; fill:${options.color}; fill-opacity:${options.opacity}">${options.text}</text>
        </pattern>
        <pattern id="pattern2" x="${width_0_5}" y="${height}" width="${width}" height="${height_2}" patternUnits="userSpaceOnUse" patternTransform="rotate(${options.textRotate})">
          <text x="0" y="${options.fontSize}" style="font-family:${options.fontFamily}; font-size:${options.fontSize}; fill:${options.color}; fill-opacity:${options.opacity}">${options.text}</text>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" style="fill:url(#pattern1); fill-opacity:1;" />
      <rect x="0" y="0" width="100%" height="100%" style="fill:url(#pattern2); fill-opacity:1;" />
    </svg>`
    const svgBase64 = window.btoa(unescape(encodeURIComponent(svg)))
    const backgroundImage = `url(data:image/svg+xml;base64,${svgBase64})`
    this.elem.style.backgroundImage = backgroundImage
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    if (MutationObserver) {
      const mo = new MutationObserver(() => {
      })

      mo.observe(this.elem, {
        attributes: true,
        subtree: true,
        childList: true
      })
    }
  }

  calcTextSize () {
    const { text, fontFamily } = this.options
    const $span = document.createElement('span')
    $span.innerHTML = text
    $span.setAttribute('style', `font-family: ${fontFamily}; font-size: 12px; visibility: hidden; display: inline-block`)
    document.querySelector('body').appendChild($span)
    this.options.txtAttr = {
      text,
      width: $span.offsetWidth,
      height: $span.offsetHeight
    }
    $span.remove()
  }
}
