---
title: SVG学习#day2 —— 文字路径(textPath)的应用
date: 2017-07-09 13:34:56
tags:
---

> 本博客关于 SVG 的系列文章不是教程，只是在学习的时候，练练手的同时，展示一下小 demo，同事加强一下学习效果。想深入学习的同学，可以去[MDN SVG 教程](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

`<path>`元素是 SVG 基本形状中最强大的一个，它不仅能创建其他基本形状，还能创建更多其他形状。与之相似的还有一个`<textPath>`,顾名思义，就是文字路径，文字沿着路径排列~

## 效果展示：

【**[demo](/app/demo/SVG/path1.html)**】
![文字沿指定路径排列](/app/assets/images/2017/07/textpath2.gif)

<!-- more -->

## `<textPath>`基本使用

该元素利用它的 xlink:href 属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走：

![基本使用](/app/assets/images/2017/07/textpath1.png)

核心代码

```html
<path id="myPath1" fill='none' d="M.5,115.5c44.9-39.21,77.13-44,99-40,36.49,6.63,49.27,38.5,83,40,31.32,1.39,58.32-24.41,77-48"
    transform="translate(3 -50)" stroke="red" stroke-width="0.5" />
  <text font-size="14">
    <!-- xlink:href="#myPath"  -->
    <textPath xlink:href="#myPath" startOffset="10%">
      王其征的网络日志 wangqizheng.win
    </textPath>
  </text>
```

## 利用 startOffset 做一个文字移动动画

`startOffset`文字距离顶端的偏移量，利用这个属性，可以做一个简单的动画，如图

![通过startOffset实现一个简单的动画](/app/assets/images/2017/07/textpath3.gif)

核心代码：

```html
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.72 68.86">
    <defs>
      <path id="myPath" class='a' d="M.5,115.5c44.9-39.21,77.13-44,99-40,36.49,6.63,49.27,38.5,83,40,31.32,1.39,58.32-24.41,77-48"
        transform="translate(3 -50)" stroke="red" stroke-width="2" />
    </defs>

    <use xlink:href="#MyPath" fill="none" stroke="red" />
    <path id="myPath1" fill='none' d="M.5,115.5c44.9-39.21,77.13-44,99-40,36.49,6.63,49.27,38.5,83,40,31.32,1.39,58.32-24.41,77-48"
      transform="translate(3 -50)" stroke="red" stroke-width="0.5" />
    <text font-size="14">
      <textPath id="textpath" xlink:href="#myPath" startOffset="0%">
        王其征的网络日志 wangqizheng.win
        <animate xlink:href="#textpath" attributeName="startOffset" from="-100%" to="100%" dur="15s" repeatCount="indefinite" />
      </textPath>
    </text>
  </svg>
```

## 拓展

![拖动锚点控制路径及文本](/app/assets/images/2017/07/textpath2.gif)

svg：

```html
  <svg id="drag" width="900" height="450" viewBox="0 0 900 450">
    <defs>
      <path id="path" d="M51,158Q193,358 397,226Q601,94 845,263" fill="transparent" stroke-width="1"></path>
    </defs>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path"></use>

    <text stroke="none" font-size="26">
      <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path" startOffset="10%">
        王其征的网络日志 wangqizheng.win
      </textPath>
    </text>

    <circle cx="51" cy="158" r="6" class="M"></circle>
    <circle cx="193" cy="358" r="6" class="Q"></circle>
    <circle cx="397" cy="226" r="6" class=" "></circle>
    <circle cx="601" cy="94" r="6" class="Q"></circle>
    <circle cx="845" cy="263" r="6" class=" "></circle>
    <line x1="193" y1="358" x2="601" y2="94"></line>
  </svg>
```

控制：

```js
var svg = document.querySelector('svg')
var path = document.querySelector('#path')
var line = document.querySelector('line')
var circles = document.querySelectorAll('circle')
var cry = []
for (var i = 0; i < circles.length; i++) {
  var o = {}
  o.x = Number(circles[i].getAttribute('cx'))
  o.y = Number(circles[i].getAttribute('cy'))
  o.class = circles[i].getAttribute('class')
  o.history = {
    x: o.x,
    y: o.y
  }
  cry.push(o)
}
var dragging = false
var index
var m = {
  x: 0,
  y: 0
}
svg.addEventListener(
  'mousedown',
  function(evt) {
    if (evt.target.tagName == 'circle') {
      dragging = evt.target
    }
  },
  false
)

svg.addEventListener(
  'mouseleave',
  function(evt) {
    dragging = false
  },
  false
)

svg.addEventListener(
  'mousemove',
  function(evt) {
    if (dragging) {
      m = oMousePos(svg, evt)
      dragging.setAttributeNS(null, 'cx', m.x)
      dragging.setAttributeNS(null, 'cy', m.y)
      var dPath = ''

      for (var i = 0; i < circles.length; i++) {
        cry[i].history.x = cry[i].x
        cry[i].history.y = cry[i].y
        cry[i].x = Number(circles[i].getAttribute('cx'))
        cry[i].y = Number(circles[i].getAttribute('cy'))
        if (circles[i] == dragging) {
          index = i
        }
      }

      if (index == 1) {
        // 第一个控制点
        var dx1 = cry[1].x - cry[2].x
        var dy1 = cry[1].y - cry[2].y
        cry[3].x = cry[2].x - dx1
        cry[3].y = cry[2].y - dy1
      } else if (index == 2) {
        //中间的控制点
        var dx2 = m.x - cry[2].history.x
        console.log(dx2)
        var dy2 = m.y - cry[2].history.y
        cry[1].x = cry[1].x + dx2
        cry[1].y = cry[1].y + dy2
        cry[3].x = cry[3].x + dx2
        cry[3].y = cry[3].y + dy2
      } else if (index == 3) {
        // 第二个控制点
        var dx3 = cry[3].x - cry[2].x
        var dy3 = cry[3].y - cry[2].y
        cry[1].x = cry[2].x - dx3
        cry[1].y = cry[2].y - dy3
      }

      for (var i = 0; i < circles.length; i++) {
        dPath += cry[i].class + cry[i].x + ',' + cry[i].y
        circles[i].setAttributeNS(null, 'cx', cry[i].x)
        circles[i].setAttributeNS(null, 'cy', cry[i].y)
      }

      path.setAttributeNS(null, 'd', dPath)
      line.setAttributeNS(null, 'x1', cry[1].x)
      line.setAttributeNS(null, 'y1', cry[1].y)
      line.setAttributeNS(null, 'x2', cry[3].x)
      line.setAttributeNS(null, 'y2', cry[3].y)
    }
  },
  false
)

svg.addEventListener(
  'mouseup',
  function(evt) {
    dragging = false
  },
  false
)

function oMousePos(elmt, evt) {
  var ClientRect = elmt.getBoundingClientRect()
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}
```

> 参考 ： [https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients)
