# 栈

栈是一个线性结构，在计算机中是一个相当常见的数据结构。

栈的特点是只能在某一端添加或删除数据，遵循先进后出的原则

## 实现

可以用数组或者链表来实现，这里使用的数组

```js
class Stack {
  constructor() {
    this.stack = []
  }
  
  push(item) {
    this.stack.push(item)
  }
  
  pop() {
    this.stack.pop(item)
  }
  
  peek() {
    return this.stack[this.getCount() - 1] 
  }
  
  getCount() {
    return this.stack.length
  }
  
  isEmpty() {
    return this.getCount() === 0
  }
}
```

