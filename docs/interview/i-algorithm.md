---
---

# 算法和笔试题

## 手写继承

```javascript
function Parent(name) {
	this.name = name;
	this.arr = [];
}
function Child() {}
// 原型链继承 实质就是子类构造函数的prototype指向父类实例
// 缺点:共享了父类构造函数的引用属性，而且实例化Child的时候不能传name
// 优点:共享了父类构造函数的方法
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 构造函数继承 实质就是在子类构造函数里面call 父类的构造函数
// 优点，不共享父类构造函数的引用属性，也可以传参
// 父类原型上的方继承不到了
function Child(name) {
	Parent.call(this, name);
}

// 组合继承 实质就是上面两种加起来
// 优点，上面的问题都解决了
// 显而易见父类构造函数被执行了两次，搞了两份父类构造函数属性出来。
function Child(name) {
	Parent.call(this, name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 组合继承优化 实质是 Child.prototype = new Parent()变成了 Child.prototype = Parent.prototype;
// 优点 解决了多余一份属性的冗余
// 缺点 第三步修复的时候很明显把Parent.prototype.constructor也影响了
function Child(name) {
	Parent.call(this, name);
}
Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

// 寄生组合继承 实质是Child.prototype = Parent.prototype;
// 变成了Child.prototype = Object.create(Parent.prototype);相当于新建对象阻隔了引用传递
function Child(name) {
	Parent.call(this, name);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

## 手写 bind call apply

```javascript
Function.prototype.myCall = function (context, ...args) {
	// 解构context 与arguments
	if (typeof this !== 'function') {
		// this 必须是函数
		throw new TypeError(`It's must be a function`);
	}
	if (!context) context = window; // 没有context，或者传递的是 null undefined，则重置为window
	const fn = Symbol(); // 指定唯一属性，防止 delete 删除错误
	context[fn] = this; // 将 this 添加到 context的属性上
	const result = context[fn](...args); // 直接调用context 的 fn
	delete context[fn]; // 删除掉context新增的symbol属性
	return result; // 返回返回值
};
```

```javascript
Function.prototype.myBind = function (context, ...args) {
	const fn = this;
	if (typeof fn !== 'function') {
		throw new TypeError('It must be a function');
	}
	if (!context) context = window;
	return function (...otherArgs) {
		return fn.apply(context, [...args, ...otherArgs]);
	};
};
```

## url 跳转工具函数

```javascript
export function goBackUrl(
	jumps = 0,
	uri: string = window.location.pathname
): string {
	let newURI = uri;

	// Remove trailing slash
	while (newURI.endsWith('/')) {
		newURI = newURI.slice(0, -1);
	}
	if (jumps === 0) {
		return newURI;
	}

	// Go back !
	return newURI.split('/').slice(0, -jumps).join('/');
}
```

## 数组去重复的方法有哪些

1.使用 `set`

```js
function uniquearray(array) { let unique_array= Array.from(set(array)) return unique_array; }
```

2.使用 `filter`

```js
function unque_array(arr) {
	let unique_array = arr.filter(function (elem, index, self) {
		return index == self.indexOf(elem);
	});
	return unique_array;
}
console.log(unique_array(array_with_duplicates));
```

3.使用 `for` 循环

```js
Array dups_names = ['Ron', 'Pal', 'Fred', 'Rongo', 'Ron'];
function dups_array(dups_names) {
 let unique = {};
 names.forEach(function(i) {
    If (!unique[i]) {
      unique[i] = true;    }
  });
return Object.keys(unique);}   // Ron, Pal, Fred, Rongo
Dups_array(names);
```

## 找出数组中重复两次以上的数字

```js
function findDuplicates(arr) {
	let duplicates = [];
	let count = {};

	for (let i = 0; i < arr.length; i++) {
		if (count[arr[i]]) {
			count[arr[i]]++;
		} else {
			count[arr[i]] = 1;
		}
	}

	for (let num in count) {
		if (count[num] > 1) {
			duplicates.push(parseInt(num));
		}
	}

	return duplicates;
}

const arr = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8];
const duplicates = findDuplicates(arr);
console.log(duplicates);
```

空间复杂度 O(1)的解法，重点是利用数组的下标

```js
function findDuplicates(arr) {
	let duplicates = [];

	for (let i = 0; i < arr.length; i++) {
		let num = Math.abs(arr[i]);
		if (arr[num] < 0) {
			duplicates.push(num);
		} else {
			arr[num] = -arr[num];
		}
	}

	return duplicates;
}

const arr = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8];
const duplicates = findDuplicates(arr);
console.log(duplicates);
```

## 手写 setTimeOut

```javascript
// setTimeout的实现
function mySetTimeout(callback, timeout) {
	let timer;
	let time = new Date();
	let endTime = timeout || 0;
	const loop = () => {
		timer = window.requestAnimationFrame(loop);
		if (new Date() - time >= endTime) {
			callback.call(this, timer);
			window.cancelAnimationFrame(timer);
		}
	};
	window.requestAnimationFrame(loop);
}
mySetTimeout(() => {
	console.log('hh');
});
```

## 手写深拷贝

1. 考虑到了数组情况
2. 考虑到循环引用

```typescript
function clone(target, map = new Map()) {
	if (typeof target === 'object') {
		let cloneTarget = Array.isArray(target) ? [] : {};
		if (map.get(target)) {
			return map.get(target);
		}
		map.set(target, cloneTarget);
		for (const key in target) {
			cloneTarget[key] = clone(target[key], map);
		}
		return cloneTarget;
	} else {
		return target;
	}
}
```

进阶版本，考虑到了对于 for in 循坏的性能优化，来自下方参考链接

```js
function clone(target, map = new WeakMap()) {
	if (typeof target === 'object') {
		const isArray = Array.isArray(target);
		let cloneTarget = isArray ? [] : {};

		if (map.get(target)) {
			return map.get(target);
		}
		map.set(target, cloneTarget);

		const keys = isArray ? undefined : Object.keys(target);
		forEach(keys || target, (value, key) => {
			if (keys) {
				key = value;
			}
			cloneTarget[key] = clone2(target[key], map);
		});

		return cloneTarget;
	} else {
		return target;
	}
}
```

> [如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/6844903929705136141)

## 手写防抖

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

```typescript
function debounce(func, wait) {
	let timeout;
	return function () {
		let context = this;
		let args = arguments;

		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			func.apply(context, args);
		}, wait);
	};
}
```

## 手写节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

```typescript
function throttle(func, wait) {
	let previous = 0;
	return function () {
		let now = Date.now();
		let context = this;
		let args = arguments;
		if (now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	};
}
```

## 手写 flat 函数

```js
function flat(arr, depth = 1) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	const result = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i]) && depth > 0) {
			result.push(...flat(arr[i], depth - 1));
		} else {
			result.push(arr[i]);
		}
	}
	return result;
}
```

## 手写 delay 函数

```typescript
export function delay(millis: number) {
	return new Promise((resolve) => {
		const id = setTimeout(() => {
			clearTimeout(id);
			resolve(true);
		}, millis);
	});
}
```

## 累加的调用

```typescript
const Sum = (a) => (b) => b ? Sum(a + b) : a;

console.log(Sum(3)(4)(2)(5)()); //14

console.log(Sum(3)(4)(1)()); //8
```

```typescript
// 这种是最后返回的函数没有被调用的，重点是
// JavaScript中，打印和相加计算，会分别调用toString或valueOf函数
var add = function (m) {
	var temp = function (n) {
		return add(m + n);
	};
	temp.toString = function () {
		return m;
	};
	return temp;
};

add(3)(4)(5); // 12
add(3)(6)(9)(25); // 43
```

## 手写 LazyMan（类似 Promise）

```javascript
class LazyMan {
	constructor(name) {
		this.name = name;
		this.task = []; // 任务队列
		console.log(`My named ${name}`);

		// 这里使用异步调用next()是为了确保所有链式调用都被添加到task[]才开始执行任务
		setTimeout(() => {
			this.next();
		});
	}

	sleep(time) {
		this.task.push(() => {
			console.log(`I am sleeping...`);
			setTimeout(() => {
				console.log(`after ${time} ms`);
				this.next();
			}, time);
		});
		return this;
	}

	eat(food) {
		this.task.push(() => {
			console.log(food);
			this.next();
		});
		return this;
	}

	next() {
		let fn = this.task.shift();
		fn && fn(); // if(fn) fn()
	}
}

const lazyMan = new LazyMan('jack');
lazyMan.eat('apple').sleep(5000).eat('hamburger').sleep(3000).eat('pear');
```

## 手写 Promise

简单的实现

```typescript
function myPromise(constructor) {
	let self = this;
	self.status = 'pending'; //定义状态改变前的初始状态
	self.value = undefined; //定义状态为resolved的时候的状态
	self.reason = undefined; //定义状态为rejected的时候的状态
	function resolve(value) {
		//两个==="pending"，保证了状态的改变是不可逆的
		if (self.status === 'pending') {
			self.value = value;
			self.status = 'resolved';
		}
	}
	function reject(reason) {
		//两个==="pending"，保证了状态的改变是不可逆的
		if (self.status === 'pending') {
			self.reason = reason;
			self.status = 'rejected';
		}
	}
	//捕获构造异常
	try {
		constructor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}
// 定义链式调用的then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
	let self = this;
	switch (self.status) {
		case 'resolved':
			onFullfilled(self.value);
			break;
		case 'rejected':
			onRejected(self.reason);
			break;
		default:
	}
};
```

考虑了异步函数执行的情况

```typescript
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    let resolve = (value) => {
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }

    let reject = (reason) => {
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(()=> {
        onRejected(this.reason);
      })
    }
  }
}

new Promise(resolve=>setTime(()=>resolve('aaa'),1000))).then((rsp)=>console.log(rsp))
```

## 实现 Promise.all

注意 Promise.resolve()的作用：

Promise.resolve() 静态方法将给定的值转换为一个 Promise。如果该值本身就是一个 Promise，那么该 Promise 将被返回；如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；否则，返回的 Promise 将会以该值兑现。

```javascript
Promise.prototype.all = function (promises) {
	let results = [];
	let promiseCount = 0;
	let promisesLength = promises.length;
	return new Promise(function (resolve, reject) {
		for (let val of promises) {
			Promise.resolve(val).then(
				function (res) {
					promiseCount++;
					// results.push(res);
					results[i] = res;
					// 当所有函数都正确执行了，resolve输出所有返回结果。
					if (promiseCount === promisesLength) {
						return resolve(results);
					}
				},
				function (err) {
					return reject(err);
				}
			);
		}
	});
};
```

## 发布订阅者模式

#### 简单实现

```js
// 创建一个发布者对象
class Publisher {
	constructor() {
		this.subscribers = {}; // 订阅者列表
	}

	// 添加订阅者
	subscribe(event, callback) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);
	}

	// 发布消息
	publish(event, data) {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach((callback) => callback(data));
		}
	}
}

// 创建一个订阅者对象
class Subscriber {
	constructor(name) {
		this.name = name;
	}

	// 订阅事件
	subscribeTo(publisher, event) {
		publisher.subscribe(event, (data) => {
			console.log(`${this.name} 收到了消息：${event} - ${data}`);
		});
	}
}

// 测试
const publisher = new Publisher();
const subscriber1 = new Subscriber('Subscriber 1');
const subscriber2 = new Subscriber('Subscriber 2');

subscriber1.subscribeTo(publisher, 'news');
subscriber2.subscribeTo(publisher, 'news');

publisher.publish('news', '今天的新闻是...');

// 输出：
// Subscriber 1 收到了消息：news - 今天的新闻是...
// Subscriber 2 收到了消息：news - 今天的新闻是...
```

#### vue3 的事件总线处理类库 mitt 的源码

```js
/**
 * copy to https://github.com/developit/mitt
 * Expand clear method
 */

export type EventType = string | symbol;

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T = any> = (event?: T) => void;
export type WildcardHandler = (type: EventType, event?: any) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList = Array<Handler>;
export type WildCardEventHandlerList = Array<WildcardHandler>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;

export interface Emitter {
  all: EventHandlerMap;

  $on<T = any>(type: EventType, handler: Handler<T>): void;
  $on(type: '*', handler: WildcardHandler): void;

  $off<T = any>(type: EventType, handler: Handler<T>): void;
  $off(type: '*', handler: WildcardHandler): void;

  $emit<T = any>(type: EventType, event?: T): void;
  $emit(type: '*', event?: any): void;
  $clear(): void;
}

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt(all?: EventHandlerMap): Emitter {
  all = all || new Map();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    $on<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      const added = handlers && handlers.push(handler);
      if (!added) {
        all?.set(type, [handler]);
      }
    },

    /**
     * Remove an event handler for the given type.
     * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
     * @param {Function} handler Handler function to remove
     * @memberOf mitt
     */
    $off<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      if (handlers) {
        // 省略if的写法
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing "*" handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    $emit<T = any>(type: EventType, evt: T) {
      ((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
        handler(evt);
      });
      ((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
        handler(type, evt);
      });
    },

    /**
     * Clear all
     */
    $clear() {
      this.all.clear();
    },
  };
}
```

#### 延伸问题：观察者模式和订阅发布模式的区别

> [观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)

## 数组转 Tree（两种方式）

pid为父节点，id为当前节点

#### 递归方式：

```javascript
const generateTree = (
	treeData,
	props = {
		pId: 'pId',
		id: 'id',
	}
) => {
	// // 把跟节点首先放进数组
	const tmpTree = treeData.filter(
		(node) => node[props.pId] === null || node[props.pId] === ''
	);
	// 递归生成节点及子节点数据
	const findChildren = (tree) => {
		tree.forEach((node) => {
			node.children = treeData.filter(
				(cNode) => cNode[props.pId] === node[props.id]
			);
			// 还有children就继续往下找
			if (node.children.length) {
				findChildren(node.children);
			}
		});
	};

	findChildren(tmpTree);

	return tmpTree;
};
const treeData = [
	{ id: 1, name: 'Node 1', pId: null },
	{ id: 2, name: 'Node 2', pId: 1 },
	{ id: 3, name: 'Node 3', pId: 1 },
	{ id: 4, name: 'Node 4', pId: 2 },
	{ id: 5, name: 'Node 5', pId: 2 },
	{ id: 6, name: 'Node 6', pId: 3 },
	{ id: 7, name: 'Node 7', pId: 3 },
	{ id: 8, name: 'Node 8', pId: 4 },
	{ id: 9, name: 'Node 9', pId: 4 },
	{ id: 10, name: 'Node 10', pId: 5 },
];

const tree = generateTree(treeData);
console.log(tree);
```

#### reduce 实现：

```javascript
let treeList = Arr.reduce((prev, cur) => {
	prev[cur['id']] = cur;
	return prev;
}, {});
// console.log(treeList)
let result = Arr.reduce((prev, cur) => {
	let pid = cur.parent_id;
	// pid为0的就找不到父对象，找到当前cur的父对象
	// 对象的浅拷贝，引用关系存在，在后面处理parent的时候也会导致cur的改变，达到递归的效果
	let parent = treeList[pid];
	// console.log(parent,1)
	// 如果父对象存在，就将cur压到父对象的children属性中
	if (parent) {
		// parent和cur存在引用关系
		parent.children ? parent.children.push(cur) : (parent.children = [cur]);
	} else if (pid === 0) {
		// 没有父对象，则此cur为树的根元素
		prev.push(cur);
	}
	return prev;
}, []);
// console.log(result)
```

## 排序算法

#### 冒泡排序：

```javascript
function pop(array) {
	var len = array.length,
		i,
		j,
		tmp,
		result;
	result = array.slice(0);
	for (i = 0; i < len; i++) {
		for (j = len - 1; j > i; j--) {
			if (result[j] < result[j - 1]) {
				tmp = result[j - 1];
				result[j - 1] = result[j];
				result[j] = tmp;
			}
		}
	}
	return [result, array];
}

// 这种写法容易理解点
function bubbleSort(arr) {
	const len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		// 内层循环，每次比较相邻的两个元素
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				// 如果前一个元素大于后一个元素，则交换它们的位置
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}
```

#### 插入排序：

```javascript
function insert(array) {
	var len = array.length,
		i,
		j,
		tmp,
		result;
	// 设置数组副本
	result = array.slice(0);
	console.log(result);
	for (i = 1; i < len; i++) {
		//数组第一个值为默认的衡量值
		tmp = result[i]; //从第二个值开始与之前的值进行比较
		j = i - 1; //之前已经排好序的数组的最后一个
		while (j >= 0 && tmp < result[j]) {
			//如果j大于等于零（否则越界） 与最后一个值进行比较，如果小于
			result[j + 1] = result[j]; //则将最后一个值后移一位
			j--; //j往前移动一位
		}
		result[j + 1] = tmp; //比较完成 这时result[j]<temp或者j已经为-1，则将tmp的值赋给j+1
	}
	return result;
}
```

#### 快速排序：

感觉是最好理解的一种排序🤣，一分为二取中间的值比较大小，然后分两边！

```javascript
function quickSort(arr) {
	if (arr.length < 2) {
		return arr;
	}

	var left = [],
		right = [],
		mid = arr.splice(Math.floor(arr.length / 2), 1);

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < mid) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(mid, quickSort(right));
}
```

参考：

> [算法的时间与空间复杂度（一看就懂）](https://zhuanlan.zhihu.com/p/50479555)

> [十大排序算法总结](https://zhuanlan.zhihu.com/p/378430869)

## 广度优先与深度优先算法

> [JS 深度优先遍历和广度优先遍历](https://juejin.cn/post/6882627409393221646)
