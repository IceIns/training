import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/training/',
  title: "Problem Trainning",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle: '目录',
    outline: [2,6],
    // logo: '/logo2.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '洛谷', link: '/luogu/ds' },
      { text: 'Codeforces', link: '/codeforces/div1'},
      { text: 'Atcoder', link: '/atcoder/ABC'},
      { text: '牛客', link: '/nowcoder/weekly'}
    ],

    sidebar: {
      '/luogu/': [
        {
          text: '洛谷',
          items: [
            { text: '数据结构', link: '/luogu/ds' },
            { text: '动态规划', link: '/luogu/dp' },
            { text: '数论', link: '/luogu/math' },
            { text: '字符串', link: '/luogu/string' },
            { text: '图论', link: '/luogu/graph' },
            { text: '多项式', link: '/luogu/poly' },
            { text: '计算几何', link: '/luogu/geo' },
            { text: '网络流', link: '/luogu/flow' },
            { text: '博弈论', link: '/luogu/game' },
            { text: '杂项', link: '/luogu/other' },
          ]
        }
      ],

      '/codeforces/': [
        {
          text: 'Codeforces',
          items: [
            { text: 'div 1', link: '/codeforces/div1' },
            { text: 'div 2', link: '/codeforces/div2' },
            { text: 'div 3', link: '/codeforces/div3' },
            { text: 'div 4', link: '/codeforces/div4' },
            { text: 'edu', link: '/codeforces/edu' },
            { text: 'div 1+2', link: '/codeforces/div 1+2' },
            { text: 'gym', link: '/codeforces/gym' },
          ]
        }
      ],
      
      '/atcoder/': [
        {
          text: 'Atcoder',
          items: [
            { text: 'ABC', link: '/atcoder/ABC' },
            { text: 'ARC', link: '/atcoder/ARC' },
            { text: 'AGC', link: '/atcoder/AGC' },
            { text: 'Other', link: '/atcoder/other' },
          ]
        }
      ],

      '/nowcoder/': [
        {
          text: '牛客',
          items: [
            { text: '周赛', link: '/nowcoder/weekly' },
            { text: '小白月赛', link: '/nowcoder/freshman' },
            { text: '练习赛', link: '/nowcoder/practice' },
            { text: '挑战赛', link: '/atcoder/challenge' },
            { text: '寒假训练营', link: '/atcoder/winter' },
            { text: '暑期多校', link: '/atcoder/summer' }, 
          ]
        }
      ],
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]

    lastUpdated:{
      text: "最后更新",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },

  markdown: {
    math: true
  },
})
