# 小程序

这里记录一些“国内特色”的开发生态，如微信小程序、公众号、支付宝小程序、快应用等，如果没有特殊说明，小程序泛指微信小程序

## 关于小程序新的 skyline 架构

1. 老架构师基于 webview 与 jscore 等双线程，在 webview 中过会运行 dom 的构造，css 的计算等。在 jscore 中运行 js 逻辑。并且通过 jsbridge 进行与 webview 的通信。
2. 新架构将 webview 的部分渲染逻辑移动到新的线程中，并且在 jscore 中划分上下文，进行内存通信。减少了 webview 的处理逻辑与通信时间。因此如 wxs 等也被移动到 jscore 线程中，这导致了其本来可以同步获取页面信息现在必须异步，因此又有了新的
   worklet 机制代替

> [理解微信小程序的双线程模型 - JunpengZ - 博客园](https://www.cnblogs.com/ihardcoder/p/14778013.html)

## 微信小程序的 WXS 运行在逻辑层还是渲染层？

微信小程序中的 WXS (WeiXin Script) 运行在渲染线程(也即 WebView) 中，而不是逻辑层(App Service)。WXS 是一种专为小程序视图层设计的脚本语言，用于在 WXML 中进行数据处理和转换，类似于 Vue.js 中的计算属性。
不过在新的 Skyline 渲染引擎中这一点似乎有变化，WXS 被移到 AppService 中。

## 小程序的滚动穿透问题

- 底部页面最外层 view 设置 position: fixed;页面不可滚动，但是这个时候会导致页面回到顶部。关闭需要恢复 body 定位，设置回之前滚动的位置
- 引入 body-scroll-lock
- 弹出组件增加 `catchtouchmove="return"`，弹窗滚动区域再使用`scroll-view`包裹。

## 小程序怎么实现类似 Vue 的 mixin 的功能

在微信小程序中，虽然没有内置类似 Vue 中 mixin 的功能，但你可以通过一些手段来实现类似的效果。下面是一种常见的实现方式：

1. **使用全局变量或全局函数**：在小程序的 app.js 文件中定义全局变量或全局函数，然后在需要使用 mixin 功能的页面或组件中引入并使用这些全局变量或函数。

```javascript
// app.js
App({
	globalData: {
		// 定义全局变量
		globalVariable: 'I am a global variable',
	},
	globalFunction: function () {
		// 定义全局函数
		console.log('I am a global function');
	},
});
```

2. **通过继承实现 mixin**：在小程序中，可以通过对象的继承来实现 mixin 的功能。定义一个基础对象，然后在需要使用 mixin 功能的页面或组件中继承这个基础对象，并添加自己的业务逻辑。

```javascript
// mixin.js
module.exports = {
	data: {
		mixinData: 'Mixin Data',
	},
	onLoad: function () {
		console.log('Mixin onLoad');
	},
};

// page.js
const mixin = require('mixin.js');
Page({
	mixins: [mixin],
	onLoad: function () {
		console.log('Page onLoad');
	},
});
```

这样做的话，`mixin.js` 中定义的 `data` 和 `onLoad` 方法会被合并到 `page.js` 的 `data` 和 `onLoad` 方法中。

虽然在小程序中没有像 Vue 那样原生支持的 mixin 功能，但通过以上方式，你可以实现类似的效果，提高代码的复用性和可维护性。

## 小程序怎么做启动优化

微信小程序的启动优化对于提升用户体验至关重要。以下是一些微信小程序启动优化的常见方法：

1. **减少首屏渲染时间**：尽量减少首屏需要渲染的内容和组件，保持页面简洁。可以通过将页面划分成多个组件、延迟加载部分内容或者使用分包加载等方式来减少首屏渲染时间。

2. **延迟加载资源**：将不是首次进入页面必需的资源（如图片、视频等）延迟加载，可以通过设置合适的 `lazy-load` 属性或者在 `onLoad` 生命周期中动态加载资源来实现。

3. **使用分包加载**：如果小程序的代码体积较大，可以考虑将部分页面或组件代码分包加载，通过分包加载可以减少首次加载的时间，提高启动速度。

4. **使用 Taro 或 Remax 等框架**：Taro 和 Remax 是两个支持多端开发的小程序框架，它们能够提供更好的代码结构和优化能力，可以帮助开发者更好地进行启动优化。

5. **压缩和合并代码**：使用合适的代码压缩工具（如 UglifyJS、Terser 等）对代码进行压缩和混淆，减小代码体积，提高加载速度。同时，将多个小文件合并为一个文件可以减少网络请求的次数，加快加载速度。

6. **优化图片资源**：使用适当的图片格式和大小，并通过压缩工具对图片进行压缩，减小图片大小，降低网络传输成本和加载时间。

7. **预加载关键资源**：在进入小程序时，可以提前加载一些关键资源，如页面中将要使用到的图片、字体等资源，可以通过 `wx.downloadFile` 等接口进行预加载。

8. **利用缓存机制**：合理使用缓存机制，将一些静态资源、数据等存储在本地缓存中，减少网络请求，加快加载速度。

通过以上方式，可以有效地提升微信小程序的启动速度和用户体验。

## 小程序怎么做异常监控

在小程序中实现异常监控可以帮助开发者及时发现和解决程序中的问题，提高应用的稳定性和用户体验。以下是一种常见的异常监控方案：

1. **使用 try-catch 捕获异常**：在小程序的关键代码块中使用 try-catch 结构捕获可能出现异常的代码，如网络请求、数据处理等。

```javascript
try {
	// 可能出现异常的代码块
} catch (e) {
	// 异常处理逻辑
	console.error('An error occurred:', e);
}
```

2. **全局错误监听**：通过监听小程序的错误事件，可以捕获到未被 try-catch 捕获的全局错误，如页面错误、Promise 错误等。

```javascript
App({
	onError: function (error) {
		// 全局错误处理逻辑
		console.error('Global error occurred:', error);
	},
});
```

3. **使用小程序内置的错误监控服务**：微信小程序提供了相关的错误监控服务，开发者可以通过在小程序管理后台配置来开启错误监控，并查看错误信息和统计数据。

4. **自定义错误上报**：在发生异常时，可以通过调用自定义的上报接口将异常信息上报到服务器，以便开发者及时了解问题并进行修复。

```javascript
function reportError(error) {
	// 调用接口上报错误信息
	wx.request({
		url: 'https://example.com/report',
		method: 'POST',
		data: {
			error: error,
		},
		success: function (res) {
			console.log('Error reported successfully:', res);
		},
		fail: function (err) {
			console.error('Failed to report error:', err);
		},
	});
}
```

综合利用以上方法，可以在小程序中建立一个完善的异常监控系统，帮助开发者及时发现和解决程序中的问题。
