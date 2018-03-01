---
title: 打乱数组——shuffle洗牌算法
date: 2018-02-28 22:51:44
tags:
---

## 洗牌算法(shuffle)的 js 实现

相信很多小伙伴在实际项目中都会遇到需要打乱数组的情况,获取一个新的打乱的数组,我们称之为——洗牌算法(shuffle)
js 实现有多种方法

### Fisher-Yates

[Fisher-Yates](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle)应该是最经典的了，这里有一个该算法的[可视化实现](https://bost.ocks.org/mike/shuffle/)

其算法思想就是 **从原始数组中随机抽取一个新的元素到新数组中**

下面是代码

```js
function shuffle(arr) {
  var result = [],
    random
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
```

### 通用的 Shuffle

Fisher 算法要去除原数组中的元素，所以时间复杂度为 O(n2)，下面讲的方法原理是**每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素**，这是一种原地打乱的算法，每个元素随机概率也相等，时间复杂度从 Fisher 算法的 O(n2)提升到了 O(n)
具体步骤：

1. 选取数组(长度 n)中最后一个元素(arr[length-1])，将其与 n 个元素中的任意一个交换，此时最后一个元素已经确定
2. 选取倒数第二个元素(arr[length-2])，将其与 n-1 个元素中的任意一个交换
3. 重复第 1 2 步，直到剩下 1 个元素为止

```js
function shuffle(arr) {
  var length = arr.length,
    temp,
    random
  while (0 != length) {
    random = Math.floor(Math.random() * length)
    length--
    // swap
    temp = arr[length]
    arr[length] = arr[random]
    arr[random] = temp
  }
  return arr
}

var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
shuffle(myArray) // [7, 3, 5, 1, 4, 2, 6, 8, 9]
```

另一种写法：

```js
function shuffle(arr) {
  var random, temp, i
  for (i = arr.length - 1; i > 0; i--) {
    random = Math.floor(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[random]
    arr[random] = temp
  }
  return arr
}

var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
shuffle(myArray) // [2, 4, 9, 3, 1, 6, 8, 5, 7]
```

当然给 `array` 添加原型方法也是可以的

```js
Array.prototype.shuffle = function() {
  var index, temp, i
  for (i = this.length - 1; i > 0; i--) {
    index = Math.floor(Math.random() * (i + 1))
    temp = this[i]
    this[i] = this[index]
    this[index] = temp
  }
  return this
}
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
myArray.shuffle() // [2, 6, 9, 4, 5, 7, 8, 3, 1]
```

## 其他实现方式

### Array.sort()

利用 `Array` 的 `sort` 方法可以更简洁的实现打乱，对于数量小的数组来说足够。

```js
;[1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function() {
  return 0.5 - Math.random()
})
// [8, 2, 5, 7, 4, 6, 9, 3, 1]
```

### ES6

用 `ES6` 实现，代码更简洁

```js
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const random = (Math.floor(Math.random() * (i + 1))[
      (arr[i], arr[random])
    ] = [arr[random], arr[i]])
  }
  return arr
}
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
shuffle(myArray) // [3, 9, 2, 5, 4, 7, 1, 6, 8]
```
