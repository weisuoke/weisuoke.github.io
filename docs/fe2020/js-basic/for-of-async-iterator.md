# ES2019 通过 for...of 进行异步迭代

## 1. `for...of`同步迭代

```js
function iterateArray(anArray) {
  for (const item of anArray) {
    console.log(`item: ${item}`);
  }
}

const foo = [10, 20, 30, 40, 50];

iterateArray(foo);
```

循环同步数组

结果：

```js
// item 10
// item 20
// item 30
// item 40
// item 50
```

**让我们试下`for...of`来循环Promises**

```js
function iterateArray(anArray) {
  for (const item of anArray) {
    console.log(`item: ${item}`);
  }
}

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise One")
  }, 2000)
})

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Two")
  }, 2000)
})

const promiseThree = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Three")
  }, 2000)
})

const foo = [promiseOne, promiseTwo, promiseThree];

iterateArray(foo);
```

在这个例子中，使用`for...of`进行迭代数组。我们得到`Promises`对象，没有执行resolve操作

```js
// item: [object Promise]
// item: [object Promise]
// item: [object Promise]
````

## 2. 使用`for...of`进行异步迭代

```js
function iterateArray(anArray) {
  for await (const item of anArray) {
    console.log(`item: ${item}`);
  }
}

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise One")
  }, 10000)
})

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Two")
  }, 5000)
})

const promiseThree = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Three")
  }, 2000)
})

const foo = [promiseOne, promiseTwo, promiseThree];

iterateArray(foo);
```

输出：

```js
// Promise One
// Promise Two
// Promise Three
```

## A. 参考阅读

- [ECMAScript 2019. Asynchronous iteration using “for-of”](https://medium.com/javascript-in-plain-english/ecmascript-2019-asynchronous-iteration-using-for-of-dc1893f99fd9)

- [ES2018 新特征之：异步迭代器 for-await-of](https://segmentfault.com/a/1190000013387616)