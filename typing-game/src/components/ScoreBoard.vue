<template>
    <div class="score-board">
      <div class="score">得分: {{ score }}</div>
      <div class="errors">错误: {{ errors }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/game'
  import { storeToRefs } from 'pinia'
  
  const gameStore = useGameStore()
  const { score, errors } = storeToRefs(gameStore)
  </script>
  
  <style scoped>
  .score-board {
    display: flex;
    gap: 20px;
    margin: 20px;
    font-size: 24px;
  }
  
  .score, .errors {
    background: #3498db;
    padding: 10px 20px;
    border-radius: 25px;
    color: white;
  }
  </style>