import React from 'react'

interface LotteryNumberProps {
  number: number
}

export const LotteryNumber: React.FC<LotteryNumberProps> = ({ number }) => {
  const getColorClass = (num: number): string => {
    if (num <= 10) return 'bg-yellow-400'
    if (num <= 20) return 'bg-blue-400'
    if (num <= 30) return 'bg-red-400'
    if (num <= 40) return 'bg-gray-400'
    return 'bg-green-400'
  }

  return (
    <div
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        font-bold text-white text-lg shadow-lg
        ${getColorClass(number)}
      `}
    >
      {number}
    </div>
  )
}