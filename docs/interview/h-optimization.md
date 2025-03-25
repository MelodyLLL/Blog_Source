# 解决方案(性能优化等)

## 聊聊微前端

国内出品的一个微前端框架，基于 single-spa

> [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)

国内技术人对于 qiankun 的解读

> [微前端方案 qiankun 只是更完善的 single-spa](https://mp.weixin.qq.com/s/HgEfI8JSFOwfjG4GAoaQJQ)

## 怎么做移动端适配？

#### viewport 方案:

viewport 方案即是使用 vw/vh 作为样式单位。vw、vh 将 viewport 分成了一百等份，1vw 等于视口 1%的宽度，1vh 等于视口 1%的高度。当我们的设计稿是 750px 时，1vw 就等于 7.5px。还是用之前那个例子，750px 设计稿下，divA 的宽度为 50px，使用 vw 作为样式单位，divA 的宽度是多少 vw 呢？还是将 divA 的宽度设置 x vw，代入 x:50 = 1:7.5，得到 x≈6.67vw。

#### rem 方案:

rem 是一个相对于页面根元素 html 的 font-size 的一个单位，举个例子，假如设置了根元素 html 的 font-size 为 18px，那么，1rem 等于 18px。由此可知，rem 的大小是会随着根元素 html 的 font-size 的改变而改变的。rem 方案就是利用了这一点，根据不同的屏幕尺寸，来设置不同的根元素 html 的 font-size 的大小，以此来达到适配不同屏幕尺寸的目的。

> [使用 Flexible 实现手淘 H5 页面的终端适配](https://github.com/amfe/article/issues/17)

## IOS 与安卓兼容问题

当开发移动应用时，iOS 和 Android 平台之间存在一些兼容性问题需要注意：

#### 1px 问题：

在高密度屏幕上（如 Retina 屏幕），1 像素的线可能看起来过于细，影响视觉效果。解决方法包括：

- 使用 CSS `border` 的 `dpr` 属性来处理 Retina 屏幕下的 1px 问题。
- 使用伪类元素 `::after` 或 `::before` 来创建半透明边框，从而模拟出 1px 的效果。
- 使用 JavaScript 来动态计算设备像素比（devicePixelRatio），并设置相应的样式。

#### iPhone X 底部兼容问题：

iPhone X 及以上机型采用了刘海屏设计，因此底部存在一个 "安全区域"，需要特别处理以确保内容不被遮挡。解决方法包括：

- 使用 CSS 的 `safe-area-inset-*` 相关属性来调整布局，确保内容不被刘海或底部安全区域遮挡。
- 在 iOS 上使用 JavaScript 获取安全区域信息，然后动态调整页面布局。

#### 时间格式问题：

iOS 和 Android 在处理日期和时间格式上可能存在差异，因此需要注意格式化和解析时间数据时的兼容性。解决方法包括：

- 使用标准的日期和时间格式（如 ISO 8601）来存储和传递时间数据。
- 在客户端和服务器端进行统一的时间格式化和解析处理，避免因不同平台而引起的问题。
- 在开发过程中进行充分的测试，确保在不同平台上时间的显示和处理都是正确的。

通过考虑并解决这些兼容性问题，可以确保移动应用在 iOS 和 Android 平台上都能够有良好的用户体验。

## 虚拟列表

其实现在一些表格组件已经集成该功能

> [「前端进阶」高性能渲染十万条数据(虚拟列表) - 掘金](https://juejin.cn/post/6844903982742110216)

## 提升页面加载速度

- 减少 HTTP 请求： 页面加载的主要消耗是网络请求时间，因此减少页面的 HTTP 请求是提升加载速度的有效途径。可以通过合并和压缩 CSS、JavaScript 文件，使用雪碧图来减少图片请求等方式来降低 HTTP 请求数量。
- 使用浏览器缓存： 利用浏览器缓存可以减少重复加载相同资源的时间。合理设置缓存头，对静态资源使用长时间缓存，对动态资源使用适当的缓存控制，可以有效减少服务器负担和提高页面加载速度。
- 优化图片： 图片通常是页面中占用带宽较大的资源。使用适当的图片格式、压缩图片以减小文件大小、懒加载技术等都是优化图片加载的手段。
- 使用异步加载： 将不影响首屏展示的资源使用异步加载方式加载，可以提高页面的初始加载速度。这包括将非关键的 JavaScript 延迟加载，使用 async 或 defer 属性。
- 代码优化： 优化 JavaScript 和 CSS 代码，删除冗余、未使用的代码，减小文件大小。可以使用代码压缩工具，如 UglifyJS（JavaScript）和 cssnano（CSS）。
- 使用 CDN： 将静态资源部署到 CDN（内容分发网络）上，可以加速资源的加载速度，减轻服务器负担，并提高全球范围内用户的访问速度。
- 延迟加载非关键资源： 将页面上非必要资源的加载推迟到页面加载完成后再进行，例如延迟加载图片、延迟加载某些模块的内容。
- 减少重绘和回流： 避免频繁的 DOM 操作，减少页面的重绘（Repaint）和回流（Reflow）次数。合理使用 CSS 合并、动画优化等技术。
- 使用服务端渲染（SSR）： 对于单页面应用，考虑使用服务端渲染，可以提前生成好 HTML，在客户端只需要执行 JavaScript 以达到更快的首屏加载速度。
- 分析工具和监测： 使用工具如 Google PageSpeed Insights、Lighthouse 等进行性能分析，定期监测和分析网站性能，找到潜在的性能问题并及时优化。
- 开放性问题.....

## 关于 SEO

> [前端搜索引擎优化（SEO）\_如故~的博客-CSDN 博客](https://blog.csdn.net/weixin_45899230/article/details/107512596)

## 关于图片优化

- 懒加载
- 第三方压缩裁剪(裁剪的原理是什么)
- cdn 加速
- 规范组件化使用，可以考虑使用 eslint 检查

## 怎么做页面性能评测和采集数据

#### 加载性能：

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

#### 数据采集

- Performance API： 使用浏览器提供的 Performance API 来收集页面性能数据。
- Web Vitals： 使用 Web Vitals 等库来衡量和监控关键的性能指标。
- 用户行为监控工具： 使用工具如 Google Analytics、Hotjar 等来监控用户在页面上的行为和交互，从而间接评估性能。
- 浏览器开发者工具： 使用浏览器开发者工具中的 Performance 和 Lighthouse 面板来手动分析页面性能。
- 无头浏览器： 使用无头浏览器（Headless Browser）如 Puppeteer 来模拟用户行为并收集性能数据。
- 自定义埋点

## 结合实际说说webpack调优

### 1. 减少打包体积

- **代码分割**：使用 `SplitChunksPlugin` 插件，将代码拆分成更小的块，以便更好地利用浏览器缓存。
- **Tree Shaking**：确保使用 ES6 模块语法，启用 `mode: 'production'`，移除未使用的代码。
- **压缩代码**：使用 `TerserPlugin` 压缩 JavaScript，使用 `cssnano` 压缩 CSS。
- **图片优化**：使用 `image-webpack-loader` 对图片进行压缩和优化。

### 2. 提升打包速度

- **多线程/多进程构建**：使用 `thread-loader` 和 `parallel-webpack` 等插件，利用多核 CPU 提升构建速度。
- **缓存**：使用 `cache-loader` 或者 `hard-source-webpack-plugin` 缓存构建结果，减少重复构建时间。
- **缩小构建范围**：通过 `include` 和 `exclude` 选项限制 `loader` 的处理范围，减少不必要的文件处理。

### 3. 优化开发体验

- **热模块替换（HMR）**：使用 `HotModuleReplacementPlugin` 实现模块热替换，提升开发效率。
- **快速重建**：使用 `webpack-dev-server` 提供快速的开发服务器，支持实时重载和模块热替换。
- **Source Maps**：在开发模式下启用 `source-map`，方便调试代码。

### 4. 其他优化

- **DLLPlugin**：使用 `DLLPlugin` 和 `DLLReferencePlugin` 预编译第三方库，减少构建时间。
- **按需加载**：使用 `import()` 动态引入模块，实现按需加载，减少初始加载时间。
- **分析工具**：使用 `webpack-bundle-analyzer` 分析打包结果，找出体积较大的模块进行优化。

通过以上方法，可以有效提升 webpack 的打包性能和开发体验。

## 你们埋点是怎么实现的

直接接第三方服务商 😂
