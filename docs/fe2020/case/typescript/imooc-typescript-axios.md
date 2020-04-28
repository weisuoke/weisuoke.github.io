# 慕课网-基于TypeScript从零重构axios

[[TOC]]

## 4. ts-axios项目构建

### 4.1 需求分析

需求分析，这次重构需要支持哪些 feature。

#### 4.1.1 Features

- 在浏览器端使用 XMLHttpRequest 对象通讯 
- 支持 Promise API 
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换 
- 支持请求的取消 
- JSON 数据的自动转换
- 客户端防止 XSRF

### 4.2 初始化项目

[Github地址](https://github.com/weisuoke/ts-axios)

### 4.3 脚手架 TypeScript library starter

它是一个开源的 Typescript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 Typescript 项目，我们可以去它的[官网地址](https://github.com/alexjoverm/typescript-library-starter)学习和使用它。

**使用方式**

```shell
git clone git@github.com:alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install
```

先通过 `git clone` 把项目代码拉下来到我们的 ts- axios 目录，然后运行 `npm install` 安装依赖，

并且给项目命名，我们仍然使用 `ts-axios`。

安装好依赖后，我们先来预览一下这个项目的目录结构。

**目录文件介绍**

`TypeScript library starter`生成的目录结构如下：

![image-20200412102834023](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-12-022904.png)

**优秀开源工具集成**

使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具

- 使用 Rollupjs 帮助我们打包。
- 使用 Prettier 和 TSLint 帮助我们格式化代码以及保证代码风格一致性
- 使用 TypeDoc 帮助我们自动生成文档并部署到 Github pages 
- 使用 Jest 帮助我们做单元测试。
- 使用 Commitizen 帮助我们生成规范化的提交注释。
- 使用 Semantic release 帮助我们管理版本和发布
- 使用 husky帮助我们更简单地使用 git hooks
- 使用 Conventional changelogca 帮助我们通过代码提交信息自动生成 change log

**Npm Scripts**

`Typescript library starter` 同样在 `package.json` 中帮我们配置了一些 `npm scripts`，接下来我们先列举一下我们开发中常用的 `npm scripts`，剩余的我们在之后学习中遇到的时候再来介绍

- `npm run lint`：使用 TsLint 工具检查 src 和 test 目录下 Typescript 代码的可读性、可维护性和功能性错误。

- `npm start`：观察者模式运行 rollup 工具打包代码。
- `npm test`：运行 jest 工具跑单元测试。

- `npm run commit`：运行 commitizen 工具提交格式化的 git commit 注释。

- `npm run build`：运行 rollup 编译打包 Typescript 代码，并运行 typedoc 工具生成文档。

### 4.4 关联远程仓库

```shell
# 查看当前文件加的远程信息
git remote -v

# 关联远程分支
git remote add origin <git repo>
```

### 4.5 编写基础代码

开始编写 ts- axios 库，目标是实现简单的发送请求功能，即客户端通过 XMLHttpRequest 对象把请求发送到 server 端，server 端能收到请求并响应即可。

我们实现 axios 最基本的操作，通过传入一个对象发送请求，如下

```js
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

#### 4.5.1 创建文件入口

我们删除 src 目录下的文件，先创建一个 index.ts 文件，作为整个库的入ロ文件，然后我们先定义一个 axios 方法，并把它导出，如下

```ts
function axios(config) {
  
}

export default axios
```

这里 Typescript 编译器会检查到错误，分别是 config 的声明上有隐含的 any 报错，以及代码块为空。代码块为空我们比较好理解，第一个错误的原因是因为我们给 Typescript 编译配置的 strict 设置为 true 导致。

#### 4.5.2 利用 XMLHttpRequest 发送请求

```ts
// src/index.ts
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // TODO
  xhr(config)
}

export default axios
```

```ts
// src/types/index.ts
export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,
  params?: any
}
```

```ts
// src/xhr.ts
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
```

## 5. axios 基础功能实现

### 5.1 需求分析

上章遗留问题，再看这个例子：

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})
```

我们希望最终请求的url是/base/get?a=1&b=2,这样服务端就可以通过请求的url解析到我们传来的参数数据了。实际上就是把 params 对象的 key 和 value 拼接到 url 上

再来看几个更复杂的例子。

**参数值为数组**

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
		foo: ['bar', 'baz']
  }
})
```

最终请求的ur是`/base/get/foo[]=bar&foo[]=baz`。

**参数值为对象**

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
		foo: {
      bar: 'baz'
    }
  }
})
```

最终请求的url是`/base/get?foo=%7B%22bar%22:%22ba2%22%70`,`foo`后面拼接的是`{"bar": "baz"}` encode 后的结果。

**参数值为 Date 类型**

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
		date
  }
})
```

最终请求的url是`/base/get?date=2019-04-01T05:55:39.030Z`,`date`后面拼接的是 date.toISOString()的结果

**特殊字符支持**

对于字符`@` 、`:`、`S`、`,`、` `、`[`、`]`，我们是允许出现在 url 中的，不希望被 encode。

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
		foo: '@:$, '
  }
})
```

最终请求的url是`/base/get?fo0=0:$+`,注意,我们会把空格转换成+。

**空值忽略**

对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的。

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
		foo: 'bar',
    baz: null
  }
})
```

最终请求的ur是`/base/get/foo=bar`。

**丢弃 url 中的哈希标记**

```js
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
		foo: 'bar',
  }
})
```

最终请求的url是`/base/get?foo=bar`.

**保留 url 中已存在的参数**

```js
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
		bar: 'baz',
  }
})
```

最终请求的ur是`/base/get?foo=bar&bar=baz`

### 5.2 buildURL 函数实现

根据我们之前的需求分析，我们要实现一个工具函数，把 `params` 拼接到 url 上。我们希望把项目中的一些工具函数、辅助方法独立管理，于是我们创建一个 helpers 目录，在这个目录下创建url.ts 文件，未来会把处理 url 相关的工具函数都放在该文件中

`helper/url.ts`

```ts
import { isDate, isObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL (url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
```

`helpers/util.ts`：

```typescript
const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}
```

### 5.3 实现 url 参数处理逻辑

我们已经实现了 `buildURL` 函数，接下来我们来利用它实现 `url` 参数的处理逻辑。

在 `index.ts` 文件中添加如下代码：

```ts
function axios (config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}
```

在执行 `xhr` 函数前，我们先执行 `processConfig` 方法，对 `config` 中的数据做处理，除了对 `url` 和 `params` 处理之外，未来还会处理其它属性。

在 `processConfig` 函数内部，我们通过执行 `transformUrl` 函数修改了 `config.url`，该函数内部调用了 `buildURL`。

那么至此，我们对 `url` 参数处理逻辑就实现完了，接下来我们就开始编写 demo 了。

