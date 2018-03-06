---
title: SVG学习#day1 —— 蒙版(mask)的使用
date: 2017-07-06 09:46:00
tags:
  - SVG
  - 学习
categories:
  - demo
---

> 本博客关于 SVG 的系列文章不是教程，只是在学习的时候，练练手的同时，展示一下小 demo，同事加强一下学习效果。想深入学习的同学，可以去[MDN SVG 教程](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

SVG 支持多种蒙板，使用这些特性，可以做出很多很炫的效果。如图：
![用mark遮罩做出的文字效果](/app/assets/images/2017/07/mark1.png)

**[[查看 demo](/app/demo/SVG/mask.html)]**

SVG 支持的蒙板类型：

* 裁剪路径(cliping path)裁剪路径是由 path, text 或者基本图形组成的图形。所有在裁剪路径内的图形(视频也行)都可见，所有在裁剪路径外的图形都不可见。
* 遮罩/蒙板(mask)蒙板是一种容器，它定义了一组图形并将它们作为半透明的媒介，可以用来组合前景对象和背景，和 PS 的蒙版一毛一样~

这篇只讲 mark，感兴趣的的可以去[MDN SVG 教程](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) 的 [Clipping_and_masking](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking)章节

核心代码：

```html
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 160" preserveAspectRatio="xMidYMid slice">
    <defs>
      <mask id="mask" x="0" y="0" width="100%" height="100%">
        <rect x="0" y="0" width="100%" height="100%" />
        <text x="80" y="90">wangqizheng</text>
      </mask>
    </defs>
    <rect x="0" y="0" width="648" height="100%" mask="url(#mask)" />
  </svg>
```

参考：

> MDN SVG 教程: [ https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
> Clipping_and_masking: [ https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking)
