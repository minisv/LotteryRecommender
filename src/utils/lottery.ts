import { type LottoRecommendation, type WeeklyUsage } from '../types';

const LOTTO_START_DATE = new Date('2002-11-30');
const STORAGE_KEY = 'lottery_recommendations';
const USAGE_KEY = 'lottery_weekly_usage';
const FREE_LIMIT = 10;

export const getCurrentDrawNumber = (): number => {
  const now = new Date();
  const diffTime = now.getTime() - LOTTO_START_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
};

export const getWeekStart = (): string => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const weekStart = new Date(now.setDate(diff));
  return weekStart.toISOString().split('T')[0];
};

export const getWeeklyUsage = (): WeeklyUsage => {
  const stored = localStorage.getItem(USAGE_KEY);
  if (stored) {
    const usage: WeeklyUsage = JSON.parse(stored);
    if (usage.weekStart === getWeekStart()) {
      return usage;
    }
  }
  return { weekStart: getWeekStart(), count: 0 };
};

export const incrementUsage = (): void => {
  const usage = getWeeklyUsage();
  usage.count += 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
};

export const getRemainingFreeCount = (): number => {
  const usage = getWeeklyUsage();
  return Math.max(0, FREE_LIMIT - usage.count);
};

export const generateLottoNumbers = (
  excludeNumbers: number[],
  fixedNumbers: number[]
): number[] => {
  const available = Array.from({ length: 45 }, (_, i) => i + 1)
    .filter(n => !excludeNumbers.includes(n) && !fixedNumbers.includes(n));

  const result = [...fixedNumbers];

  while (result.length < 6 && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    result.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return result.sort((a, b) => a - b);
};

export const getSavedRecommendations = (): LottoRecommendation[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const recommendations: LottoRecommendation[] = JSON.parse(stored);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  return recommendations
    .filter(r => new Date(r.createdAt) >= twoWeeksAgo)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const saveRecommendation = (numbers: number[]): void => {
  const recommendations = getSavedRecommendations();
  const newRec: LottoRecommendation = {
    id: crypto.randomUUID(),
    drawNumber: getCurrentDrawNumber(),
    numbers,
    createdAt: new Date().toISOString(),
  };

  recommendations.unshift(newRec);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recommendations));
};

export const getBallStyle = (num: number) => {
  if (num >= 1 && num <= 10) {
    // 1-10: 노란색
    return {
      bgColor: 'bg-yellow-400',
      borderColor: 'border-yellow-500/90',
      textColor: 'text-black'
    };
  } else if (num >= 11 && num <= 20) {
    // 11-20: 파란색
    return {
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600/90',
      textColor: 'text-white'
    };
  } else if (num >= 21 && num <= 30) {
    // 21-30: 빨간색
    return {
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600/90',
      textColor: 'text-white'
    };
  } else if (num >= 31 && num <= 40) {
    // 31-40: 검은색 (어두운 회색)
    return {
      bgColor: 'bg-gray-800',
      borderColor: 'border-gray-900/90',
      textColor: 'text-white'
    };
  } else {
    // 41-45: 초록색
    return {
      bgColor: 'bg-emerald-500',
      borderColor: 'border-emerald-600/90',
      textColor: 'text-white'
    };
  }
};

export const getBallColor = (num: number): string => {
  const style = getBallStyle(num);
  return style.bgColor;
};

