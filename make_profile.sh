#!/bin/bash

# 项目根目录
project_name="typing-game"

# 创建项目根目录
mkdir -p "$project_name"

# 定义目录结构
directories=(
  "public"
  "public/sounds"
  "src"
  "src/assets"
  "src/components"
  "src/stores"
  "src/utils"
  "tests"
  "tests/unit"
)

# 创建所有目录
for dir in "${directories[@]}"; do
  mkdir -p "$project_name/$dir"
done

# 定义文件列表
files=(
  "public/index.html"
  "src/components/Keyboard.vue"
  "src/components/FallingItems.vue"
  "src/components/ScoreBoard.vue"
  "src/components/SettingsPanel.vue"
  "src/stores/game.ts"
  "src/utils/game.ts"
  "src/App.vue"
  "src/main.ts"
  "tests/unit/example.test.ts"
  "$project_name/.gitignore"
  "$project_name/package.json"
  "$project_name/tsconfig.json"
  "$project_name/vite.config.ts"
  "$project_name/README.md"
)

# 创建所有文件
for file in "${files[@]}"; do
  touch "$project_name/$file"
done

# 为特定文件添加初始内容
cat << EOF > "$project_name/public/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typing Game</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
EOF

cat << EOF > "$project_name/package.json"
{
  "name": "typing-game",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "pinia": "^2.0.3",
    "vue": "^3.2.45"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^4.9.3",
    "vite": "^4.3.9"
  }
}
EOF

cat << EOF > "$project_name/tsconfig.json"
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue", "src/**/*.jsx"],
  "exclude": ["node_modules"]
}
EOF

cat << EOF > "$project_name/vite.config.ts"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  }
})
EOF

echo "项目结构已成功创建！"