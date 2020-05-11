#  Vue过滤器和自定义指令

- [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)
- [过滤器](https://cn.vuejs.org/v2/guide/filters.html)

## 1 $ref

不能给多个元素设置相同的ref 只能识别一个

```html
<div id="app">
  <!-- 不能给多个元素设置相同的ref 只能识别一个 -->
  <div ref="my">我的dom元素</div>
</div>

<script>
  let vm = new Vue({
    el: '#app',
    mounted() {
      console.log(this.$refs.my)	// 可以获取DOM元素
    }
  })
</script>
```
如果遇到循环，就是多个元素 数组的形式
```html
<div id="app">
	<template v-for="i in 3">
    <!-- 如果遇到循环，就是多个元素 数组的形式 -->
    <!-- 这里拿到的就是一个数组 -->
    <div ref="my">我的dom元素</div>
  </template>
</div>

<script>
  let vm = new Vue({
    el: '#app',
    mounted() {
      console.log(this.$refs.my)	// 可以获取DOM元素
    }
  })
</script>
```
如果给组件增加 ref, 那么可以获取组件的实例，调用组件实例上的方法（一些常见的库，通过这种方式，暴露一些方法。）
```html
<div id="app">
  <my-component ref="com"></my-component>
</div>

<script>
  let vm = new Vue({
    el: '#app',
    mounted() {
      console.log(this.$refs.com);	// 这里可以拿到组件
      console.log(this.$refs.com.show())； 	// 可以在父组件中调用子组件的方法
    },
    components: {
      'myComponent': {
        template: `<div>my-component</div>`,
        methods: {
          show() {
            alert(1)
          }
        }
      }
    }
  })
</script>
```



## 2 过滤器

过滤器比较简单，直接用就好了。

> 只改变数据的展示形式，并不会改变原数据
>
> 过滤器也有全局和局部

```javascript
{{name | capitalize}}
```

指令和过滤器函数中的this都是window

## 3 指令

- 全局
- 局部

> 我在输入框中限制输入内容的长度不能超过3个

```html
<div id="app">
	<input type="text" v-model="msg" v-split>
</div>

<script>
	// 指令 全局 局部
  Vue.directive('split', function(el, bindings, vnode) {
    console.log(el, bindings, vnode)
    let ctx = vnode.context;	// 获取当前的输入框所在的上下文
    // 去当前上下文中，获取msg变量，把输入的内容 截取3个放到msg中
    ctx[binding.expression] = el.target.value.slice(0, 3);   
  });
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'a'
    }
  })
</script>
```

`Vue.directive`的第二个参数不仅仅可以是函数，同时也可以是一个对象

```html
<div id="app">
	<input type="text" v-model="msg" v-split>
</div>

<script>
	// 指令 全局 局部
  // 默认函数形式 = update + bind
  Vue.directive('split', {
    bind(el, binding, vnode) {	// 这个只当用户绑定的时候生效
      let ctx = vnode.context;	// 获取当前的输入框所在的上下文
      // 去当前上下文中，获取msg变量，把输入的内容 截取3个放到msg中
      ctx[binding.expression] = el.target.value.slice(0, 3);
    },
    update(el, binding, vnode) {
      // 更新时钩子函数
      let ctx = vnode.context;	// 获取当前的输入框所在的上下文
      // 去当前上下文中，获取msg变量，把输入的内容 截取3个放到msg中
      ctx[binding.expression] = el.target.value.slice(0, 3);
    }
  });
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'a'
    }
  })
</script>
```

不在两个钩子函数中实现，只在一个钩子函数中实现

```html
<div id="app">
	<input type="text" v-model="msg" v-split>
</div>

<script>
  Vue.directive('split', {
    bind(el, binding, vnode) {	// 这个只当用户绑定的时候生效
			let ctx = vnode.context;
      el.addEventListener('input', (e) => {
        let val = e.target.value.slice(0, 3);	// 输入框中的内容
        ctx[bindings.expression] = val;
        el.value = val;
      });
      // 赋予默认值
      el.value = ctx[bindings.expression].slice(0, 3);
    }
  });
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'a'
    }
  })
</script>
```
根据修饰符的数量来获取传参。

```html
<div id="app">
	<input type="text" v-model="msg" v-split>
</div>

<script>
  Vue.directive('split', {
    bind(el, binding, vnode) {	// 这个只当用户绑定的时候生效
			let ctx = vnode.context;
      let [,len] = bindings.rawName.split('.');
      el.addEventListener('input', (e) => {
        let val = e.target.value.slice(0, len);	// 输入框中的内容
        ctx[bindings.expression] = val;
        el.value = val;
      });
      // 赋予默认值
      el.value = ctx[bindings.expression].slice(0, 3);
    }
  });
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'a'
    }
  })
</script>
```