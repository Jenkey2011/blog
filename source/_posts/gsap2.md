---
title: '[原创]GreenSock动画教程2 => 一个简单的动画'
date: 2017-05-27 14:00:17
tags:
  - GreenSock
  - js动画
categories:
  - 原创教程
---

我们先来一个简单的动画作为演示，让一个元素水平向右移动 200 像素(点击右下角"rerun",可再次播放)

<p data-height="265" data-theme-id="dark" data-slug-hash="bWXprO" data-default-tab="css,result" data-user="jenkey2011" data-embed-version="2" data-pen-title=" TweenMax.to()" class="codepen">See the Pen <a href="https://codepen.io/jenkey2011/pen/bWXprO/"> TweenMax.to()</a> by Wang Qizheng (<a href="https://codepen.io/jenkey2011">@jenkey2011</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<!-- more -->

### **TweenMax.to()**

> 语法：TweenMax.to( target:Object, duration:Number, vars:Object )

> * target : Object<br/>这里参数是传入一个或多个元素。支持原生 js 选择器，支持 jquery 选择器
> * duration:Number<br/>动画持续时间，数字类型
> * vars:Object<br/>动画属性，如宽度高度、位置，甚至是背景颜色

```javascript
 // 原生选择器
var box = document.getElementById("box");
TweenMax.to(box, 1, {
  x: 200 //x的意义就是水平方向,即left:200
});

 // jq选择器
TweenMax.to($("#box"), 1, {
  x: 200
});

上述两种写法完全相同，后续默认引入jq，按第二种方法书写
```

### **TweenMax.from()**

> 语法：TweenMax.from( target:Object, duration:Number, vars:Object )
> 参数和 TweenMax.to()相同，只是 to()是去往设置的最终值，而 from()是从设置的值处来。见案例

<p data-height="265" data-theme-id="0" data-slug-hash="OmKNxo" data-default-tab="css,result" data-user="jenkey2011" data-embed-version="2" data-pen-title="OmKNxo" class="codepen">See the Pen <a href="https://codepen.io/jenkey2011/pen/OmKNxo/">TweenMax.from()</a> by Wang Qizheng (<a href="https://codepen.io/jenkey2011">@jenkey2011</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### **TweenMax.fromTo()**

> 语法：TweenMax.fromTo( target:Object, duration:Number, fromVars:Object, toVars:Object )<br/> 顾名思义，就是设置一个元素，从某个状态到某个状态，见案例

<p data-height="265" data-theme-id="0" data-slug-hash="GmVZxB" data-default-tab="css,result" data-user="jenkey2011" data-embed-version="2" data-pen-title="TweenMax.fromTo()" class="codepen">See the Pen <a href="https://codepen.io/jenkey2011/pen/GmVZxB/">TweenMax.fromTo()</a> by Wang Qizheng (<a href="https://codepen.io/jenkey2011">@jenkey2011</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### **TweenMax.set()**

> 语法：TweenMax.set( target:Object, vars:Object ) <br/>设置元素样式，和 jquery 的$(xx).css(xx)类似，这里不做例子了

### 根据上述四个方法，做一个综合动画

<p data-height="527" data-theme-id="0" data-slug-hash="GmVjJo" data-default-tab="js,result" data-user="jenkey2011" data-embed-version="2" data-pen-title="GmVjJo" class="codepen">See the Pen <a href="https://codepen.io/jenkey2011/pen/GmVjJo/">综合动画</a> by Wang Qizheng (<a href="https://codepen.io/jenkey2011">@jenkey2011</a>) on <a href="https://codepen.io">CodePen</a>.</p>
