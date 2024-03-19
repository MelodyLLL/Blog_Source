---
tag: 面试
---

# Javascript 语言基础

<img src="/images/javascript (1).gif" style="zoom:55%;display:block;margin:0 auto"/>


## 作用域是什么？

最简单的回答是 `全局作用域` 和 `局部作用域`，但是这样面试官可能觉得你理解的不够深刻和全面。

JavaScript 的作用域分为以下几种：

1. 全局作用域（Global Scope）：全局作用域是最外层的作用域，它在整个代码中都可访问。在浏览器环境中，全局作用域通常是指 `window` 对象的属性。

2. 函数作用域（Function Scope）：函数作用域是在函数内部声明的变量的作用域。函数内部的变量在函数执行过程中可见，但在函数外部不可访问。

3. 块级作用域（Block Scope）：块级作用域是由花括号 `{}` 所定义的代码块内部的作用域。在 ES6 之前，JavaScript 中没有块级作用域，只有全局作用域和函数作用域。但在 ES6 中引入了 `let` 和 `const` 关键字，可以在块级作用域中声明变量。

4. 模块作用域（Module Scope）：模块作用域是 ES6 模块化引入的概念，每个模块都有自己的作用域，模块内部的变量对外部是不可见的，除非明确地导出和导入。

作用域决定了变量和函数的可见性和访问范围。变量的作用域可以是全局范围、函数内部范围或块级范围，而模块作用域是在模块级别上划分的。了解作用域的概念可以帮助我们正确地管理变量和避免命名冲突。

## 作用域链

一般情况下，变量取值到创建这个变量的函数的作用域中取值。但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。

## 闭包的概念和作用

我的理解：全局作用域外的函数访问上层作用域的变量就形成了闭包。此函数称作闭包函数，变量称为闭包。

官方理解：闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。
简述：闭包是由函数以及声明该函数的词法环境组合而成的

官方理解中，可能比较难理解的是 `词法作用域`
它是什么？ 词法作用域（Lexical Scope） 是定义表达式并能被访问的区间。一个声明（定义变量、函数等）的词法作用域就是它被定义时所在的作用域。

```js
// 定义一个全局作用域变量：
const myName = 'myName';

// 在函数体内调用myName变量
function getName() {
	return myName;
}

console.log(getName()); // 'myName'
```

因此 `myName` 的词法作用域是全局作用域，而不是被调用的函数作用域。只有词法作用域内的代码才可以访问该作用域内部的代码,我理解这可能就是和闭包函数访问闭包一样的道理。

闭包的第一个作用即可以创建私有变量，这也是模块化的一个基石？第二个作用就是延长变量的生命周期。

## 解释原型链

- 每个构造函数都有一个 `prototype` 属性，指向它的原型对象，而且构造函数生成的每个实例也都有一个指向原型对象的内部指针。原型对象上的属性和方法是它所属构造函数生成的实例共享的。
- 在 JavaScript 中，每个实例对象都有一个私有属性 `[[Prototype]]`，该属性指向了这个实例对象的原型，你可以通过 ES6 的 `Object.getPrototypeOf()` 来访问该属性，许多浏览器也对 `[[Prototype]]` 进行了实现，也就是我们经常见到的 `__proto__`，`__proto__` 指向了实例对象的原型对象。
- JavaScript 对象（除了 null）在创建的时候就会关联一个对象，这个对象就是原型，每一个对象都会从原型上继承属性，原型也是对象，所以原型也有原型对象，层层往上，直到 `Object.prototype`，这就是原型链。对象都会有一个 `__proto__` 属性来访问自己的原型，同时这个原型就是生成该对象的构造函数的 `prototype` 属性值。每个原型对象都有一个 `constructor` 属性，指向相关联的构造函数。

```javascript
const arr = []

arr.__proto__ === Array.prototype

a.__proto__.constructor
// a.__proto__.constructor打印的值如下👇
// ƒ Array() { [native code] }

Array.prototype.__proto__ === Object.prototype

Object.prototype.__proto__  === null
```

## js 基本类型和引用类型区别？

当谈到 JavaScript 中的数据类型时，通常将其分为基本类型和引用类型两种。

### 基本类型（Primitive Types）：

1. **String**：字符串类型，用于表示文本数据。
2. **Number**：数值类型，包括整数和浮点数。
3. **Boolean**：布尔类型，表示逻辑上的 true 或 false。
4. **Undefined**：表示未定义或未初始化的值。
5. **Null**：表示空值。
6. **Symbol**：表示唯一的、不可变的值。

基本类型的值直接存储在变量访问的位置，因此它们是按值访问的。当你将一个基本类型的值赋给另一个变量时，会创建一个新的值的副本。基本类型的比较是根据它们的值进行的。

```javascript
let a = 10;
let b = a; // 创建了一个值为 10 的新副本
console.log(b); // 输出 10
```

### 引用类型（Reference Types）：

1. **Object**：对象类型，包括数组、函数、日期等。
2. **Array**：数组类型，用于存储多个值的有序集合。
3. **Function**：函数类型。
4. **Date**：日期类型。
5. **RegExp**：正则表达式类型等。

引用类型的值是对象，在内存中存储的是对象的引用（内存地址），而不是对象本身。当你将一个引用类型的值赋给另一个变量时，实际上是将引用地址赋给了变量，因此两个变量指向同一个对象。引用类型的比较是根据它们的引用地址进行的。

```javascript
let obj1 = { name: 'Alice' };
let obj2 = obj1; // 指向同一个对象
obj2.name = 'Bob';
console.log(obj1.name); // 输出 'Bob'
```

基本类型和引用类型在内存中的存储方式和赋值行为不同，这是它们最主要的区别。理解这些区别对于正确处理 JavaScript 中的数据非常重要。

## js 的包装类型？

> [Js 基本包装类型（含原理）\_js 包装类型的原理\_scluis 的博客-CSDN 博客](https://blog.csdn.net/weixin_42619772/article/details/122510569)

## set 与 map 是什么？应用场景？

> [ES6 的 Map 和 Object](https://www.runoob.com/w3cnote/es6-map-set.html)

## 为什么会有变量提升

1. 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
2. 声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行

## 事件委托与事件冒泡

**事件冒泡：** 当一个事件在 DOM 中触发时，它会沿着 DOM 树向上传播，直到达到根节点。这个过程就叫做事件冒泡。简单来说，如果你点击了一个按钮，那么点击事件不仅会触发在按钮上，还会在按钮的父级、祖父级元素上依次触发。

**事件委托：** 事件委托是利用了事件冒泡的原理。它的基本思想是将事件绑定到父元素上，然后利用事件冒泡的机制，当事件触发时，检查事件的目标，如果目标是子元素，则执行相应的处理函数。通过事件委托，你可以在减少事件监听器数量的同时，实现对动态添加或移除的子元素的事件处理。

## const 声明的值可以修改么？

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

## JS 的 event loop，其在浏览器端与 NodeJS 端实现的区别？

我们把宿主发起的任务称为宏观任务(浏览器 api setTimeout)，把 JavaScript 引擎发起的任务(promise)称为微观任务。许多的微观任务的队列组成了宏观任务。可以看这个视频有一个快速了解[2 分钟了解 JavaScript Event Loop | 面试必备\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1kf4y1U7Ln?from=search&seid=17290685586591017592)
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

代码怎样分析

- 首先我们分析有多少个宏任务；
- 在每个宏任务中，分析有多少个微任务；
- 根据调用次序，确定宏任务中的微任务执行次序；
- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
- 确定整个顺序。

## js 创建对象的几种方式

JavaScript 中创建对象的方式有多种，以下是常见的几种方式：

1. **对象字面量**：使用对象字面量语法直接创建对象。

```javascript
var obj = { key1: value1, key2: value2 };
```

2. **使用构造函数**：通过构造函数创建对象，可以使用 `new` 关键字来实例化一个对象。

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}

var person = new Person('John', 30);
```

3. **使用 Object 构造函数**：使用 `Object` 构造函数创建对象。

```javascript
var obj = new Object();
obj.key1 = value1;
obj.key2 = value2;
```

4. **使用原型链创建对象**：通过原型链的方式创建对象。

```javascript
function Parent() {}
Parent.prototype.method = function () {};

function Child() {}
Child.prototype = new Parent();

var child = new Child();
```

5. **使用 Object.create() 方法**：使用 `Object.create()` 方法创建一个新对象，可以指定新对象的原型。

```javascript
var obj = Object.create(proto);
```

6. **使用工厂模式**：使用工厂模式创建对象，工厂函数负责创建对象并返回。

```javascript
function createPerson(name, age) {
	var person = {};
	person.name = name;
	person.age = age;
	return person;
}

var person = createPerson('John', 30);
```

这些是 JavaScript 中常见的创建对象的方式，每种方式都有其特点和适用场景，开发者可以根据需求选择合适的方式来创建对象。

## new 关键字做了啥

```js
//1、创建一个空的对象
let obj = {}; // let obj = Object.create({});
//2、将空对象的原型prototype指向构造函数的原型
Object.setPrototypeOf(obj, Con.prototype); // obj.__proto__ = Con.prototype
//3、改变构造函数的上下文（this）,并将剩余的参数传入
let result = Con.apply(obj, args);
//4、在构造函数有返回值的情况进行判断
return result instanceof Object ? result : obj;
```

## this 的几种情况描述

1. 在浏览器里，在全局范围内 this 指向 window 对象；
2. 对象方法调用中，this 指向最后调用他的那个对象；
3. 构造函数中，this 指向 new 出来的那个新的对象；
4. call、apply、bind 中的 this 被强绑定在指定的那个对象上；
5. 箭头函数中 this 比较特殊,箭头函数 this 为父作用域的 this，不是调用时的 this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的 this 指向是静态的,声明的时候就确定了下来；

## IIFE 用过么?

立即调用函数表达式(Immediately Invoked Function Expressions)

该方法常用于避免污染全局的命名空间，因为所以在 IIFE 中使用的变量外部都无法访问。

```js
(function () {
	// …
})();

(() => {
	// …
})();

(async () => {
	// …
})();
```

## 解释一下什么是 promise？

Promise 是 JavaScript 中一种用于处理异步操作的对象，它代表了一个异步操作的最终完成（或失败）及其结果的表示。Promise 对象可以认为是一个占位符，用来表示一个尚未完成的异步操作，它可以让异步操作的结果以更加直观和方便的方式来处理。

Promise 对象有三种状态：

1. **Pending（进行中）**：初始状态，表示异步操作尚未完成。
2. **Fulfilled（已完成）**：表示异步操作成功完成。
3. **Rejected（已拒绝）**：表示异步操作失败。

Promise 对象可以通过调用 `then()` 方法来注册成功（fulfilled）和失败（rejected）状态的回调函数，分别处理异步操作成功和失败的情况。同时，Promise 还提供了一些其他方法，如 `catch()`、`finally()` 等，用于处理异常情况和清理资源。

Promise 的主要优点包括：

- **更加直观和可读**：通过 Promise 对象，可以将异步操作的状态以更加直观和可读的方式来表示和处理。
- **避免回调地狱**：通过链式调用的方式，可以避免回调地狱（callback hell），使代码更加清晰和易于维护。
- **更好的异常处理**：Promise 提供了专门的 `catch()` 方法来处理异常情况，使异常处理更加规范和统一。

总的来说，Promise 是一种用于处理异步操作的标准化方式，在异步编程中起着重要的作用，帮助开发者更加轻松地处理异步操作和异步代码流程。

## Async 函数实现原理

看看阮一峰翻译的教程

> [ES6 入门教程](https://es6.ruanyifeng.com/#docs/async)

## JS 垃圾回收

问的概率不大

> [Javascript 的垃圾回收机制总结 - zzzlight - 博客园](https://www.cnblogs.com/zzzlight/articles/16566806.html)

## setTimeOut 与 setInterval 的区别？

`setTimeout` 和 `setInterval` 都是 JavaScript 中用于执行异步操作的定时器函数，但它们有一些区别：

1. **执行方式**：

   - `setTimeout`：用于在指定的时间间隔后执行一次指定的函数。
   - `setInterval`：用于每隔指定的时间间隔重复执行指定的函数。

2. **调用方式**：

   - `setTimeout` 接受两个参数：要执行的函数和延迟的时间（以毫秒为单位）。
   - `setInterval` 接受两个参数：要执行的函数和时间间隔（以毫秒为单位）。

3. **执行次数**：

   - `setTimeout` 只会执行一次指定的函数。
   - `setInterval` 会重复执行指定的函数，直到被清除（通过 `clearInterval` 函数）或者页面被卸载。

4. **可能存在的性能问题**：
   - `setInterval` 会按照指定的时间间隔重复执行函数，如果函数的执行时间超过了指定的时间间隔，可能会导致函数多次同时执行，产生性能问题。
   - `setTimeout` 则不会存在这个问题，因为它只会执行一次函数。

总的来说，`setTimeout` 用于延迟执行一次指定的函数，而 `setInterval` 用于每隔一定时间间隔重复执行指定的函数。在使用时需要根据实际需求选择合适的函数。

请注意，所有的调度方法都不能 保证 确切的延时。

## 箭头函数和普通函数的区别

- 写法更简洁
- 箭头函数没有 this，它的 this 继承于作用域链，因此箭头函数没有自己的 arguments，不能作为构造函数。也没有原型 prototype（这个可以自己试验下）

## 柯里化是什么

柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。

知乎看到一个挺好的示例

```js
var append = function (parent, child) {
	parent.appendChild(child);
};
var remove = function (dom) {
	dom.remove();
};
append(parent, child); //插入
remove(child); //删除
```

柯里化后

```js
var append = function (parent, child) {
	parent.appendChild(child);
	return function () {
		child.remove();
	};
};
//或者是这种，point free风格
var append2 = function (parent, child) {
	parent.appendChild(child);
	return child.remove.bind(child);
};

var remove = append(parent, child); //插入一个节点，同时返回所插入的节点的删除操作。
remove(); //删除。
```

## 深拷贝浅拷贝的区别

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

## axios、fetch、ajax 区别

Ajax、Axios 和 Fetch 都是用于发送 HTTP 请求的工具，但它们有一些区别：

1. **Ajax**：

   - Ajax（Asynchronous JavaScript and XML）是一种在无需重新加载整个网页的情况下，通过后台与服务器进行数据交换的技术。它通常使用 XMLHttpRequest 对象来实现异步通信。
   - Ajax 最初是基于原生的 JavaScript 实现的，它可以实现跨域请求和上传文件等操作。但使用原生的 Ajax 需要编写大量的代码，并且在处理请求错误和超时等方面较为繁琐。

2. **Axios**：

   - Axios 是一个基于 Promise 的 HTTP 客户端，可以用于浏览器和 Node.js 环境。它支持异步请求和 Promise API，并且提供了简洁的 API 接口，能够轻松处理请求和响应数据。
   - Axios 提供了丰富的功能，包括自动转换 JSON 数据、拦截请求和响应、设置请求超时等，使得发送 HTTP 请求变得更加方便和高效。

3. **Fetch**：
   - Fetch 是 Web API 的一部分，是一种用于发送和接收网络请求的新型接口。它使用 Promise 来处理请求和响应，提供了一种更加现代化和简洁的方式来处理网络请求。
   - Fetch 是原生的 Web API，不需要额外的库或插件，因此具有更好的性能和可移植性。但它也有一些限制，比如不支持请求超时、不支持上传文件等。

综上所述，Ajax 是一种传统的异步通信技术，Axios 是一个基于 Promise 的 HTTP 客户端库，而 Fetch 是原生的 Web API。Axios 和 Fetch 相比于原生的 Ajax 提供了更加方便和现代化的方式来处理 HTTP 请求。

> [ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

## ES6 常用语法和 api

问的挺多，一般回答自己常用的就行

> [ES6 入门教程](https://es6.ruanyifeng.com/)

## typeof 和 instanceOf

typeof 一般只能返回如下几个结果：

- 'undefined' ：这个值未定义。
- 'boolean'：这个值是布尔值。
- 'string' ：这个值是字符串。
- 'number' ：这个值是数值。
- 'object'：这个值是对象或 null。
- 'function' ：这个值是函数。

instanceOf 会沿着原型链去找其对应构造函数的类型

## 什么是 AST

AST 全名 abstract syntax tree(抽象语法树),抽象表示把 js 代码进行了结构化的转化,转化为一种类似树状数据结构的 json 对象。 js 是一种解释性语言,js 引擎将 js 代码交给解释器之前,要先进行格式化,也就是通过词法和语法分析后构建出抽象语法树(AST),之后会交给解释器,最终解释称计算机可以识别的机器码。

## JS 监听 dom 变化

用 MutationObserver

> [如何监听 DOM 变化](https://juejin.cn/post/6844904000467255303)

## Promise.all 如何防止一个 promise 失败使整个 promise 失败

第一种[怎么避免 Promise.all 其中一个 reject 让所有都取不到值\_landiyaaa 的博客-CSDN 博客](https://blog.csdn.net/landiyaaa/article/details/113633033)

第二种是直接使用 api allsettled

## 暂存性死区

JavaScript 中的 "暂存性死区"（Temporal Dead Zone，简称 TDZ）是指在块级作用域内使用 `let` 或 `const` 声明的变量，该变量在声明之前被访问时会触发一个 ReferenceError。这种行为是由于 JavaScript 引擎在块级作用域中使用了词法环境（Lexical Environment）和变量提升（Hoisting）的机制。

暂存性死区的产生原因如下：

1. **块级作用域**：使用 `let` 或 `const` 声明的变量具有块级作用域，即只在声明它的块中有效。

2. **变量提升**：虽然 `let` 和 `const` 声明的变量不会像 `var` 那样被提升至当前作用域的顶部，但它们会被提升至当前块级作用域的顶部。在这个过程中，变量存在于块级作用域中，但是处于未初始化的状态。

3. **暂存性死区**：在变量被声明之前的区域称为暂存性死区，如果在暂存性死区内访问该变量，就会触发 ReferenceError。

举两个🌰：

```javascript
console.log(myVar); // ReferenceError: Cannot access 'myVar' before initialization
let myVar = 42;
```

在这个例子中，`console.log(myVar)` 在变量 `myVar` 的声明之前被调用，因此触发了暂存性死区，导致 ReferenceError。

```javascript
if (true) {
	let a = 1;
	var b = 2;
}
```

这个例子中， a is not defined，b 打印为 2

因此，为了避免暂存性死区，应该在使用 `let` 或 `const` 声明的变量之前进行声明和初始化。
