const path = require('path')
module.exports = {
  title: '邬晓’s blog',
  description: 'Redesign Everything',
  themeConfig: {
    search: false,
    nav: [
      { text: '主页', link: '/' },
      { text: '前端精进手册', link: '/fe/' },
      { text: '算法学习', link: '/algorithm/' },
      { text: '关于我', link: '/about/' },
      { text: '邬晓.中国', link: 'https://邬晓.中国' }
    ],
    lastUpdated: '更新时间',
    sidebar: [
      {
        title: '前端精进手册',   // 必要的
        path: '/fe/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {
            title: '手写代码系列', 
            path: '/fe/js-implement/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/js-implement/call.md',
              '/fe/js-implement/bind.md',
              '/fe/js-implement/debounce.md',
              '/fe/js-implement/throttle.md',
              '/fe/js-implement/instanceof.md',
              '/fe/js-implement/reduce.md',
              '/fe/js-implement/new.md',
            ]
          },
          {
            title: '原理系列', 
            path: '/fe/js-theory/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
            ]
          },
          {
            title: 'Webpack', 
            path: '/fe/webpack/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/webpack/Webpack基础',
              '/fe/webpack/手写Webpack'
            ]
          },
          {
            title: 'TypeScript', 
            path: '/fe/typescript/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/typescript/docs'
            ]
          },
          {
            title: 'React', 
            path: '/fe/react/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/react/React基础',
              '/fe/react/Redux',
              '/fe/react/Mobx',
              '/fe/react/Immutable',
              '/fe/react/dom_diff'
            ]
          },
          {
            title: 'Vue', 
            path: '/fe/Vue/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/Vue/Vue-SSR'
            ]
          },
          {
            title: 'PWA', 
            path: '/fe/PWA/', 
            collapsable: true,
            sidebarDepth: 2,  
            children: [
              '/fe/PWA/pwa'
            ]
          },
        ]
      }
    ]
  }
}