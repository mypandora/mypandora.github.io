export default {
  lang: 'zh-CN',
  title: 'mypandora',

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,
    nav: [
      { text: '首页', link: '/home/index.md' },
      {
        text: '产品',
        items: [
          {
            text: 'UI库',
            items: [{ text: '@mypandora/ui', link: 'https://mypandora.github.io/ui/' }],
          },
          {
            text: '产品',
            items: [
              { text: '在线表格', link: 'https://github.com/mypandora/spreadsheet' },
            ],
          },
        ],
      },
      {
        text: '关于',
        items: [
          {
            items: [
              { text: '常见问题', link: '/about/faq.md' },
              { text: '版本发布', link: '/about/releases.md' },
              { text: '团队', link: '/about/team.md' },
            ],
          },
        ],
      },
      { text: '赞助者', link: '/sponsor/index.md' },
    ],
    sidebar: {},
    socialLinks: [{ icon: 'github', link: 'https://github.com/mypandora' }],
    footer: {
      copyright: 'Copyright © 2023 mypandora',
    },
  },
};
