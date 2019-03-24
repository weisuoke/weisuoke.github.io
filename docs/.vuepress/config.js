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
    sidebar: {
      '/fe/': [
        '',
        'one',
        'two'
      ],
      '/about/': [
        ''
      ],
      '/': [
        ''
      ]
    }
  }
}