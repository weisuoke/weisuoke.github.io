# Promise

`Promise` 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：

- 等待中（pending）
- 完成了 （resolved）
- 拒绝了（rejected）

这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变

```js
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```

当我们在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

```js
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

`Promise` 实现了链式调用，也就是说每次调用 `then` 之后返回的都是一个 `Promise`，并且是一个全新的 `Promise`，原因也是因为状态不可变。如果你在 `then` 中 使用了 `return`，那么 `return` 的值会被 `Promise.resolve()` 包装

```js
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```

当然了，`Promise` 也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```js
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```

前面都是在讲述 `Promise` 的一些优点和特点，其实它也是存在一些缺点的，比如无法取消 `Promise`，错误需要通过回调函数捕获。



## Promise A+ 模拟实现

[从0到1实现Promise](<https://juejin.im/entry/5baed769e51d450e4b1c1e14>)

```js
function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.value = value;

      self.onResolvedCallback.forEach((fn) => {
        fn();
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;

      self.onRejectedCallback.forEach((fn) => {
        fn();
      });
    }
  }

  try {
    // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }

  let called = false;

  if (x != null && (typeof x == 'object' || typeof x == 'function')) {
    // x是对象或者函数，因为typeof null 是 'object'，所以这里要排除null
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 是thenable函数，符合Promise要求
        then.call(x, (y) => {
          // 返回值y有可能还是Promise，也有可能是普通值，所以这里继续递归进行resolvePromise
          // 直到最后x是非thenable值，然后resolve(x)
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (error) => {
          if (called) return;
          called = true;
          reject(error);
        });
      } else {
        // 是对象或者函数，但没有thenable，直接返回
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x是普通值
    resolve(x);
  }
}

Promise.prototype.then = function(onFuifilled, onRejected) {
  onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : value => {
    return value;
  };
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason;
  };

  let self = this;

  // then的返回值也是个promise
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === 'pending') {
      self.onResolvedCallback.push(() => {
        setTimeout(() => {
          // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
          try {
            let x = onFuifilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      self.onRejectedCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    } else if (self.status === 'resolved') {
      setTimeout(() => {
        try {
          let x = onFuifilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });
  
  return promise2;
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function(fn) {
  return this.then((data) => {
    setTimeout(fn, 0);
    return data;
  }, (reason) => {
    setTimeout(fn, 0);
    throw reason;
  });
};

Promise.prototype.done = function() {
  this.catch((reason) => {
    throw reason;
  });
};

Promise.all = function(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;

    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then((data) => {
        result[i] = data;
        count++;

        if (count === promiseArr.length) {
          resolve(result);
        }
      }, reject)
    }
  });
};

Promise.race = function(promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then((data) => {
        resolve(data);
      }, reject)
    }
  });
};

Promise.resolve = function(value) {
  var promise = new Promise((resolve, reject) => {
    resolvePromise(promise, value, resolve, reject);
  })
  return promise;
};

Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}


module.exports = Promise;
```

