// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import App from './App.vue' // 引入根组件
import './assets/styles/global.css' // 引入全局样式（可选）

// 创建 Vue 应用
const app = createApp(App)

// 使用 Pinia 状态管理
app.use(createPinia())

// 挂载应用到 DOMx
app.mount('#app')