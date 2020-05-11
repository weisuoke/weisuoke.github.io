# 实现(5).add(3).minus(2)的功能

```js
Number.prototype.add = function(i=0){
	return this.valueOf()+i
}
Number.prototype.minus = function(i=0){
	return this.valueOf()-i
}
```

不知道是否是考虑的不周全，就仔细想想，感觉会有一些好玩的知识点在里面，就做了一些小实验。
在 Chrome 的 DevTools 里，我们可以做这个实验：

![image](https://user-images.githubusercontent.com/6418374/55767430-85127e80-5aab-11e9-85a2-f7b7d3d3f8ab.png)

这里问题就来了——JS的经典的浮点数陷阱。
在简单地搜索之后，我在 GitHub 上搜到了一位[阿里大佬的解法](https://github.com/camsong/blog/issues/9)，然后参考了一下他的解法和楼上大佬们的解法，对我上面的答案进行了如下修正：

```js
Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length-2
Number.prototype.digits = function(){
	let result = (this.valueOf().toString().split('.')[1] || '').length
	return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result
}
Number.prototype.add = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum + i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
Number.prototype.minus = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum - i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
```

【大数加减：直接通过 Number 原生的安全极值来进行判断，超出则直接取安全极值】

【超级多位数的小数加减：取JS安全极值位数-2作为最高兼容小数位数】

![image](https://user-images.githubusercontent.com/6418374/55785123-785e4c80-5ae4-11e9-9ece-cacbd6bb0140.png)
