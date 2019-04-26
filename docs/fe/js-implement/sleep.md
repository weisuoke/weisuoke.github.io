# 实现一个 sleep 函数

### 方式1

```js
// Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
  console.log(1)
})
```



### 方式2

```js
// Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve, reject) {
    setTimeout(resolve, time)
  })
}
sleepGenerator(1000).next().value.then(() => console.log(1))
```



### 方式3

```js
// async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function output() {
  let out = await sleep(1000);
  console.log(1)
  return out;
}
```



### 方式4

```js
// ES5
function sleep(callback, time) {
  if (typeof callback === 'function') {
    setTimeout(callback, time)
  }
}

function output() {
  console.log(1)
}

sleep(output, 1000)
```

