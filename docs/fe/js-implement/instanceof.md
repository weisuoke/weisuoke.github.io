# instanceof的模拟实现

instanceof 主要的作用就是判断一个实例是否属于某种类型。

```javascript
let person = function () {
}
let nicole = new person()
nicole instanceof person // true
```

```javascript
let person = function () {
}
let programmer = function () {
}
programmer.prototype = new person()
let nicole = new programmer()
nicole instanceof person // true
nicole instanceof programmer // true
```

## 实现

```javascript
function _instanceof(a, b) {
  while(a) {
    if (a.__proto__ === b.prototype) return true
    a = a.__proto__
  }
  return false
}
```