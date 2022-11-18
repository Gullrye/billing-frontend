# Vue 3 + TSX + Vite

- 个人调整
  - 欢迎页：滑动 1/6 屏幕宽度才切换路由
  - Overlay：添加进入退出动画
- vant 按需引入
  - 按新官方文档用 vant3.6.5 + unplugin-vue-components，组件样式不生效。
  - 用 vant3.4.8 + vite-plugin-style-import 就没问题。
  - 貌似是 unplugin-vue-components 不支持 tsx。
