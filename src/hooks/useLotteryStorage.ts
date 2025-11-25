import { useState, useCallback, useEffect } from 'react';
import { type LotteryNumber } from '../types/lottery';

const STORAGE_KEY = 'lotto_numbers';
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export function useLotteryStorage() {
  const [savedNumbers, setSavedNumbers] = useState<LotteryNumber[]>([]);

  const loadNumbers = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const now = Date.now();
    const valid = saved.filter((item: LotteryNumber) => item.expiresAt > now);

    if (valid.length !== saved.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    }

    setSavedNumbers(valid);
  }, []);

  const generateNumber = useCallback(() => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sorted = Array.from(numbers).sort((a, b) => a - b);

    const newEntry: LotteryNumber = {
      id: Date.now().toString(),
      numbers: sorted,
      createdAt: Date.now(),
      expiresAt: Date.now() + TWO_WEEKS_MS,
    };

    const updated = [newEntry, ...savedNumbers];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedNumbers(updated);
  }, [savedNumbers]);

  const deleteNumber = useCallback((id: string) => {
    const filtered = savedNumbers.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    setSavedNumbers(filtered);
  }, [savedNumbers]);

  useEffect(() => {
    loadNumbers();
  }, [loadNumbers]);

  return {
    savedNumbers,
    generateNumber,
    deleteNumber,
  };
}
