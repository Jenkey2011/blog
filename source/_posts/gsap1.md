---
title: GreenSock动画教程(1) => 简介、模块组成
date: 2017-05-25 09:26:55
tags:
  - GreenSock
  - js动画
categories:
  - 原创教程
---

GSAP 是我分析案例时，发现的一个强大的 js 动画库。GSAP 满足我所有的项目需求——快速、高效、强大。所以我也想推广给大家~

## 什么是 GreenSock

GreenSock 是一个非常快速、轻量级和灵活的动画工具，官方叫 GSAP 动画平台，官网、demo、教程，时时刻刻安利这个 GSAP，所以后面我也统称为 GSAP…… TweenLite 可以使任意的元素在一定的时间内，通过改变一个或多个属性，做出流畅的动画。TweenLine 可以做出更复杂的序列帧动画(这在我的实际项目中帮助很大)。

<!-- more -->

## GSAP 结构

GSAP 提供四个动画模块

* `TweenLite` : 这是 GSAP 的的核心部分，可以实现大部分的动画效果。比如：元素的位置、宽度高度等等等一些基础属性。如果要对其他属性做出动画过渡效果，诸如`fontSize`、`backgroundColor`，那么就需要引入**CSSPlugin**。其他高级方法或者动画，也需要引入其他插件。TweenLite 适合实现一些简单的动画效果
* `TweenLineLite` : 一个强大轻量的序列工具，相当于是`adobe flash`的时间轴的概念，容纳其他的动画效果，精确空着各个动画的时间关系，也可以轻松控制整个时间轴的各种状态，播放、暂停、重播，和一个视频一样。TweenLineLite 适合做一些复杂的，一连串的动画。
* `TweenMax` : TweenLite 的拓展版，包含 Tweenlite 的全部功能之外，还支持动画延迟、动画循环、悠悠球效果。TweenMax 包含所有功能，虽然不是轻量级的，但还是建议大家使用这个而非轻量版。
* `TweenLineMax` : TweenLineLite 的拓展版，包含 TweenlineLite 的全部功能之外，还支持动画循环、各个动画之间的延迟、时间轴悠悠球的效果。建议使用，理由同上…… 我们的目标是，功能齐全，拿来就用……

> 综上，GSAP 提供的动画工具，轻量、快速，可以制作流畅、复杂的动画，实际开发中，建议使用 TweenMax 和 TweenLineMax(非必须，如果不是做时间轴，可以选择不用)。
> GSAP 还有一些收费的插件，比如分割单个字符插件、SVG 平滑变形插件、模拟物理效果插件

## 资源

[官网地址](https://greensock.com/gsap)
[github 地址](https://github.com/greensock/GreenSock-JS)
[官方文档](https://greensock.com/docs/#/HTML5/)
