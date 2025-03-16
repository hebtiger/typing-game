<template>
    <div class="game-timer">
      剩余时间: {{ timeLeft }}s
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/game'
  import { storeToRefs } from 'pinia'
  
  const gameStore = useGameStore()
  const { timeLeft } = storeToRefs(gameStore)
  </script>
  
  <style scoped>
  .game-timer {
    background: #3498db;
    padding: 10px 20px;
    border-radius: 25px;
    color: white;
    font-size: 24px;
    margin: 20px;
  }
  </style>