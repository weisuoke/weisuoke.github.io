# 搭建一个React Component Library

[Part1 --- The library itself and local development setup](https://medium.com/better-programming/building-a-react-components-library-f5a390d5973d)

[Part2 --- Testing the components](https://medium.com/better-programming/building-a-react-components-library-6a05c2bca538)

[[TOC]]

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