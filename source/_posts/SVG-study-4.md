---
title: SVG学习#day4 —— 利用path制作签明效果
date: 2017-07-16 15:32:47
tags:
  - SVG
  - 学习
categories:
  - demo
---

## 查看演示

![签名效果 签的“王其征” 看的出来么……](/app/assets/images/2017/07/path1.gif)

<!-- more -->

## 查看 demo

**[demo](/app/demo/gradients.html)**

## 源码实现

```html
<svg viewBox="-80 0 400 200">
  <!--
    fill属性是否填充
    stroke为绘制，颜色#AAAAAA
    stroke-width为绘制线的粗细
    d是具体数据，这里看到的数据代表了坐标，以及折线等等，可以使用工具生成
   -->
  <path style="fill:none;stroke:#000000;stroke-width:0.26px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 12,94 C 6.8,100 49,83 42,91 31,100 -2.2,110 5.2,110 17,110 44,110 29,99 c -3,-3 -7,31 -7,41 -3,0 -24.6,0 -19.1,0 6.5,-10 52.1,-10 52.1,-10 5,0 -13,-20 2,-20 21,-10 53,-10 43,-11 0,-5 -32,-11 -38,-16 -2,0 -5,-2 -2,-2 0,0 2,59 2,59 -2,0 3,-30 6,-30 0,-10 5,-37 7,-37 3,0 3,18 3,21 0,6 3,46 -3,46 0,0 -7,-30 -7,-30 5,0 -3,20 -3,20 -3,0 10,0 3,0 -6,10 -21,10 -16,10 8,0 16,0 23,0 55,0 -33,-10 -13,20 3,0 37,-30 16,10 0,0 -3,0 -3,10 0,0 6,-20 8,-30 3,-10 11,-67 37,-67 0,0 -42,37 -42,37 5,-10 13,-10 21,-10 11,-10 11,-10 21,-11 30,-8 -20,21 -20,21 0,10 20,-10 20,-10 0,10 -10,40 -10,50 0,0 0,20 0,10 10,-20 20,-30 20,-50 10,0 10,-10 10,-10 0,-10 20,-10 30,-10 0,0 10,-4 10,-1 0,11 -10,11 -10,11 -10,60 0,30 0,30 10,0 20,0 0,0 0,0 -10,-10 -10,-10 -10,0 -10,30 -10,30 0,10 -20,0 -20,0 30,0 70,0 100,0 0,0 80,10 60,10"
    id="path6545" />
</svg>
```

```js
var $path = $('path')

var current_frame, //当前帧
  total_frames, //全部帧数
  path, //svg中的path元素
  handle //javascript动画句柄
pathLen = [] // 存储path长度，本案例只有唯一的path~

// 初始化
var init = function() {
  current_frame = 0
  total_frames = 260
  $path.each(function(i) {
    var $this = $path[i]
    var len = Math.floor($this.getTotalLength())
    pathLen[i] = len
    $this.style.strokeDasharray = len + ' ' + len
    $this.style.strokeDashoffset = len + ' ' + len
  })
  handdle = null
}

// 绘制
var draw = function() {
  var progress = current_frame / total_frames
  if (progress > 1) {
    window.cancelAnimationFrame(handdle)
  } else {
    current_frame++
    $path.each(function(i) {
      var $this = $path[i]
      $this.style.strokeDashoffset = Math.floor(pathLen[i] * (1 - progress))
    })
    handdle = window.requestAnimationFrame(draw)
  }
}

// 初始化
var begin = function() {
  init()
  draw()
}

begin()
```

## 拓展

上述案例中，path 是唯一的，一半来说，图形很复杂，或者用用具生成的 path，会有很多。但是用上述代码也是可以实现的，如下图

![素描效果](/app/assets/images/2017/07/path2.gif)
