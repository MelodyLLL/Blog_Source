# 前端基建和构建工具

## AMD 和 CMD？

这两者都是 JavaScript 模块化规范，但在模块定义和加载的时机上存在一些区别。

## webPack 常用配置

> [配置 | webpack 中文文档](https://www.webpackjs.com/configuration/)

## webpack 构建流程？说完整一些。

webpack 构建流程：

初始化： 读取配置文件，初始化参数，加载插件。

编译： 用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。

加载模块： 从入口文件开始，递归地构建整个依赖关系图，每个文件都会被转换成抽象语法树（AST）。

寻找 loader： 在加载模块的过程中，遇到对应的文件类型时，webpack 会调用配置好的 loader 来对文件进行转换。

构建模块： 递归地分析模块的依赖关系，根据依赖关系组装成一个个模块。

生成代码： 根据组装好的模块，生成最终的代码块（chunk），一个 chunk 由多个模块组成。

输出文件： 将最终的代码块写入到文件系统。

## webpack 的热更新怎么做到的？

webpack 的热更新：

Webpack 的热更新（Hot Module Replacement，HMR）是一种在应用运行过程中替换、添加或删除模块的能力。实现步骤如下：

在应用代码中添加 HMR 代码： 通过 webpack 提供的 API，在应用代码中嵌入对模块的监听和更新处理逻辑。

开启 webpack 的 HMR 功能： 在 webpack 配置文件中配置 hot: true，告诉 webpack 启用 HMR。

服务器支持： 在开发服务器上启用 HMR 支持，这可以通过 webpack-dev-server 来实现。

客户端支持： 在浏览器中通过 WebSocket 等技术与服务器建立连接，当模块发生变化时，服务器通过连接通知客户端更新。

## webpack 中自定义 loader

自定义 loader 是通过编写 Node.js 模块来实现的，这个模块需要导出一个函数。这个函数会在文件转换过程中被调用，并且接收文件内容作为参数。自定义 loader 的主要工作是将输入的文件内容进行转换，然后返回新的内容。

在 webpack 配置中，通过 module.rules 配置项来指定 loader

## babel 是什么？

> [Babel 是什么？ · Babel 中文文档 | Babel 中文网](https://www.babeljs.cn/docs/)

## 写过的 webpack 插件、loader？

类似 eslint 插件，雪碧图 loader, 监控 loader

## rollup 常见配置、插件

Rollup 是一个 JavaScript 模块打包器，它专注于将小块代码编译成更大、更复杂的代码块。下面是一些常见的 Rollup 配置和插件：

### 常见配置

- `input`：指定入口文件的路径。
- `output`：指定输出文件的配置，包括文件路径、格式等。
- `plugins`：配置使用的插件，例如处理 CSS、压缩代码等。

### 常见插件

- `rollup-plugin-babel`：用于将 ES6+ 代码转换为兼容的 JavaScript 代码。
- `rollup-plugin-commonjs`：将 CommonJS 模块转换为 ES6 模块。
- `rollup-plugin-node-resolve`：解析第三方模块的路径。
- `rollup-plugin-terser`：压缩 JavaScript 代码。
- `rollup-plugin-postcss`：处理 CSS 文件。
- `rollup-plugin-sass`：处理 Sass 文件。
- `rollup-plugin-json`：处理 JSON 文件。

这些是一些常见的 Rollup 配置和插件。