import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
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
      { 
        text: '洛谷',
        items: [
            { text: '数据结构', link: '/luogu/ds/sol1' },
            { text: '动态规划', link: '/luogu/dp/sol1' },
            { text: '数论', link: '/luogu/math/sol1' },
            { text: '字符串', link: '/luogu/string/sol1' },
            { text: '图论', link: '/luogu/graph/sol1' },
            { text: '多项式', link: '/luogu/poly/sol1' },
            { text: '计算几何', link: '/luogu/geo/sol1' },
            { text: '网络流', link: '/luogu/flow/sol1' },
            { text: '博弈论', link: '/luogu/game/sol1' },
            { text: '杂项', link: '/luogu/other/sol1' },
        ]
      },
      { 
        text: 'Codeforces',
        items: [
            { text: 'div 1', link: '/codeforces/div1/sol1' },
            { text: 'div 2', link: '/codeforces/div2/sol1' },
            { text: 'div 3', link: '/codeforces/div3/sol1' },
            { text: 'div 4', link: '/codeforces/div4/sol1' },
            { text: 'div 1+2', link: '/codeforces/sol1' },
            { text: 'edu', link: '/codeforces/edu/sol1' },
            { text: 'gym', link: '/codeforces/gym/sol1' },
        ]
      },
      { text: 'Atcoder', link: '/atcoder/ABC'},
      { text: '牛客', link: '/nowcoder/weekly'}
    ],

    sidebar: {
      '/luogu/数据结构': [
        {
          text: '',
          items: [
            
          ]
        }
      ],

      '/codeforces/edu': [
        {
          text: 'edu',
          items: [
            { text: '170+', link: '/codeforces/edu/sol17' },
            { text: '160+', link: '/codeforces/edu/sol16' },
            { text: '150+', link: '/codeforces/edu/sol15' },
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
