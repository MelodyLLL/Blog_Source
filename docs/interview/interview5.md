
# 框架层面

## Vue

### 有没有用过 inject、provide api，解决了什么问题，能否响应式

- 主要解决数据跨层级传递的问题
- 可以响应式，需要提供一个响应式对象
- 衍生提问关于状态管理的话题

### vue 的双向绑定是怎么实现的

- vue 中的双向绑定其实是 v-model 指令的小 trick
- 通过事件触发和 value 绑定可以达到类似双向绑定的效果
- vue.js 采用数据劫持和订阅发布者模式，在初始化时，通过 object.defineproperty 来重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集，如果属性发生变化会通知相关依赖进行更新操作

### .vue 文件的 template 部分编译之后是什么样的，在什么时候编译

- render 函数
- createElement
- vue-loader 编译

### vue 组件通讯

- props+events 父子组件通信（parent/parent/parent/children），vuex 任何组件通信，事件中心 emit/emit / emit/on 任何组件的通信， attrs/attrs/attrs/listeners 后代通信（provide / inject）（越多越好）

### vuex(使用和源码，如何封装一个 vue 插件)

### 路由懒加载原理

- **level1:**
  1.  将需要懒加载的子模块，打包成单独的文件。ES6 的 import()。
  2.  hashChange 时，根据 hash 变化执行特定的函数，加载子模块。
- **level2:** 实现的三种方式，location.hash + hashChange()，HTML5 规范的 pushState(IE10) + popState 事件监听，abstract nodejs 默认值。
- **level3: **源码分析。路由安装，利用 mixin 给每个组件注入 beforeCreated 和 destory 钩子函数，在 Vue 原型上定义 route 和 route 和 route 和 router，并进行响应式处理，定义全局的 roter-link 和 router-view 组件。根据路由配置创建映射关系。根据传入路径计算出新的路径，在路劲切换过程中，执行一系列的导航守卫函数，更改 Url，渲染对应组件。

### .vue 文件的编译过程

### key 的作用： 提供唯一的标识，高效的更新虚拟 dom

更准确：a.key === b.key
更快速：key 的唯一性可以很好的被 map 函数利用，时间复杂度为 O(1)
虚拟 DOM 本质就是用一个原生的 js 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

### computed 和 watch 的区别和使用场景：

计算属性当依赖的属性发生变化时就会更新视图，适用于比较消耗性能的场景。具有缓存性。watch 不会缓存，每当监听的数据发生变化时都会执行，可以监听某些数据执行回调。

### v-for 与 v-if 优先级问题

v-for 优先于 v-if 被解析

### nextTick 原理：

在下次 DOM 更新循环结束之后执行延迟回调。nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试使用 Promise，MutationObserver，setImmediate，setTimeout。

### 怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？

在 router 目录下的 index.js 文件中，对 path 属性加上/:id，使用 router 对象的 params.id。

### vuex 是什么？怎么使用？哪种功能场景使用它？

vue 框架中状态管理。在 main.js 中引入 store，注入。新建了一个目录 store。场景有：组件之间的状态，登录状态，按钮权限，用户信息。

### vuex 有哪些属性？

有五种，分别是 state（存储变量），mutation（提交更新数据的方法，修改 vuex 中状态的唯一方法），action（提交 mutation，可以包含任意异步操作），getter，module（模块化 vuex）

### $set:

$set方法相当于手动的去把set进去的属性处理成一个响应式的属性。this.$set(this.obj, 'b', 'obj.b')

### vue-loader:

解析.vue 文件的一个加载器，让 js 可以写 es6，style 样式可以用 scss 或者 less。

### 对 vue.js 的 template 编译的理解？

就是先转化为 AST 树，在得到 render 函数返回 VNode。

### name 的作用？

1.注册组件使用组件名.name
2.keep-alive exclude=‘name’ 3.使用 vue-tool 工具时显示的是 name

### MVVM 是什么:

MVVM 是 Model-View-ViewModel 缩写，Model 代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 的桥梁，数据会绑定到 ViewModel 层并自动将数据渲染到页面中，视图变化时会通知 ViewModel 层更新数据。

### vue2.x 如何监测数组变化：

使用了函数劫持的方式，重写了数组的方法，将 data 中的数组进行了原型链重写，指向自己定义的数组原型方法，这样当调用这些数组 api 时，可以通知依赖更新，如果数组中包含着引用类型，会对数组中的引用类 再次递归遍历进行监控，这样就能监测到数组的变化了。

### proxy 只会代理对象的第一层，vue3 是怎么解决这个问题？

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理，这样就实现深度观测。

### vue 生命周期：

beforeCreate 是 new Vue()之后触发的第一个钩子，在当前阶段 data，computed，methods 以及 watch 上的数据和方法都不能被触发。
created 在实例创建完成后发生，这个阶段可以使用数据，更改数据，但不会触发 update 函数，无法与 Dom 进行交互。
mounted 在挂载完成后发生，数据完成双向绑定，可以访问到 Dom 节点，使用$ref 属性对 Dom 进行操作。
beforeUpdate 发生在更新之前，响应式数据发生更新，虚拟 Dom 被渲染之前
updated 发生在更新完成之后，Dom 更新完成
beforeDestroy 发生在实例销毁之前，可以清除定时器。
destroyed 发生在实例销毁之后，这个时候 Dom 是空的，组件被拆解，数据绑定被卸除，监听被移除，子实也 都销毁。

### vue 接口请求放在哪个生命周期？

created，这个阶段已经能拿到数据，mounted，beforeUpdate 也可以。

### v-if 和 v-show 的区别？

当条件不成立时，v-if 不会渲染 Dom 元素，v-show 操作的样式，通过 display 来切换当前 DOM 的显示和隐藏。

### data 为什么是个函数？

为了保证组件不同的实例之间不冲突。一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数，如果 data 是一个对象的话，对象属于引用类型，会影响到所有的实例。

### v-model 的原理？

v-model 可以看成时 value + input 方法的语法糖，可以通过 model 属性的 prop 和 event 属性来进行自定义。
注: 在 checkbox 和 radio 中 v-model = checked 属性 + change 事件，在 select 中将 value 作为 prop 并将 change 作为事件

### vue 事件绑定的原理？

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过$on 实现的。

### vue2.x 和 vue3.x 渲染器的 diff 算法:

diff 算法就是进行虚拟节点对比，并返回一个 patch 对象，用来存储两个节点不同的地方，最后用 patch 记录的消息去局部更新 Dom。
diff 算法有以下过程：
先同级比较，再比较子节点。
先判断一方有子节点一方没有子节点的情况，这样就给新的节点移除或者新增上子节点。
比较都有子节点的情况，递归的比较子节点。
vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 找到可以复用的节点，在进行相关操作。
vue3 在创建 VNode 的时候就确定其类型，在 patch 的过程中采用位运算来判断一个 VNode 的类型，再配合核心 diff 算法。

### keep-alive：

keep-alive 可以实现组件缓存，当组件切换时不会对组件进行卸载。
常用的两个属性 include/exclude，允许组件有条件的进行缓存。
两个生命周期 activated/deactivated，用来判断当前组件是否处于活跃状态。

### vue 中组件生命周期的调用顺序：

调用顺序都是先父后子，渲染完成的顺序都是先子后父。组件的销毁操作是先父后子，销毁完成的顺序是先子后父
加载渲染过程：父 beforeCreated->父 created->父 beforeMount->子 beforeCreated->子 created->子 beforeMounted->子 mounted->父 mounted
子组件更新过程: 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
销毁过程： 父 beforeDestroyed->子 beforeDestroyed->子 destroyed->父 destroyed

### vue2.x 组件之间通信方式：

父子组件通信：父传子 props，子传父 $on $emit
获取父子组件实例 $parent $children
兄弟组件通信：Event bus
跨组件通信：vuex

### ssr 了解吗？

    ssr也就是服务端渲染，也就是把vue在客户端把标签渲染成HTML·的工作放在服务端完成，然后再把html直接返回给客户端。
    服务器渲染只支持created和beforeCreated两个钩子，ssr有着更好的seo，首屏加载速度更快。

### 写过 vue 自定义指令吗？

### vue 中的性能优化：

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

### hash 路由和 history 的实现原理

    location.hash的值实际就是URL#后面的东西
    history实际采用了HTML5中的提供的API来实现，主要有history.pushState()和history.replaceState().

## React

### 单页应用和多页面的优缺点

### 虚拟 dom 的比较过程

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

### setState 原理

### hooks 使用注意事项 为什么？

### react Fiber 是什么

[React Fiber 是什么?](https://zhuanlan.zhihu.com/p/297971861)

### react setState 是同步还是异步

[Component State – React](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

### hooks 与 HOC

逻辑抽离，然后会问如何抽离，和 HOC 的区别

### useEffect 和 useLayoutEffect 的区别是什么

执行时机不同，后者跟 didMount 一致，在 dom 更新后同步执行，useEffect 是异步执行
后者能在服务端渲染中执行（但是无效）

### setState 的执行时机，比如连续三次 setState 之后的值是什么，为什么

在生命周期、事件触发等情况下，连续的 setState 并不会马上更新值，而是批量更新
在 setTimeout 类似的回调中则会同步更新，性能差很多
batchedUpdate 机制

### 对 redux 的理解

[完全理解 redux（从零实现一个 redux） · Issue #22 · brickspert/blog](https://github.com/brickspert/blog/issues/22)

## WebPack 等工程化

### webPack 常用配置

[配置 | webpack 中文文档](https://www.webpackjs.com/configuration/)

### webpack 优化

### webpack 类似工具？为什么用 webpack？

### webpack 构建流程？说完整一些。

入口文件，依赖树构建，loader 加载对应文件，plugin 全局广播

### webpack 的热更新怎么做到的？

### webpack 中自定义 loader

### require 和 import 区别，原理？

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

### AMD 和 CMD？

### Babel

[Babel 是什么？ · Babel 中文文档 | Babel 中文网](https://www.babeljs.cn/docs/)

### 写过的 webpack 插件、loader

类似 eslint 插件，雪碧图 loader, 监控 loader

## 小程序

### 小程序怎么实现类似 Vue 的 mixin 的功能

### 小程序怎么做启动优化

### 小程序怎么做异常监控

### 微信小程序底层实现原理是什么，什么是小程序的双线程模型

[理解微信小程序的双线程模型 - JunpengZ - 博客园](https://www.cnblogs.com/ihardcoder/p/14778013.html)

### 怎么做小程序的自动化集成和发布

可以利用小程序的 jenkins 插件

### 小程序怎么模拟 cookie

### 小程序常用生命周期

页面的，组件的，taro 等流行框架对应的。

### 小程序的发布流程

## rollup 工程化

### 怎样实现一个组件库，怎样实现一个 js 库

组件目录、编写，组件文档，组件打包，npm 发包方向

### rollup 常见配置、插件
