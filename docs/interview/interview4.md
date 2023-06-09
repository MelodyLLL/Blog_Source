# 浏览器和网络相关

## 关于跨域

[为什么浏览器要限制跨域访问? - 知乎](https://www.zhihu.com/question/26379635)

## preload和prefetch了解么

[一站式理解 - prefetch preconnect prerender preload](https://www.jianshu.com/p/4a5f50addccb)

## 状态码501,502,503？

## http状态码301和302了解么

http 状态吗 301：永久重定向，意为旧的 URL 已经不在使用，已永久转移至新的地址。
http 状态吗 302：临时重定向，意为某个时间段因为某些原因临时进行的跳转行为，旧的 URL 地址依然使用并存在。

**网站什么时候使用301重定向?**
1、网站进行了改版，新的 URL 结构和旧的 URL 结构不一致，此时，需要讲所有旧网站的 URL 全部 301 到新的网站上，并且要保持 URL 的一一对应，万不可全部跳转至首页，或跳转对应错误。

2、不带 www 的主域名跳转至到 www 的网址版本，如：http://googlenb.com 301 至 http://www.googlenb.com 。 需注意的是，此时跳转也需全站跳转，不要只做首页跳转。

3、http 模式跳转至 https 模式，如：http://www.googlenb.com 301 至 https://www.googlenb.com ，如果网站启用 https，该规则是必须存在的，此规则如果存在，需特别注意不要和上述第二条跳转规则重复跳转，避免 301 两次或多次跳转。即应该： http://googlenb.com 、 http://www.googlenb.com 、 https://googlenb.com , 一次性统一跳转至：https://www.googlenb.com

4、内容重复，内容合并等跳转，同一篇内容存在多个 URL 都能到达访问，此时需要设置跳转至标准且唯一的 URL 版本，避免网站权重分散。

**网站什么时候使用302重定向？**
1、移动端访问 PC 端的网站，或 PC 端访问移动端网站，此时建议使用 302 跳转，如移动端访问http://www.163.com， 302 至 http://3g.163.com。

2、临时活动或临时跳转，在举行重大活动，需对活动进行宣传，如：用户访问首页或某些页面时时临时跳转至活动专页，待活动结束后取消跳转。

## LocalStorage、SessionStorage、Cookie、Session 区别

[细说 localStorage, sessionStorage, Cookie, Session - 掘金](https://juejin.cn/post/6844903587764502536)

## 什么是DOM和BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局） 对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对 象的子对象。

## 浏览器缓存

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

## 浏览器发起一个请求到页面渲染过程

多结合网上知识整合
[【干货】浏览器是如何运作的？\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1x54y1B7RE) 描述并不是很明确
[浏览器渲染简述](https://segmentfault.com/a/1190000014733203)
[Constructing the Object Model](https://web.dev/critical-rendering-path-constructing-the-object-model/)描述较为准确
引申问题 css 加载会导致阻塞页面白屏么
[css 加载会造成阻塞吗？ - 陈陈 jg - 博客园](https://www.cnblogs.com/chenjg/p/7126822.html)

## 重排和重绘

当 DOM 的变化引发了元素几何属性的变化，比如改变元素的宽高，元素的位置，导致浏览器不得不重新计算元素的几何属性，并重新构建渲染树，这个过程称为“重排”。完成重排后，要将重新构建的渲染树渲染到屏幕上，这个过程就是“重绘”。
简单的说，重排负责元素的几何属性更新，重绘负责元素的样式更新。而且，重排必然带来重绘，但是重绘未必带来重排。比如，改变某个元素的背景，这个就不涉及元素的几何属性，所以只发生重绘。

## TCP三次握手四次挥手

[面试官，不要再问我三次握手和四次挥手](https://segmentfault.com/a/1190000020610336)

## 浏览器响应用户操作的过程和原理

键盘 鼠标事件来答

## DNS工作原理

第一步：客户机提出域名解析请求，并将该请求发送给本地的域名服务器。
第二步：当本地的域名服务器收到请求后，就先查询本地的缓存，如果有该纪录项，则本地的域名服务器就直接把查询的结果返回。
第三步：如果本地的缓存中没有该纪录，则本地域名服务器就直接把请求发给根域名服务器，然后根域名服务器再返回给本地域名服务器一个所查询域(根的子域) 的主域名服务器的地址。
第四步：本地服务器再向上一步返回的域名服务器发送请求，然后接受请求的服务器查询自己的缓存，如果没有该纪录，则返回相关的下级的域名服务器的地址。
第五步：重复第四步，直到找到正确的纪录。
第六步：本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时还将结果返回给客户机。

## http请求get和post的区别是什么

[get 和 post 请求有哪些区别？ - 踏步 - 博客园](https://www.cnblogs.com/mjtabu/p/12090419.html)

## https协议跟http有什么区别

[我是这样理解 HTTP 和 HTTPS 区别的 - Jesse131 - 博客园](https://www.cnblogs.com/jesse131/p/9080925.html)

## https协议认证过程

见上一题

## m3u8、flv、mp4 等视频协议有什么区别

问的比较少

## tcp和udp区别，分别适合的业务场景

## socket与websocket是什么？

## 介绍下http2.0，跟http1.1的区别？

[一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)
归纳三大特性：多路复用、主动推送、头部压缩

## xss、csrf等网络安全问题

[如何用简洁生动的语言说明 XSS 和 CSRF 的区别？ - 知乎](https://www.zhihu.com/question/34445731)

## 什么是token鉴权

[基于 token 的登陆验证机制 - 程序员自由之路 - 博客园](https://www.cnblogs.com/54chensongxia/p/13491214.html)
[微信链接](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651580141&idx=1&sn=418b943b6765e6ea790cc65764153645&chksm=8025312cb752b83a78dfd28754f567dab743b7b9098055f5819cd440dc39a96b999fcaf3c325&mpshare=1&scene=1&srcid=0905SZ6TYNzqMBA9OuN4OWGb&sharer_sharetime=1630842381432&sharer_shareid=78202e0bfa0a107bbf1a59f370aafdfb&key=553a45c3e4e7e5ae2ef2b15ba4d4fac96a06ba71c75764cf5993da3cfe1234df0cc00dcd47ca9e366bb3980e1456ec0cf10c4d91f0942745c1741afb5e9142c96069f1daf67b1251033b9d8a466e442832f2b5e239c1f9332de449453af6a30d98a1457bd8bb704200226299fa53e916ef1add8bd48ab301d92c1fc349bbf7e2&ascene=1&uin=MjM4NjkxODkwOQ%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=A2P1fIDYCZtZKygIyhpmyyU%3D&pass_ticket=uMmLu94W0HjFyvsKEPNN%2BQKBeMR7c%2FFcPmxmoPOG9FyvVFq6EK6EuDcyPlXgXpay&wx_header=0)
