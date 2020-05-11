# 数组去重

[[TOC]]

## 1. 双重循环

双重循环去重实现比较容易

### 1.1 实现一

```js
Array.prototype.unique = function() {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### 1.2 实现二

```js
Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### 1.3 实现三

```js
Array.prototype.unique = function () {
  const newArray = [];
  
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        j = ++i;
      }
    }
    newArray.push(this[i]);
  }
  return newArray;
}
```

## 2. Array.prototype.indexOf()

基本思路：如果索引不是第一个索引，说明是重复值。

### 2.1 实现一

- 利用Array.prototype.filter()过滤功能
- Array.prototype.indexOf()返回的是第一个索引值
- 只将数组中元素第一次出现的返回
- 之后出现的将被过滤掉

```js
Array.prototype.unique = function() {
  return this.filter((item, index) => {
    return this.indexOf(item) === index
  })
}
```

### 2.2 实现二

```js
Array.prototype.unique = function() {
  const newArray = [];
  this.forEach(item => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  })
  return newArray;
}
```

## 3. Array.prototype.sort()

基本思路：先对原数组进行排序，然后再进行元素比较。

### 3.1 实现一：

```js
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[i + 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### 3.2 实现二:

```js
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== newArray[newArray.length - 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

## 4. Array.prototype.includes()

```js
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
}
```

## 5. Array.prototype.reduce()

```js
Array.prototype.unique = function () {
  return this.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length - 1] !== current){
      init.push(current);
    }
    return init;
  }, []);
}
```

## 6. 对象键值对

基本思路：利用了对象的key不可以重复的特性来进行去重。

但需要注意：

- 无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1'
- 无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
- 特殊数据，比如 '**proto**'，因为对象的 **proto** 属性无法被重写

### 6.1 实现一：

解决第一、第三点问题

```js
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    if (!tmp[typeof this[i] + this[i]]) {
      tmp[typeof this[i] + this[i]] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### 6.2 实现二

解决第二点问题: 

```js
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    // 使用JSON.stringify()进行序列化
    if (!tmp[typeof this[i] + JSON.stringify(this[i])]) {
      // 将对象序列化之后作为key来使用
      tmp[typeof this[i] + JSON.stringify(this[i])] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### 6.3 实现三

```js
const array = ['🐑', 1, 2, '🐑', '🐑', 3]
array.reduce((unique, item) => {
  unique.include(item) ? unique : [...unique, item]
}, [])

```



## 7. Map

### 7.1 实现一

```js
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for(let i = 0; i < this.length; i++){
        if(!tmp.get(this[i])){
            tmp.set(this[i], 1);
            newArray.push(this[i]);
        }
    }
    return newArray;
}
```

### 7.2 实现二：

```js
Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}
```

## 8. Set

### 8.1 实现一

```js
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
}
```

### 8.2 实现二

```js
Array.prototype.unique = function () {
  return [...new Set(this)];
}
```



## A. 参考阅读

- [解锁多种JavaScript数组去重姿势](https://juejin.im/post/5b0284ac51882542ad774c45#heading-2)
- [How to Remove Array Duplicates in ES6](https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c)

