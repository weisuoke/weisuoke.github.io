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

