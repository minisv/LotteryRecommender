import { type LotterySet } from '../types/lottery';

const STORAGE_KEY = 'lotto_numbers';
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export const storage = {
  getSavedNumbers(): LotterySet[] {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const now = Date.now();
    const valid = saved.filter((item: LotterySet) => item.expiresAt > now);

    if (valid.length !== saved.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    }

    return valid;
  },

  saveNumber(numbers: number[]): void {
    const newEntry: LotterySet = {
      id: Date.now().toString(),
      numbers,
      createdAt: Date.now(),
      expiresAt: Date.now() + TWO_WEEKS_MS,
    };

    const saved = this.getSavedNumbers();
    saved.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  },

  deleteNumber(id: string): void {
    const saved = this.getSavedNumbers();
    const filtered = saved.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};