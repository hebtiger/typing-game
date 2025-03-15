<template>
    <div class="game-area">
      <div
        v-for="item in fallingItems"
        :key="item.id"
        class="falling-item"
        :style="{ left: `${item.left}px` }"
      >
        <template v-if="settings.mode === 'words'">
          <span
            v-for="(char, index) in item.content"
            :key="index"
            :class="{ 'correct': index < item.progress }"
          >
            {{ char }}
          </span>
        </template>
        <template v-else>
          {{ item.content }}
        </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/game'
  
  const gameStore = useGameStore()
  const { fallingItems, settings } = storeToRefs(gameStore)
  </script>
  
  <style scoped>
  .game-area {
    height: 300px;
    border-bottom: 3px solid #3498db;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  
  .falling-item {
    position: absolute;
    font-size: 32px;
    color: #ffeaa7;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    animation: fall 4s linear;
    display: flex;
    gap: 2px;
  }
  
  .falling-item span {
    opacity: 0.3;
  }
  
  .falling-item span.correct {
    opacity: 1;
    color: #00b894;
  }
  
  @keyframes fall {
    from { top: -50px; }
    to { top: 250px; }
  }
  </style>