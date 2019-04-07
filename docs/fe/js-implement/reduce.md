# Reduce的模拟实现

```javascript
function reduce(arr, callback, initial) {
  let i = 0;
  let acc = initial === undefined ? arr[i++] : initial;
  for (; i < arr.length; i++) {
    arr = callback(acc, arr[i], i, arr);
  }
  return acc;
}
```



*参考阅读*

> [JavaScript中reduce()方法不完全指南](<https://aotu.io/notes/2016/04/14/js-reduce/index.html>)
>
>  [JS进阶篇--JS数组reduce()方法详解及高级技巧](https://segmentfault.com/a/1190000010731933)

