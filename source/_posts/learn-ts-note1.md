---
title: typescript 基本数据类型
date: 2019-05-20 20:46:05
tags:
    - typescript
---

### 布尔值

最基础的数据类型

```js
let isDone: boolean = false;
```

### 数值

支持十进制、十六进制，也支持ES6引入的二进制、八进制

```js
// 不同进制表示20的写法
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;

// NaN 、 infinity，也属于number类型
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

### 字符串

字符串，引号、反引号，都可

```js
let name: string = 'Jenkey2011';
let greet: string = `Hello ${name}`;
```

### 空值

js中没有空值的概念，在typescript中，可以用`void`表示没有任何返回值的函数

```js
function greeter(): void {
    alert('Hello Jenkey2011!')
}
```

也可以声明一个`void`类型的变量，虽然实际上并没啥用

```js
let useless: void = undefined;
let uselessToo: void = null;
```

### null 和 undefined

typescript中，可以使用`null` `undefined`来定义这两种原始数据类型

```js
let uType: undefined = undefined;
let nType: null = null;
```

和上述`void`类型的区别是，`null`和`undefined`是左右类型的子类型，就是说，`undefined`可以赋值给`string`类型，而`void`不行

```js
// 不会报错
let num: number = undefined;

// 报错
let u: void;
let num: number = u;
```