# 性能优化和适配等

## 怎么做移动端适配？

Viewport： 使用 <meta> 标签设置视口（viewport）的相关属性，例如 width、initial-scale、maximum-scale 和 minimum-scale，以控制页面的缩放和布局。

rem 单位的使用： 根据屏幕宽度设置一个根元素字体大小（html 元素的 font-size），并将页面上的尺寸都使用 rem 单位进行定义。这样就实现了在不同屏幕宽度下的等比例适配。

> [使用 Flexible 实现手淘 H5 页面的终端适配](https://github.com/amfe/article/issues/17)

## IOS 与安卓兼容问题

- 1px 问题
- iphonex 底部兼容问题
- 时间格式问题

## 虚拟列表

其实现在一些表格组件已经集成该功能

> [「前端进阶」高性能渲染十万条数据(虚拟列表) - 掘金](https://juejin.cn/post/6844903982742110216)

## 提升页面加载速度

减少 HTTP 请求： 页面加载的主要消耗是网络请求时间，因此减少页面的 HTTP 请求是提升加载速度的有效途径。可以通过合并和压缩 CSS、JavaScript 文件，使用雪碧图来减少图片请求等方式来降低 HTTP 请求数量。

使用浏览器缓存： 利用浏览器缓存可以减少重复加载相同资源的时间。合理设置缓存头，对静态资源使用长时间缓存，对动态资源使用适当的缓存控制，可以有效减少服务器负担和提高页面加载速度。

优化图片： 图片通常是页面中占用带宽较大的资源。使用适当的图片格式、压缩图片以减小文件大小、懒加载技术等都是优化图片加载的手段。

使用异步加载： 将不影响首屏展示的资源使用异步加载方式加载，可以提高页面的初始加载速度。这包括将非关键的 JavaScript 延迟加载，使用 async 或 defer 属性。

代码优化： 优化 JavaScript 和 CSS 代码，删除冗余、未使用的代码，减小文件大小。可以使用代码压缩工具，如 UglifyJS（JavaScript）和 cssnano（CSS）。

使用 CDN： 将静态资源部署到 CDN（内容分发网络）上，可以加速资源的加载速度，减轻服务器负担，并提高全球范围内用户的访问速度。

延迟加载非关键资源： 将页面上非必要资源的加载推迟到页面加载完成后再进行，例如延迟加载图片、延迟加载某些模块的内容。

减少重绘和回流： 避免频繁的 DOM 操作，减少页面的重绘（Repaint）和回流（Reflow）次数。合理使用 CSS 合并、动画优化等技术。

使用服务端渲染（SSR）： 对于单页面应用，考虑使用服务端渲染，可以提前生成好 HTML，在客户端只需要执行 JavaScript 以达到更快的首屏加载速度。

分析工具和监测： 使用工具如 Google PageSpeed Insights、Lighthouse 等进行性能分析，定期监测和分析网站性能，找到潜在的性能问题并及时优化。

开放性问题.....

## 关于 SEO

> [前端搜索引擎优化（SEO）\_如故~的博客-CSDN 博客](https://blog.csdn.net/weixin_45899230/article/details/107512596)

## 关于图片优化

- 懒加载
- 第三方压缩裁剪
- cdn 加速
- 规范组件化使用，可以考虑使用 eslint 检查

## 怎么做页面性能评测和采集数据

加载性能：

- 首屏加载时间（FP/First Paint）： 浏览器首次绘制像素的时间。
- 首次内容渲染时间（FCP/First Contentful Paint）： 浏览器首次绘制页面内容的时间。
- DOMContentLoaded： HTML 文档解析完成并且所有脚本、样式表和子资源已完成加载的时间。
  渲染性能：

- 可交互时间（TTI/Time to Interactive）： 页面变得完全交互所需的时间。
- 帧率（FPS/Frames Per Second）： 浏览器每秒渲染的帧数。
- 卡顿次数和卡顿时长： 识别页面是否存在卡顿现象以及卡顿的具体时长。
  用户交互性能：

- 点击到响应时间： 用户点击页面元素到页面响应的时间。
- 滚动性能： 滚动页面时的流畅性。

数据采集

- Performance API： 使用浏览器提供的 Performance API 来收集页面性能数据。
- Web Vitals： 使用 Web Vitals 等库来衡量和监控关键的性能指标。
- 用户行为监控工具： 使用工具如 Google Analytics、Hotjar 等来监控用户在页面上的行为和交互，从而间接评估性能。
- 浏览器开发者工具： 使用浏览器开发者工具中的 Performance 和 Lighthouse 面板来手动分析页面性能。
- 无头浏览器： 使用无头浏览器（Headless Browser）如 Puppeteer 来模拟用户行为并收集性能数据。
- 自定义埋点

## 你们埋点是怎么实现的

直接接第三方服务商 😂