# 代码片段分析

### 1

输出以下代码的执行结果并解释为什么

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

> [参考](<https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/93>)

- [一道赋值面试题引发的思考](<https://juejin.im/post/5b605473e51d45191a0d81d8>)

- [javascript面试题，关于连续赋值的坑？](<https://www.zhihu.com/question/41220520>)



### 2. 

```js
// 下面的代码输出是什么？
+new Array(017)
```



### 3. 

```js
var F = function() {};
Object.prototype.a = function() {};
Function.prototype.b = function() {};
var f = new F();
```

```
单选
- f能取到a，但取不到b
- f能取到a,b
- F能取到b，不能取到a
- F能取到a，不能取到b
```



### 4. 

```js
// 下面输入的代码是什么？为什么？
function test(m) {
	m = {v: 5};
}

var m = {k: 30};
test(m);
alert(m.v);
```

[JavaScript深入之参数按值传递](<https://github.com/mqyqingfeng/Blog/issues/10>)

### 5. 

```js
var foo = { n: 1 };
(function(foo) {	// 形参foo同实参foo一样指向同一片内存空间，
  var foo;	// 优先级低于形参，无效
  console.log(foo.n);	// 输出1
  foo.n = 3;	// 形参与实参foo指向的内存空间里的n的值被改为3
  foo = {n: 2};	// 形参foo指向了新的内存空间，里面n的值为2.
  console.log(foo.n) // 输出新的内存空间的n的值
})(foo);
console.log(foo.n); 	 //实参foo的指向还是原来的内存空间，里面的n的值为3.
```



### 6. 

```js
// 下面代码中 a 在什么情况下会打印 1？
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

**答案**

这个题目考察==的隐式转换吧

> 利用toString

```js
let a = {
  i: 1,
  toString () {
    return a.i++
  }
}

if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

> 利用valueOf

```js
let a = {
  i: 1,
  valueOf () {
    return a.i++
  }
}

if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

> 数组这个就有点妖了

```js
var a = [1,2,3];
a.join = a.shift;
if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

> ES6的symbol

```js
let a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};
if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

[从 (a==1&&a==2&&a==3) 成立中看javascript的隐式类型转换](https://yq.aliyun.com/articles/399499)

### 7. 

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

**答案**

依次输出：undefined -> 10 -> 20

解析：

在立即执行函数中，`var a = 20;` 语句定义了一个局部变量 `a`，由于js的变量声明提升机制，局部变量`a`的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印`undefined`，最后一条语句会打印`20`。

由于变量声明提升，`a = 5;` 这条语句执行时，局部的变量`a`已经声明，因此它产生的效果是对局部的变量`a`赋值，此时`window.a` 依旧是最开始赋值的`10`，

### 8.

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
<script type="text/javascript">
  var list_li = document.getElementsByTagName("li");
  for (var i = 0; i < list_li.length; i++) {
    list_li[i].onclick = function() {
      console.log(i);
    };
  }
</script>
```

**答案**

1. 闭包解决，闭包就是能够读取其他函数内部变量的函数。由于在javascript中，只有函数内部的
   子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数“。在本质上，闭
   包是将函数内部和函数外部连接起来的桥梁，用白话是闭包是拿到了本不该是你的东西，不
   用盲目的害怕闭包会造成内存泄露，用完=null就完事了。 还有要一阵见血的描述闭包的作用:函
   数作为返回值、函数作为参数传递、保护变量。
2. 块级作用域和函数级作用域，ES5没有块级作用域，只有全局作用域和函数作用域，全局作用域
   就是最外层的作用域，ES6新增了块极作用域所以使用let即可。
3. 最后我们巧妙的运用了this解决(this.innerHTML),在面试的时候经常面试官会迷惑你this的情况，
   要分析最后this再没执行前的作用域到底在哪



### 9. 找出下列正数组的最大差值

输入 [10,5,11,7,8,9]

```js
// 方法一
function getMaxProfit(arr) {
  var minPrice = arr[0];
  var maxProfit = 0;
  
  for (var i = 0; i < arr.length; i++) {
    var currentPrice = arr[i];
    
    minPrice = Math.min(minPrice, currentPrice);
    
    var potentialProfit = currentPrice - minPrice;
    
    maxProfit = Math.max(maxProfit, potentialProfit);
  }
}
```

```js
// 方法二
function getMaxProfit(arr) {
  var max=arr[0];
  var min=arr[0];
  var res=0;
  for (var i = 1; i < arr.length; i++) {
    if(arr[i]>max){
      max=arr[i];
    }
    if(arr[i]<min){
      min=arr[i]
    }
    res=max-min;
  }
  return res;
}
```



### 10. React setState笔试题

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

**答案**

> 1. 第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0.
>
> 2. 两次setState时，获取到this.setState.val都是0，所以执行都是将0设置成1，在react内部会被合并掉，只执行一次。设置完成后 state.val 值为1
> 3. setTimeout中的代码，触发时 isBatchingUpdates 为 false，所以能够直接更新，所以连着输出2， 3。
>
> 输出 0 0 2 3