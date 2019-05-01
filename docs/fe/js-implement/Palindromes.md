# 回文判断

**回文**( Palindromes )，在中文文当中是指倒着念和顺着念都是相同的，前后对称，例如“上海自来水来自海上”；在英文文当中是指正着看和反着看都相同的单词，例如“madam”；而对于数字，又称之为回文数，是指一个像“16461”这样的对称的数，即这个数的数字按相反的顺序重新排列后得到的数和原来的数一样。

### 问题描述

判断给定的字符串，如果字符串是一个Palindromes，那么返回`true`，反之返回`false`。

### 实现方法

#### 1. reverse()

```js
function Palindromes(str) {
    let reg = /[\W_]/g; // \w 匹配所有字母和数字以及下划线； \W与之相反； [\W_] 表示匹配下划线或者所有非字母非数字中的任意一个；/g全局匹配
    let newStr = str.replace(reg, '').toLowerCase();
    let reverseStr = newStr.split('').reverse().join('')
    return reverseStr === newStr; // 与 newStr 对比
}
```

实际上这里做了很多步对数组的操作，字符转数组 翻转数组 再转字符串，所以这里性能也不是很好。以为数组是引用类型，要改变这个数组，需要开辟新的堆地址空间。

#### 2. for 循环

```js
function Palindromes(str) {
    let reg = /[\W_]/g;
    let newStr = str.replace(reg, '').toLowerCase();
    for(let i = 0, len = Math.floor(newStr.length / 2); i < len; i++) {
        if(newStr[i] !== newStr[newStr.length - 1 - i]) return false;
    }
    return true;
}
```

- 写法二

```js
function Palindromes(str) {
    let reg = /[\W_]/g;
    let newStr = str.replace(reg, '').toLowerCase();
    let len = newStr.length;
    for(let i = 0, j = len - 1; i < j; i++, j--) { // i < j
        console.log('---');
        if(newStr[i] !== newStr[j]) return false;
    }
    return true;
}
```

#### 3. 递归

```js
function palin(str) {
    let reg = /[\W_]/g;
    let newStr = str.replace(reg, '').toLowerCase();
    let len = newStr.length;
    while(len >= 1) {
        console.log('--')
        if(newStr[0] != newStr[len - 1]) {
            // len = 0; // 为了终止 while 循环 否则会陷入死循环
            return false;
        } else {
            return palin(newStr.slice(1, len - 1)); 
        // 截掉收尾字符 再次比较收尾字符是否相等 
        // 直到字符串剩下一个字符（奇数项）或者 0 个字符（偶数项）
        }
    }
    return true;
}
```

### 给题目再增加个要求

对于给定的字符串，最多可以删除一个字符，判断它是否还是不是回文。

设置一个变量 flag，当第一次发现两边这一对字符不同时，可继续进行对比; 之后的对比中若发现不同，立即返回结果。

```js
function palin(str) {
    let flag = false; // 第一次不同可允许
    let len = str.length;
    for(let [i, j] = [0, len - 1]; i < j; i++, j--) {
        if(str[i] !== str[j]) {
            if(flag) {
                return false;
            }
            // 第一次发现不同时，让右边-1 或左边+1判断相不相等 
            // 这时候若相等可继续 否则直接返回结果 false
            if(str[i++] == str[j]) {
                i++;
                flag = true;
            } else if (str[i] == str[j--]) {
                j--;
                flag = true;
            } else {
                return false;
            }
        }
    }
    return true;
}

palin('abaacaaa');
palin('aabsdjdbaa');
palin('ab')
```

