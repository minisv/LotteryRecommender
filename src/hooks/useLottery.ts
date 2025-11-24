import { useState, useCallback, useEffect } from 'react';
import { type LotterySet } from '../types/lottery';
import { storage } from '../utils/storage';

export const useLottery = () => {
  const [lotterySets, setLotterySets] = useState<LotterySet[]>([]);

  useEffect(() => {
    setLotterySets(storage.getSavedNumbers());
  }, []);

  const generateNumbers = useCallback((): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }, []);

  const addLotterySet = useCallback(() => {
    const numbers = generateNumbers();
    storage.saveNumber(numbers);
    setLotterySets(storage.getSavedNumbers());
  }, [generateNumbers]);

  const removeLotterySet = useCallback((id: string) => {
    storage.deleteNumber(id);
    setLotterySets(storage.getSavedNumbers());
  }, []);

  const copyNumbers = useCallback((numbers: number[]) => {
    navigator.clipboard.writeText(numbers.join(', '));
  }, []);

  return {
    lotterySets,
    addLotterySet,
    removeLotterySet,
    copyNumbers,
  };
};