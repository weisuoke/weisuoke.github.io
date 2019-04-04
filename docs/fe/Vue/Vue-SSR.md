# Vue服务端渲染 Demo

## 0 Before

先使用vue-cli创建一个空的项目

```shell
vue create vue-ssr
```

### 0.1 预渲染

> 预渲染原理
>
> 先在本地跑一个无头浏览器 爬虫的原理

#### 0.1.1 Vue预渲染插件

```shell
npm install prerender-spa-plugin
```

> 渲染的话，要是纯静态页，动态的话就没有意义了

```javascript
// vue.config.js
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// 会下载一个开发版的chrome
module.exports = {
  plugins: [
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about']
    })
  ]
}
```

### 0.2 什么是SSR

放在服务器进行就是服务器渲染，放在浏览器就是浏览器渲染

- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
- SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。
- SSR占用更多的CPU和内存资源
- 一些常用的浏览器API可能无法正常使用
- 在vue中只支持beforeCreate和created两个生命周期



## 1 开始

```she
mkdir vue-ssr-project

npm init -y

npm install express vue vue-server-renderer --save
```

编写server代码

```javascript
// server.js

let express = require('express')
let app = express();

let Vue = require('vue');
// Vue 提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer');
// 创建vue实例
let vm = new Vue({
  template: '<div>Hello</div>'
});
// 创建渲染函数
let render = VueServerRenderer.createRenderer();

app.get('/', (req, res) => {
  render.renderToString(vm, function(err, html) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
  })
})

app.listen(3000);
```

上面这样做比较麻烦，直接把模板读出来

```javascript
// server.js
let fs = require('fs')
let express = require('express')
let app = express();

let Vue = require('vue');
// Vue 提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer');
// 创建vue实例
let vm = new Vue({
  template: '<div>Hello Vue 1</div>'
});
let template = fs.readFileSync('./index.html', 'utf8')
console.log(template)
// 创建渲染函数
let render = VueServerRenderer.createRenderer({
  template
});

app.get('/', (req, res) => {
  render.renderToString(vm, function(err, html) {
    res.send(html)
  })
})

app.listen(3000);
```

```html
<!-- html -->
<body>
	<!--vue-ssr-outlet-->
</body>
```

### 1.2 建vue项目目录

```shell
mkdir src src/components
touch src/App.vue src/main.js
```
### 1.3 编写webpack文件

```shell
# 安装包
npm install webpack webpack-cli babel-loader @babel/preset-env vue-template-compiler vue-loader vue-style-loader css-loader --save-dev
```

- webpack webpack-cli webpack-dev-server webpack需要的
- babel-loader @babel/preset-env 处理es6语法的
- vue vue-template-compiler vue-loader 处理编译vue的
- vue-style-loader css-loader 处理样式
- html-webpack-plugin 处理html
- webpack-merge 合并webpack配置

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 入口
  entry: path.resolve(__dirname, 'src/app.js'),
  // 出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 对模块的处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

### 1.4 拆分入口 

新建如下文件

- src/client-entry.js  客户端入口
- src/server-entry.js  服务端入口
- config/webpack.base.js  webpack公共配置
- config/webpack.client.js  webpack客户端打包配置
- config/webpack.server.js  webpack服务端打包配置
- public/index.html  客户端模板
- public/index.ssr.html  服务端模板

```javascript
// src/client-entry.js
import createApp from './app'

let { app } = createApp();

app.$mount('#app')
```

```javascript
// src/server-entry.js
import createApp from './app'

// 服务端会调用此函数 产生一个新的app 实例
export default () => {
  let { app } = createApp();
  return app;
}
```

```javascript
// config/webpack.base.js 
let path = require('path');
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 入口
  entry: path.resolve(__dirname, 'src/app.js'),
  // 出口
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  // 对模块的处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

```javascript
// config/webpack.client.js

let path = require('path')
let merge = require('webpack-merge')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let base = require('./webpack.base')

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '../src/client-entry.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
})
```

```javascript
// config/webpack.server.js

let path = require('path')
let merge = require('webpack-merge')
let base = require('./webpack.base')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  target: 'node', // 打包出的结果给node用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2'    // module.exports = server.entry.js
  },
  plugins: [
    // 把 public 目录下index.ssr.htm的内容拷贝到 dist 目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server']
    })
  ]
})
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

```html
<!-- public/index.ssr.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!--vue-ssr-outlet-->
</body>
</html>
```

### 1.5 修改server.js

使用webpack打包。client-entry.js和server-entry.js

```json
// package.json

{
  // ...
  "scripts": {
    "client:dev": "npx webpack-dev-server --config config/webpack.client.js",
    "client:build": "npx webpack --config config/webpack.client.js",
    "server:build": "npx webpack --config config/webpack.server.js"
  }
  // ...
}
```

```javascript
// server.js -> node-server.js

let fs = require('fs')
let path = require('path')
let express = require('express')
let app = express();
let Vue = require('vue');
let VueServerRender =  require('vue-server-renderer')
let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8')
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8')
let render = VueServerRender.createBundleRenderer(serverBundle, {
  template
})

app.get('/', (req, res) => {
  // 把渲染成功的字符串扔给客户端，只是返回一个字符串，并没有vue实际功能
  render.renderToString((err, html) => {
    res.send(html)
  })
})

// 顺序要保证
app.use(express.static(path.resolve(__dirname, 'dist')))

app.listen(4000);
```

#### 1.5.1 客户端激活

```vue
<!-- src/App.vue -->
<template>
	<!-- 这里新增一个id -->
	<div id="app">
    <Bar></Bar>
    <Foo></Foo>
  </div>
</template>
```

## 2. 路由渲染

```javascript
// src/router.js

// 配置 vue 路由
import Vue from 'vue';
import VueRouter from 'vue-router'

import Bar  from './components/Bar.vue'

Vue.use(VueRouter)

export default () => {
  let router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/' , component: Bar },
      { path: '/foo', component: () => import('./components/Foo.vue') }
    ]
  })
  return router;
}
```

使用动态导入的语法` { path: '/foo', component: () => import('./components/Foo.vue') }`，需要添加babel插件，`@babel/plugin-syntax-dynamic-import`

改写 src/server-entry.js 文件

```javascript
import createApp from './app'

// 服务端会调用此函数 产生一个新的app 实例
export default (context) => {
  return new Promise((resolve, reject) => {
    let { app, router } = createApp();

    router.push(context.url); // 跳转到路由
    // 如果服务端 启动时 直接访问 /foo 返回的页面永远都是 index.html。需要通过路由跳转到指定路径
    
    // 为了防止路由中的异步逻辑，所以采用 Promise 的形式，等待路由加载后返回 vue 实例，服务端才可以渲染出完整的页面
    router.onReady(() => {
      resolve(app);
    })
  })
}
```

```javascript
// node-server.js

let fs = require('fs')
let path = require('path')
let express = require('express')
let app = express();
let Vue = require('vue');
let VueServerRender =  require('vue-server-renderer')
let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8')
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8')
let render = VueServerRender.createBundleRenderer(serverBundle, {
  template
})

app.get('/', (req, res) => {
  // 把渲染成功的字符串扔给客户端，只是返回一个字符串，并没有vue实际功能
  let context = {url: req.url};
  render.renderToString(context, (err, html) => {
    res.send(html)
  })
})

// 顺序要保证
app.use(express.static(path.resolve(__dirname, 'dist')))

// 如果访问的路径不存在 默认渲染 index.ssr.html 并且把路由定向到当前请求的路径
app.get('*', (req, res) => {
  // 把渲染成功的字符串扔给客户端，只是返回一个字符串，并没有vue实际功能
  let context = {url: req.url};
  render.renderToString(context, (err, html) => {
    res.send(html)
  })
})

app.listen(4000);
```

```vue
<!-- App.vue -->

<template>
  <div id="app">
    头部 --- 头部
    <router-link to="/">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view> 
  </div>
</template>

<script>
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'

export default {
  components: {
    Bar, Foo
  }
}
</script>
```

## 3. 使用Vuex

### 3.1 准备工作

```shell
npm install vuex --save
```

### 3.2 修改app.js

```javascript
import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

// 为了兼容服务器 要把这个方法改造成函数

 export default () => {  // 创建实例函数
  let router = createRouter();
  // 新增
  let store = createStore();
  let app  = new Vue({
    router,
    store,
    render: (h) => h(App)
  })
  return { app, router, store }
}
```

```javascript
// src/server-entry.js
import createApp from './app'

// 服务端会调用此函数 产生一个新的app 实例
export default (context) => {
  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp();

    router.push(context.url); // 跳转到路由
    // 如果服务端 启动时 直接访问 /foo 返回的页面永远都是 index.html。需要通过路由跳转到指定路径
    
    // 为了防止路由中的异步逻辑，所以采用 Promise 的形式，等待路由加载后返回 vue 实例，服务端才可以渲染出完整的页面

    // 需要把当前页面中匹配到的组件 找到他的asyncData方法让他执行

    router.onReady(() => {
			// 新增
      // 获取当前路径匹配到的组件 看一下这个组件中 有没有 asyncData 方法
      let matchesComponents = router.getMatchedComponents();

      Promise.all(matchesComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({store});
        }
      })).then(() => {
        // 把 vuex 中的装填 挂载在 上下文中的 state 上
        context.state = store.state
        // 会自动在window上挂载一个属性__INITIAL_STATE__
        resolve(app);
      })
    })
  })
}
```

```javascript
// src/store.js
import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  let store = new Vuex.Store({
    state: {
      username: 'wx'
    },
    mutations: {
      set_username(state) {
        state.username = 'weisuoke'
      }
    },
    actions: {
      set_username({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('set_username')
            resolve();
          }, 1000)
        }) 
      }
    }
  })
  // 浏览器替换 state。解决拿回数据不显示的问题
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}
```

```vue
<!-- src/Bar.vue -->
<template>
  <div @click="show" class="red">
    bar component
    {{$store.state.username}}
  </div>
</template>

<script>
export default {
  // 写的代码都是异步的， 全部采用 Promise

  // 规定只有页面级组件才能使用
  asyncData({ store }) { // 异步数据，这个方法只在服务端执行，客户端运行是不会执行的
    return store.dispatch('set_username')
  },
	
  // 这里解决页面中的跳转数据不更新的问题
  mounted() {
    this.$store.dispatch('set_username')
  },

  methods: {
    show() {
      alert(1);
    }
  }
}
</script>

<style scoped>
  .red {
    background: red;
  }
</style>

```

## 4. Nuxt著名的插件

> vue-meta

## 5. 打包优化

> vue-server-renderer/server-plugin
>
> vue-server-renderer/client-plugin
>
> webpack-node-externals 不打包公共模块

### 6. EventBus

原理：

```javascript
Vue.prototype.$EventBus = new Vue()
```

*参考阅读*

- [vue篇之事件总线（EventBus）](<https://juejin.im/post/5bb355dae51d450ea4020b42>)

## Q & A

- 预渲染

