---
sidebar: auto
---

# 前端面试

## Javascript 语言基础

### set 和 map 数据结构？map 和对象的区别和转换？你有在项目中使用过 map 吗，什么场景？

map 是一种新的类似对象的数据类型 [ES6 的 Map 和 Object 区别\_es6 与 object 的区别\_shimeifang11 的博客-CSDN 博客](https://blog.csdn.net/shimeifang11/article/details/122513502)

### 基本类型和引用类型有什么不同？基本类型怎么调用方法？知道包装类型吗

主要了解包装类型[Js 基本包装类型（含原理）\_js 包装类型的原理\_scluis 的博客-CSDN 博客](https://blog.csdn.net/weixin_42619772/article/details/122510569)

### 为什么会有变量提升

1. 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
2. 声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行
3. 变量提升的过程

### 事件委托与事件冒泡

事件委托的本质是，事件冒泡实际上是一个阶段，在这个阶段里的时候，当我们点击一个元素，会先查看这个事件有没有对应的处理函数，没有的话，他就会到他的父级上找有没有处理函数，如果有的话就执行,据此可以实现事件委托
事件冒泡的概念是指：在最内层的元素上绑定的事件被触发后，会按照嵌套的层次由内向外逐步触发。因此，点击某个孩子节点可能会触发父节点的事件。一个阻止事件冒泡的办法就是使用`event.stopPropagation()`，在 IE<9 的浏览器上使用`event.cancelBubble`。

### const 声明的值可以修改么，为什么

基本类型不可以，引用类型可以。const 指针指向的地址不可以改变，指向地址的内容是可以改变的。因为 const 只是保证对象的指针不改变，而对象的内容改变不会影响到指针的改变，所以对象的属性内容是可以修改的。

### null 和 undefined 的区别？

null 是一个表示”无”的对象，转为数值时为 0；undefined 是一个表示”无”的原始值，转为数值时为 NaN。

- null 表示”没有对象”，即该处不应该有值

  （1） 作为函数的参数，表示该函数的参数不是对象。
  （2） 作为对象原型链的终点。

- undefined 表示”缺省值”，就是此处应该有一个值，但是还没有定义

  （1）变量被声明了，但没有赋值时，就等于 undefined。
  （2) 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
  （3）对象没有赋值的属性，该属性的值为 undefined。
  （4）函数没有返回值时，默认返回 undefined。

### JS 的事件循环（event loop），浏览器中事件循环跟 NodeJS 有什么区别。

我们把宿主发起的任务称为宏观任务(浏览器 api setTimeout)，把 JavaScript 引擎发起的任务(promise)称为微观任务。许多的微观任务的队列组成了宏观任务。推荐看这个视频[2 分钟了解 JavaScript Event Loop | 面试必备\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1kf4y1U7Ln?from=search&seid=17290685586591017592)
微任务始终优先于宏任务，示例：

```javascript
setTimeout(() => console.log("d"), 0);
var r = new Promise(function (resolve, reject) {
  resolve();
});
r.then(() => {
  var begin = Date.now();
  while (Date.now() - begin < 1000);
  console.log("c1");
  new Promise(function (resolve, reject) {
    resolve();
  }).then(() => console.log("c2"));
});
```

怎样分析

- 首先我们分析有多少个宏任务；
- 在每个宏任务中，分析有多少个微任务；
- 根据调用次序，确定宏任务中的微任务执行次序；
- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
- 确定整个顺序。

### js 创建对象的几种方式

[javascript 中创建对象的几种方式\_丁码农的博客-CSDN 博客](https://blog.csdn.net/dinglang_2009/article/details/7913866)

### new 关键字做了啥

```
//1、创建一个空的对象
    let obj = {}; // let obj = Object.create({});
    //2、将空对象的原型prototype指向构造函数的原型
    Object.setPrototypeOf(obj,Con.prototype); // obj.__proto__ = Con.prototype
    //3、改变构造函数的上下文（this）,并将剩余的参数传入
    let result = Con.apply(obj,args);
    //4、在构造函数有返回值的情况进行判断
    return result instanceof Object?result:obj;
```

### this 的几种情况描述``

1. 在浏览器里，在全局范围内 this 指向 window 对象；
2. 对象方法调用中，this 指向最后调用他的那个对象；
3. 构造函数中，this 指向 new 出来的那个新的对象；
4. call、apply、bind 中的 this 被强绑定在指定的那个对象上；
5. 箭头函数中 this 比较特殊,箭头函数 this 为父作用域的 this，不是调用时的 this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的 this 指向是静态的,声明的时候就确定了下来；

### 什么叫 IIFEs(Immediately Invoked Function Expressions)?

该方法常用语避免污染全局的命名空间，因为所以在 IIFE 中使用的变量外部都无法访问。

### 闭包的概念和作用

函数访问上层作用域的变量就形成了闭包。

### 解释一下什么是 promise？

`promise`是 js 中的一个对象，用于生成可能在将来产生结果的值。 值可以是已解析的值，也可以是说明为什么未解析该值的原因。
promise 可以有三种状态:

- pending：初始状态，既不是成功也不是失败
- fulfilled：意味着操作完全成功
- rejected：意味着操作失败

### Async 函数实现原理

[ES6 入门教程](https://es6.ruanyifeng.com/#docs/async)

### JS 垃圾回收

[Javascript 的垃圾回收机制总结 - zzzlight - 博客园](https://www.cnblogs.com/zzzlight/articles/16566806.html) 问的概率不大

### setTimeOut 与 setInterval 的区别？

### 箭头函数和普通函数的区别

this 指向 arguements 参数

### 解释原型链

- 每个构造函数都有一个 prototype 属性，指向它的原型对象，而且构造函数生成的每个实例也都有一个指向原型对象的内部指针。原型对象上的属性和方法是它所属构造函数生成的实例共享的。
- 在 JavaScript 中，每个实例对象都有一个私有属性 [[Prototype]]，该属性指向了这个实例对象的原型，你可以通过  ES6 的  Object.getPrototypeOf()  来访问该属性，许多浏览器也对 [[Prototype]] 进行了实现，也就是我们经常见到的 **proto**，没错，**proto** 指向了实例对象的原型，它也是一个对象。
- JavaScript 对象（除了 null）在创建的时候就会关联一个对象，这个对象就是原型，每一个对象都会从原型上继承属性，原型也是对象，所以原型也有原型对象，层层往上，直到 Object.prototype，这就是原型链。对象都会有一个 **proto**   属性来访问自己的原型，同时这个原型就是生成该对象的构造函数的 prototype 属性值。每个原型对象都有一个 constructor 属性，指向相关联的构造函数。

### 作用域是什么？

- 变量在函数外定义，即为全局变量。
  - 全局变量有 **全局作用域**: 网页中所有脚本和函数均可使用。
- 变量在函数内声明，变量为局部作用域。
  - 局部变量：只能在函数内部访问。
  - 在 ES6 之前，是没有块级作用域的概念的
  - 如果想要实现  **块级作用域**  那么我们需要用  `let`  关键字声明！！！

### 作用域链

一般情况下，变量取值到   创建 这个变量 的函数的作用域中取值。但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。

### 柯里化是什么

柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。

### 深拷贝浅拷贝的区别

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

### axios,fetch,ajax 区别

[ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

### ES6 常用操作

[ES6 入门教程](https://es6.ruanyifeng.com/)

### typeof 和 instanceOf

typeof 一般只能返回如下几个结果：
'undefined' ：这个值未定义。
'boolean'：这个值是布尔值。
'string' ：这个值是字符串。
'number' ：这个值是数值。
'object'：这个值是对象或 null。
'function' ：这个值是函数。

instanceOf 会沿着原型链去找其对应构造函数的类型

### 闭包的场景

### 什么是 AST

AST 全名 abstract syntax tree(抽象语法树),抽象表示把 js 代码进行了结构化的转化,转化为一种类似树状数据结构的 json 对象。 js 是一种解释性语言,js 引擎将 js 代码交给解释器之前,要先进行格式化,也就是通过词法和语法分析后构建出抽象语法树(AST),之后会交给解释器,最终解释称计算机可以识别的机器码。

### JS 监听 dom 变化

MutationObserver

### Promise.all 如何防止某一个 promise 失败而使整个 promise 失败

第一种[怎么避免 Promise.all 其中一个 reject 让所有都取不到值\_landiyaaa 的博客-CSDN 博客](https://blog.csdn.net/landiyaaa/article/details/113633033)
第二种是直接使用 api allsettled

### 暂存性死区

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

## TypeScript

### 高级类型及其实现

[TypeScript 中的工具类型](https://www.jianshu.com/p/050cc5ba098a)

### never 和 unknown 的使用场景

[TS 短文 | 3 分钟细品 unknown 和 never 类型-技术圈](https://jishuin.proginn.com/p/763bfbd3c01f)

## HTML 和 CSS

### 标签语义化

- 什么是 HTML 语义化标签？

语义化标签，就是让标签有自己的含义，利用本身传达它所包含内容的一些信息，使浏览器和搜索引擎直观的认识标签和属性的用途和作用。过去我们常常采用 DIV+CSS 的方式布局页面，但 DIV 标签本身没有独特的含义，这样做的结果就是文档结构不够清晰，不利于浏览器对页面的读取，在分离 CSS 样式后，用户体验不友好。所以
HTML5 新增了很多语义化标签，使文档更具可读性，页面结构更清晰。

- 为什么要用 H5 语义化标签？

代码结构清晰，可读性高，减少差异化，便于团队开发和维护。在页面没有加载 CSS 的情况下，也能呈现良好的内容结构，提升用户体验。对搜索引擎友好，良好的结构和语义，有助于爬虫抓取更多的有效信息。

- HTML5 语义化标签有哪些？

header 标签： 页眉，通常包括网站标志、主导航、全站链接以及搜索框
  article 标签：用来定义独立于文档且有意义的来自外部的内容
  section 标签：定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
  aside 标签：定义 article 标签外的内容，可用作文章的侧边栏
  footer 标签：页脚，只有当父级是 body 时，才是整个页面的页脚。

- 好处

HTML 结构清晰
代码可读性较好
无障碍阅读
搜索引擎可以根据标签的语言确定上下文和权重问题
移动设备能够更完美的展现网页（对 css 支持较弱的设备）
便于团队维护和开发

### css 嵌套和标签嵌套过多的坏处

开放性问题，可以答结构不清晰，影响 dom 解析速度等

### display、visibility 和 opacity 的区别

**共同点：**都可以隐藏元素，让元素不可见
**区别：**
**display: none**
（1）DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
（2）事件监听：无法进行 DOM 事件监听；
（3）性能：动态改变此属性时会引起重排，性能较差；
（4）继承：不会被子元素继承，毕竟子类也不会被渲染；
（5）transition：transition 不支持 display。
**visibility: hidden**
（1）DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
（2）事件监听：无法进行 DOM 事件监听；
（3）性 能：动态改变此属性时会引起重绘，性能较高；
（4）继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
（5）transition：transition 支持 visibility。
**opacity: 0**
（1）DOM 结构：透明度为 100%，元素隐藏，占据空间；
（2）事件监听：可以进行 DOM 事件监听；
（3）性 能：提升为合成层，不会触发重绘，性能较高；
（4）继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
（5）transition：transition 支持 opacity。

### 两种图片引用的方式 background-image 和 img 的区别

- 是否占位

background-image 是背景图片，是 css 的一个样式，不占位；
\<img />是一个块状元素，它是一个图片，是 html 的一个标签，占位；

- 是否可操作

（1）background-image 是只能看的，只能设置如下属性：
background-position: 为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层；
background-attachment: 决定背景是在视口中固定的还是随包含它的区块滚动的；
background-repeat: CSS 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。

（2）\<img />是一个 document 对象，它是可以操作的。比如更换 img src 的路径可以达到更换图片的目的，也可以移动它的位置，从 document 中移除等等操作。
所以如果是装饰性的图片就使用 background-img，如果和文体内容很相关就使用 img。

- 加载顺序不同

在网页加载的过程中，以 css 背景图存在的图片 background-image 会等到结构加载完成（网页的内容全部显示以后）才开始加载，而 html 中的标签 img 是网页结构（内容）的一部分会在加载结构的过程中加载，换句话讲，网页会先加载标签 img 的内容，再加载背景图片 background-image，如果你用引入了一个很大的图片，那么在这个图片下载完成之前，img 后的内容都不会显示。而如果用 css 来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，不会影响你浏览网页内容。

### 如何实现一个未知宽高元素的水平垂直居中？

```css
// 1 绝对定位
.parent {
  width: 100%;
  height: 400px;
  background: #666;
  position: relative;
}
.children {
  position: absolute;
  top: 50%;
  left: 50%;
  background: red;
  transform: translate(-50%, -50%);
}

// 2 flex 布局
// 3 grid 布局

align-items: center;
justify-content: center;
```

### 父容器中固定宽度的元素，设置另一个元素填满剩余宽度

[实现左边 div 固定宽度，右边 div 自适应撑满剩下的宽度的布局方式： - FEDeveloper - 博客园](https://www.cnblogs.com/yzhihao/p/6513022.html) 可利用下一题的 BFC 原理

### 什么是 BFC,有什么作用

[带你用最简单的方式理解最全面的 BFC\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1aZ4y1M7gW/?spm_id_from=333.788.recommend_more_video.6)

### 标准盒模型和怪异盒模型

标准盒模型与怪异(IE)盒模型的区别在于计算盒子的宽高是不一样的
怪异盒模型：width = content + padding + border、height = content + padding + border
标准盒模型： width = content、height = content
设置怪异盒模型： box-sizing: border-box;
设置标准盒模型： box-sizing: content-box;
规定从父元素继承 box-sizing：inhert;

### 如果要实现一个点击之后从左边平移到右边的过渡动画我可以怎么做

css3 动画（不会重排），js 原生

### flex 有哪些相关的属性，以及其作用

参考阮一峰老师的这个即可[https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### SVG 和 canvas 的区别

[https://www.w3school.com.cn/html/html5_canvas_vs_svg.asp](https://www.w3school.com.cn/html/html5_canvas_vs_svg.asp)

### 为什么 css3 translate 不会导致重排

## 浏览器，网络相关

### 关于跨域

[为什么浏览器要限制跨域访问? - 知乎](https://www.zhihu.com/question/26379635)

### preload 和 prefetch 了解么

[一站式理解 - prefetch preconnect prerender preload](https://www.jianshu.com/p/4a5f50addccb)

### 状态码 501,502,503？

### http 状态码 301 和 302 了解么

http 状态吗 301：永久重定向，意为旧的 URL 已经不在使用，已永久转移至新的地址。
http 状态吗 302：临时重定向，意为某个时间段因为某些原因临时进行的跳转行为，旧的 URL 地址依然使用并存在。

**网站什么时候使用 301 重定向?**
1、网站进行了改版，新的 URL 结构和旧的 URL 结构不一致，此时，需要讲所有旧网站的 URL 全部 301 到新的网站上，并且要保持 URL 的一一对应，万不可全部跳转至首页，或跳转对应错误。

2、不带 www 的主域名跳转至到 www 的网址版本，如：http://googlenb.com 301 至 http://www.googlenb.com 。 需注意的是，此时跳转也需全站跳转，不要只做首页跳转。

3、http 模式跳转至 https 模式，如：http://www.googlenb.com 301 至 https://www.googlenb.com ，如果网站启用 https，该规则是必须存在的，此规则如果存在，需特别注意不要和上述第二条跳转规则重复跳转，避免 301 两次或多次跳转。即应该： http://googlenb.com 、 http://www.googlenb.com 、 https://googlenb.com , 一次性统一跳转至：https://www.googlenb.com

4、内容重复，内容合并等跳转，同一篇内容存在多个 URL 都能到达访问，此时需要设置跳转至标准且唯一的 URL 版本，避免网站权重分散。

**网站什么时候使用 302 重定向？**
1、移动端访问 PC 端的网站，或 PC 端访问移动端网站，此时建议使用 302 跳转，如移动端访问http://www.163.com， 302 至 http://3g.163.com。

2、临时活动或临时跳转，在举行重大活动，需对活动进行宣传，如：用户访问首页或某些页面时时临时跳转至活动专页，待活动结束后取消跳转。

### localStorage, sessionStorage, Cookie, Session 区别

[细说 localStorage, sessionStorage, Cookie, Session - 掘金](https://juejin.cn/post/6844903587764502536)

### 什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局） 对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对 象的子对象。

### 浏览器缓存

**强缓存(不要向服务器询问的缓存) 返回状态码 200**

- 设置 Expires

即过期时间，例如「Expires: Thu, 26 Dec 2019 10:30:42 GMT」表示缓存会在这个时间后失效，这个过期日期是绝对日期，如果修改了本地日期，或者本地日期与服务器日期不一致，那么将导致缓存过期时间错误。

- 设置 Cache-Control

HTTP/1.1 新增字段，Cache-Control 可以通过 max-age 字段来设置过期时间，例如「Cache-Control:max-age=3600」除此之外 Cache-Control 还能设置 private/no-cache 等多种字段

**协商缓存(需要向服务器询问缓存是否已经过期)返回状态码 304**

- Last-Modified

即最后修改时间，浏览器第一次请求资源时，服务器会在响应头上加上 Last-Modified ，当浏览器再次请求该资   源时，浏览器会在请求头中带上 If-Modified-Since 字段，字段的值就是之前服务器返回的最后修改时间，服务器对比这两个时间，若相同则返回 304，否则返回新资源，并更新 Last-Modified

- ETag

HTTP/1.1 新增字段，表示文件唯一标识，只要文件内容改动，ETag 就会重新计算。缓存流程和 Last-Modified 一样：服务器发送 ETag 字段 -> 浏览器再次请求时发送 If-None-Match -> 如果 ETag 值不匹配，说明文件已经改变，返回新资源并更新 ETag，若匹配则返回 304

**两者对比**

- 当浏览器再次访问一个已经访问过的资源时，它会这样做：

  1.看看是否命中强缓存，如果命中，就直接使用缓存了。 2.如果没有命中强缓存，就发请求到服务器检查是否命中协商缓存。 3.如果命中协商缓存，服务器会返回 304 告诉浏览器使用本地缓存。 4.否则，返回最新的资源。

- ETag 比 Last-Modified 更准确：如果我们打开文件但并没有修改，Last-Modified 也会改变，并且 Last-  Modified 的单位时间为一秒，如果一秒内修改完了文件，那么还是会命中缓存如果什么缓存策略都没有设置，那么浏览器会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间

### 浏览器发起一个请求到页面渲染过程

多结合网上知识整合
[【干货】浏览器是如何运作的？\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1x54y1B7RE) 描述并不是很明确
[浏览器渲染简述](https://segmentfault.com/a/1190000014733203)
[Constructing the Object Model](https://web.dev/critical-rendering-path-constructing-the-object-model/)描述较为准确
引申问题 css 加载会导致阻塞页面白屏么
[css 加载会造成阻塞吗？ - 陈陈 jg - 博客园](https://www.cnblogs.com/chenjg/p/7126822.html)

### 重排和重绘

当 DOM 的变化引发了元素几何属性的变化，比如改变元素的宽高，元素的位置，导致浏览器不得不重新计算元素的几何属性，并重新构建渲染树，这个过程称为“重排”。完成重排后，要将重新构建的渲染树渲染到屏幕上，这个过程就是“重绘”。
简单的说，重排负责元素的几何属性更新，重绘负责元素的样式更新。而且，重排必然带来重绘，但是重绘未必带来重排。比如，改变某个元素的背景，这个就不涉及元素的几何属性，所以只发生重绘。

### TCP 三次握手四次挥手

[面试官，不要再问我三次握手和四次挥手](https://segmentfault.com/a/1190000020610336)

### 浏览器响应用户操作的过程和原理

键盘 鼠标事件来答

### DNS 工作原理

第一步：客户机提出域名解析请求，并将该请求发送给本地的域名服务器。
第二步：当本地的域名服务器收到请求后，就先查询本地的缓存，如果有该纪录项，则本地的域名服务器就直接把查询的结果返回。
第三步：如果本地的缓存中没有该纪录，则本地域名服务器就直接把请求发给根域名服务器，然后根域名服务器再返回给本地域名服务器一个所查询域(根的子域) 的主域名服务器的地址。
第四步：本地服务器再向上一步返回的域名服务器发送请求，然后接受请求的服务器查询自己的缓存，如果没有该纪录，则返回相关的下级的域名服务器的地址。
第五步：重复第四步，直到找到正确的纪录。
第六步：本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时还将结果返回给客户机。

### http 请求 get 和 post 的区别是什么

[get 和 post 请求有哪些区别？ - 踏步 - 博客园](https://www.cnblogs.com/mjtabu/p/12090419.html)

### https 协议跟 http 有什么区别

[我是这样理解 HTTP 和 HTTPS 区别的 - Jesse131 - 博客园](https://www.cnblogs.com/jesse131/p/9080925.html)

### https 协议认证过程

见上一题

### m3u8、flv、mp4 等视频协议有什么区别

问的比较少

### tcp 和 udp 的区别，分别适合在什么业务场景

### socket 是什么？websocket 是什么

### 介绍一下 http2.0，跟 http1.1 有什么区别

[一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)
归纳三大特性：多路复用、主动推送、头部压缩

### xss csrf 等网络安全问题

[如何用简洁生动的语言说明 XSS 和 CSRF 的区别？ - 知乎](https://www.zhihu.com/question/34445731)

### 什么是 token 鉴权

[基于 token 的登陆验证机制 - 程序员自由之路 - 博客园](https://www.cnblogs.com/54chensongxia/p/13491214.html)
[微信链接](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651580141&idx=1&sn=418b943b6765e6ea790cc65764153645&chksm=8025312cb752b83a78dfd28754f567dab743b7b9098055f5819cd440dc39a96b999fcaf3c325&mpshare=1&scene=1&srcid=0905SZ6TYNzqMBA9OuN4OWGb&sharer_sharetime=1630842381432&sharer_shareid=78202e0bfa0a107bbf1a59f370aafdfb&key=553a45c3e4e7e5ae2ef2b15ba4d4fac96a06ba71c75764cf5993da3cfe1234df0cc00dcd47ca9e366bb3980e1456ec0cf10c4d91f0942745c1741afb5e9142c96069f1daf67b1251033b9d8a466e442832f2b5e239c1f9332de449453af6a30d98a1457bd8bb704200226299fa53e916ef1add8bd48ab301d92c1fc349bbf7e2&ascene=1&uin=MjM4NjkxODkwOQ%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=A2P1fIDYCZtZKygIyhpmyyU%3D&pass_ticket=uMmLu94W0HjFyvsKEPNN%2BQKBeMR7c%2FFcPmxmoPOG9FyvVFq6EK6EuDcyPlXgXpay&wx_header=0)

## 框架层面

### Vue

#### 有没有用过 inject、provide api，解决了什么问题，能否响应式

- 主要解决数据跨层级传递的问题
- 可以响应式，需要提供一个响应式对象
- 衍生提问关于状态管理的话题

#### vue 的双向绑定是怎么实现的

- vue 中的双向绑定其实是 v-model 指令的小 trick
- 通过事件触发和 value 绑定可以达到类似双向绑定的效果
- vue.js 采用数据劫持和订阅发布者模式，在初始化时，通过 object.defineproperty 来重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集，如果属性发生变化会通知相关依赖进行更新操作

#### .vue 文件的 template 部分编译之后是什么样的，在什么时候编译

- render 函数
- createElement
- vue-loader 编译

#### vue 组件通讯

- props+events 父子组件通信（parent/parent/parent/children），vuex 任何组件通信，事件中心 emit/emit / emit/on 任何组件的通信， attrs/attrs/attrs/listeners 后代通信（provide / inject）（越多越好）

#### vuex(使用和源码，如何封装一个 vue 插件)

#### 路由懒加载原理

- **level1:**
  1.  将需要懒加载的子模块，打包成单独的文件。ES6 的 import()。
  2.  hashChange 时，根据 hash 变化执行特定的函数，加载子模块。
- **level2:** 实现的三种方式，location.hash + hashChange()，HTML5 规范的 pushState(IE10) + popState 事件监听，abstract nodejs 默认值。
- **level3: **源码分析。路由安装，利用 mixin 给每个组件注入 beforeCreated 和 destory 钩子函数，在 Vue 原型上定义 route 和 route 和 route 和 router，并进行响应式处理，定义全局的 roter-link 和 router-view 组件。根据路由配置创建映射关系。根据传入路径计算出新的路径，在路劲切换过程中，执行一系列的导航守卫函数，更改 Url，渲染对应组件。

#### .vue 文件的编译过程

#### key 的作用： 提供唯一的标识，高效的更新虚拟 dom

更准确：a.key === b.key
更快速：key 的唯一性可以很好的被 map 函数利用，时间复杂度为 O(1)
虚拟 DOM 本质就是用一个原生的 js 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

#### computed 和 watch 的区别和使用场景：

计算属性当依赖的属性发生变化时就会更新视图，适用于比较消耗性能的场景。具有缓存性。watch 不会缓存，每当监听的数据发生变化时都会执行，可以监听某些数据执行回调。

#### v-for 与 v-if 优先级问题

v-for 优先于 v-if 被解析

#### nextTick 原理：

在下次 DOM 更新循环结束之后执行延迟回调。nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试使用 Promise，MutationObserver，setImmediate，setTimeout。

#### 怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？

在 router 目录下的 index.js 文件中，对 path 属性加上/:id，使用 router 对象的 params.id。

#### vuex 是什么？怎么使用？哪种功能场景使用它？

vue 框架中状态管理。在 main.js 中引入 store，注入。新建了一个目录 store。场景有：组件之间的状态，登录状态，按钮权限，用户信息。

#### vuex 有哪些属性？

有五种，分别是 state（存储变量），mutation（提交更新数据的方法，修改 vuex 中状态的唯一方法），action（提交 mutation，可以包含任意异步操作），getter，module（模块化 vuex）

#### $set:

$set方法相当于手动的去把set进去的属性处理成一个响应式的属性。this.$set(this.obj, 'b', 'obj.b')

#### vue-loader:

解析.vue 文件的一个加载器，让 js 可以写 es6，style 样式可以用 scss 或者 less。

#### 对 vue.js 的 template 编译的理解？

就是先转化为 AST 树，在得到 render 函数返回 VNode。

#### name 的作用？

1.注册组件使用组件名.name
2.keep-alive exclude=‘name’ 3.使用 vue-tool 工具时显示的是 name

#### MVVM 是什么:

MVVM 是 Model-View-ViewModel 缩写，Model 代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 的桥梁，数据会绑定到 ViewModel 层并自动将数据渲染到页面中，视图变化时会通知 ViewModel 层更新数据。

#### vue2.x 如何监测数组变化：

使用了函数劫持的方式，重写了数组的方法，将 data 中的数组进行了原型链重写，指向自己定义的数组原型方法，这样当调用这些数组 api 时，可以通知依赖更新，如果数组中包含着引用类型，会对数组中的引用类 再次递归遍历进行监控，这样就能监测到数组的变化了。

#### proxy 只会代理对象的第一层，vue3 是怎么解决这个问题？

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理，这样就实现深度观测。

#### vue 生命周期：

beforeCreate 是 new Vue()之后触发的第一个钩子，在当前阶段 data，computed，methods 以及 watch 上的数据和方法都不能被触发。
created 在实例创建完成后发生，这个阶段可以使用数据，更改数据，但不会触发 update 函数，无法与 Dom 进行交互。
mounted 在挂载完成后发生，数据完成双向绑定，可以访问到 Dom 节点，使用$ref 属性对 Dom 进行操作。
beforeUpdate 发生在更新之前，响应式数据发生更新，虚拟 Dom 被渲染之前
updated 发生在更新完成之后，Dom 更新完成
beforeDestroy 发生在实例销毁之前，可以清除定时器。
destroyed 发生在实例销毁之后，这个时候 Dom 是空的，组件被拆解，数据绑定被卸除，监听被移除，子实也 都销毁。

#### vue 接口请求放在哪个生命周期？

created，这个阶段已经能拿到数据，mounted，beforeUpdate 也可以。

#### v-if 和 v-show 的区别？

当条件不成立时，v-if 不会渲染 Dom 元素，v-show 操作的样式，通过 display 来切换当前 DOM 的显示和隐藏。

#### data 为什么是个函数？

为了保证组件不同的实例之间不冲突。一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数，如果 data 是一个对象的话，对象属于引用类型，会影响到所有的实例。

#### v-model 的原理？

v-model 可以看成时 value + input 方法的语法糖，可以通过 model 属性的 prop 和 event 属性来进行自定义。
注: 在 checkbox 和 radio 中 v-model = checked 属性 + change 事件，在 select 中将 value 作为 prop 并将 change 作为事件

#### vue 事件绑定的原理？

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过$on 实现的。

#### vue2.x 和 vue3.x 渲染器的 diff 算法:

diff 算法就是进行虚拟节点对比，并返回一个 patch 对象，用来存储两个节点不同的地方，最后用 patch 记录的消息去局部更新 Dom。
diff 算法有以下过程：
先同级比较，再比较子节点。
先判断一方有子节点一方没有子节点的情况，这样就给新的节点移除或者新增上子节点。
比较都有子节点的情况，递归的比较子节点。
vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 找到可以复用的节点，在进行相关操作。
vue3 在创建 VNode 的时候就确定其类型，在 patch 的过程中采用位运算来判断一个 VNode 的类型，再配合核心 diff 算法。

#### keep-alive：

keep-alive 可以实现组件缓存，当组件切换时不会对组件进行卸载。
常用的两个属性 include/exclude，允许组件有条件的进行缓存。
两个生命周期 activated/deactivated，用来判断当前组件是否处于活跃状态。

#### vue 中组件生命周期的调用顺序：

调用顺序都是先父后子，渲染完成的顺序都是先子后父。组件的销毁操作是先父后子，销毁完成的顺序是先子后父
加载渲染过程：父 beforeCreated->父 created->父 beforeMount->子 beforeCreated->子 created->子 beforeMounted->子 mounted->父 mounted
子组件更新过程: 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
销毁过程： 父 beforeDestroyed->子 beforeDestroyed->子 destroyed->父 destroyed

#### vue2.x 组件之间通信方式：

父子组件通信：父传子 props，子传父 $on $emit
获取父子组件实例 $parent $children
兄弟组件通信：Event bus
跨组件通信：vuex

#### ssr 了解吗？

    ssr也就是服务端渲染，也就是把vue在客户端把标签渲染成HTML·的工作放在服务端完成，然后再把html直接返回给客户端。
    服务器渲染只支持created和beforeCreated两个钩子，ssr有着更好的seo，首屏加载速度更快。

#### 写过 vue 自定义指令吗？

#### vue 中的性能优化：

    编码阶段：
    1.尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的依赖。
    2.v-if和v-for不能连用
    3.如果需要使用v-for给每项元素绑定事件时使用事件代理。
    4.SPA页面采用keep-alive
    5.在更多的情况下，使用v-if代替v-show
    6.key保证唯一
    7.使用路由懒加载，异步组件
    8.防抖，节流
    9.第三方模块按需导入
    10.图片懒加载
    11.css在前，js在后，css在前可以和dom树一起合成render树，js在后不阻塞dom渲染
    12.减少http请求
    打包优化：
    1.压缩代码
    2.使用cdn加载第三方模块

#### hash 路由和 history 的实现原理

    location.hash的值实际就是URL#后面的东西
    history实际采用了HTML5中的提供的API来实现，主要有history.pushState()和history.replaceState().

### React

#### 单页应用和多页面的优缺点

#### 虚拟 dom 的比较过程

虚拟 dom 本质是一个 js 对象
比较麻烦的写法

```javascript
React.createElement(type, [props], [...children]);
```

实际上这个可以使用 jsx 的写法，然后通过 babel 转译成上面这样。优点是可以写方便的 jsx，缺点是依赖打包插件
实际上原生 js 插入 dom 节点的操作 在万次操作上是比 react 要快的
虚拟 dom 为什么比真实 dom 操作快

- 减少 dom 操作，将多次操作合并为一次
- 借助 diff 算法减少多余操作

总结 操作原生 dom 开销比较大，而且会引发重绘或者重排，react 只是把这些操作放到了虚拟 dom 的比较上面，即 js 对象之间的比较计算，将 dom 操作缓存起来一次性去操作，最后也还是要操作 dom 的，只不过是减少了操作次数，优化了重绘和重排。

#### setState 原理

#### hooks 使用注意事项 为什么？

#### react Fiber 是什么

[React Fiber 是什么?](https://zhuanlan.zhihu.com/p/297971861)

#### react setState 是同步还是异步

[Component State – React](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

#### hooks 与 HOC

逻辑抽离，然后会问如何抽离，和 HOC 的区别

#### useEffect 和 useLayoutEffect 的区别是什么

执行时机不同，后者跟 didMount 一致，在 dom 更新后同步执行，useEffect 是异步执行
后者能在服务端渲染中执行（但是无效）

#### setState 的执行时机，比如连续三次 setState 之后的值是什么，为什么

在生命周期、事件触发等情况下，连续的 setState 并不会马上更新值，而是批量更新
在 setTimeout 类似的回调中则会同步更新，性能差很多
batchedUpdate 机制

#### 对 redux 的理解

[完全理解 redux（从零实现一个 redux） · Issue #22 · brickspert/blog](https://github.com/brickspert/blog/issues/22)

### WebPack 等工程化

#### webPack 常用配置

[配置 | webpack 中文文档](https://www.webpackjs.com/configuration/)

#### webpack 优化

#### webpack 类似工具？为什么用 webpack？

#### webpack 构建流程？说完整一些。

入口文件，依赖树构建，loader 加载对应文件，plugin 全局广播

#### webpack 的热更新怎么做到的？

#### webpack 中自定义 loader

#### require 和 import 区别，原理？

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

#### AMD 和 CMD？

#### Babel

[Babel 是什么？ · Babel 中文文档 | Babel 中文网](https://www.babeljs.cn/docs/)

#### 写过的 webpack 插件、loader

类似 eslint 插件，雪碧图 loader, 监控 loader

### 小程序

#### 小程序怎么实现类似 Vue 的 mixin 的功能

#### 小程序怎么做启动优化

#### 小程序怎么做异常监控

#### 微信小程序底层实现原理是什么，什么是小程序的双线程模型

[理解微信小程序的双线程模型 - JunpengZ - 博客园](https://www.cnblogs.com/ihardcoder/p/14778013.html)

#### 怎么做小程序的自动化集成和发布

可以利用小程序的 jenkins 插件

#### 小程序怎么模拟 cookie

#### 小程序常用生命周期

页面的，组件的，taro 等流行框架对应的。

#### 小程序的发布流程

### rollup 工程化

#### 怎样实现一个组件库，怎样实现一个 js 库

组件目录、编写，组件文档，组件打包，npm 发包方向

#### rollup 常见配置、插件

## NodeJS 和服务器

### node 导出模块的两种方式有什么区别？

### 知道洋葱模型吗？

## 设计模式

### 发布订阅模式和观察者模式区别

[观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)

### 单例模式

## 持续化集成，基建，团队管理

### 做过最有价值的优化是什么

### 前端项目的发布流程，怎么做前端的自动化集成，CI/CD

### 做过哪些前端基建，为什么要做这些，有没有别的方案同样能解决问题，目前还有没有可以做的更好的

### 怎么做页面性能评测，怎么收集用户性能数据，有哪些指标，分别可以怎么收集

### 怎么做线上异常监控

### 在一个 20-30 人左右的前端团队，你会怎么设计整个前端的技术体系，跟 5-10 人团队有什么区别。如果人数和业务继续增长，又有什么不一样的。

### 怎么理解前端自动化测试，怎么做

### 知道路由守卫吗？你们埋点是怎么实现的？

## 跨平台

### 写过 vscode 插件吗？

### chrome 插件开发？

### 跨平台技术了解

移动端 ReactNative，flutter
桌面端 electron

## 性能优化，适配

### 怎么做移动端适配？知道 flexible 吗？原理？rem 适配？

### IOS 与安卓兼容问题

1px 问题
iphonex 底部兼容问题
时间格式问题

### 虚拟列表

[「前端进阶」高性能渲染十万条数据(虚拟列表) - 掘金](https://juejin.cn/post/6844903982742110216)

### 提升页面加载速度

- 介绍一个你之前做过觉得最好的项目，好在哪里，有没有还可以改进的部分
- 项目过程中遇到可能导致 delay 的问题，怎么处理

### 关于 SEO

[前端搜索引擎优化（SEO）\_如故~的博客-CSDN 博客](https://blog.csdn.net/weixin_45899230/article/details/107512596)

### 关于图片优化

- 懒加载
- 第三方压缩裁剪
- cdn 加速
- 规范组件化使用，可以考虑使用 eslint 检查

## 算法、笔试题

### 手写继承

```javascript
function Parent(name) {
  this.name = name;
  this.arr = [];
}
function Child() {}
// 原型链继承 实质就是子类构造函数的prototype指向父类实例
// 缺点:共享了父类构造函数的引用属性，而且实例化Child的时候不能传name
// 优点:共享了父类构造函数的方法
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 构造函数继承 实质就是在子类构造函数里面call 父类的构造函数
// 优点，不共享父类构造函数的引用属性，也可以传参
// 父类原型上的方继承不到了
function Child(name) {
  Parent.call(this, name);
}

// 组合继承 实质就是上面两种加起来
// 优点，上面的问题都解决了
// 显而易见父类构造函数被执行了两次，搞了两份父类构造函数属性出来。
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 组合继承优化 实质是 Child.prototype = new Parent()变成了 Child.prototype = Parent.prototype;
// 优点 解决了多余一份属性的冗余
// 缺点 第三步修复的时候很明显把Parent.prototype.constructor也影响了
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

// 寄生组合继承 实质是Child.prototype = Parent.prototype;
// 变成了Child.prototype = Object.create(Parent.prototype);相当于新建对象阻隔了引用传递
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

### 手写 bind call apply

```javascript
Function.prototype.myCall = function (context, ...args) {
  // 解构context 与arguments
  if (typeof this !== "function") {
    // this 必须是函数
    throw new TypeError(`It's must be a function`);
  }
  if (!context) context = window; // 没有context，或者传递的是 null undefined，则重置为window
  const fn = Symbol(); // 指定唯一属性，防止 delete 删除错误
  context[fn] = this; // 将 this 添加到 context的属性上
  const result = context[fn](...args); // 直接调用context 的 fn
  delete context[fn]; // 删除掉context新增的symbol属性
  return result; // 返回返回值
};
```

```javascript
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  if (typeof fn !== "function") {
    throw new TypeError("It must be a function");
  }
  if (!context) context = window;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  };
};
```

### url 跳转工具函数

```javascript
export function goBackUrl(
  jumps = 0,
  uri: string = window.location.pathname
): string {
  let newURI = uri;

  // Remove trailing slash
  while (newURI.endsWith("/")) {
    newURI = newURI.slice(0, -1);
  }
  if (jumps === 0) {
    return newURI;
  }

  // Go back !
  return newURI.split("/").slice(0, -jumps).join("/");
}
```

### 数组去重复的方法有哪些

1.使用 `set`function uniquearray(array) { let unique_array= Array.from(set(array)) return unique_array; } 2.使用 `filter`

```
function unque_array (arr) {
  let unique_array = arr.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  })
  return unique_array;
}
 console.log(unique_array(array_with_duplicates));
复制代码
```

3.使用 `for` 循环

```
Array dups_names = ['Ron', 'Pal', 'Fred', 'Rongo', 'Ron'];
function dups_array(dups_names) {
 let unique = {};
 names.forEach(function(i) {
    If (!unique[i]) {
      unique[i] = true;    }
  });
return Object.keys(unique);}   // Ron, Pal, Fred, Rongo
Dups_array(names);
```

### 实现一个 setTimeOut

```javascript
// setTimeout的实现
function mySetTimeout(callback, timeout) {
  let timer;
  let time = new Date();
  let endTime = timeout || 0;
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    if (new Date() - time >= endTime) {
      callback.call(this, timer);
      window.cancelAnimationFrame(timer);
    }
  };
  window.requestAnimationFrame(loop);
}
mySetTimeout(() => {
  console.log("hh");
});
```

### 手写深拷贝

```typescript
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

链接：https://juejin.im/post/6844903929705136141
来源：掘金
```

### 手写防抖

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

```typescript
function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```

### 手写节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

```typescript
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}
```

### 手写 delay 函数

```typescript
export function delay(millis: number) {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve(true);
    }, millis);
  });
}
```

### 累加的调用

```typescript
const Sum = (a) => (b) => b ? Sum(a + b) : a;

console.log(Sum(3)(4)(2)(5)()); //14

console.log(Sum(3)(4)(1)()); //8
```

```typescript
// 这种是最后返回的函数没有被调用的，重点是
// JavaScript中，打印和相加计算，会分别调用toString或valueOf函数
var add = function (m) {
  var temp = function (n) {
    return add(m + n);
  };
  temp.toString = function () {
    return m;
  };
  return temp;
};

add(3)(4)(5); // 12
add(3)(6)(9)(25); // 43
```

### 手写 LazyMan，类似实 Promise

```javascript
class LazyMan {
  constructor(name) {
    this.name = name;
    this.task = []; // 任务队列
    console.log(`My named ${name}`);

    // 这里使用异步调用next()是为了确保所有链式调用都被添加到task[]才开始执行任务
    setTimeout(() => {
      this.next();
    });
  }

  sleep(time) {
    this.task.push(() => {
      console.log(`I am sleeping...`);
      setTimeout(() => {
        console.log(`after ${time} ms`);
        this.next();
      }, time);
    });
    return this;
  }

  eat(food) {
    this.task.push(() => {
      console.log(food);
      this.next();
    });
    return this;
  }

  next() {
    let fn = this.task.shift();
    fn && fn(); // if(fn) fn()
  }
}

const lazyMan = new LazyMan("jack");
lazyMan.eat("apple").sleep(5000).eat("hamburger").sleep(3000).eat("pear");
```

### 手写 Promise

简单的实现

```typescript
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  function resolve(value) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
// 定义链式调用的then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};
```

考虑了异步函数执行的情况

```typescript
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    let resolve = (value) => {
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }

    let reject = (reason) => {
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(()=> {
        onRejected(this.reason);
      })
    }
  }
}

new Promise(resolve=>setTime(()=>resolve('aaa'),1000))).then((rsp)=>console.log(rsp))
```

### 实现 Promise.all

```javascript
Promise.prototype.all = function (promises) {
  let results = [];
  let promiseCount = 0;
  let promisesLength = promises.length;
  return new Promise(function (resolve, reject) {
    for (let val of promises) {
      Promise.resolve(val).then(
        function (res) {
          promiseCount++;
          // results.push(res);
          results[i] = res;
          // 当所有函数都正确执行了，resolve输出所有返回结果。
          if (promiseCount === promisesLength) {
            return resolve(results);
          }
        },
        function (err) {
          return reject(err);
        }
      );
    }
  });
};
```

### 数组转 Tree （递归和 reduce 实现）

```javascript
export const generateTree = (
  treeData,
  props = {
    pId: "pId",
    id: "id",
  }
) => {
  // // 把跟节点首先放进数组
  const tmpTree = treeData.filter(
    (node) => node[props.pId] === null || node[props.pId] === ""
  );
  // 递归生成节点及子节点数据
  const findChildren = (tree) => {
    tree.forEach((node) => {
      node.children = treeData.filter(
        (cNode) => cNode[props.pId] === node[props.id]
      );
      // 还有children就继续往下找
      if (node.children.length) {
        findChildren(node.children);
      }
    });
  };

  findChildren(tmpTree);

  return tmpTree;
};
```

```javascript
let treeList = Arr.reduce((prev, cur) => {
  prev[cur["id"]] = cur;
  return prev;
}, {});
// console.log(treeList)
let result = Arr.reduce((prev, cur) => {
  let pid = cur.parent_id;
  // pid为0的就找不到父对象，找到当前cur的父对象
  // 对象的浅拷贝，引用关系存在，在后面处理parent的时候也会导致cur的改变，达到递归的效果
  let parent = treeList[pid];
  // console.log(parent,1)
  // 如果父对象存在，就将cur压到父对象的children属性中
  if (parent) {
    // parent和cur存在引用关系
    parent.children ? parent.children.push(cur) : (parent.children = [cur]);
  } else if (pid === 0) {
    // 没有父对象，则此cur为树的根元素
    prev.push(cur);
  }
  return prev;
}, []);
// console.log(result)
```

### 冒泡排序

```javascript
function pop(array) {
  var len = array.length,
    i,
    j,
    tmp,
    result;
  result = array.slice(0);
  for (i = 0; i < len; i++) {
    for (j = len - 1; j > i; j--) {
      if (result[j] < result[j - 1]) {
        tmp = result[j - 1];
        result[j - 1] = result[j];
        result[j] = tmp;
      }
    }
  }
  return [result, array];
}
```

### 插入排序

```javascript
function insert(array) {
  var len = array.length,
    i,
    j,
    tmp,
    result;
  // 设置数组副本
  result = array.slice(0);
  console.log(result);
  for (i = 1; i < len; i++) {
    //数组第一个值为默认的衡量值
    tmp = result[i]; //从第二个值开始与之前的值进行比较
    j = i - 1; //之前已经排好序的数组的最后一个
    while (j >= 0 && tmp < result[j]) {
      //如果j大于等于零（否则越界） 与最后一个值进行比较，如果小于
      result[j + 1] = result[j]; //则将最后一个值后移一位
      j--; //j往前移动一位
    }
    result[j + 1] = tmp; //比较完成 这时result[j]<temp或者j已经为-1，则将tmp的值赋给j+1
  }
  return result;
}
```

### 快速排序

```javascript
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var left = [],
    right = [],
    mid = arr.splice(Math.floor(arr.length / 2), 1);

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(mid, quickSort(right));
}
```

### 各种排序算法以及解析

[十大排序算法总结](https://zhuanlan.zhihu.com/p/378430869)
