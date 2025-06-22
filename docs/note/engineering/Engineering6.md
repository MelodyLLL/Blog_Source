# 全局定时器

适用于公司如小程序，添加活动倒计时的场景，在瀑布墙等组件中会有非常多的倒计时。如果每个使用一个setTimeout，点击到详情页内部再次渲染瀑布墙会导致性能问题，页面卡顿。

这里的重点：

- 全局只有一个定时器（setTimeout）在运行，内部维护一个回调列表，每次 tick 时批量触发，避免了同时创建多个定时器造成的性能浪费。
- 每个任务通过唯一 taskId 管理，可以按需添加/移除任务，任务列表为空时自动清理，支持动态控制与资源回收。
- 封装成一个单例模式，在多个模块中引用也能确保只有一个调度器实例，统一控制生命周期

```js
/**
 * @author lijingqian
 * @email melody.li@miniso.com
 * @param {*} props
 * @returns 
 */

 export default class Ticker {
  constructor() {
    this.instance = null
    // 标识每个方法
    this.timerId = 0
    // 真实「定时器」ID
    this.animationId = null;
    this.isRunning = false
    this.intervalCallbacks = Object.create(null)
  }

  start() {
    this.isRunning = true;
    let _this = this;
    function loop() {
      console.log('intervalCallbacks is', _this?.intervalCallbacks);
      _this.excuteAll();
      clearTimeout(_this.animationId);
      // 下一次渲染时执行这个方法
      if (_this.isRunning) {
        _this.animationId = setTimeout(loop, 1000)
      }
    }
    loop()
  }

  setIntervalTask(excute) {
    this.timerId++;
    this.intervalCallbacks[this.timerId] = excute;
    return this.timerId;
  }

  // 去遍历所有的方法
  excuteAll() {
    const callBackKeyArr = Object.keys(this?.intervalCallbacks);
    if (callBackKeyArr.length === 0) {
      console.log('intervalCallbacks is empty...');
      this.stop();
      this.clearAllTask();
    }
    callBackKeyArr?.map(timerId => {
      let callback = this.intervalCallbacks[timerId];
      try {
        if (typeof callback === 'function') {
          callback()
        }
      } catch (error) {
        console.log(error);
      }
    })
  }

  stop() {
    this.isRunning = false;
    clearTimeout(this.animationId)
  }

  resume() {
    this.start()
  }

  clearTask(taskId) {
    delete this.intervalCallbacks[taskId];
  }

  clearAllTask() {
    this.intervalCallbacks = Object.create(null);
  }

  static createTicker() {
    // 单实例
    if (!this.instance) {
      this.instance = new Ticker()
    }
    // this.instance.start()
    return this.instance
  }
}
```