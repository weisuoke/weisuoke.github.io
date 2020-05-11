# AOP的模拟实现

AOP(Aspect-Oriented Programming)：面向切面的编程，是对面向对象编程（OOP）的补充。面向对象是纵向编程，继承、封装和多态，而面向切面编程通过提供另外一种思考程序结构的途径来补充面向对象的不足。在OOP中模块化的关键单元是类（class），而在AOP中模块化的单元则是切面，切面能对关注点进行模块化扩展。

> 用途：
>
> 1. 日志记录
> 2. 性能统计
> 3. 安全控制
> 4. 事务处理
> 5. 异常处理

## 实现

```javascript
Function.prototype.before = function(beforeFn) {
  let _self = this;	// 缓存原函数的引用
  return function() {	// 代理函数
    beforefn.apply(this, arguments);	// 执行前置函数
    return _self.apply(this, arguments);	// 执行原函数
  }
}

Function.prototype.after = function(afterFn) {
  let _self = this;
  return function() {
    let set = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
  }
}
```

around的实现

```javascript
function JoinPoint(obj, args) {
  var isapply = false;	// 判断是否执行过目标函数
  var result = null;	// 保存目标函数的执行结果
  
  this.source = obj;	// 目标函数对象
  this.args = args;		// 目标函数对象传入的参数
  
  /**
   * 目标函数的代理执行函数
   * 如果被调用过，不能重复调用
   * @return { object } 目标函数的返回结果
   */
  this.invoke = function(thiz) {
    if (isapply) {
      return
    }
    isapply = true;
    result = this.source.apply(thiz || this.source, this.args);
    return result;
  };
  
  // 获取目标函数执行结果
  this.getResult = function() {
    return result;
  }
}

/**
 * 方法环绕通知
 * 原方法的执行需在环绕通知方法中执行
 */
Function.prototype.around = function(func) {
  var _self = this;
  return function() {
    var args = [new JoinPoint(_self, argument)];
    return func.apply(this, args);
  }
}
```

## 参考阅读

- [AOP在JS中的实现及应用](<https://blog.csdn.net/qq_21460229/article/details/79696159>)
- [深入浅出 Javascript Decorators 和 AOP 编程](<https://github.com/rainjay/blog/issues/5>)
- [meld](<https://github.com/cujojs/meld/blob/master/meld.js>)

