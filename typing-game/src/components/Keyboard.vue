<template>
    <div class="keyboard">
      <div v-for="(row, i) in keyboardLayout" :key="i" class="keyboard-row">
        <div
          v-for="key in row"
          :key="key"
          class="key"
          :class="{ 'special': isSpecialKey(key), 'active': activeKey === key.toLowerCase() }"
          :style="{ width: getKeyWidth(key) }"
          @click="handleVirtualKeyPress(key)"
        >
          {{ key }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/game'
  import { storeToRefs } from 'pinia'
  
  const gameStore = useGameStore()
  const { activeKey } = storeToRefs(gameStore)
  
  const keyboardLayout = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['Caps','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    ['Ctrl','Win','Alt',' ','Alt','Menu','Ctrl']
  ]
  
  const specialKeys = new Set(['Backspace','Enter','Shift','Tab','Caps','Ctrl','Alt','Win','Menu'])
  
  const isSpecialKey = (key: string) => specialKeys.has(key)
  
  const getKeyWidth = (key: string) => {
    if (key === ' ') return '400px'
    if (key === 'Backspace') return '100px'
    if (key === 'Enter') return '90px'
    if (key === 'Shift') return '100px'
    return '45px'
  }
  
  const handleVirtualKeyPress = (key: string) => {
    gameStore.handleInput(key)
  }
  </script>
  
  <style scoped>
  .keyboard {
    background: #636e72;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    margin-top: 20px;
  }
  
  .keyboard-row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
  }
  
  .key {
    background: #dfe6e9;
    color: #2d3436;
    height: 45px;
    margin: 0 3px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.1s;
    cursor: pointer;
    border: 2px solid #b2bec3;
  }
  
  .key.special {
    background: #74b9ff;
    color: white;
  }
  
  .key.active {
    background: #00b894;
    transform: scale(0.95);
    opacity: 0.8;
  }
  </style>