export default {
  title: '无名小站', // 标题
  titleTemplate: '咚咚', // 标题的后缀
  description: '世界更美好',
  ignoreDeadLinks: true,
  lastUpdated: true,
  lastUpdatedText: 'Updated Date',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '关于',
        link: '/about/',
      },
      {
        text: '归档',
        link: '/archives/',
      },
      {
        text: '友链',
        link: '/friends/',
      }
    ],
    sidebar: [
      {
        text: '奇奇怪怪的工具',
        collapsed: false,
        items: [
          { text: 'watt Toolkit', link: '/tool/好用的工具' },
        ]
      },
      {
        text: 'vue相关',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
        ]
      },
      {
        text: '网站构建',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
        ]
      },
      {
        text: 'aa',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/aa/a' },
          { text: 'Introduction', link: '/aa/b' },
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: ''
      },
    ], // 带有图标的链接
  }
}
