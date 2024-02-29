# Vue

## MVVM 是什么:

MVVM 是 Model-View-ViewModel 缩写，Model 代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 的桥梁，数据会绑定到 ViewModel 层并自动将数据渲染到页面中，视图变化时会通知 ViewModel 层更新数据。

## vue 的双向绑定原理

1. 初始化 data，把 vm.data.xxx 代理到 vm.xxx
2. 调用 observe 方法观测整个 data，给非 VNode 的对象类型数据添加一个 Observer
3. Observer： 会把自身实例添加到对象的 `__ob__` 属性上，遍历对象类型数据通过 `Object.defineProperty` 添加 getter 和 setter
4. Dep：收集依赖，在 getter 中把每一个调用过该属性的地方记录为依赖（即触发 getter 的地方进行收集并且让 watcher 订阅对应依赖）
5. Watcher：更改数据后触发 setter，让所有 wathcer 都去通知组件进行更新

## vue 组件通讯

- props+events 父子组件通信（parent/parent/parent/children）
- vuex 任何组件通信
- 事件中心 emit/emit / emit/on 任何组件的通信
- attrs/listeners 传递属性和事件
- 跨层级通信（provide / inject）