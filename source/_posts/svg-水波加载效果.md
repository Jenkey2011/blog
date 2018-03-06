---
title: 一步步教你制作一个水波loading效果
date: 2017-05-24 09:09:59
tags:
  - SVG
  - 加载动画
  - GSAP
  - 教程
categories:
  - demo
---

### 效果展示

如下图所示的波浪动画效果，实现方法有很多，比如 CSS 或者是 js 等方法都可以实现。本片文章来讲讲如何用 SVG 实现，比前述两种方法实现要简单的多，定制性也很强

![loading动画](/app/assets/images/2017/05/rectgif7.gif)

<!-- more -->

这个效果主要实现方式是 SVG 中的蒙版(mark)和图案填充(pattern)

### 做一个波浪形背景

先做一个 SVG 的波浪形的矩形(我用的 AI,当然可以手写)。

![](/app/assets/images/2017/05/rect.png)

现在先让它做水平平移运动

![](/app/assets/images/2017/05/rectgif.gif)

接着让它同时在水平和竖直方向上做平移运动

![](/app/assets/images/2017/05/rectgif2.gif)

以下为静态矩形代码

```html
<svg class="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="574.558px" height="120px" viewBox="0 0 574.558 120" enable-background="new 0 0 574.558 120" xml:space="preserve">
    <defs>
      <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
        <path fill="#fff" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
      </pattern>
    </defs>
    <rect class="water-fill" fill="url(#water)" x="-400" y="0" width="1600" height="120"/>
</svg>
```

### 做一个遮罩

在蒙板中使用了白色来填充文字。这是因为在 SVG 中的蒙版中，在白色中的内容区域是可见的，而黑色区域的内容是不可见的。

```html
<defs>
  <text id="text" font-size="100">PEOPLE</text>
  <mask id="text-mask">
    <use x="0" y="0" xlink:href="#text" fill="#ffffff"/>
  </mask>
</defs>
```

将二者合并的静态效果

![遮罩和水波合并](/app/assets/images/2017/05/rect2.png)

```html
<svg class="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="574.558px" height="120px" viewBox="0 0 574.558 120" enable-background="new 0 0 574.558 120" xml:space="preserve">
    <defs>
      <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
        <path fill="#fff" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
      </pattern>

      <text id="text" transform="matrix(1 0 0 1 -8.0684 116.7852)" font-size="100">PEOPLE.CN</text>

      <mask id="text-mask">
        <use x="0" y="0" xlink:href="#text" opacity="1" fill="#ffffff"/>
      </mask>
    </defs>

    <use x="0" y="0" xlink:href="#text" fill="#222"/>

    <rect class="water-fill" mask="url(#text-mask)" fill="url(#water)" x="-400" y="0" width="1600" height="120"/>

  </svg>
```

### 让背景动起来

实现背景平移运动有很多方法，这里我们使用 GSAP(很好用的 js 动画框架，[文档地址](https://greensock.com/docs/#/HTML5/))

效果

![](/app/assets/images/2017/05/rectgif3.gif)

```js
document.addEventListener('DOMContentLoaded', function() {
  var twm = TweenMax
  var water = document.querySelector('.water-fill')
  twm.to(water, 1, {
    attr: {
      x: 0
    },
    repeat: -1,
    ease: Linear.easeNone
  })
  twm.to(water, 10, {
    attr: {
      y: 0
    },
    repeat: -1,
    ease: Linear.easeNone
  })
})
```

### 定制

次效果的文字颜色、大小、字体，动画的时长、循环次数，均可以修改。尤其文字，只需要修改<text>标签的内容即可。如下

![](/app/assets/images/2017/05/rectgif6.gif)

### 案例完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script type="text/javascript" src="http://172.31.36.229/study/SVG/src/js/TweenMax.js"></script>
  <script type="text/javascript" src="http://172.31.36.229/study/SVG/src/js/TimelineMax.js"></script>
  <style>
    body {
      padding-top: 300px;
      background: #141414;
      text-align: center;
    }
    .loading {
      margin-top: 20px;
    }

  </style>
</head>
<body>

  <svg class="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="574.558px" height="120px" viewBox="0 0 574.558 120" enable-background="new 0 0 574.558 120" xml:space="preserve">
    <defs>
      <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
        <path fill="#fff" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
      </pattern>

      <text id="text" transform="matrix(1 0 0 1 -8.0684 116.7852)" font-size="100">PEOPLE.CN</text>

      <mask id="text-mask">
        <use x="0" y="0" xlink:href="#text" opacity="1" fill="#ffffff"/>
      </mask>
    </defs>

    <use x="0" y="0" xlink:href="#text" fill="#222"/>

    <rect class="water-fill" mask="url(#text-mask)" fill="url(#water)" x="-400" y="100" width="1600" height="120"/>

  </svg>

</body>
  <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function(){
      var twm = TweenMax;
      var water = document.querySelector(".water-fill");
      twm.to(water,1,{
        attr:{
            x:0
          },
          repeat:-1,
          ease:Linear.easeNone
        })
        twm.to(water,10,{
        attr:{
            y:0
          },
          repeat:-1,
          ease:Linear.easeNone
        })
    })
  </script>
</html>
```
