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
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-8 mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">로또 번호 추천기</h1>
      <p className="text-purple-100 mb-6">행운의 숫자를 찾아보세요!</p>

      <div className="flex gap-4">
        <button
          onClick={onGenerate}
          className="flex-1 bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition shadow-md"
        >
          🎰 번호 생성
        </button>
        {setCount > 0 && (
          <button
            onClick={onClearAll}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
          >
            모두 삭제
          </button>
        )}
      </div>
    </div>
  )
}
