const title = '是超超捏的博客'
const currentYear = new Date().getFullYear()
export default {
  lang: 'zh-CN',
  title, // 标题
  base: '/vitepress/',
  titleTemplate: '咚咚', // 标题的后缀
  description: '世界更美好',
  i18nRouting: false,
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true, // 生成干净的url
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
        text: '博客',
        link: '/blog/tool/watt',
      },
      {
        text: '动漫',
        link: '/comic/suspense/whenTheyCry',
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
    sidebar: {
      '/blog/': [
        {
          text: '奇奇怪怪的工具',
          collapsed: false,
          items: [
            { text: 'watt Toolkit', link: '/blog/tool/watt' },
          ]
        },
        {
          text: 'vitepress',
          collapsed: false,
          items: [
            { text: 'vitepress基本配置', link: '/blog/vitepress/base' },
            { text: 'github部署vitepress', link: '/blog/vitepress/arrange' },
          ]
        },
        {
          text: '微信公众号开发',
          collapsed: false,
          items: [
            { text: '微信公众号h5授权', link: '/blog/wechatOfficialAccount/wechatEmpower' },
          ]
        }
      ],
      '/comic/': [
        {
          text: '悬疑类',
          collapsed: false,
          items: [
            { text: '寒蝉鸣泣之时', link: '/comic/suspense/whenTheyCry' },
          ]
        }
      ],
    }, // 侧边栏菜单
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/tlc123321'
      },
      {
        icon: {
          svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1701067346104" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4098" xmlns:xlink="http://www.w3.org/1999/xlink" width="257.03125" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="4099"></path></svg>'
        },
        link: 'https://juejin.cn/user/2615075777810108'
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
    outline:[2,3], // 大纲显示2-3级标题
    outlineTitle:'当前页大纲', // 大纲顶部标题
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    }, // 上一篇下一篇
  }
}
