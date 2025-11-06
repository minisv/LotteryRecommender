import React from 'react';
import type { LotterySet } from '../types/lottery';
import { LotteryNumber } from './LotteryNumber';

interface LotteryCardProps {
  set: LotterySet
  onRemove: (id: string) => void
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ set, onRemove }) => {
  const formattedDate = new Date(set.generatedAt).toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(set.numbers.join(', '))
    // 선택사항: 토스트 알림 추가 가능
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 sm:p-6 lg:p-7">
      {/* 상단: 날짜와 삭제 버튼 */}
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">{formattedDate}</p>
        <button
          onClick={() => onRemove(set.id)}
          className="
            text-red-500 hover:text-red-700 hover:bg-red-50
            font-semibold text-sm sm:text-base
            px-3 py-1 rounded-lg transition-all
            touch-manipulation
          "
        >
          삭제
        </button>
      </div>

      {/* 번호 그리드: 모바일(3열) → 태블릿 이상(6열) */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {set.numbers.map((number) => (
          <div key={number} className="flex justify-center">
            <LotteryNumber number={number} />
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={copyToClipboard}
        className="
          w-full bg-gradient-to-r from-blue-500 to-blue-600
          hover:from-blue-600 hover:to-blue-700
          active:scale-98 text-white
          py-3 sm:py-3.5 rounded-xl sm:rounded-lg
          font-semibold text-sm sm:text-base
          transition-all duration-200 shadow-md hover:shadow-lg
          touch-manipulation
        "
      >
        📋 번호 복사하기
      </button>
    </div>
  )
}
