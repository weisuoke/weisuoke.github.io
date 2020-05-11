# 手撸一个自己的前端脚手架

[[TOC]]

只要提到脚手架你就会想到，vue-cli、create-react-app、dva-cli... 他们的特点不用多说就是**专一**！但是在公司中你会发现有以下一系列的问题！

- 业务种类多
- 多次造轮子，**项目升级**问题
- 公司代码**规范**，无法统一

在自己开发cli前，那肯定要看些优秀的cli是如何实现的。



## 1. 必备模块

- commander: 参数解析 --help其实就借助了他
- inquirer: 交互式命令行工具，有他就可以实现命令行的选择功能
- download-git-repo: 在git中下载模板
- chalk: 粉笔帮我们在控制台中画出各种各样的颜色
- metalsmith: 读取所有文件，实现模板渲染
- consolidate：统一模板引擎



要实现以下功能：



根据模板初始化项目 `zhu-cli create project-name`

### 1.1 开始

初始化项目

```
npm init -y
```

新建一个bin目录，bin目录里面都放着一个可执行脚本

在bin目录里面新建一个www文件

`#! /usr/bin/env node`用系统当前环境的 node 来执行

```shell
#! /usr/bin/env node

// 是一个可执行文件
console.log('hello!');
```

在package.json中添加

```json
{
  // ...
  "bin": {
    "wu-cli": "./bin/www"
  }
}
```

使用`npm link`来链接到当前环境
![-w929](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803769490742.jpg)

在iTerms里面输入`wu-cli`

![-w649](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803771026082.jpg)

### 1.2 

```
#! /usr/bin/env node

// 是一个可执行文件
require("../src/main.js")
```

```js
// src/main.js
console.log('hello!');
```

### 1.3 使用 ESLint 来规范代码

```
npm install eslint --save-dev
```

初始化eslint

```
npx eslint --init
```

![-w724](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803778696360.jpg)

### 1.4 解析用户的参数

 ```
npm install commander --save
 ```

```js
// src/main.js
// 1. 要解析用户的参数
const program = require("commander");

// 当前进程中的参数
console.log(process.argv);
```

![-w695](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/02/01/15805510168364.jpg)

要提取`--help`, 比较麻烦。commander可以帮助我解析用户传过来的参数

```js
// src/main.js
// 1. 要解析用户的参数
const program = require("commander");

// 解析用户传递过来的参数
program.parse(process.argv)
```

使用vue-cli的时候。输入`vue create project` `vue ui ...` 都会去做相应的事情

#### 1.4.1 获取版本号

```js
// src/main.js
// 1. 要解析用户的参数
const program = require("commander");
const { version } = require("./constants");

// 解析用户传递过来的参数
program.version(version).parse(process.argv);

```

```js
// src/constants.js

// 存放用户的所需要的常量
const { version } = require("../package.json");

module.exports = {
  version
}
```

#### 1.4.2 create命令

```js
// 1. 要解析用户的参数
const program = require("commander");
const { version } = require("./constants");

program
  .command("create") // 配置命令的名字
  .alias("c") // 配置命令的别名
  .description("create a project") // 配置命令的描述
  .action(() => {
    console.log("create");
  });

// 解析用户传递过来的参数
program.version(version).parse(process.argv);
```

![-w710](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/02/01/15805521695828.jpg)

### 1.5 创建命令映射对象

```js
// 1. 要解析用户的参数
const program = require("commander");
const { version } = require("./constants");

const mapActions = {
  create: {
    alias: "c",
    description: "create a project",
    examples: ["zhu-cli create <project-name>"]
  },
  config: {
    alias: "conf",
    description: "config project variable",
    examples: ["zhu-cli config set <k> <v>", "zhu-cli config get <k>"]
  },
  "*": {
    alias: "",
    description: "command not found",
    examples: []
  }
};

Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 配置命令的别名
    .description(mapActions[action].description) // 配置命令的描述
    .action(() => {
      if (action === "*") { // 访问不到对应的命令
        console.log(mapActions[action].description);
      } else {
        console.log(action);
      }
    });
});

// 解析用户传递过来的参数
program.version(version).parse(process.argv);
```

#### 1.5.1 监听用户的 help 事件

```js
// src/main.js

// ...
// 监听用户的help事件
program.on("--help", () => {
  console.log("\nExamples:");
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(`${example}`);
    });
  });
});

// ...
```

#### 1.5.2 main.js中分配任务

```js
// src/main.js

Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 配置命令的别名
    .description(mapActions[action].description) // 配置命令的描述
    .action(() => {
      if (action === "*") {
        // 访问不到对应的命令
        console.log(mapActions[action].description);
      } else {
        // 在这里分配任务
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});
```

新建 create.js文件，处理 create 的逻辑

```js
// src/create.js

// create 的所有逻辑
module.exports = projectName => {
  console.log("create", projectName);
};

```

新建 config.js 文件，处理 config 的逻辑

```js
// src/config.js

// config 的所有逻辑
module.exports = () => {
  console.log("config");
};
```

### 1.6 create 的核心逻辑

```js
// src/create.js

const axios = require("axios");
const ora = require("ora");
const Inquirer = require("inquirer");
// create 的所有逻辑
// create 功能是创建项目
// 拉取你自己的所有项目列出来，让用户选 安装哪个项目
// 选完后 再显示所有的版本号
// https://api.github.com/orgs/zhu-cli/repos 获取组织下的仓库

// 1) 获取项目列表
const fetchRepoList = async () => {
  const { data } = await axios.get("https://api.github.com/orgs/zhu-cli/repos");
  return data;
};

// 可能还需要用户配置一些数据，来结合渲染我的项目
module.exports = async projectName => {
  // 1. 获取项目的所有模板 (所有的)
  const spinner = ora("fetching template ...");
  spinner.start();
  let repos = await fetchRepoList();
  spinner.succeed();
  repos = repos.map(item => item.name);
  console.log(repos);

  // 在获取之前 显示loading 关闭loading
  // 选择模板 inquirer
  const { repo } = await Inquirer.prompt({
    name: "repo", // 获取选择后的结果
    type: "list",
    message: "please choise a template to create project",
    choices: repos
  });
  console.log(repo);
  
  // 通过当前选择的项目 拉取对应的版本
};
```

## A. 扩展阅读

- [wu-cli](https://github.com/weisuoke/wu-cli)
- [手撸一个自己的前端脚手架](https://segmentfault.com/a/1190000020256052)