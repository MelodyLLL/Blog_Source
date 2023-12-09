# NodeJS 和服务器

## node 导出模块的两种方式有什么区别？

在 Node.js 中，有两种主要的导出模块的方式：CommonJS 和 ES6 的导出方式。下面是它们的主要区别：

CommonJS（Node.js 模块系统）：

- 导出方式： 使用 module.exports 或 exports。
- 导入方式： 使用 require。
- 特点： 是 Node.js 最早引入的模块系统，它是同步加载的，模块在运行时动态加载，适用于服务器端编程。
- 示例：

```js
// 导出模块
// file.js
const someFunction = () => {
	// some code
};

module.exports = someFunction;
// 或者
// exports.someFunction = someFunction;

// 导入模块
// anotherFile.js
const importedFunction = require('./file');
```

ES6 模块系统：

- 导出方式： 使用 export 和 export default。
- 导入方式： 使用 import。
- 特点： 是 ECMAScript 6 引入的模块系统，是异步加载的，支持静态分析，可以在浏览器端和服务器端使用。
- 示例：

```js
// 导出模块
// file.js
export const someFunction = () => {
	// some code
};

// 导入模块
// anotherFile.js
import { someFunction } from './file';
```

在 Node.js 中，CommonJS 是默认的模块系统，但是在很多现代的 Node.js 应用中，也可以使用 import 和 export 关键字，因为 Node.js 已经开始支持部分 ES6 模块语法。

ES6 模块系统更加现代化，支持静态分析和 tree-shaking，有助于构建更轻量的应用。在新项目中，推荐使用 ES6 模块。

## 知道洋葱模型吗？

在 Koa 中，洋葱模型是一种中间件的执行模式。中间件被组织成类似于洋葱层层叠加的结构，请求和响应通过这些中间件的层层处理，最终到达应用程序的核心。在请求阶段，请求对象从外向内穿过中间件，每个中间件都有机会对请求进行处理。洋葱核心是整个应用的主要业务逻辑。在响应阶段，响应对象从内向外穿过中间件，每个中间件同样有机会对响应进行处理。中间件的异步特性使得在其中可以方便地执行异步操作，使得代码结构更加清晰和易于维护。洋葱模型提供了一种优雅而灵活的方式来组织和管理中间件，是 Koa 框架的一个显著特点。

```js
const Koa = require('koa');

const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
	console.log('Middleware 1 - Request Phase');
	await next();
	console.log('Middleware 1 - Response Phase');
});

// 中间件2
app.use(async (ctx, next) => {
	console.log('Middleware 2 - Request Phase');
	await next();
	console.log('Middleware 2 - Response Phase');
});

// 洋葱核心
app.use(async (ctx, next) => {
	console.log('Onion Core - Request Phase');

	// 模拟异步操作
	await new Promise((resolve) => setTimeout(resolve, 1000));

	console.log('Onion Core - Response Phase');
	await next();
});

// 中间件3
app.use(async (ctx, next) => {
	console.log('Middleware 3 - Request Phase');
	await next();
	console.log('Middleware 3 - Response Phase');
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
```
