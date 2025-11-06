import React from 'react';

interface LotteryNumberProps {
  number: number
}

export const LotteryNumber: React.FC<LotteryNumberProps> = ({ number }) => {
  const getColorClass = (num: number): string => {
    if (num <= 10) return 'bg-yellow-400 ring-yellow-300'
    if (num <= 20) return 'bg-blue-400 ring-blue-300'
    if (num <= 30) return 'bg-red-400 ring-red-300'
    if (num <= 40) return 'bg-gray-400 ring-gray-300'
    return 'bg-green-400 ring-green-300'
  }

  return (
    <div
      className={`
        w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
        rounded-full flex items-center justify-center
        font-bold text-white 
        text-lg sm:text-xl lg:text-2xl
        shadow-lg hover:shadow-xl
        ring-4 ring-opacity-30
        transition-all duration-200
        hover:scale-110
        ${getColorClass(number)}
      `}
    >
      {number}
    </div>
  )
}
