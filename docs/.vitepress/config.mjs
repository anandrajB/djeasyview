import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Djeasyview",
  description: "Djeasyview is a re-usable library for Django projects,that provides quick CRUD's for your REST projects . featured with filtering , caching , query params and so on  ",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' }
    ],

    // sidebar: [
    //   {
    //     text: 'Getting Started',
    //     items: [
    //       { text: 'Installation', link: '/installation' },
    //       { text: 'Examples', link: '/examples' }
    //     ]
    //   }
    // ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Anand Raj'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anandrajB/djeasyview' }
    ],




  }
})
