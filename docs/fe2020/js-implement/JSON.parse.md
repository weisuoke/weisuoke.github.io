# JSON.parse 的模拟实现

> JSON.parse(text[, reviver])

用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)。

### 方法一： 直接调用 eval

```javascript
function jsonParse(opt) {
  return eval("(" + opt + ")");
}
jsonParse(jsonStringify({ x: 5 }));
// Object { x: 5}
jsonParse(jsonStringify([1, "false", false]));
// [1, "false", falsr]
jsonParse(jsonStringify({ b: undefined }));
// Object { b: "undefined"}
```

> 避免在不必要的情况下使用 `eval`，eval() 是一个危险的函数， 他执行的代码拥有着执行者的权利。如果你用 eval()运行的字符串代码被恶意方（不怀好意的人）操控修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。

### 方法二： Function

> 来源 [神奇的 eval()与 new Function()](https://link.juejin.im/?target=https%3A%2F%2Fimys.net%2F20151222%2Feval-with-new-function.html)

核心：`Function`与`eval`有相同的字符串参数特性。

> ```js
> var func = new Function(arg1, arg2, ..., functionBody);
> ```

在转换 JSON 的实际应用中，只需要这么做。

```js
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
```

`eval` 与 `Function` 都有着动态编译 js 代码的作用，但是在实际的编程中并不推荐使用。

## 参考阅读：

[JSON.parse 三种实现方式](https://github.com/youngwind/blog/issues/115)
