---
title: SVG学习#day3 —— 文本与渐变
date: 2017-07-11 14:39:37
tags:
  - SVG
  - 学习
categories:
  - demo
---

> 本博客关于 SVG 的系列文章不是教程，只是在学习的时候，练练手的同时，展示一下小 demo，同事加强一下学习效果。想深入学习的同学，可以去[MDN SVG 教程](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

除了了简单的纯色填充和描边，SVG 还允许我们在填充和描边上应用渐变色~ 文本搭配渐变，可以做出很多惊喜的效果~

有两种类型的渐变：**线性渐变**和**径向渐变**。渐变内容需要定义在<defs>标签内部，而不是定义在形状上面，给渐变内容指定一个 id 属性，使得

## 查看演示

**[demo](/app/demo/gradients.html)**

## 线性渐变

线性渐变沿着直线方向上改变颜色，要插入一个线性渐变，你需要在 SVG 文件的 defs 元素内部，创建一个`<linearGradient>` 节点

基本使用：

![文本线性渐变](/app/assets/images/2017/07/gradients1.png)

<!-- more -->

```html
  <svg id="gradient">
    <defs>
      <linearGradient id="linearGradient">
        <stop offset="0%" stop-color="#15bcce" />
        <stop offset="50%" stop-color="#fccf26" />
        <stop offset="100%" stop-color="#f24949" />
      </linearGradient>
    </defs>
    <text y="75%" x='50%' fill-opacity="0.5" fill="url(#linearGradient)" text-anchor="middle">线性渐变</text>
  </svg>
```

## 径向渐变

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。要插入一个径向渐变，你需要在 SVG 文件的 defs 元素内部，创建一个`<radialGradient>` 节点

基本使用：
![文本径向渐变](/app/assets/images/2017/07/gradients2.png)

```html
  <svg width="750px" height="100px">
    <defs>
      <radialGradient id="Gradient1" cy="60%" fx="45%" fy="45%" r="2">
        <stop offset="0%" class="flash" stop-color="green" />

        <stop offset="50%" class="flash2" style="animation-delay: 1.5s" stop-color="blue" />

        <stop class="100%" class="flash" stop-color="red" />
      </radialGradient>
    </defs>
    <text y="75%" x='50%' text-anchor="middle" fill="url(#Gradient1)">径向渐变 </text>
  </svg>
```
