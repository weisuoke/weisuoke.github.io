const path = require("path");
module.exports = {
  title: "邬晓’s blog",
  description: "Redesign Everything",
  '@vuepress/back-to-top': true,
  themeConfig: {
    search: false,
    nav: [
      { text: "主页", link: "/" },
      {
        text: "前端精进手册",
        link: "/fe/",
        items: [
          { text: "React", link: "/fe/react/" },
          { text: "Vue", link: "/fe/vue/" },
          { text: "Webpack", link: "/fe/webpack/" }
        ]
      },
      {
        text: "算法学习",
        link: "/algorithm/",
        items: [
          { text: "数据结构", link: "/algorithm/ds/" },
          { text: "算法", link: "/algorithm/ag/" }
        ]
      },
      {
        text: "玩转Github",
        link: "/github/",
        items: [{ text: "我的github", link: "/github/my-github" }]
      },
      { text: "效率", link: "/effective/" },
      { text: "读书笔记", link: "/reading/" },
      { text: "WIKI", link: "/wiki/" },
      { text: "FLAG", link: "/flag/" },
      { text: "ABOUT ME", link: "/about/" },
      { text: "WUXIAO.IO", link: "https://wuxiao.io" },
      { text: "WUXIAO.CODES", link: "https://react.wuxiao.codes" }
    ],
    lastUpdated: "更新时间",
    sidebar: [
      {
        title: "前端精进手册", // 必要的
        path: "/fe/", // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          {
            title: "CSS",
            path: "/fe/css/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/fe/css/xFC", "/fe/css/center-div"]
          },
          // ES6
          {
            title: "ES6+",
            path: "/fe/es6/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/es6/var-let-const",
              "/fe/es6/arrow-function",
              "/fe/es6/set-map",
              "/fe/es6/generator",
              "/fe/es6/async",
              "/fe/es6/decorate",
              "/fe/es6/proxy"
            ]
          },
          // 手写代码
          {
            title: "手写代码系列",
            path: "/fe/js-implement/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/js-implement/call.md",
              "/fe/js-implement/bind.md",
              "/fe/js-implement/debounce.md",
              "/fe/js-implement/throttle.md",
              "/fe/js-implement/instanceof.md",
              "/fe/js-implement/reduce.md",
              "/fe/js-implement/new.md",
              "/fe/js-implement/aop.md",
              "/fe/js-implement/curry.md",
              "/fe/js-implement/JSON.stringify.md",
              "/fe/js-implement/JSON.parse.md",
              "/fe/js-implement/deepClone.md",
              "/fe/js-implement/Symbol.md",
              "/fe/js-implement/flatten.md",
              "/fe/js-implement/unique.md",
              "/fe/js-implement/Promise",
              "/fe/js-implement/jsonp",
              "/fe/js-implement/my-webpack"
            ]
          },
          // 原理系列
          {
            title: "原理系列",
            path: "/fe/js-theory/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/js-theory/code-fragment-analysis",
              "/fe/js-theory/type-of-js",
              "/fe/js-theory/js-scope",
              "/fe/js-theory/memory",
              "/fe/js-theory/asynchronous",
              "/fe/js-theory/event",
              "/fe/js-theory/event-loop",
              "/fe/js-theory/is-virtual-dom-fast",
              "/fe/js-theory/executor-stack",
              "/fe/js-theory/how-to-implement-a-router",
              "/fe/js-theory/equal-different",
              "/fe/js-theory/service-worker-life-cycle",
              "/fe/js-theory/browser-cache",
              "/fe/js-theory/browser-rendering",
              "/fe/js-theory/web-components",
              "/fe/js-theory/webassembly",
              "/fe/js-theory/npm",
              "/fe/js-theory/websocket",
              "/fe/js-theory/Immutable"
            ]
          },
          {
            title: "Webpack",
            path: "/fe/webpack/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/fe/webpack/Webpack基础", "/fe/webpack/手写Webpack"]
          },
          {
            title: "TypeScript",
            path: "/fe/typescript/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/fe/typescript/docs"]
          },
          // React
          {
            title: "React",
            path: "/fe/react/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/react/01.React必知必会",
              "/fe/react/t01.React-TypeScript"
            ]
          },
          // Vue
          {
            title: "Vue",
            path: "/fe/Vue/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/Vue/01.vue-need-to-know",
              "/fe/Vue/Vue-Basic",
              "/fe/Vue/Vue-Components",
              "/fe/Vue/Vue-filter-directive",
              "/fe/Vue/Vue-SSR"
            ]
          },
          {
            title: "PWA",
            path: "/fe/PWA/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/fe/PWA/pwa"]
          },
          // 微信小程序
          {
            title: "微信小程序",
            path: "/fe/weapp/",
            collapsable: true,
            sidebarDepth: 2,
            children: []
          },
          // 网络
          {
            title: "网络相关",
            path: "/fe/http/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/http/get-post",
              "/fe/http/http",
              "/fe/http/http2",
              "/fe/http/tcp-connection",
              "/fe/http/from-url-to-page"
            ]
          },
          // 性能优化
          {
            title: "性能",
            path: "/fe/optimize/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe/optimize/optimize-need-to-know",
              "/fe/optimize/monitor"
            ]
          },
          // 设计模式
          {
            title: "设计模式",
            path: "/fe/Gof/",
            collapsable: true,
            sidebarDepth: 2
          },
          // 前端安全
          {
            title: "前端安全",
            path: "/fe/security/",
            collapsable: true,
            sidebarDepth: 2
          }
        ]
      },
      {
        title: "前端精进2020",
        path: "/fe2020/",
        collapsable: true,
        sidebarDepth: 1,
        children: [
          {
            title: "Vue",
            path: "/fe2020/Vue/",
            collapsable: true,
          },
          {
            title: "React",
            path: "/fe2020/React/",
            collapsable: true,
          },
          {
            title: "设计模式",
            path: "/fe2020/Gof/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe2020/Gof/zhufeng-GoF.md",
              "/fe2020/Gof/juejin-GoF.md"
            ]
          },
          {
            title: "数据结构与算法",
            path: "/fe2020/algorithm/",
            collapsable: true,
            sidebarDepth: 2,
          },
          {
            title: "微前端",
            path: "/fe2020/microFE/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/fe2020/microFE/book-microFE.md"
            ]
          }
        ]
      },
      {
        title: "读书笔记",
        path: "/reading/",
        collapsable: true,
        sidebarDepth: 1,
        children: [
          {
            title: "思维",
            path: "/reading/thinking/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/reading/thinking/anshijian"]
          }
        ]
      },
      {
        title: "算法学习",
        path: "/algorithm/",
        collapsable: true,
        sidebarDepth: 1,
        children: [
          // 数据结构
          {
            title: "数据结构",
            path: "/algorithm/ds/",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              "/algorithm/ds/Stack",
              "/algorithm/ds/LinkedList",
              "/algorithm/ds/Tree",
              "/algorithm/ds/Heap"
            ]
          },
          // 算法
          {
            title: "算法",
            path: "/algorithm/ag/",
            collapsable: true,
            sidebarDepth: 2,
            children: ["/algorithm/ag/sort"]
          }
        ]
      }
    ]
  },
  plugins: ["vuepress-plugin-table-of-contents", "@vuepress/back-to-top"]
};
