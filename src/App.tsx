import './index.css'
import './App.css'
import { LotteryGenerator } from './components/LotteryGenerator'
import { LotteryCard } from './components/LotteryCard'
import { useLottery } from './hooks/useLottery'

function App() {
  const { lotterySets, addLotterySet, removeLotterySet, clearAll } = useLottery()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <LotteryGenerator
          onGenerate={addLotterySet}
          onClearAll={clearAll}
          setCount={lotterySets.length}
        />

        <div className="space-y-4">
          {lotterySets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                위의 버튼을 눌러 로또 번호를 추천받으세요!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                생성된 번호 ({lotterySets.length})
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
