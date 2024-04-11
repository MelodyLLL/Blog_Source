# React

## React 与 Vue 的区别

- 模版语法与 jsx
- 事件绑定，vue 绑定到 vm 上，react 类组件还需要自己处理 this 指向
- vue 有双向绑定，响应式更加便利，react 单纯的单向数据流，需要手动 setState，有一定的心理负担
- vue 有一些小 trick，事件修饰符，组件属性自动挂到最外层节点等
- diff 算法差异
- 生态对比

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

function createSetter(cursor) {
	return function setterWithCursor(newVal) {
		state[cursor] = newVal;
	};
}

// This is the pseudocode for the useState helper
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

> [useLayoutEffect和useEffect的区别](https://zhuanlan.zhihu.com/p/348701319)

## setState 的执行时机与同步异步

在生命周期、事件触发等情况下，连续的 setState 并不会马上更新值，而是批量更新
在 setTimeout 类似的回调中则会同步更新，性能差很多
batchedUpdate 机制

> [Component State – React](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

## 对 redux 的理解

> [完全理解 redux（从零实现一个 redux） · Issue #22 · brickspert/blog](https://github.com/brickspert/blog/issues/22)
