---
---

# Javascript语言基础

## 作用域是什么？

JavaScript 的作用域分为以下几种：

1. 全局作用域（Global Scope）：全局作用域是最外层的作用域，它在整个代码中都可访问。在浏览器环境中，全局作用域通常是指 `window` 对象的属性。

2. 函数作用域（Function Scope）：函数作用域是在函数内部声明的变量的作用域。函数内部的变量在函数执行过程中可见，但在函数外部不可访问。

3. 块级作用域（Block Scope）：块级作用域是由花括号 `{}` 所定义的代码块内部的作用域。在 ES6 之前，JavaScript 中没有块级作用域，只有全局作用域和函数作用域。但在 ES6 中引入了 `let` 和 `const` 关键字，可以在块级作用域中声明变量。

4. 模块作用域（Module Scope）：模块作用域是 ES6 模块化引入的概念，每个模块都有自己的作用域，模块内部的变量对外部是不可见的，除非明确地导出和导入。

作用域决定了变量和函数的可见性和访问范围。变量的作用域可以是全局范围、函数内部范围或块级范围，而模块作用域是在模块级别上划分的。了解作用域的概念可以帮助我们正确地管理变量和避免命名冲突。

## 作用域链

一般情况下，变量取值到创建这个变量的函数的作用域中取值。但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。

## 闭包的概念和作用

函数访问上层作用域的变量就形成了闭包。

## 基本类型和引用类型区别？基本类型怎么调用方法？知道包装类型吗？

主要了解包装类型[Js 基本包装类型（含原理）\_js 包装类型的原理\_scluis 的博客-CSDN 博客](https://blog.csdn.net/weixin_42619772/article/details/122510569)

## set 与 map 是什么？应用场景？

[ES6 的 Map 和 Object](https://www.runoob.com/w3cnote/es6-map-set.html)

## 为什么会有变量提升

1. 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
2. 声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行
3. 变量提升的过程

## 事件委托与事件冒泡

事件委托的本质是，事件冒泡实际上是一个阶段，在这个阶段里的时候，当我们点击一个元素，会先查看这个事件有没有对应的处理函数，没有的话，他就会到他的父级上找有没有处理函数，如果有的话就执行,据此可以实现事件委托
事件冒泡的概念是指：在最内层的元素上绑定的事件被触发后，会按照嵌套的层次由内向外逐步触发。因此，点击某个孩子节点可能会触发父节点的事件。一个阻止事件冒泡的办法就是使用`event.stopPropagation()`，在 IE<9 的浏览器上使用`event.cancelBubble`。

## const 声明的值可以修改么，为什么

基本类型不可以，引用类型可以。const 指针指向的地址不可以改变，指向地址的内容是可以改变的。因为 const 只是保证对象的指针不改变，而对象的内容改变不会影响到指针的改变，所以对象的属性内容是可以修改的。

## null 和 undefined 的区别？

null 是一个表示”无”的对象，转为数值时为 0；

- null 表示”没有对象”，即该处不应该有值
- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。

undefined 表示”缺省值”，就是此处应该有一个值，但是还没有定义,转为数值时为 NaN。

- 变量被声明了，但没有赋值时，就等于 undefined。
- 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
- 对象没有赋值的属性，该属性的值为 undefined。
- 函数没有返回值时，默认返回 undefined。

## JS的event loop，其在浏览器端与NodeJS端实现的区别？

我们把宿主发起的任务称为宏观任务(浏览器 api setTimeout)，把 JavaScript 引擎发起的任务(promise)称为微观任务。许多的微观任务的队列组成了宏观任务。推荐看这个视频[2 分钟了解 JavaScript Event Loop | 面试必备\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1kf4y1U7Ln?from=search&seid=17290685586591017592)
微任务始终优先于宏任务，示例：

```javascript
setTimeout(() => console.log('d'), 0);
var r = new Promise(function (resolve, reject) {
	resolve();
});
r.then(() => {
	var begin = Date.now();
	while (Date.now() - begin < 1000);
	console.log('c1');
	new Promise(function (resolve, reject) {
		resolve();
	}).then(() => console.log('c2'));
});
```

怎样分析

- 首先我们分析有多少个宏任务；
- 在每个宏任务中，分析有多少个微任务；
- 根据调用次序，确定宏任务中的微任务执行次序；
- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
- 确定整个顺序。

## js 创建对象的几种方式

[javascript 中创建对象的几种方式\_丁码农的博客-CSDN 博客](https://blog.csdn.net/dinglang_2009/article/details/7913866)

## new 关键字做了啥

```js
//1、创建一个空的对象
let obj = {}; // let obj = Object.create({});
//2、将空对象的原型prototype指向构造函数的原型
Object.setPrototypeOf(obj,Con.prototype); // obj.__proto__ = Con.prototype
//3、改变构造函数的上下文（this）,并将剩余的参数传入
let result = Con.apply(obj,args);
//4、在构造函数有返回值的情况进行判断
return result instanceof Object?result:obj;
```

## this 的几种情况描述

1. 在浏览器里，在全局范围内 this 指向 window 对象；
2. 对象方法调用中，this 指向最后调用他的那个对象；
3. 构造函数中，this 指向 new 出来的那个新的对象；
4. call、apply、bind 中的 this 被强绑定在指定的那个对象上；
5. 箭头函数中 this 比较特殊,箭头函数 this 为父作用域的 this，不是调用时的 this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的 this 指向是静态的,声明的时候就确定了下来；

## 什么叫 IIFEs(Immediately Invoked Function Expressions)?

该方法常用语避免污染全局的命名空间，因为所以在 IIFE 中使用的变量外部都无法访问。

## 解释一下什么是 promise？

`promise`是 js 中的一个对象，用于生成可能在将来产生结果的值。 值可以是已解析的值，也可以是说明为什么未解析该值的原因。
promise 可以有三种状态:

- pending：初始状态，既不是成功也不是失败
- fulfilled：意味着操作完全成功
- rejected：意味着操作失败

## Async 函数实现原理

[ES6 入门教程](https://es6.ruanyifeng.com/#docs/async)

## JS 垃圾回收

[Javascript 的垃圾回收机制总结 - zzzlight - 博客园](https://www.cnblogs.com/zzzlight/articles/16566806.html) 问的概率不大

## setTimeOut 与 setInterval 的区别？

## 箭头函数和普通函数的区别

this 指向 arguements 参数

## 解释原型链

- 每个构造函数都有一个 prototype 属性，指向它的原型对象，而且构造函数生成的每个实例也都有一个指向原型对象的内部指针。原型对象上的属性和方法是它所属构造函数生成的实例共享的。
- 在 JavaScript 中，每个实例对象都有一个私有属性 [[Prototype]]，该属性指向了这个实例对象的原型，你可以通过  ES6 的  Object.getPrototypeOf()  来访问该属性，许多浏览器也对 [[Prototype]] 进行了实现，也就是我们经常见到的 **proto**，没错，**proto** 指向了实例对象的原型，它也是一个对象。
- JavaScript 对象（除了 null）在创建的时候就会关联一个对象，这个对象就是原型，每一个对象都会从原型上继承属性，原型也是对象，所以原型也有原型对象，层层往上，直到 Object.prototype，这就是原型链。对象都会有一个 **proto**   属性来访问自己的原型，同时这个原型就是生成该对象的构造函数的 prototype 属性值。每个原型对象都有一个 constructor 属性，指向相关联的构造函数。

## 柯里化是什么

柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。

## 深拷贝浅拷贝的区别

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

## axios,fetch,ajax 区别

[ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

## ES6 常用操作

[ES6 入门教程](https://es6.ruanyifeng.com/)

## typeof 和 instanceOf

typeof 一般只能返回如下几个结果：
'undefined' ：这个值未定义。
'boolean'：这个值是布尔值。
'string' ：这个值是字符串。
'number' ：这个值是数值。
'object'：这个值是对象或 null。
'function' ：这个值是函数。

instanceOf 会沿着原型链去找其对应构造函数的类型

## 什么是 AST

AST 全名 abstract syntax tree(抽象语法树),抽象表示把 js 代码进行了结构化的转化,转化为一种类似树状数据结构的 json 对象。 js 是一种解释性语言,js 引擎将 js 代码交给解释器之前,要先进行格式化,也就是通过词法和语法分析后构建出抽象语法树(AST),之后会交给解释器,最终解释称计算机可以识别的机器码。

## JS 监听 dom 变化

MutationObserver

## Promise.all 如何防止某一个 promise 失败而使整个 promise 失败

第一种[怎么避免 Promise.all 其中一个 reject 让所有都取不到值\_landiyaaa 的博客-CSDN 博客](https://blog.csdn.net/landiyaaa/article/details/113633033)
第二种是直接使用 api allsettled

## 暂存性死区

```javascript
if(true){
	let a = 1;
  var b = 2;
}
打印a ,b的结果

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用
域。凡是在声明之前就使用这些变量，就会报错。总之，在代码块内，使用let命令声明变量之前，该变量都是不可
用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
```
