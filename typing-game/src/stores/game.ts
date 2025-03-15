import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

type GameMode = 'letters' | 'words'
type Difficulty = 'easy' | 'normal' | 'hard'

interface GameSettings {
  mode: GameMode
  caseSensitive: boolean
  timeLimit: number
  difficulty: Difficulty
}

interface FallingItem {
  id: number
  content: string
  left: number
  progress?: number // For word mode
}

export const useGameStore = defineStore('game', () => {
  // State
  const score = ref(0)
  const gameActive = ref(false)
  const fallingItems = reactive<FallingItem[]>([])
  const activeKey = ref<string | null>(null)
  const errors = ref(0)
  const timeLeft = ref(60)
  const settings = reactive<GameSettings>({
    mode: 'letters',
    caseSensitive: false,
    timeLimit: 60,
    difficulty: 'normal'
  })

  // Getters
  const difficultySpeed = {
    easy: 2000,
    normal: 1500,
    hard: 1000
  }

  // Actions
  function startGame() {
    score.value = 0
    errors.value = 0
    gameActive.value = true
    timeLeft.value = settings.timeLimit
    fallingItems.splice(0, fallingItems.length)
  }

  function endGame() {
    gameActive.value = false
    alert(`时间到！得分: ${score.value}，错误次数: ${errors.value}`)
  }

  function addFallingItem() {
    const content = settings.mode === 'letters' 
      ? generateRandomLetter() 
      : generateRandomWord()
      
    fallingItems.push({
      id: Date.now(),
      content,
      left: Math.random() * 900,
      ...(settings.mode === 'words' && { progress: 0 })
    })
  }

  function playKeySound() {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
  
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4 音符
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime) // 音量
  
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
  
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.1) // 播放 0.1 秒
  }

  function handleInput(key: string) {
    if (!gameActive.value) return

    playKeySound() // 播放音效

  activeKey.value = key
  setTimeout(() => (activeKey.value = null), 100)

    let found = false
    for (const item of [...fallingItems]) {
      const target = settings.caseSensitive ? item.content : item.content.toLowerCase()
      const input = settings.caseSensitive ? key : key.toLowerCase()

      if (settings.mode === 'letters') {
        if (target === input) {
          score.value += 10
          removeFallingItem(item.id)
          found = true
          break
        }
      } else {
        if (target[item.progress!] === input) {
          item.progress!++
          if (item.progress === target.length) {
            score.value += target.length * 5
            removeFallingItem(item.id)
          }
          found = true
          break
        }
      }
    }

    if (!found) {
      errors.value++
      score.value = Math.max(0, score.value - 5)
    }
  }

  // Helpers
  const wordList = ['hello', 'world', 'typescript', 'keyboard', 'challenge']

  function generateRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return letters[Math.floor(Math.random() * letters.length)]
  }

  function generateRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)]
  }

  function removeFallingItem(id: number) {
    const index = fallingItems.findIndex(i => i.id === id)
    if (index > -1) fallingItems.splice(index, 1)
  }

  return {
    score,
    gameActive,
    fallingItems,
    activeKey,
    errors,
    timeLeft,
    settings,
    difficultySpeed,
    startGame,
    endGame,
    addFallingItem,
    handleInput
  }
})