# 数组去重

```javascript
// 方法一, 使用ES6 新的数据结构Set来实现
[...new Set([1, 2, 3, 4, 4, 6, 8, 10])];

// 方法二，双重循环
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  
  let res = [arr[0]]
  for (let i = 1; i < arr.length; i++){
    let flag = true
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        flag = false;
        break
      }
    }
    if (flag) {
      res.push(arr[i])
    }
  }
  return res
}

// 方法三， indexOf
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return
  }
  
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

// 方法四，indexOf
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return
  }
  return Array.prototype.filter.call(arr, function(item, index) {
    return arr.indexOf(item) === index;
  })
}

// 方法四，相邻元素去重
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  
  arr = arr.sort()
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i])
    }
  }
  return res;
}

// 方法五：利用对象属性去重
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  let res = [],
      obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i])
      obj[arr[i]] = 1
    } else {
      obj[arr[i]]++
    }
  }
  return res;
}

// Array.from与set去重
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  return Array.from(new Set(arr));
}
```