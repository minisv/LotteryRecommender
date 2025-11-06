import './index.css'
import { LotteryGenerator } from './components/LotteryGenerator'
import { LotteryCard } from './components/LotteryCard'
import { useLottery } from './hooks/useLottery'

function App() {
  const { lotterySets, addLotterySet, removeLotterySet, clearAll } = useLottery()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 컨테이너: 모바일(전체 너비) → 태블릿(최대 768px) → 데스크톱(최대 896px) */}
      <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

        <LotteryGenerator
          onGenerate={addLotterySet}
          onClearAll={clearAll}
          setCount={lotterySets.length}
        />

        <div className="space-y-3 sm:space-y-4">
          {lotterySets.length === 0 ? (
            <div className="text-center py-16 sm:py-20 lg:py-24">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🎲</div>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium px-4">
                버튼을 눌러 행운의 번호를 받아보세요!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 px-1">
                생성된 번호 <span className="text-purple-600">({lotterySets.length})</span>
              </h2>
              {lotterySets.map((set) => (
                <LotteryCard
                  key={set.id}
                  set={set}
                  onRemove={removeLotterySet}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
