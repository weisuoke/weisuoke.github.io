# Vue.js的基础知识

## 1 . 什么是Vue

vue是一套用于构建用户界面的渐进式框架
特点是：易用，灵活，高效

## 2 什么是库，什么是框架

- 库是将代码集合成一个产品，库是我们调用库的方法实现自己的功能
- 框架则是为了解决一类问题而开发的产品，框架是我们在指定的位置编写好的代码，框架帮我们调用。

## 3 初始使用

```javascript
new Vue({
    el: '#app',
    template: '<div>我是weisuoke~~</div>', // 优先使用template
    data: {}
})
```

## 4 MVVM 与 MVC

**mvc**

- model
- controller
- view

**mvvm**

- model
- view
- viewModel

mvc 是单向，mvvm 是双向

vm => viewModel



## 5 声明式和命令式

- 自己写for循环就是命令式(命令其按照自己的方式得到结果)
- 声明式就是利用数组的方法forEach(我们想要的是循环，内部帮我们去做)

```html
<!-- 1.start.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    {{arr}}
  </div>
  <script src="node_modules/vue/dist/vue.js"></script>
  <script>
    let vm = new Vue({
      el: '#app',
      // template: '<h1>weisuoke</h1>',
      // 只要在模板中使用了数据，必须在实例上声明
      data: { // 存放数据
        msg: 'hello',
        info: {
          xxx: 'xxx'
        },
        arr: [1, 2, 3, 4]
      }
    })
    // 把数据都代理给了 vm

    // 更改了vm.msg，vm.msg = 'vue'。视图中的 msg 也会随之发生改变。 这就是数据驱动视图

    // 如果data中声明的是一个对象，例如 info，模板中这样写 {{ info.xxx }}, 但是 data 中info的属性不存在 xxx，那么在模板中还是无法显示, 后面赋值也无法做到响应式

    // 为了做到响应式，我们用之前必须要声明。

    // 我们要有一个规范，什么样的视图可以响应的我们的视图上，什么样的数据更改了能更新我们的视图。
    vm.$set(vm.info, 'address', 'hello address')

    // vue实例上的方法
    vm.$el
    vm.$options

    vm.arr = [5, 6, 7];
    console.log(vm.$el.innerHTML)  // 这里还是 [1, 2, 3, 4]。因为 Vue 把渲染 DOM 的过程会延迟执行。数据变化后更新视图操作是异步执行的。
    vm.$nextTick(() => {
      console.log(vm.$el.innerHTML)
    })

    vm.$watch('info.xxx', function(newValue, oldValue) {
      console.log(newValue, oldValue)
    }) // 监控
  </script>
</body>
</html>
```

```javascript
// 2.observer.js
// 数据源

let obj = {
  name: 'jw',
  age: 18
}

// vue 数据劫持 Object.defineProperty
function observer(obj) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive(obj, key, value) {
  // 这里放一个递归
  observer(value);  // 判断 value 是不是一个对象，如果是对象，会继续监控
  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(val) {
      observer(value);  // 如果设置的值是对象，需要在进行这个对象的监控
      value = val
    }
  })
}

// 如果属性不存在，默认后增加的内容，并不会刷新视图
// 数组调用push是无效的，Object.defineProperty 不支持数组的
// 数组不能通过长度修改，也不能通过数组的索引进行更改。

// 改写 push。
let oldPush = Array.prototype.push;
Array.prototype.push = function(value) {
  console.log('xxx')
  oldPush.call(this, value)
}


// vue把数组上的方法都重写了，使得这些方法能更新数组。
let arr = ['push', 'slice', 'shift', 'unshift']
arr.forEach(method => {
  let oldPush = Array.prototype[method];
  Array.prototype[method] = function(value) {
    console.log('数据更新了');
    oldPush.call(this.value)
  }
})

// 这样拦截不到
obj.age.length-- 
```

## 6 Vue中的指令

在vue中，指令(Directives)是带有 v- 前缀的特殊特性，主要功能就是操作 DOM

- v-once 
  ```vue
    <div v-once>{{ state.count }}</div>
  ```
- v-html 
  ```vue
    <div v-html="text"></div>
  ```
- v-text
- v-if/v-else

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- 内部会进行缓存 以后使用的都是缓存里的结果 -->
    <div v-once>{{ msg }}</div>
    <!-- v-html 使用的是 innerHTML XSS 攻击，不能将用户输入的内容展现，内容必须为可信任的 -->
    <div v-html></div>
    <!-- v-if 如果不成立 dom就会消失 -->
    <!-- v-if 控制的是 dom 有没有，v-show控制的是样式 -->
    <!-- v-show 不支持 template -->
  </div>
  <script src="node_modules/vue/dist/vue.js"></script>
  <script>
    let vm = new Vue({
      el: '#app',
      data: {
        msg: 'hello'
      }
    })
  </script>
</body>
</html>
```

### 6.1 v-for

```html
<div id="app">
    <!-- 循环谁，就把它放在谁的身上 -->
    <!-- vue2.5 以上要求， 必须在循环时，使用key属性 -->
    <div v-for="(fruit, index) in fruits" :key="index" :a="index">
    	{{ fruit }} {{ index }}
    </div>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: [
            fruits: ['香蕉', '苹果', '橘子']
        ]
    })
</script>
```

- key可以用来区分元素
- 尽量不要使用 index 作为 key。如果有唯一标识，尽量使用唯一标识。

### 6.2 v-model

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <input type="text" :value="msg" @input="fn">
    <!-- v-model 是 @input + :value 的一个语法糖 -->
    <input type="text" v-model="msg">
    {{msg}}

    <!-- select -->
    <select v-model="selectValue">
      <option value="0" disabled>请选择</option>
      <option v-for="(list, key) in lists" :value="list.id" :key="">{{list.value}}</option>
    </select>
    {{selectValue}}
    <!-- select -->

    <!-- radio 可以根据 v-model 来进行分组 -->
    男 <input type="radio" v-model="radioValue" value="男">
    女 <input type="radio" v-model="radioValue" value="女">
    {{radioValue}}
    <!-- radio -->

    <!-- checkbox 全选/多选 true/false-->
    <input type="checkbox" v-model="checkValue"> {{ checkValue }}
    <!-- 爱好 -->
    游泳：<input type="checkbox" v-model="checkValues" value="游泳">
    自行车：<input type="checkbox" v-model="checkValues" value="自行车"> {{ checkValues }}

    <!-- 修饰符 .number .trim -->
    <input type="text" v-model.number="val"> {{typeof val}}

    <!-- 修饰符 键盘修饰符 鼠标修饰符 -->
    <input type="text" @keyup.enter="fn1">
    <!-- 常用的 .ctrl .esc .enter -->

    <!-- 属性绑定: v-bind 绑定样式 class style 对象 数组，混用，数组里可以放对象-->
    <div class="abc" :class="{b: true}">
      你好
    </div>

    <div class="abc" :class="['a', 'b', c]">
      你好
    </div>

    <div style="color: red;" :style="{background: 'blue'}">
      你好
    </div>

    <div style="color: red;" :style="[{color: 'blue'}, {background: 'red'}]">
        你好
      </div>

  </div>
  <script src="node_modules/vue/dist/vue.js"></script>
  <!-- 双向绑定 单向数据变化 视图更新，双向 视图更新也会影响数据变化 -->
  <script>
    Vue.config.keyCodes = { // 配置一个键盘 code 别名
      'f1': 111
    }
    let vm = new Vue({
      el: '#app',
      data: {
        val: '',
        c: 'd',
        msg: 'hello',
        selectValue: 0,
        radioValue: '男',
        checkValue: true,
        checkValues: [],
        lists: [
          { id: 1, value: '菜单1' }, 
          { id: 2, value: '菜单2' }, 
          { id: 3, value: '菜单3' }
        ]
      },
      methods: {
        fn(e) {
          this.msg = e.target.value
        },
        fn1() {
          alert(1)
        }
      }
    })
  </script>
</body>
</html>
```