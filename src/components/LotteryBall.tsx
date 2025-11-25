import React from 'react';

interface LotteryBallProps {
  number: number;
  isBonus?: boolean;
}

export const LotteryBall: React.FC<LotteryBallProps> = ({ number, isBonus = false }) => {
  const getBallColor = (num: number): string => {
    if (num <= 10) return 'from-yellow-400 to-yellow-500';
    if (num <= 20) return 'from-blue-400 to-blue-500';
    if (num <= 30) return 'from-red-400 to-red-500';
    if (num <= 40) return 'from-gray-400 to-gray-500';
    return 'from-green-400 to-green-500';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {isBonus && (
        <span className="text-xs text-white font-semibold bg-purple-500 px-2 py-0.5 rounded-full">
          보너스
        </span>
      )}
      <div
        className={`animate-pop-in w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-black text-white text-xl sm:text-2xl shadow-xl bg-gradient-to-br ${getBallColor(
          number
        )} ring-4 ring-white/30 hover:scale-110 transition-transform`}
      >
        {number}
      </div>
    </div>
  );
};
