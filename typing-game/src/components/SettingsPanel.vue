<template>
    <div class="settings-panel">
      <div class="setting-item">
        <label>模式：</label>
        <select v-model="settings.mode">
          <option value="letters">字母模式</option>
          <option value="words">单词模式</option>
        </select>
      </div>
  
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.caseSensitive">
          区分大小写
        </label>
      </div>
  
      <div class="setting-item">
        <label>时间限制（秒）：</label>
        <input 
          type="number" 
          v-model.number="settings.timeLimit" 
          min="30" 
          max="300"
        >
      </div>
  
      <div class="setting-item">
        <label>难度：</label>
        <select v-model="settings.difficulty">
          <option value="easy">简单</option>
          <option value="normal">普通</option>
          <option value="hard">困难</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/game'
  
  const gameStore = useGameStore()
  const { settings } = storeToRefs(gameStore)
  </script>
  
  <style scoped>
  .settings-panel {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .setting-item {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  input[type="number"] {
    width: 80px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #3498db;
  }
  </style>