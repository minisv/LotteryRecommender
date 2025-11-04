import { useState, useCallback } from 'react'
import type { LotterySet } from '../types/lottery'

export const useLottery = () => {
  const [lotterySets, setLotterySets] = useState<LotterySet[]>([])

  const generateNumbers = useCallback((count: number = 6): number[] => {
    const numbers = new Set<number>()
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * 45) + 1)
    }
    return Array.from(numbers).sort((a, b) => a - b)
  }, [])

  const addLotterySet = useCallback(() => {
    const numbers = generateNumbers(6);
    const newSet: LotterySet = {
      id: Date.now().toString(),
      numbers,
      generatedAt: new Date(),
    }
    setLotterySets((prev) => [newSet, ...prev])
  }, [generateNumbers])

  const removeLotterySet = useCallback((id: string) => {
    setLotterySets((prev) => prev.filter((set) => set.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setLotterySets([])
  }, [])

  return {
    lotterySets,
    addLotterySet,
    removeLotterySet,
    clearAll,
  }
}