# 设计模式

## 发布订阅模式和观察者模式区别

> [观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)

## 单例模式

实现方式可以是使用全局变量和闭包

懒汉式

```js
class Singleton {
	show() {
		console.log('我是单例');
	}
	// 实例变量
	static instance = null;
	// 返回唯一实例的静态方法
	static getInstance() {
		// 判断是否已经new过1个实例
		if (!Singleton.instance) {
			// 如果实例不存在，则先new一个实例
			Singleton.instance = new Singleton();
		}
		// 未来不管执行多少次，都返回这个唯一实例
		return Singleton.instance;
	}
}
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1);
console.log(s2);
```

饿汉式

```js
class Singleton {
	constructor() {
		// 构造函数中进行初始化工作
		console.log('我是单例');
	}

	show() {
		console.log('显示单例的方法');
	}

	// 饿汉模式在类加载时立即创建实例
	static instance = new Singleton();

	// 返回唯一实例的静态方法
	static getInstance() {
		// 直接返回已经创建的实例
		return Singleton.instance;
	}
}
```

## 关于工厂模式

可能会问到工作中有无使用过，需要知道一些概念，实际上我们最多使用的只是简单工厂。

> [工厂模式](https://www.cnblogs.com/anding/p/17625778.html)
