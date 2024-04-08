# 设计模式

## 发布订阅模式和观察者模式区别

> [观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)

## 单例模式

```js
class Singleton {
    show() {
      console.log("我是单例");
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
console.log(s1 === s2);
console.dir(Singleton);

```