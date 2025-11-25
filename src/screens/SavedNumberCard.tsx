import React from 'react';
import { type LotteryNumber } from '../types/lottery.ts';
import { LotteryBall } from '../components/LotteryBall.tsx';

interface SavedNumberCardProps {
  lottery: LotteryNumber;
  onDelete: (id: string) => void;
}

export const SavedNumberCard: React.FC<SavedNumberCardProps> = ({ lottery, onDelete }) => {
  const date = new Date(lottery.createdAt);
  const dateStr = date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const daysLeft = Math.ceil((lottery.expiresAt - Date.now()) / (24 * 60 * 60 * 1000));

  const copyNumbers = () => {
    navigator.clipboard.writeText(lottery.numbers.join(', '));
    alert('번호가 복사되었습니다! 📋');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500 font-medium">
          {dateStr}{' '}
          <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-full text-xs">
            {daysLeft}일 남음
          </span>
        </p>
        <button
          onClick={() => onDelete(lottery.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-bold transition-all"
        >
          🗑️ 삭제
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-5">
        {lottery.numbers.map((num, idx) => (
          <div key={idx} className="flex justify-center">
            <LotteryBall number={num} />
          </div>
        ))}
      </div>
      <button
        onClick={copyNumbers}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 text-white py-3 rounded-2xl font-bold transition-all shadow-lg"
      >
        📋 번호 복사하기
      </button>
    </div>
  );
};
