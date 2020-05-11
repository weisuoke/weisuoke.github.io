# Generator

`Generator` 算是 ES6 中难理解的概念之一了，`Generator` 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 `Generator`，而是把重点放在 `Generator` 的一些容易困惑的地方。

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因

- 首先 `Generator` 函数调用和普通函数不同，它会返回一个迭代器
- 当执行第一次 `next` 时，传参会被忽略，并且函数暂停在 `yield (x + 1)` 处，所以返回 `5 + 1 = 6`
- 当执行第二次 `next` 时，传入的参数等于上一个 `yield` 的返回值，如果你不传参，`yield` 永远返回 `undefined`。此时 `let y = 2 * 12`，所以第二个 `yield` 等于 `2 * 12 / 3 = 8`
- 当执行第三次 `next` 时，传入的参数会传递给 `z`，所以 `z = 13, x = 5, y = 24`，相加等于 `42`

`Generator` 函数一般见到的不多，其实也于他有点绕有关系，并且一般会配合 co 库去使用。当然，我们可以通过 `Generator` 函数解决回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```js
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

## 1. Generator 的自动执行

### 1.1  单个异步任务

```js
var fetch = require('node-fetch');

function* gen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
```

为了获得最终的执行结果，你需要这样做：

```js
var g = gen();
var result = g.next();

result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
});
```

首先执行 Generator 函数，获取遍历器对象。

然后使用 next 方法，执行异步任务的第一阶段，即 fetch(url)。

注意，由于 fetch(url) 会返回一个 Promise 对象，所以 result 的值为：

```js
{ value: Promise { <pending> }, done: false }
```

最后我们为这个 Promise 对象添加一个 then 方法，先将其返回的数据格式化(`data.json()`)，再调用 g.next，将获得的数据传进去，由此可以执行异步任务的第二阶段，代码执行完毕。

### 1.2 多个异步任务

上节我们只调用了一个接口，那如果我们调用了多个接口，使用了多个 yield，我们岂不是要在 then 函数中不断的嵌套下去……

所以我们来看看执行多个异步任务的情况：

```js
var fetch = require('node-fetch');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var r3 = yield fetch('https://api.github.com/users/github/repos');

    console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
}
```

为了获得最终的执行结果，你可能要写成：

```js
var g = gen();
var result1 = g.next();

result1.value.then(function(data){
    return data.json();
})
.then(function(data){
    return g.next(data).value;
})
.then(function(data){
    return data.json();
})
.then(function(data){
    return g.next(data).value
})
.then(function(data){
    return data.json();
})
.then(function(data){
    g.next(data)
});
```

但我知道你肯定不想写成这样……

其实，利用递归，我们可以这样写：

```js
function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value.then(function(data) {
            return data.json();
        }).then(function(data) {
            next(data);
        });

    }

    next();
}

run(gen);
```

其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数，onFullfilled 函数中又去执行 g.next，从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 g.next，然后再返回……

### 1.3 启动器函数

在 run 这个启动器函数中，我们在 then 函数中将数据格式化 `data.json()`，但在更广泛的情况下，比如 yield 直接跟一个 Promise，而非一个 fetch 函数返回的 Promise，因为没有 json 方法，代码就会报错。所以为了更具备通用性，连同这个例子和启动器，我们修改为：

```js
var fetch = require('node-fetch');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var json2 = yield r2.json();
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value.then(function(data) {
            next(data);
        });

    }

    next();
}

run(gen);
```

只要 yield 后跟着一个 Promise 对象，我们就可以利用这个 run 函数将 Generator 函数自动执行。

### 1.4 回调函数

yield 后一定要跟着一个 Promise 对象才能保证 Generator 的自动执行吗？如果只是一个回调函数呢？我们来看个例子：

首先我们来模拟一个普通的异步请求：

```js
function fetchData(url, cb) {
    setTimeout(function(){
        cb({status: 200, data: url})
    }, 1000)
}
```

我们将这种函数改造成：

```js
function fetchData(url) {
    return function(cb){
        setTimeout(function(){
            cb({status: 200, data: url})
        }, 1000)
    }
}
```

对于这样的 Generator 函数：

```js
function* gen() {
    var r1 = yield fetchData('https://api.github.com/users/github');
    var r2 = yield fetchData('https://api.github.com/users/github/followers');

    console.log([r1.data, r2.data].join('\n'));
}
```

如果要获得最终的结果：

```js
var g = gen();

var r1 = g.next();

r1.value(function(data) {
    var r2 = g.next(data);
    r2.value(function(data) {
        g.next(data);
    });
});
```

如果写成这样的话，我们会面临跟第一节同样的问题，那就是当使用多个 yield 时，代码会循环嵌套起来……

同样利用递归，所以我们可以将其改造为：

```js
function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value(next);
    }

    next();
}

run(gen);
```

### 1.5 run

由此可以看到 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。

而两种方法可以做到这一点。

（1）回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

在两种方法中，我们各写了一个 run 启动器函数，那我们能不能将这两种方式结合在一些，写一个通用的 run 函数呢？我们尝试一下：

```js
// 第一版
function run(gen) {
    var gen = gen();

    function next(data) {
        var result = gen.next(data);
        if (result.done) return;

        if (isPromise(result.value)) {
            result.value.then(function(data) {
                next(data);
            });
        } else {
            result.value(next)
        }
    }

    next()
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

module.exports = run;
```

其实实现的很简单，判断 result.value 是否是 Promise，是就添加 then 函数，不是就直接执行。

### 1.6 return Promise

我们已经写了一个不错的启动器函数，支持 yield 后跟回调函数或者 Promise 对象。

现在有一个问题需要思考，就是我们如何获得 Generator 函数的返回值呢？又如果 Generator 函数中出现了错误，就比如 fetch 了一个不存在的接口，这个错误该如何捕获呢？

这很容易让人想到 Promise，如果这个启动器函数返回一个 Promise，我们就可以给这个 Promise 对象添加 then 函数，当所有的异步操作执行成功后，我们执行 onFullfilled 函数，如果有任何失败，就执行 onRejected 函数。

我们写一版：

```js
// 第二版
function run(gen) {
    var gen = gen();

    return new Promise(function(resolve, reject) {

        function next(data) {
            try {
                var result = gen.next(data);
            } catch (e) {
                return reject(e);
            }

            if (result.done) {
                return resolve(result.value)
            };

            var value = toPromise(result.value);

            value.then(function(data) {
                next(data);
            }, function(e) {
                reject(e)
            });
        }

        next()
    })

}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;
```

与第一版有很大的不同：

首先，我们返回了一个 Promise，当 `result.done` 为 true 的时候，我们将该值 `resolve(result.value)`，如果执行的过程中出现错误，被 catch 住，我们会将原因 `reject(e)`。

其次，我们会使用 `thunkToPromise` 将回调函数包装成一个 Promise，然后统一的添加 then 函数。在这里值得注意的是，在 `thunkToPromise` 函数中，我们遵循了 error first 的原则，这意味着当我们处理回调函数的情况时：

```js
// 模拟数据请求
function fetchData(url) {
    return function(cb) {
        setTimeout(function() {
            cb(null, { status: 200, data: url })
        }, 1000)
    }
}
```

在成功时，第一个参数应该返回 null，表示没有错误原因。

### 1.7 优化

我们在第二版的基础上将代码写的更加简洁优雅一点，最终的代码如下：

```js
// 第三版
function run(gen) {

    return new Promise(function(resolve, reject) {
        if (typeof gen == 'function') gen = gen();

        // 如果 gen 不是一个迭代器
        if (!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise(ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise ' +
                'but the following object was passed: "' + String(ret.value) + '"'));
        }
    })
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;
```

### 1.8 co

如果我们再将这个启动器函数写的完善一些，我们就相当于写了一个 co，实际上，上面的代码确实是来自于 co……

而 co 是什么？ co 是大神 TJ Holowaychuk 于 2013 年 6 月发布的一个小模块，用于 Generator 函数的自动执行。

如果直接使用 co 模块，这两种不同的例子可以简写为：

```js
// yield 后是一个 Promise
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var json2 = yield r2.json();
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

co(gen);
// yield 后是一个回调函数
var co = require('co');

function fetchData(url) {
    return function(cb) {
        setTimeout(function() {
            cb(null, { status: 200, data: url })
        }, 1000)
    }
}

function* gen() {
    var r1 = yield fetchData('https://api.github.com/users/github');
    var r2 = yield fetchData('https://api.github.com/users/github/followers');

    console.log([r1.data, r2.data].join('\n'));
}

co(gen);
```

是不是特别的好用？

## 2. Bebel将Generator编译成了什么样子？

本章就是简单介绍下 Generator 语法编译后的代码。

### 2.1 Generator

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```

我们打印下执行的结果：

```js
var hw = helloWorldGenerator();

console.log(hw.next()); // {value: "hello", done: false}
console.log(hw.next()); // {value: "world", done: false}
console.log(hw.next()); // {value: "ending", done: true}
console.log(hw.next()); // {value: undefined, done: true}
```

### 2.2 Babel

具体的执行过程就不说了，我们直接在 Babel 官网的 [Try it out](https://babeljs.io/repl) 粘贴上述代码，然后查看代码被编译成了什么样子：

```js
/**
 * 我们就称呼这个版本为简单编译版本吧
 */
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return "hello";

          case 2:
            _context.next = 4;
            return "world";

          case 4:
            return _context.abrupt("return", "ending");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked,
    this
  );
}
```

猛一看，好像编译后的代码还蛮少的，但是细细一看，编译后的代码肯定是不能用的呀，`regeneratorRuntime` 是个什么鬼？哪里有声明呀？`mark` 和 `wrap` 方法又都做了什么？

难道就不能编译一个完整可用的代码吗？

### 2.3 regenerator

如果你想看到完整可用的代码，你可以使用 [regenerator](https://github.com/facebook/regenerator)，这是 facebook 下的一个工具，用于编译 ES6 的 generator 函数。

我们先安装一下 regenerator：

```shell
npm install -g regenerator
```

然后新建一个 generator.js 文件，里面的代码就是文章最一开始的代码，我们执行命令：

```shell
regenerator --include-runtime generator.js > generator-es5.js
```

我们就可以在 generator-es5.js 文件看到编译后的完整可用的代码。

而这一编译就编译了 700 多行…… 编译后的代码可以查看 [generator-es5.js](https://github.com/mqyqingfeng/Blog/blob/master/demos/ES6/generator/generator-es5.js)

总之编译后的代码还蛮复杂，我们可以从中抽离出大致的逻辑，至少让简单编译的那段代码能够跑起来。

### 2.4 mark 函数

简单编译后的代码第一段是这样的：

```js
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator);
```

我们查看完整编译版本中 mark 函数的源码：

```js
runtime.mark = function(genFun) {
  genFun.__proto__ = GeneratorFunctionPrototype;
  genFun.prototype = Object.create(Gp);
  return genFun;
};
```

这其中又涉及了 GeneratorFunctionPrototype 和 Gp 变量，我们也查看下对应的代码：

```js
function Generator() {}
function GeneratorFunction() {}
function GeneratorFunctionPrototype() {}

...

var Gp = GeneratorFunctionPrototype.prototype =
  Generator.prototype = Object.create(IteratorPrototype);

GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;

GeneratorFunctionPrototype.constructor = GeneratorFunction;

GeneratorFunctionPrototype[toStringTagSymbol] =
  GeneratorFunction.displayName = "GeneratorFunction";
```

这段代码构建了一堆看起来很复杂的关系链，其实这是参照着 [ES6 规范](https://www.ecma-international.org/ecma-262/6.0/#sec-generatorfunction-constructor)构建的关系链:

[![regenerator](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/regenerator/regenerator.png)](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/ES6/regenerator/regenerator.png)

图中 `+@@toStringTag:s = 'Generator'` 的就是 Gp，`+@@toStringTag:s = 'GeneratorFunction'` 的就是 GeneratorFunctionPrototype。

构建关系链的目的在于判断关系的时候能够跟原生的保持一致，就比如：

```js
function* f() {}
var g = f();
console.log(g.__proto__ === f.prototype); // true
console.log(g.__proto__.__proto__ === f.__proto__.prototype); // true
```

为了简化起见，我们可以把 Gp 先设置为一个空对象，不过正如你在上图中看到的，next()、 throw()、return() 函数都是挂载在 Gp 对象上，实际上，在完整的编译代码中，确实有为 Gp 添加这三个函数的方法：

```js
// 117 行
function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function(method) {
    prototype[method] = function(arg) {
      return this._invoke(method, arg);
    };
  });
}

// 406 行
defineIteratorMethods(Gp);
```

为了简单起见，我们将整个 mark 函数简化为：

```js
runtime.mark = function(genFun) {
  var generator = Object.create({
    next: function(arg) {
      return this._invoke('next', arg)
    }
  });
  genFun.prototype = generator;
  return genFun;
};
```

### 2.5 wrap 函数

除了设置关系链之外，mark 函数的返回值 genFun 还作为了 wrap 函数的第二个参数传入：

```js
function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      ...
    },
    _marked,
    this
  );
}
```

我们再看下 wrap 函数：

```js
function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}
```

所以当执行 `var hw = helloWorldGenerator();` 的时候，其实执行的是 wrap 函数，wrap 函数返回了 generator，generator 是一个对象，原型是 `outerFn.prototype`, `outerFn.prototype` 其实就是 `genFun.prototype`， `genFun.prototype` 是一个空对象，原型上有 next() 方法。

所以当你执行 `hw.next()` 的时候，执行的其实是 hw 原型的原型上的 next 函数，next 函数执行的又是 hw 的 _invoke 函数：

```js
generator._invoke = makeInvokeMethod(innerFn, self, context);
```

innerFn 就是 wrap 包裹的那个函数，其实就是 helloWordGenerato$ 函数，呐，就是这个函数：

```js
function helloWorldGenerator$(_context) {
  while (1) {
    switch ((_context.prev = _context.next)) {
      case 0:
        _context.next = 2;
        return "hello";

      case 2:
        _context.next = 4;
        return "world";

      case 4:
        return _context.abrupt("return", "ending");

      case 5:
      case "end":
        return _context.stop();
    }
  }
}
```

而 context 你可以直接理解为这样一个全局对象：

```js
var ContinueSentinel = {};

var context = {
  done: false,
  method: "next",
  next: 0,
  prev: 0,
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
```

每次 `hw.next` 的时候，就会修改 next 和 prev 属性的值，当在 generator 函数中 return 的时候会执行 abrupt，abrupt 中又会执行 complete，执行完 complete，因为 `this.next = end` 的缘故，再执行就会执行 stop 函数。

我们来看下 makeInvokeMethod 函数：

```js
var ContinueSentinel = {};

function makeInvokeMethod(innerFn, self, context) {
  var state = 'start';

  return function invoke(method, arg) {

    if (state === 'completed') {
      return { value: undefined, done: true };
    }

    context.method = method;
    context.arg = arg;

    while (true) {

      state = 'executing';

      var record = {
        type: 'normal',
        arg: innerFn.call(self, context)
      };
      if (record.type === "normal") {

        state = context.done
          ? 'completed'
          : 'yield';

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
```

基本的执行过程就不分析了，我们重点看第三次执行 `hw.next()` 的时候:

第三次执行 `hw.next()` 的时候，其实执行了

```js
this._invoke("next", undefined);
```

我们在 invoke 函数中构建了一个 record 对象：

```js
var record = {
  type: "normal",
  arg: innerFn.call(self, context)
};
```

而在 `innerFn.call(self, context)` 中，因为 _context.next 为 4 的缘故，其实执行了:

```js
_context.abrupt("return", 'ending');
```

而在 abrupt 中，我们又构建了一个 record 对象：

```js
var record = {};
record.type = 'return';
record.arg = 'ending';
```

然后执行了 `this.complete(record)`，

在 complete 中，因为 `record.type === "return"`

```js
this.rval = 'ending';
this.method = "return";
this.next = "end";
```

然后返回了全局对象 ContinueSentinel，其实就是一个全局空对象。

然后在 invoke 函数中，因为 `record.arg === ContinueSentinel` 的缘故，没有执行后面的 return 语句，就直接进入下一个循环。

于是又执行了一遍 `innerFn.call(self, context)`，此时 `_context.next` 为 end, 执行了 `_context.stop()`, 在 stop 函数中：

```js
this.done = true;
return this.rval; // this.rval 其实就是 `ending`
```

所以最终返回的值为:

```js
{
  value: 'ending',
  done: true
};
```

之后，我们再执行 hw.next() 的时候，因为 state 已经是 'completed' 的缘故，直接就返回 `{ value: undefined, done: true}`

### 2.6 不完整但可用的源码

当然这个过程，看文字理解起来可能有些难度，不完整但可用的代码如下，你可以断点调试查看具体的过程：

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

var _marked = regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return "hello";

          case 2:
            _context.next = 4;
            return "world";

          case 4:
            return _context.abrupt("return", "ending");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked,
    this
  );
}

var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
```