module.exports = {
  title: '邬晓’s blog',
  description: '喜欢前端和骑行的木讷小伙',
  themeConfig: {
    search: false,
    nav: [
      { text: '主页', link: '/' },
      { text: '前端精进手册', link: '/fe/' },
      { text: '关于我', link: '/about/' },
      { text: '邬晓.中国', link: 'https://邬晓.中国' }
    ],
    // sidebar: {
    //   '/fe/': [
    //     '',
    //     'one',
    //     'two',
    //     '手写Webpack'
    //   ],
    //   '/about/': [
    //     ''
    //   ],
    //   '/': [
    //     ''
    //   ]
    // }
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
          }
        ]
      }
    ]
  }
}