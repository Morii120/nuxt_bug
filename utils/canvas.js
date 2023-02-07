export function drawSquarePic (ctx, x, y, w, h, r, url, color = '#ffffff') {
  ctx.save()
  ctx.beginPath()
  // 绘制左上角圆弧
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  // 绘制border-top
  // 画一条线 x终点、y终点
  ctx.lineTo(x + w - r, y)
  // 绘制右上角圆弧
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  // 绘制border-right
  ctx.lineTo(x + w, y + h - r)
  // 绘制右下角圆弧
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  // 绘制左下角圆弧
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  // 绘制border-left
  ctx.lineTo(x, y + r)
  // 填充颜色(需要可以自行修改)
  ctx.fillStyle = color
  ctx.fill()
  // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
  ctx.clip()
  // 绘制图片
  return new Promise(resolve => {
    const img = new Image()
    img.src = url
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h)
      ctx.restore() // 恢复之前被切割的canvas，否则切割之外的就没办法用
      ctx.save()
      resolve()
    }
  })
}

export function drawTextReturnH (
  ctx,
  text,
  x,
  y,
  maxWidth = 375,
  fontSize = 14,
  color = '#000',
  lineHeight = 30,
  bold = 'normal',
  maxRow = 2,
  textAlign = 'left'
) {
  ctx.font = bold + ' ' + fontSize + 'px caption sans-serif '
  let drawTxt = '' // 当前绘制的内容
  let drawLine = 1 // 第几行开始绘制
  let drawIndex = 0 // 当前绘制内容的索引
  ctx.textAlign = textAlign
  // 设置字体大小，注意：百度小程序 用ctx.setFontSize设置字体大小后，计算字体宽度会无效
  ctx.fillStyle = color // 设置字体颜色
  if (!/\n/g.test(text) && ctx.measureText(text).width <= maxWidth) {
    ctx.fillText(text, x, y)
  } else {
    for (let i = 0; i < text.length; i++) {
      drawTxt += text[i]
      const drawTxtWidth = ctx.measureText(drawTxt).width
      if (/\n/g.test(drawTxt) || drawTxtWidth >= maxWidth) {
        if (drawLine >= maxRow) {
          const ellipsis = '...'
          const ellipsisLength = parseInt(ctx.measureText(ellipsis).width)
          let lastRowText = ''
          for (let y = 0; y < drawTxt.length; y++) {
            lastRowText += drawTxt[y]
            const lastRowTextWidth = ctx.measureText(lastRowText).width
            if (lastRowTextWidth + ellipsisLength >= drawTxtWidth - ellipsisLength) {
              drawTxt = lastRowText + ellipsis
              break
            }
          }
          // drawTxt = drawTxt.substring(drawIndex, i) + '...'
          ctx.fillText(drawTxt, x, y)
          break
        } else {
          ctx.fillText(text.substring(drawIndex, i + 1), x, y)
          drawIndex = i + 1
          drawLine += 1
          y += lineHeight
          drawTxt = ''
        }
      } else {
        // 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
        if (i === text.length - 1) {
          ctx.fillText(text.substring(drawIndex), x, y)
        }
      }
    }
  }
  ctx.fillText(drawTxt, x, y)
  ctx.save(
    true) // 本次绘制是否接着上一次绘制。即 reserve 参数为 false，则在本次调用绘制之前 native 层会先清空画布再继续绘制；若 reserve 参数为 true，则保留当前画布上的内容，本次调用 drawCanvas 绘制的内容覆盖在上面，默认 false。
}

export function drawSeal (ctx, text, x = 280, y = 410, r = 50, font = 10, color = '#d73a3c', lineWidth = 4) {
  // 绘制印章边框
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.stroke()

  // 画五角星
  create5star(ctx, x, y, r * 0.2, color, 0)

  // 绘制印章单位
  ctx.translate(x, y)// 平移到此位置,
  ctx.font = font + 'px caption sans-serif'
  ctx.fillStyle = color
  const count = text.length// 字数
  const angle = 4 * Math.PI / (3 * (count - 1))// 字间角度
  const chars = text.split('')
  let c
  for (let i = 0; i < count; i++) {
    c = chars[i]// 需要绘制的字符
    if (i == 0) {
      ctx.rotate(5 * Math.PI / 6)
    } else {
      ctx.rotate(angle)
    }

    ctx.save()
    ctx.translate(r * 0.78, 0)// 平移到此位置,此时字和x轴垂直
    ctx.rotate(Math.PI / 2)// 旋转90度,让字平行于x轴
    ctx.fillText(c, 0, 5)// 此点为字的中心点
    ctx.restore()
  }

  // 绘制五角星
  /**
   * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
   * rotate:绕对称轴旋转rotate弧度
   */
  function create5star (ctx, sx, sy, radius, color, rotato) {
    ctx.save()
    ctx.fillStyle = color
    ctx.translate(sx, sy)// 移动坐标原点
    ctx.rotate(Math.PI + rotato)// 旋转
    ctx.beginPath()// 创建路径
    var x = Math.sin(0)
    var y = Math.cos(0)
    const dig = Math.PI / 5 * 4
    for (let i = 0; i < 5; i++) { // 画五角星的五条边
      var x = Math.sin(i * dig)
      var y = Math.cos(i * dig)
      ctx.lineTo(x * radius, y * radius)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }
  ctx.save(
    true)
  if (count === 1) {
    ctx.rotate(-1 * Math.PI / 1.2)
  } else {
    ctx.rotate(-1 * Math.PI / 6)
  }
  ctx.translate(-x, -y)
}
