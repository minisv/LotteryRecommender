import React from 'react';

interface LotteryNumberProps {
  number: number;
  isBonus?: boolean;
}

export const LotteryNumber: React.FC<LotteryNumberProps> = ({ number, isBonus = false }) => {
  const getColorClass = (num: number): string => {
    if (num <= 10) return 'bg-gradient-to-br from-yellow-400 to-yellow-500';
    if (num <= 20) return 'bg-gradient-to-br from-blue-400 to-blue-500';
    if (num <= 30) return 'bg-gradient-to-br from-red-400 to-red-500';
    if (num <= 40) return 'bg-gradient-to-br from-gray-400 to-gray-500';
    return 'bg-gradient-to-br from-green-400 to-green-500';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {isBonus && <span className="text-xs text-gray-500">보너스</span>}
      <div
        className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-full 
          flex items-center justify-center
          font-bold text-white text-lg sm:text-xl
          shadow-lg ${getColorClass(number)}
        `}
      >
        {number}
      </div>
    </div>
  );
};