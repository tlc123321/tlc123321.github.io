const title = '无名小站'
const currentYear = new Date().getFullYear()
export default {
  lang: 'zh-CN',
  title, // 标题
  base: '/vitepress/',
  titleTemplate: '咚咚', // 标题的后缀
  description: '世界更美好',
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    // logo: {
    //   src: '../images/preview.jpg',
    // },
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
      },
      {
        text: '其他站点',
        items: [
          { text: 'b站首页',link: 'https://space.bilibili.com/32769241?spm_id_from=333.1007.0.0' },
        ],
      }
    ], // 右上角导航栏
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
          { text: 'Introduction', link: '/tool/introduction' },
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
    ], // 侧边栏菜单
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/tlc123321?tab=repositories'
      },
    ], // 右上角带有图标的链接
    lastUpdatedText: '最后更新时间', // 最后更新时间
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${currentYear}-present ${title}`
    },
    search: {
      provider: 'local'
    }, // 搜索
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    }, // 上一篇下一篇
  }
}
