# Vue

## MVVM 是什么

MVVM 是 Model-View-ViewModel 缩写，Model 代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 的桥梁，数据会绑定到 ViewModel 层并自动将数据渲染到页面中，视图变化时会通知 ViewModel 层更新数据。

## vue 的双向绑定原理

1. 初始化 data，把 vm.data.xxx 代理到 vm.xxx
2. 调用 observe 方法观测整个 data，给非 VNode 的对象类型数据添加一个 Observer
3. Observer： 会把自身实例添加到对象的 `__ob__` 属性上，遍历对象类型数据通过 `Object.defineProperty` 添加 getter 和 setter
4. Dep：收集依赖，在 getter 中把每一个调用过该属性的地方记录为依赖（即触发 getter 的地方进行收集并且让 watcher 订阅对应依赖）
5. Watcher：更改数据后触发 setter，让所有 wathcer 都去通知组件进行更新
6. 补充特征：
  > 1. **Proxy 的使用**：Vue 3 引入了 Proxy 对象作为响应式系统的一部分。与 Object.defineProperty 不同，Proxy 允许对整个对象进行代理，而不仅限于属性。这使得 Vue 能够更加灵活地监听对象的变化，并且 Proxy 也能够提供更多的拦截器（如 `get`、`set`、`has` 等），使得对对象的操作更加直观和易于理解.
  >
  > 2. **数据变更的批处理**：Vue 中的响应式系统会将所有数据变更操作放入一个队列中，并在下一个事件循环中进行批处理。这种机制可以减少 DOM 更新次数，提高性能。通过批处理，Vue 可以将多次数据变更合并成一次更新，避免了不必要的重复计算和渲染，从而提高了页面的响应速度和性能.
  >
  > 3. **依赖收集的细节**：Vue 在进行依赖收集时，不仅在 getter 中收集依赖，还会进行静态依赖的分析。这意味着 Vue 在模板编译阶段会分析模板中的数据依赖关系，并将这些依赖关系静态地收集起来，以提高依赖收集的效率和性能。此外，Vue 在数据变更时会进行异步的依赖通知，以保证依赖更新的顺序和性能，避免不必要的重复渲染.
  >
  > 4. **Watcher 的分类**：Vue 中的 Watcher 不仅用于视图更新，还有计算属性的 Watcher 和监听器的 Watcher。计算属性的 Watcher 用于监听计算属性的变化，并且只有在其依赖的数据发生变化时才会重新计算；监听器的 Watcher 用于监听数据的变化，并在数据变化时执行相应的回调函数。这些 Watcher 之间有着不同的作用和触发时机，使得 Vue 的响应式系统更加灵活和高效.
  > 5. **对数组的双向绑定略有不同**：使用了函数劫持的方式，重写了数组的方法，将 data 中的数组进行了原型链重写，指向自己定义的数组原型方法，这样当调用这些数组 api 时，可以通知依赖更新，如果数组中包含着引用类型，会对数组中的引用类 再次递归遍历进行监控，这样就能监测到数组的变化了。
## vue 组件通讯

- props+events 父子组件通信（parent/parent/parent/children）
- vuex 任何组件通信
- 事件中心 emit/emit / emit/on 任何组件的通信
- attrs/listeners 传递属性和事件
- 跨层级通信（provide / inject）

## computed 和 watch 的区别和使用场景

- 计算属性当依赖的属性发生变化时就会更新视图，适用于比较消耗性能的场景。具有缓存性。
- watch 不会缓存，每当监听的数据发生变化时都会执行，可以监听某些数据执行回调。

## nextTick api 的原理

在下次 DOM 更新循环结束之后执行延迟回调。nextTick 主要使用了宏任务和微任务。原理是根据执行环境分别尝试使用 Promise，MutationObserver，setImmediate，setTimeout。

## vuex 有哪些属性

有五种，分别是

- state（存储变量）
- mutation（提交更新数据的方法，修改 vuex 中状态的唯一方法）
- action（提交 mutation，可以包含任意异步操作）
- getter
- module（模块化 vuex）

## $set 方法是什么

$set方法相当于手动的去把set进去的属性处理成一个响应式的属性。this.$set(this.obj, 'b', 'obj.b')

## name 的作用？

1.注册组件使用组件名.name
2.keep-alive exclude=‘name’ 3.使用 vue-tool 工具时显示的是 name

## vue 生命周期简述

- beforeCreate 是 new Vue()之后触发的第一个钩子，在当前阶段 data，computed，methods 以及 watch 上的数据和方法都不能被触发。
- created 在实例创建完成后发生，这个阶段可以使用数据，更改数据，但不会触发 update 函数，无法与 Dom 进行交互。
- mounted 在挂载完成后发生，数据完成双向绑定，可以访问到 Dom 节点，使用$ref 属性对 Dom 进行操作。
- beforeUpdate 发生在更新之前，响应式数据发生更新，虚拟 Dom 被渲染之前
- updated 发生在更新完成之后，Dom 更新完成
- beforeDestroy 发生在实例销毁之前，可以清除定时器。
- destroyed 发生在实例销毁之后，这个时候 Dom 是空的，组件被拆解，数据绑定被卸除，监听被移除，子实也 都销毁。

## proxy 只会代理对象的第一层，vue3 是怎么解决这个问题？

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理，这样就实现深度观测。

## v-if 和 v-show 的区别？

当条件不成立时，v-if 不会渲染 Dom 元素，v-show 操作的样式，通过 display 来切换当前 DOM 的显示和隐藏。

## data 为什么是个函数？

为了保证组件不同的实例之间不冲突。一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数，如果 data 是一个对象的话，对象属于引用类型，会影响到所有的实例。

## vue 事件绑定的原理？

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过$on 实现的。

## hash 路由和 history 的实现原理

location.hash 的值实际就是 URL#后面的东西
history 实际采用了 HTML5 中的提供的 API 来实现，主要有 history.pushState()和 history.replaceState().

## vue2.x 和 vue3.x 渲染器的 diff 算法:

diff 算法就是进行虚拟节点对比，并返回一个 patch 对象，用来存储两个节点不同的地方，最后用 patch 记录的消息去局部更新 Dom。
diff 算法有以下过程：
先同级比较，再比较子节点。
先判断一方有子节点一方没有子节点的情况，这样就给新的节点移除或者新增上子节点。
比较都有子节点的情况，递归的比较子节点。
vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 找到可以复用的节点，在进行相关操作。
vue3 在创建 VNode 的时候就确定其类型，在 patch 的过程中采用位运算来判断一个 VNode 的类型，再配合核心 diff 算法。

## keep-alive 使用和原理

keep-alive 可以实现组件缓存，当组件切换时不会对组件进行卸载。
常用的两个属性 include/exclude，允许组件有条件的进行缓存。
两个生命周期 activated/deactivated，用来判断当前组件是否处于活跃状态。

## vue 中组件生命周期的调用顺序

- 调用顺序都是先父后子，渲染完成的顺序都是先子后父。组件的销毁操作是先父后子，销毁完成的顺序是先子后父
- 加载渲染过程：父 beforeCreated->父 created->父 beforeMount->子 beforeCreated->子 created->子 beforeMounted->子 mounted->父 mounted
- 子组件更新过程: 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
- 销毁过程： 父 beforeDestroyed->子 beforeDestroyed->子 destroyed->父 destroyed

## 写过 vue 自定义指令吗？

```js
// main.js文件中引入Vue并创建根实例之前添加如下代码
import Vue from 'vue';

// 自定义指令名为myDirective，使用bind钩子函数来处理元素被绑定时的操作
Vue.directive('myDirective', {
	bind(el, binding) {
		// el表示当前绑定了该指令的DOM元素
		// binding包含了指令相关信息，比如传入的参数等
		// 这里可以对DOM元素进行初始化设置、事件监听等操作
	},

	inserted(el, binding) {
		// DOM元素已经被插入到页面中后调用此钩子函数
	},

	update(el, binding) {
		// 当指令所在的模板重新渲染时会触发update钩子函数
	},
});

new Vue({
	render: (h) => h(App),
}).$mount('#app');
```

## vue 中的性能优化有哪些

编码阶段：

1. 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的依赖。
2. v-if 和 v-for 不能连用
3. 如果需要使用 v-for 给每项元素绑定事件时使用事件代理。
4. SPA 页面采用 keep-alive
5. 在更多的情况下，使用 v-if 代替 v-show
6. key 保证唯一
7. 使用路由懒加载，异步组件
8. 防抖，节流
9. 第三方模块按需导入
10. 图片懒加载
11. css 在前，js 在后，css 在前可以和 dom 树一起合成 render 树，js 在后不阻塞 dom 渲染
12. 减少 http 请求

打包优化：

1. 压缩代码
2. 使用 cdn 加载第三方模块
