---
title: 高仿七喜官网导航效果 —— SVG动画导航
date: 2017-06-08 13:05:46
tags:
	- svg动画
  - GSAP
categories:
  - demo
---

今天上午设计找我，说要正在设计一个大专题，想要一个动态的导航效果（如下图），问我能不能实现。我能怎么办，把网址都贴给我了，当然是能实现啊……

<!-- [本 demo 地址](http://172.31.36.229/study/gsap/morphSVG.html) -->

看了一下[七喜的效果](http://www.7up.nl/producten/)
![](/app/assets/images/7up2.gif)

<!-- more -->

### 第一步 分析原网页 拿到关键 SVG

分析源码发现，该效果由 GSAP 的`TweenMax`、`TimelineMax`和一个 SVG 变形插件`MorphSVGPlugin`

安利一下 [GSAP](https://greensock.com/gsap)，大名鼎鼎的动画库，学 flash 的同学更是人尽皆知。[github 库](https://github.com/greensock/GreenSock-JS)已经 6w+的星星了~

* `TweenMax`: GSAP 的核心 js 库
* `TimelineMax`: 实现时间轴，特别好用
* `MorphSVGPlugin`: SVG 变形插件，收费的~ 额，我把 GSAP 一系列的收费插件都破解了，只为学习~

首先拿到关键的 SVG:

```html
<svg version="1.1" class="back" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve">
    <path class="back_4" d="M130,200V0c0,39.1-66.8,56.7-66.8,105.1C63.2,139.7,130,154.1,130,200z"/>
    <path class="back_3" d="M130,200V0c0,40.5-26.6,59.5-26.6,100C103.4,154.5,130,162.8,130,200z"/>
    <path class="back_2" d="M130,200V0c0,31.9-13.7,57.8-13.7,100C116.3,137.6,130,173.6,130,200z"/>
    <path class="back_1" d="M130,200V0c0,40.5,0,59.5,0,100C130,154.5,130,162.8,130,200z"/>
</svg>
<!-- white shape -->
<svg version="1.1" class="front" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     x="0px" y="0px" viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve">
    <path class="front_2" d="M130,200V0c0,31.9-87.8,45.3-87.8,100C42.2,151.7,130,172,130,200z"/>
    <path class="front_1" d="M130,200V0c0,31.9,0,57.8,0,100C130,137.6,130,173.6,130,200z"/>
</svg>
```

### 第二部 思路

控制前景背景 SVG 的变形，关键代码

```javascript
function go() {
  timeline.clear()

  timeline
    .to(
      $back3,
      0.5,
      {
        morphSVG: {
          shape: $back2
        },
        ease: Back.easeInOut.config(2)
      },
      0
    )
    .to(
      $back3,
      0.5,
      {
        morphSVG: {
          shape: $back4
        },
        ease: Back.easeOut.config(2)
      },
      0.45
    )
    .to(
      $front1,
      0.5,
      {
        morphSVG: {
          shape: $front2
        },
        ease: Back.easeOut.config(2)
      },
      0.45
    )
    .staggerTo(
      $list,
      0.1,
      {
        left: -30,
        ease: Back.easeOut.config(2)
      },
      0.1,
      0.3
    )
}

function out() {
  timeline.clear()
  timeline
    .staggerTo(
      $list,
      0.1,
      {
        left: 30,
        ease: Back.easeOut.config(2)
      },
      -0.1
    )
    .to(
      $front1,
      0.35,
      {
        morphSVG: {
          shape: $front1
        },
        ease: Back.easeInOut.config(2)
      },
      0.3
    )
    .to(
      $front2,
      0.4,
      {
        morphSVG: {
          shape: $front2
        },
        ease: Back.easeIn.config(2)
      },
      0.5
    )
    .to(
      $back3,
      0.4,
      {
        morphSVG: {
          shape: $back2
        },
        ease: Back.easeInOut.config(2)
      },
      0.5
    )
    .to(
      $back3,
      0.4,
      {
        morphSVG: {
          shape: $back3
        },
        ease: Back.easeOut.config(2)
      },
      0.9
    )
}
```

### 触发事件

鼠标移入一处导航时，触发事件。

```javascript
$('.list').hover(
  function() {
    go()
  },
  function() {
    out()
  }
)
```

### 完整代码

[demo 展示](/app/demo/morphSVG.html)
**最终效果:**
![](/app/assets/images/7up.gif)
**完整代码:**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script type="text/javascript" src="http://tools.people.cn/libs/jquery/1.11.1/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/gsap@1.20.4/src/minified/TweenMax.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/gsap@1.20.4/src/minified/TimelineMax.min.js"></script>
  <script type="text/javascript" src="../assets/js/GSAP/pro/MorphSVGPlugin.js"></script>
  <style>
    body {
      background: #f1f1f1;
      overflow: hidden;
      font-family: Arial, "Microsoft YaHei";
    }
    .test{
        width: 200px;
        height: 200px;
        background: red;
    }
        .nav{
            width: 100px;
            height: 300px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .nav .svgwrap{
            height: 100%;
            overflow:  hidden;
        }
        .nav ul{
            position: absolute;
            top: 50%;
            right: -50px;
            display: block;
            width: auto;
            transform: translateY(-50%);
            cursor: pointer;
            color: #000;

            width: 130px;
            overflow:  hidden;
            list-style: none
        }
        .nav ul li{
            padding-left: 50px;
            position: relative;
            left: 30px;
            margin-bottom: 20px;
            transition: all .3s;
        }
        .nav ul li:hover{
            font-weight: bold;
            color: #f20;
            margin-left: -20px;
        }
        .nav ul li i{
            width: 5px;
            height: 5px;
            border:    1px solid #fff;
            position: absolute;
            left: 0;
            top: 8px;
            border-radius:50%;
        }
        svg{
            height: 270%;
        }
        .back,.front{
            position: absolute;
            top: 50%;
            right: 0;
            display: block;
            width: auto;
            transform: translateY(-50%);
        }
        .back path {
            fill: green;
            display: none;
        }
        .front path{
            fill: #fff;
            display: none;
        }

       .front {
            /* right: -112px; */

            margin-top: -15px;
            height: 200%;
            /* width: 500px; */
        }
        .back .back_3{
            display:   block;
        }
        .front .front_1{
            display:   block;
        }
    </style>
</head>
<body>
<h1>仿七喜SVG动态导航</h1>
<div class="nav">
    <div class="svgwrap">
         <svg version="1.1" class="back" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve">
            <path class="back_4" d="M130,200V0c0,39.1-66.8,56.7-66.8,105.1C63.2,139.7,130,154.1,130,200z"/>
            <path class="back_3" d="M130,200V0c0,40.5-26.6,59.5-26.6,100C103.4,154.5,130,162.8,130,200z"/>
            <path class="back_2" d="M130,200V0c0,31.9-13.7,57.8-13.7,100C116.3,137.6,130,173.6,130,200z"/>
            <path class="back_1" d="M130,200V0c0,40.5,0,59.5,0,100C130,154.5,130,162.8,130,200z"/>
        </svg>
        <!-- white shape -->
        <svg version="1.1" class="front" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px" viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve">
            <path class="front_2" d="M130,200V0c0,31.9-87.8,45.3-87.8,100C42.2,151.7,130,172,130,200z"/>
            <path class="front_1" d="M130,200V0c0,31.9,0,57.8,0,100C130,137.6,130,173.6,130,200z"/>
        </svg>

    </div>
    <ul class="list">
       <li>
        <i></i>首页</li>
      <li>
        <i></i>关于</li>
      <li>
        <i></i>王其征</li>
      <li>
        <i></i>人民网</li>
    </ul>
</div>
    <script type="text/javascript">
        var tm = TweenMax;
        var timeline =  new TimelineMax();
    </script>
    <script type="text/javascript">
        var $list = $(".list li"),
            $front1 = $(".front_1"),
            $front2 = $(".front_2"),
            $back1 = $(".back_1"),
            $back2 = $(".back_2"),
            $back3 = $(".back_3"),
            $back4 = $(".back_4");


        function go(){
            timeline.clear();

            timeline.to($back3, .5, {
                morphSVG: {
                    shape: $back2
                },
                ease: Back.easeInOut.config(2)
            }, 0).to($back3, .5, {
                morphSVG: {
                    shape: $back4
                },
                ease: Back.easeOut.config(2)
            }, 0.45) .to($front1, .5, {
                morphSVG: {
                    shape: $front2
                },
                ease: Back.easeOut.config(2)
            }, 0.45).staggerTo($list,.1,{
                left:-30,
                ease: Back.easeOut.config(2)
            },0.1,0.3)
        }

        function out(){
            timeline.clear();
            timeline.staggerTo($list,.1,{
                left:30,
                 ease: Back.easeOut.config(2)
            },-0.1).to($front1, .35, {
                morphSVG: {
                    shape: $front1
                },
                ease: Back.easeInOut.config(2)
            }, .3).to($front2, .4, {
                morphSVG: {
                    shape: $front2
                },
                ease: Back.easeIn.config(2)
            }, .5).to($back3, .4, {
                morphSVG: {
                    shape: $back2
                },
                ease: Back.easeInOut.config(2)
            }, .5).to($back3, .4, {
                morphSVG: {
                    shape:$back3
                },
                ease: Back.easeOut.config(2)
            }, .9)
        }

        $(".list").hover(
            function(){
                go();
            },function(){
                out()
            }
        )
    </script>
</body>
</html>
```

> * 本案例使用的核心文件是 MorphSVG.js，收费的，比较尴尬，我自己破解的，你下载下来也用不了……
> * 准备做一个 GSAP 的教程，后续请关注
