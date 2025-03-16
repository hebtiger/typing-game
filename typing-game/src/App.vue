<template>
    <div class="game-container">
      <SettingsPanel />
      <ScoreBoard />
      <GameTimer />
      <FallingItems />
      <Keyboard />
      <div class="controls">
        <button @click="startGame" :disabled="gameActive">开始游戏</button>
        <button @click="endGame" :disabled="!gameActive">结束游戏</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'

  import { useGameStore } from '@/stores/game'
  import SettingsPanel from '@/components/SettingsPanel.vue'
  import ScoreBoard from '@/components/ScoreBoard.vue'
  import GameTimer from '@/components/GameTimer.vue'
  import FallingItems from '@/components/FallingItems.vue'
  import Keyboard from '@/components/Keyboard.vue'
  
  const gameStore = useGameStore()
  const { gameActive } = storeToRefs(gameStore)
  
  const startGame = () => {
    gameStore.startGame()
  }
  
  const endGame = () => {
    gameStore.endGame()
  }
  </script>
  
  <style>
  .game-container {
    width: 1000px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }
  
  .controls {
    margin: 20px;
    text-align: center;
  }
  
  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 10px;
  }
  
  button:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>