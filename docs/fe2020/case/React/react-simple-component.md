# 搭建一个React Component Library

[[TOC]]

## 0. 参考

[Part1 --- The library itself and local development setup](https://medium.com/better-programming/building-a-react-components-library-f5a390d5973d)

[Part2 --- Testing the components](https://medium.com/better-programming/building-a-react-components-library-6a05c2bca538)

[Part3 --- Bunding and publishing the library to the NPM](https://medium.com/better-programming/lets-build-react-components-library-part-3-b2e7aec478a2)

[Part4 --- Auto deployment of the documentation to GitHub Pages](https://medium.com/@tomasz.fiechowski/building-a-react-components-library-2e116df187b5)

- [完成Github](https://github.com/weisuoke/react-sample-components-library)
- [完成Github Pages](http://react-sample-components-library.wuxiao.io)

## 1. 技术栈

- Emotion
  - CSS-in-JS library
  - [Emotion Doc](https://emotion.sh/docs/introduction)
- Styleguidist
  - 相关StoryBook
- Jest/Testing Library
  - [Testing Library](https://testing-library.com/)
- Rollup/Babel
- Travis CI



## 2. 开始

```
mkdir react-sample-components-library
cd react-sample-components-library
npm init -y
```

### 2.1 安装依赖

```
npm install --save-dev react react-dom @emotion/core @emotion/styled
```

使用 Styleguidist 来动态开发组件

```
npm install --save-dev react-styleguidist webpack
```

安装Babel

```
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
```

新建Babel配置文件`.babelrc`

```json
// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

创建`styleguide.config.js`来设置Styleguidist内置`webpack`实例，这样就可以使用我们自己的 Babel 配置了。

```js
// styleguide.config.js
module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
};
```

给`package.json`增加一个script

```
"start": "styleguidist server"
```

运行

```
npm start
```



### 2.2 创建组件

```
+-- src
|		+-- components
|				+-- Button.js
```

先创建一个简单的Button组件

```jsx
// src/components/Button.js
import React from "react";

export default function Button({ text }) {
  return <button>{text}</button>;
}
```

启动组件

```
npm start
```

![-w1649](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/28/15802243919519.jpg)

现在还没有任何东西。Styleguidist让组件预览和描述一个组件变得更加方便。

在`Button.js`文件的同层级下增加一个新的文件`Button.md`

```markdown
A very simple button

​```jsx
import Button from './Button';

<Button text="We Salute You!"/>
```

![-w1651](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/28/15802248292865.jpg)

### 2.3 添加样式

```
npm install --save-dev babel-plugin-emotion
```

`.babelrc`中新增

```json
{
  //...
  "plugins": ["emotion"]
}
```

```jsx
// src/components/Button.js
import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.button`
  text-transform: uppercase;
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: 4px;
  background: #5cdb95;
  color: #05385b;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
`;

export default function Button({ text }) {
  return <Wrapper>{text}</Wrapper>;
}
```

![-w1651](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/29/15802276946899.jpg)

### 2.4 添加全局样式

```js
// src/config/styles.js

import { css } from "@emotion/core";

export const font = css`
  text-transform: uppercase;
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: 4px;
`;

export const shape = css`
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
`;

export const primaryColors = css`
  background: #5cdb95;
  color: #05385b;
`;
```

在`Button.js`中使用全局样式

```js
// src/components/Button.js

import React from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "../config/styles";

const Wrapper = styled.button`
  ${font}
  ${primaryColors}
  ${shape}
`;

export default function Button({ text }) {
  return <Wrapper>{text}</Wrapper>;
}
```

#### 2.4.1 将全局样式中的相对引用变成绝对引用

```
npm install babel-plugin-module-resolver --save-dev
```

修改`.babelrc`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [["module-resolver", { "root": ["./src"] }]]
}
```

修改src/components/Button.js

```jsx
// src/components/Button.js

import React from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "config/styles";

const Wrapper = styled.button`
  ${font}; ${primaryColors}; ${shape};
`;

export default function Button({ text }) {
  return <Wrapper>{text}</Wrapper>;
}
```

## 3. 测试组件

我们使用[Jest](https://jestjs.io/)和[React Testing Library](https://github.com/testing-library/react-testing-library)来测试React组件

```
npm install --save-dev @testing-library/react jest
```

在`package.json`添加一个新的命令

```json
{
  //...
  "scripts": {
    // ...
    "test": "jest"
  }
}
```

### 3.1 基本测试

```js
// src/components/Button.test.js
import { render, getByText } from "@testing-library/react";
import React from "react";
import Button from "components/Button";

describe("Button", () => {
  test("should display text", () => {
    const { container } = render(<Button text="We Salute You!" />);

    getByText(container, "We Salute You!");
  });
});
```

![-w284](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/29/15802642643036.jpg)

### 3.2 组件交互

```js
// src/component/Button.test.js
import { render, getByText } from "@testing-library/react";
import React from "react";
import Button from "components/Button";

describe("Button", () => {
  test("should display text", () => {
    const { container } = render(<Button text="We Salute You!" />);

    getByText(container, "We Salute You!");
  });

  test("should handle click events", () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <Button text="Click me, maybe?" onClick={onClickMock} />
    );
    const component = container.firstChild;

    fireEvent.click(component);
    expect(onClickMock).toBeCalled();
  });
});
```

```jsx
// src/component/Button.js

// ...
export default function Button({ text, onClick }) {
  return <Wrapper onClick={onClick}>{text}</Wrapper>;
}
```

执行`npm run test`后

![-w343](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/29/15802712725493.jpg)

### 3.3 测试样式

使用`jest-emotion`

```
npm install --save-dev jest-emotion
```

```js
// src/setupTests.js
import { matchers } from "jest-emotion";
expect.extend(matchers);
```

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"]
};
```

配置好Jest以后，新增一个button test

```js
test("should make text uppercase", () => {
  const { container } = render(<Button text="We Salute You!" />);
  const component = getByText(container, "We Salute You!");

  expect(component).toHaveStyleRule("text-transform", "uppercase");
});
```

![-w309](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/29/15802878956341.jpg)

## 4. 打包并发布组件

### 4.1 Library入口

`package.json`中新增

```json
// package.json
{
  // ...
  "main": "lib/index.js"
  // ...
}
```

新建`src/index.js`

```js
export { default as Button } from "components/Button"
```

### 4.2 打包 Library

这里使用 Rollup 来进行打包

安装依赖

```
npm install --save-dev rollup-plugin-commonjs rollup-plugin-babel
```

创建 Rollup 配置文件`rollup.config.js`

```js
// rollup.config.js

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

import packageJSON from "./package.json";
const input = "./src/index.js";

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      commonjs()
    ]
  }
];
```

配置文件中有两个字段`input`和`output`，这里告诉Rollup打包的入口`./src/index.js`和出口`lib/index.js`。打包出来的文件是 CommonJS 格式。打包脚本是 `"build": "rollup -c"`

### 4.3 Resolving Modules

处理第三方 Modules

```
npm install --save-dev rollup-plugin-node-resolve
```

添加至 rollup 配置文件

```js
// rollup.config.js

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import packageJSON from "./package.json";
const input = "./src/index.js";

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      resolve(),
      commonjs()
    ]
  }
];
```

### 4.4 处理 Peer 依赖

在第一部分，我们添加了 React 和 Emotion 作为 peer dependencies. 这些依赖不会打包进入 code



使用`rollup-plugin-peer-deps-external`来处理

```
npm install rollup-plugin-peer-deps-external --save-dev
```

```js
// rollup.config.js
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";

import packageJSON from "./package.json";
const input = "./src/index.js";

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  }
];
```

### 4.5 压缩

使用`rollup-plugin-uglify`来压缩

```
npm install --save-dev rollup-plugin-uglify
```

修改`rollup.config.js`打包出一个一个普通的版本和一个压缩的版本

```js
// rollup.config.js
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { uglify } from "rollup-plugin-uglify";

import packageJSON from "./package.json";
const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
```

### 4.6 其他类型：UMD, ES

- browser: for the UMD build
- module: for the ES bundle format

在package.json中添加

```json
{
  // ...
  "main": "lib/index.js",
  "browser": "lib/index.umd.js",
  "module": "lib/index.es.js",
  // ...
}
```

**添加UMD打包内容**

```js
// rollup.config.js

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import packageJSON from "./package.json";

const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default [
  // CommonJS ...
  // UMD
  {
    input,
    output: {
      file: packageJSON.browser,
      format: "umd",
      name: "reactSampleComponentsLibrary",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      }
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: "umd",
      name: "reactSampleComponentsLibrary",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      }
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  },
  // ES ...
];
```

**ES Module**

```js
// rollup.config.js
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import packageJSON from "./package.json";

const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default [
  // CommonJS ...
  // UMD ...
  // ES
  {
    input,
    output: {
      file: packageJSON.module,
      format: "es",
      exports: "named"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: "es",
      exports: "named"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  }
];
```

### 4.7 发布前准备

向 `package.json` 添加下列 "script"

```json
{
	// ...
  "script": {
    "prepublishOnly": "rm -rf lib && npm run build",
    "postbuild": "npm pack && tar -xvzf *.tgz && rm -rf package *.tgz"
  }
  // ...
}
```

使用`npm login`进行登录

如果没有注册npm账号，前往[npm](www.npmjs.com)进行注册

### 4.8 发布package到NPM

使用`npm publish`

### 4.9 优化打包

![-w1156](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803520853612.jpg)

使用`npm publish`打包后的文件，有很多文件是不需要打包的。

在`package.json`添加files的字段来指定打包的文件

```json
{
  // ...
  files: [
    "/lib"
  ]
  // ...
}
```



## 5. 自动发布文档到Github Pages

### 5.1 生成文档

Styleguidist可以让我们实时开发React组件，同时能够生成文档

在`package.json`添加下述命令行

```json
{
  // ...
	"scripts": {
    "docs:build": "styleguidist build"
  }
}
```

更改`styleguide.config.js`配置文件

```js
module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  title: "React Sample Components Library",
  styleguideDir: "dist-docs"
};
```

执行`npm run docs:build`后，打开dist-docs/index.html
![-w1515](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803547078013.jpg)

这里的`./Button`需要替换

### 5.2 替换import 依赖

修改`styleguide.config.js`

```js
const path = require("path");

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  title: "React Sample Components Library",
  styleguideDir: "dist-docs",
  moduleAliases: {
    "react-sample-components-library": path.resolve(__dirname, "src")
  }
};
```

修改Button.md文件中的内容

```markdown
A very simple button.

​```jsx
import { Button } from "react-sample-components-library";

<Button text="I MUST BE DREAMING" />
```

![-w1651](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803565753466.jpg)

### 5.3 设置Github

[Github](https://github.com/settings/tokens/new)

![-w748](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803567782123.jpg)

生成一个token

### 5.4 设置TravisCI

[TravisCI](https://travis-ci.org/account/repositories)

![-w685](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803570370214.jpg)

配置Github Token

![-w1372](http://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020/01/30/15803573551152.jpg)

### 5.5 TravisCI 配置文件

新建`.travis.yml`

```yaml
language: node_js
node_js: stable

cache:
  directories:
    - node_modules

before_deploy:
  - "npm run docs:build"

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: dist-docs
  on:
    branch: master
```

### 5.6 部署文档

Commit `.travis.yml`。

