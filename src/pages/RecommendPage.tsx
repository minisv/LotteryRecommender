import React, { useState } from 'react';
import NumberSelector from '../components/NumberSelector';
import LottoBall from '../components/LotteryBall';
import {
  generateLottoNumbers,
  saveRecommendation,
  getRemainingFreeCount,
  incrementUsage,
  getCurrentDrawNumber,
} from '../utils/lottery';

const RecommendPage: React.FC = () => {
  const [excludeNumbers, setExcludeNumbers] = useState<number[]>([]);
  const [fixedNumbers, setFixedNumbers] = useState<number[]>([]);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [showAdModal, setShowAdModal] = useState(false);

  const remainingCount = getRemainingFreeCount();

  const toggleExclude = (num: number) => {
    setExcludeNumbers(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const toggleFixed = (num: number) => {
    setFixedNumbers(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleGenerate = () => {
    if (remainingCount <= 0) {
      setShowAdModal(true);
      return;
    }

    const numbers = generateLottoNumbers(excludeNumbers, fixedNumbers);
    setGeneratedNumbers(numbers);
    saveRecommendation(numbers);
    incrementUsage();
  };

  const handleWatchAd = () => {
    // 광고 시청 시뮬레이션
    alert('광고를 시청했습니다! 번호를 추천받으세요.');
    setShowAdModal(false);
    const numbers = generateLottoNumbers(excludeNumbers, fixedNumbers);
    setGeneratedNumbers(numbers);
    saveRecommendation(numbers);
  };

  return (
    <div className="p-4 pb-24">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">🎱 로또 번호 추천</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
        {getCurrentDrawNumber()}회차 | 남은 무료 횟수: {remainingCount}회
      </p>

      <NumberSelector
        title="❌ 제외할 번호"
        selectedNumbers={excludeNumbers}
        onToggle={toggleExclude}
        maxCount={5}
        disabledNumbers={fixedNumbers}
      />

      <NumberSelector
        title="✅ 고정할 번호"
        selectedNumbers={fixedNumbers}
        onToggle={toggleFixed}
        maxCount={5}
        disabledNumbers={excludeNumbers}
      />

      <button
        onClick={handleGenerate}
        className="w-full py-5 text-2xl font-bold text-white bg-blue-600
          hover:bg-blue-700 rounded-xl shadow-lg transition-colors mb-6"
      >
        🎲 번호 추천받기
      </button>

      {generatedNumbers.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-900/50
    rounded-3xl p-8 text-center border-4 border-blue-200 dark:border-blue-900/50 shadow-2xl mx-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white tracking-wide">
            🎉 추천 완료! 🎉
          </h2>

          {/* 3개씩 2줄 레이아웃 */}
          <div className="grid grid-cols-3 gap-8 p-8 min-h-[200px] bg-white/80 dark:bg-gray-900/50 rounded-2xl shadow-xl">
            {generatedNumbers.slice(0, 3).map((num) => (
              <div key={`first-${num}`} className="flex flex-col items-center group">
                <LottoBall number={num} size="xl" />
              </div>
            ))}
            {generatedNumbers.slice(3, 6).map((num) => (
              <div key={`second-${num}`} className="flex flex-col items-center group">
                <LottoBall number={num} size="xl" />
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-100 dark:bg-green-900/50 rounded-2xl border-4 border-green-200 dark:border-green-800/70 shadow-lg">
            <p className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-200 tracking-wide">
              ✅ {getCurrentDrawNumber()}회차 추천 번호 저장 완료!
            </p>
          </div>
        </div>
      )}

      {showAdModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">무료 횟수 소진</h2>
            <p className="text-lg mb-6 dark:text-gray-300">
              이번 주 무료 추천 횟수를 모두 사용했습니다.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleWatchAd}
                className="w-full py-4 text-xl font-bold text-white bg-green-600
                  hover:bg-green-700 rounded-xl"
              >
                📺 광고 시청하고 추천받기
              </button>
              <button
                onClick={() => alert('구독 기능은 준비 중입니다.')}
                className="w-full py-4 text-xl font-bold text-white bg-purple-600
                  hover:bg-purple-700 rounded-xl"
              >
                ⭐ 프리미엄 구독하기
              </button>
              <button
                onClick={() => setShowAdModal(false)}
                className="w-full py-4 text-xl font-bold text-gray-600
                  dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-xl"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendPage;
