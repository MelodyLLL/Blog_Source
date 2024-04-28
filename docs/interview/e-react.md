# React

## React 与 Vue 的区别

**语法层面：**

jsx 与模版语法的区别，如 react 的 props 可传递一切，而 vue 的 props 声明以及插槽，vue 的混合与 react 的高阶组件和 hooks(当然 vue3 也有组合式写法了)，总的来说，vue 上手难度较低，但是是增加了许多语法糖的，事件修饰符，过滤器，样式属性挂载最外层节点等等，因此 API 也特别多，vue 提前在 vue 实例上准备了很多 api 给开发者，react 更加关注底层，jsx 的自由度更高，但是同时写法也比较难以上手，比如 this 的指向问题以及单向数据流的控制。

**双向绑定：**

vue 的一大特色，实际上也是它好上手的原因之一，Vue2 响应式的特点就是依赖收集，数据可变，自动派发更新，初始化时通过 Object.defineProperty 递归劫持 data 所有属性添加 getter/setter，触发 getter 的时候进行依赖收集，修改时触发 etter 自动派发更新找到引用组件重新渲染。而 react 则是基于状态，手动 setState 更新，当数据改变时会以组件根为目录，默认全部重新渲染整个组件树，只能额外用 pureComponent/shouldComponentUpdate/useMemo/useCallback 等方法来进行控制。

**diff 算法：**

首先可说明，diff 算法是比较两个虚拟 dom 之间的区别，即也就是树状结构的 js 对象之间的比较。

再整体来看，vue 和 react 都采用了深度优先的算法(可以补充说明是因为深度优先可以保证生命周期不错乱，我理解是因为渲染顺序一般是父与子先后关联性强)，但是如果纯用深度优先算法，时间复杂度会很大，因此采用了分治的形式。
所以 vue 和 react 在这上面都有一些共识，即

1. 只做同层级比较
2. 类型不同即删除，这里的类型 react 比较的是 Class 类，vue 比较的是组件的 name 或者 slot 等等。这是一个不同的地方
3. 二者都利用key减少不必要的创建删除

同层级的diff比较

这里vue2中采用了双端指针比较的方式，而react则是从左往右依次比较。另外vue3中加入了最长增长子序列的方式来进一步优化算法，而且利用template的优势，在编译时标记了一些静态节点跳过diff。

**核心思想：**

Vue 的核心思想是尽可能的降低前端开发的门槛，是一个灵活易用的渐进式双向绑定的 MVVM 框架。而 React 的核心思想是声明式渲染「用状态去告诉程序如何渲染页面，相关讨论链接：[怎么理解“声明式渲染”？](https://www.zhihu.com/question/68121329)」和组件化、单向数据流，React 既不属于 MVC 也不属于 MVVM 架构。

**生态对比：**

React 官方只关注底层，上层应用解决方案都交给社区，所以 React 生态体系丰富，社区强，而且每次更新改动小等 等，而 Vue 是由官方主导开发和维护，生态没那么丰富，虽然上手比 React 简单一些，但每次更新堪称破土重来。

## 虚拟 dom 的比较过程

虚拟 dom 本质是一个 js 对象
比较麻烦的写法

```javascript
React.createElement(type, [props], [...children]);
```

实际上这个可以使用 jsx 的写法，然后通过 babel 转译成上面这样。优点是可以写方便的 jsx，缺点是依赖打包插件，实际上原生 js 插入 dom 节点的操作 在万次操作上是比 react 要快的

虚拟 dom 为什么比真实 dom 操作快：

1. 减少 dom 操作，将多次操作合并为一次
2. 借助 diff 算法减少多余操作

总结：操作原生 dom 开销比较大，而且会引发重绘或者重排，react 只是把这些操作放到了虚拟 dom 的比较上面，即 js 对象之间的比较计算，将 dom 操作缓存起来一次性去操作，最后也还是要操作 dom 的，只不过是减少了操作次数，优化了重绘和重排。

## setState 原理

大致实现

```js
let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

//  使用工厂模式生成一个 createSetter，通过 cursor 指定指向的是哪个 state
function createSetter(cursor) {
	// 闭包函数在这里
	return function setterWithCursor(newVal) {
		state[cursor] = newVal;
	};
}

export function useState(initVal) {
	if (firstRun) {
		state.push(initVal);
		setters.push(createSetter(cursor));
		firstRun = false;
	}

	const setter = setters[cursor];
	const value = state[cursor];

	cursor++;
	return [value, setter];
}

// Our component code that uses hooks
function RenderFunctionComponent() {
	const [firstName, setFirstName] = useState('Rudi'); // cursor: 0
	const [lastName, setLastName] = useState('Yardley'); // cursor: 1

	return (
		<div>
			<Button onClick={() => setFirstName('Richard')}>Richard</Button>
			<Button onClick={() => setFirstName('Fred')}>Fred</Button>
		</div>
	);
}

// This is sort of simulating Reacts rendering cycle
function MyComponent() {
	cursor = 0; // resetting the cursor
	return <RenderFunctionComponent />; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // First-render: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // Subsequent-render: ['Rudi', 'Yardley']

// click the 'Fred' button
```

## hooks 使用限制和原因

- 只能在函数组件中使用： Hooks 只能在函数组件中调用，不能在类组件中使用。这是因为 Hooks 是依赖于函数组件的特性的，不能在 class 中正常工作。

- 只能在最顶层使用： 在函数组件的最顶层调用 Hooks，不要在循环、条件语句或嵌套函数中使用。确保在每次渲染时都按照相同的顺序调用 Hooks。

- 自定义 Hook 名称以 "use" 开头： 为了确保 linter 和工具的准确性，自定义 Hook 的名称必须以 "use" 开头。这是一种约定，不遵循这个约定不会导致错误，但会影响工具的准确性。

- 依赖项数组的正确使用： 当使用 useEffect 和 useCallback 等 Hooks 时，需要正确地使用依赖项数组，以确保在依赖项变化时触发更新。忽略依赖项数组可能导致不必要的渲染或副作用。

- Hook 调用次序： 在函数组件中，Hook 的调用次序必须相同。React 依赖于 Hook 的调用次序来正确地跟踪每个组件的状态。

- 不能在条件语句中使用 Hooks： Hooks 必须在组件的每一次渲染中按照相同的顺序被调用。因此，不能在条件语句中使用 Hooks，因为条件语句可能导致 Hook 的调用顺序发生变化。

## reactFiber 是什么

参考以下文章：

> [React Fiber 是什么?](https://zhuanlan.zhihu.com/p/297971861)

## hooks 与 HOC

逻辑抽离，然后会问如何抽离，和 HOC 的区别

## useEffect 和 useLayoutEffect 的区别是什么

> [useLayoutEffect 和 useEffect 的区别](https://zhuanlan.zhihu.com/p/348701319)

## setState 的执行时机与同步异步

在生命周期、事件触发等情况下，连续的 setState 并不会马上更新值，而是批量更新
在 setTimeout 类似的回调中则会同步更新，性能差很多
batchedUpdate 机制

> [Component State – React](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

## 对 redux 的理解

> [完全理解 redux（从零实现一个 redux） · Issue #22 · brickspert/blog](https://github.com/brickspert/blog/issues/22)
