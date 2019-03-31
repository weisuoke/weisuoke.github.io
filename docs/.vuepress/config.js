const path = require('path')
module.exports = {
  title: '邬晓’s blog',
  description: 'Redesign Everything',
  themeConfig: {
    search: false,
    nav: [
      { text: '主页', link: '/' },
      { text: '前端精进手册', link: '/fe/' },
      { text: '关于我', link: '/about/' },
      { text: '邬晓.中国', link: 'https://邬晓.中国' }
    ],
    lastUpdated: '更新时间',
    sidebar: [
      {
        title: '前端精进手册',   // 必要的
        path: '/fe/',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {
            title: 'Webpack', 
            path: '/fe/webpack/', 
            collapsable: false,
            sidebarDepth: 2,  
            children: [
              '/fe/webpack/手写Webpack'
            ]
          },
          {
            title: 'React', 
            path: '/fe/React/', 
            collapsable: false,
            sidebarDepth: 2,  
            children: [
            ]
          },
          {
            title: 'Vue', 
            path: '/fe/Vue/', 
            collapsable: false,
            sidebarDepth: 2,  
            children: [
            ]
          }
        ]
      }
    ]
  }
}