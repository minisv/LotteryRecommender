import React from 'react'
import type { LotterySet } from '../types/lottery'
import { LotteryNumber } from './LotteryNumber'

interface LotteryCardProps {
  set: LotterySet
  onRemove: (id: string) => void
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ set, onRemove }) => {
  const formattedDate = new Date(set.generatedAt).toLocaleString('ko-KR')

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <button
          onClick={() => onRemove(set.id)}
          className="text-red-500 hover:text-red-700 font-semibold text-sm"
        >
          삭제
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {set.numbers.map((number) => (
          <LotteryNumber key={number} number={number} />
        ))}
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(set.numbers.join(', '))}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
      >
        번호 복사
      </button>
    </div>
  )
}
