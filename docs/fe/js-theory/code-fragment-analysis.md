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

