# ASYNC

> 涉及面试题：async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？

一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`

```js
async function test() {
  return "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

`async` 就是将函数返回值使用 `Promise.resolve()` 包裹了下，和 `then` 中处理返回值一样，并且 `await` 只能配套 `async` 使用

```js
async function test() {
  let value = await sleep()
}
```

`async` 和 `await` 可以说是异步终极解决方案了，相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 `then` 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 `await` 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 `await` 会导致性能上的降低。

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```

下面来看一个使用 `await` 的例子：

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise` 的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。

## 1. 什么是async？

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

在异步处理上，async 函数就是 Generator 函数的语法糖。

举个例子：

```js
// 使用 generator
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    console.log(json1.bio);
}

co(gen);
```

当你使用 async 时：

```js
// 使用 async
var fetch = require('node-fetch');

var fetchData = async function () {
    var r1 = await fetch('https://api.github.com/users/github');
    var json1 = await r1.json();
    console.log(json1.bio);
};

fetchData();
```

其实 async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn 函数指的是自动执行器，就比如说 co。

再加上 async 函数返回一个 Promise 对象，你也可以理解为 async 函数是基于 Promise 和 Generator 的一层封装。

## 2. async 与 Promise

严谨的说，async 是一种语法，Promise 是一个内置对象，两者并不具备可比性，更何况 async 函数也返回一个 Promise 对象……

这里主要是展示一些场景，使用 async 会比使用 Promise 更优雅的处理异步流程。

### 2.1 代码更加简洁

```js
/**
 * 示例一
 */
function fetch() {
  return (
    fetchData()
    .then(() => {
      return "done"
    });
  )
}

async function fetch() {
  await fetchData()
  return "done"
};
/**
 * 示例二
 */
function fetch() {
  return fetchData()
  .then(data => {
    if (data.moreData) {
        return fetchAnotherData(data)
        .then(moreData => {
          return moreData
        })
    } else {
      return data
    }
  });
}

async function fetch() {
  const data = await fetchData()
  if (data.moreData) {
    const moreData = await fetchAnotherData(data);
    return moreData
  } else {
    return data
  }
};
/**
 * 示例三
 */
function fetch() {
  return (
    fetchData()
    .then(value1 => {
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};
```

### 2.2 错误处理

```js
function fetch() {
  try {
    fetchData()
      .then(result => {
        const data = JSON.parse(result)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}
```

在这段代码中，try/catch 能捕获 fetchData() 中的一些 Promise 构造错误，但是不能捕获 JSON.parse 抛出的异常，如果要处理 JSON.parse 抛出的异常，需要添加 catch 函数重复一遍异常处理的逻辑。

在实际项目中，错误处理逻辑可能会很复杂，这会导致冗余的代码。

```js
async function fetch() {
  try {
    const data = JSON.parse(await fetchData())
  } catch (err) {
    console.log(err)
  }
};
```

async/await 的出现使得 try/catch 就可以捕获同步和异步的错误。

### 2.3 调试

```js
const fetchData = () => new Promise((resolve) => setTimeout(resolve, 1000, 1))
const fetchMoreData = (value) => new Promise((resolve) => setTimeout(resolve, 1000, value + 1))
const fetchMoreData2 = (value) => new Promise((resolve) => setTimeout(resolve, 1000, value + 2))

function fetch() {
  return (
    fetchData()
    .then((value1) => {
      console.log(value1)
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

const res = fetch();
console.log(res);
```

[![promise 断点演示](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/async/promise.gif)](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/async/promise.gif)

因为 then 中的代码是异步执行，所以当你打断点的时候，代码不会顺序执行，尤其当你使用 step over 的时候，then 函数会直接进入下一个 then 函数。

```js
const fetchData = () => new Promise((resolve) => setTimeout(resolve, 1000, 1))
const fetchMoreData = () => new Promise((resolve) => setTimeout(resolve, 1000, 2))
const fetchMoreData2 = () => new Promise((resolve) => setTimeout(resolve, 1000, 3))

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};

const res = fetch();
console.log(res);
```

[![async 断点演示](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/async/async.gif)](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/async/async.gif)

而使用 async 的时候，则可以像调试同步代码一样调试。

## 3. async 地狱

async 地狱主要是指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能，但用地狱形容有点夸张了点……

### 3.1 例子一

举个例子：

```js
(async () => {
  const getList = await getList();
  const getAnotherList = await getAnotherList();
})();
```

getList() 和 getAnotherList() 其实并没有依赖关系，但是现在的这种写法，虽然简洁，却导致了 getAnotherList() 只能在 getList() 返回后才会执行，从而导致了多一倍的请求时间。

为了解决这个问题，我们可以改成这样：

```js
(async () => {
  const listPromise = getList();
  const anotherListPromise = getAnotherList();
  await listPromise;
  await anotherListPromise;
})();
```

也可以使用 Promise.all()：

```js
(async () => {
  Promise.all([getList(), getAnotherList()]).then(...);
})();
```

### 3.2 例子二

当然上面这个例子比较简单，我们再来扩充一下：

```js
(async () => {
  const listPromise = await getList();
  const anotherListPromise = await getAnotherList();

  // do something

  await submit(listData);
  await submit(anotherListData);

})();
```

因为 await 的特性，整个例子有明显的先后顺序，然而 getList() 和 getAnotherList() 其实并无依赖，submit(listData) 和 submit(anotherListData) 也没有依赖关系，那么对于这种例子，我们该怎么改写呢？

基本分为三个步骤：

**1. 找出依赖关系**

在这里，submit(listData) 需要在 getList() 之后，submit(anotherListData) 需要在 anotherListPromise() 之后。

**2. 将互相依赖的语句包裹在 async 函数中**

```js
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}
```

**3.并发执行 async 函数**

```js
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}

// 方法一
(async () => {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
```

## 4. 继发与并发

**问题：给定一个 URL 数组，如何实现接口的继发和并发？**

async 继发实现：

```js
// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return "whew all done";
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

async 并发实现：

```js
// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return "whew all done";
}
// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

## 5. async 错误捕获

尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱，就比如：

```js
async function asyncTask(cb) {
    try {
       const user = await UserModel.findById(1);
       if(!user) return cb('No user found');
    } catch(e) {
        return cb('Unexpected error occurred');
    }

    try {
       const savedTask = await TaskModel({userId: user.id, name: 'Demo Task'});
    } catch(e) {
        return cb('Error occurred while saving task');
    }

    if(user.notificationsEnabled) {
        try {
            await NotificationService.sendNotification(user.id, 'Task Created');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    if(savedTask.assignedUser.id !== user.id) {
        try {
            await NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    cb(null, savedTask);
}
```

为了简化这种错误的捕获，我们可以给 await 后的 promise 对象添加 catch 函数，为此我们需要写一个 helper:

```js
// to.js
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}
```

整个错误捕获的代码可以简化为：

```js
import to from './to.js';

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError('No user found');

     [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) throw new CustomError('Error occurred while saving task');

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if (err) console.error('Just log the error and continue flow');
    }
}
```

## 6. async 的一些讨论

### 6.1 async 会取代 Generator 吗？

Generator 本来是用作生成器，使用 Generator 处理异步请求只是一个比较 hack 的用法，在异步方面，async 可以取代 Generator，但是 async 和 Generator 两个语法本身是用来解决不同的问题的。

### 6.2 async 会取代 Promise 吗？

1. async 函数返回一个 Promise 对象
2. 面对复杂的异步流程，Promise 提供的 all 和 race 会更加好用
3. Promise 本身是一个对象，所以可以在代码中任意传递
4. async 的支持率还很低，即使有 Babel，编译后也要增加 1000 行左右。

## 7. Babel 将 Async 编译成了什么样子

```js
const fetchData = (data) => new Promise((resolve) => setTimeout(resolve, 1000, data + 1))

const fetchValue = async function () {
    var value1 = await fetchData(1);
    var value2 = await fetchData(value1);
    var value3 = await fetchData(value2);
    console.log(value3)
};

fetchValue();
// 大约 3s 后输出 4
```

### 7.1 Babel

我们直接在 Babel 官网的 [Try it out](https://babeljs.io/repl) 粘贴上述代码，然后查看代码编译成什么样子：

```js
"use strict";

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

var fetchData = function fetchData(data) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, 1000, data + 1);
  });
};

var fetchValue = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var value1, value2, value3;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return fetchData(1);

              case 2:
                value1 = _context.sent;
                _context.next = 5;
                return fetchData(value1);

              case 5:
                value2 = _context.sent;
                _context.next = 8;
                return fetchData(value2);

              case 8:
                value3 = _context.sent;

                console.log(value3);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function fetchValue() {
    return _ref.apply(this, arguments);
  };
})();

fetchValue();
```

### 7.2  _asyncToGenerator

regeneratorRuntime 相关的代码我们在 [《ES6 系列之 Babel 将 Generator 编译成了什么样子》](https://github.com/mqyqingfeng/Blog/issues/102) 中已经介绍过了，这次我们重点来看看 _asyncToGenerator 函数：

```js
function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}
```

以上这段代码主要是用来实现 generator 的自动执行以及返回 Promise。

当我们执行 `fetchValue()` 的时候，执行的其实就是 `_asyncToGenerator` 返回的这个匿名函数，在匿名函数中，我们执行了

```
var gen = fn.apply(this, arguments);
```

这一步就相当于执行 Generator 函数，举个例子：

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

`var gen = fn.apply(this, arguments)` 就相当于 `var hw = helloWorldGenerator();`，返回的 gen 是一个具有 next()、throw()、return() 方法的对象。

然后我们返回了一个 Promise 对象，在 Promise 中，我们执行了 step("next")，step 函数中会执行：

```js
try {
  var info = gen[key](arg);
  var value = info.value;
} catch (error) {
  reject(error);
  return;
}
```

step("next") 就相当于 `var info = gen.next()`，返回的 info 对象是一个具有 value 和 done 属性的对象：

```js
{value: Promise, done: false}
```

接下来又会执行：

```js
if (info.done) {
  resolve(value);
} else {
  return Promise.resolve(value).then(
    function(value) {
      step("next", value);
    },
    function(err) {
      step("throw", err);
    }
  );
}
```

value 此时是一个 Promise，Promise.resolve(value) 依然会返回这个 Promise，我们给这个 Promise 添加了一个 then 函数，用于在 Promise 有结果时执行，有结果时又会执行 `step("next", value)`，从而使得 Generator 继续执行，直到 `info.done` 为 true，才会 `resolve(value)`。

### 7.3 不完整但可用的代码

```js
(function() {
    var ContinueSentinel = {};

    var mark = function(genFun) {
        var generator = Object.create({
            next: function(arg) {
                return this._invoke("next", arg);
            }
        });
        genFun.prototype = generator;
        return genFun;
    };

    function wrap(innerFn, outerFn, self) {
        var generator = Object.create(outerFn.prototype);

        var context = {
            done: false,
            method: "next",
            next: 0,
            prev: 0,
            sent: undefined,
            abrupt: function(type, arg) {
                var record = {};
                record.type = type;
                record.arg = arg;

                return this.complete(record);
            },
            complete: function(record, afterLoc) {
                if (record.type === "return") {
                    this.rval = this.arg = record.arg;
                    this.method = "return";
                    this.next = "end";
                }

                return ContinueSentinel;
            },
            stop: function() {
                this.done = true;
                return this.rval;
            }
        };

        generator._invoke = makeInvokeMethod(innerFn, context);

        return generator;
    }

    function makeInvokeMethod(innerFn, context) {
        var state = "start";

        return function invoke(method, arg) {
            if (state === "completed") {
                return { value: undefined, done: true };
            }

            context.method = method;
            context.arg = arg;

            while (true) {
                state = "executing";

                if (context.method === "next") {
                    context.sent = context._sent = context.arg;
                }

                var record = {
                    type: "normal",
                    arg: innerFn.call(self, context)
                };

                if (record.type === "normal") {
                    state = context.done ? "completed" : "yield";

                    if (record.arg === ContinueSentinel) {
                        continue;
                    }

                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
            }
        };
    }

    window.regeneratorRuntime = {};

    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
})();

"use strict";

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(
                        function(value) {
                            step("next", value);
                        },
                        function(err) {
                            step("throw", err);
                        }
                    );
                }
            }
            return step("next");
        });
    };
}

var fetchData = function fetchData(data) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, 1000, data + 1);
    });
};

var fetchValue = (function() {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
            var value1, value2, value3;
            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return fetchData(1);

                            case 2:
                                value1 = _context.sent;
                                _context.next = 5;
                                return fetchData(value1);

                            case 5:
                                value2 = _context.sent;
                                _context.next = 8;
                                return fetchData(value2);

                            case 8:
                                value3 = _context.sent;

                                console.log(value3);

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                this
            );
        })
    );

    return function fetchValue() {
        return _ref.apply(this, arguments);
    };
})();

fetchValue();
```

## 8. async 函数的实现 

async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function read() {
  let template = await readFile('./template.txt');
  let data = await readFile('./data.txt');
  return template + '+' + data;
}

// 等同于
function read(){
  return co(function*() {
    let template = yield readFile('./template.txt');
    let data = yield readFile('./data.txt');
    return template + '+' + data;
  });
}
```

