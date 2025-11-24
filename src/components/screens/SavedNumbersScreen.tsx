import React from 'react';
import { useLottery } from '../../hooks/useLottery';
import { LotteryNumber } from '../LotteryNumber';

export const SavedNumbersScreen: React.FC = () => {
  const { lotterySets, addLotterySet, removeLotterySet, copyNumbers } = useLottery();

  return (
    <div className="pb-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">🍀 로또 번호 생성기</h1>
        <p className="text-purple-100 mb-6">행운의 번호를 만들어보세요</p>
        <button
          onClick={addLotterySet}
          className="w-full bg-white text-purple-600 hover:bg-purple-50 active:scale-95 font-bold py-4 rounded-xl transition-all shadow-lg"
        >
          🎲 새로운 번호 생성
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        저장된 번호 <span className="text-purple-600">({lotterySets.length})</span>
      </h2>

      {lotterySets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎰</div>
          <p className="text-gray-500 text-lg">저장된 번호가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lotterySets.map((set) => {
            const date = new Date(set.createdAt);
            const dateStr = date.toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={set.id} className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    {dateStr}
                  </p>
                  <button
                    onClick={() => removeLotterySet(set.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-semibold transition"
                  >
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                  {set.numbers.map((number) => (
                    <div key={number} className="flex justify-center">
                      <LotteryNumber number={number} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyNumbers(set.numbers)}
                  className="w-full bg-blue-500 hover:bg-blue-600 active:scale-98 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  📋 번호 복사하기
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};