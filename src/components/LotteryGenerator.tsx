import React from 'react'

interface LotteryGeneratorProps {
  onGenerate: () => void
  onClearAll: () => void
  setCount: number
}

export const LotteryGenerator: React.FC<LotteryGeneratorProps> = ({
                                                                    onGenerate,
                                                                    onClearAll,
                                                                    setCount,
                                                                  }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
      {/* 헤더 텍스트 반응형 크기 */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
        🍀 로또 번호 추천기
      </h1>
      <p className="text-purple-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
        행운의 숫자를 찾아보세요!
      </p>

      {/* 버튼 레이아웃: 모바일(세로) → 태블릿 이상(가로) */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onGenerate}
          className="
            flex-1 bg-white text-purple-600 hover:bg-purple-50
            active:scale-95 font-bold
            py-4 sm:py-3 lg:py-4 px-6 rounded-xl sm:rounded-lg
            transition-all duration-200 shadow-lg hover:shadow-xl
            text-base sm:text-lg
            touch-manipulation
          "
        >
          🎰 번호 생성하기
        </button>

        {setCount > 0 && (
          <button
            onClick={onClearAll}
            className="
              sm:w-auto bg-red-500 hover:bg-red-600
              active:scale-95 text-white font-bold
              py-4 sm:py-3 lg:py-4 px-6 rounded-xl sm:rounded-lg
              transition-all duration-200 shadow-lg hover:shadow-xl
              text-base sm:text-lg
              touch-manipulation
            "
          >
            🗑️ 모두 삭제
          </button>
        )}
      </div>
    </div>
  )
}
