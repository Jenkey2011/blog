---
title: GreenSock动画教程3 => 缓动效果
date: 2017-06-01 18:18:43
tags:
  - GreenSock
  - js动画
categories:
  - 原创教程
---

## 什么是 ease

我们做 css3 动画的时候，都知道有个`animation-timing-function`，用来规定动画的运动曲线，取值有`linear`(动画从头到尾的速度是相同的)、`ease`(动画以低速开始，然后加快，在结束前变慢)、`ease-in`(动画以低速开始)、`ease-out`(动画以低速结束)、`ease-in-out`(动画以低速开始和结束)。我理解为运动速度，这样可能更好懂一些。GSAP 提供了许多动画效果，节本可以满足绝大多数的运动效果，而且还支持用户自定义曲线效果，下面的可视化曲线会方便大家更好的理解。

<iframe src='/app/demo/ease.html'>
</iframe>
<style>
  iframe{
    display:block;
    height:1050px;
    width:100%;
    border:none;
  }
</style>

<!-- more -->

## 案例

设置运动效果，可以在参数中加入 `ease:你想要的效果`,下面是案例

<p data-height="375" data-theme-id="0" data-slug-hash="Vbopaw" data-default-tab="css,result" data-user="jenkey2011" data-embed-version="2" data-pen-title="Vbopaw" class="codepen">See the Pen <a href="https://codepen.io/jenkey2011/pen/Vbopaw/">Vbopaw</a> by Wang Qizheng (<a href="https://codepen.io/jenkey2011">@jenkey2011</a>) on <a href="https://codepen.io">CodePen</a>.</p>
