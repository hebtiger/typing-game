import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url' // 导入 fileURLToPath

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 定义 __dirname

export default defineConfig({
  plugins: [vue()],
  
  server: {
    port: 8080, // 指定端口
    host: '0.0.0.0' // 允许局域网访问
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 确保路径别名正确
    }
  }
  
})
