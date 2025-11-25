import React from 'react';
import { SavedNumberCard } from './SavedNumberCard.tsx';
import { useLotteryStorage } from '../hooks/useLotteryStorage.ts';

export const SavedNumbersScreen: React.FC = () => {
  const { savedNumbers, generateNumber, deleteNumber } = useLotteryStorage();

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 mb-6 hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-center mb-4">
          <div className="text-6xl">🍀</div>
        </div>
        <h1 className="text-4xl font-black text-white text-center mb-2">로또 번호 생성기</h1>
        <p className="text-purple-100 text-center mb-6 text-lg">행운의 번호를 만들어보세요</p>
        <button
          onClick={generateNumber}
          className="w-full bg-white text-purple-600 hover:bg-purple-50 active:scale-95 font-bold py-4 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-lg"
        >
          🎲 새로운 번호 생성
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          저장된 번호{' '}
          <span className="gradient-text bg-white px-3 py-1 rounded-full text-xl">
            ({savedNumbers.length})
          </span>
        </h2>
      </div>

      <div className="space-y-4">
        {savedNumbers.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-3xl">
            <div className="text-7xl mb-4">🎰</div>
            <p className="text-white text-xl font-medium">저장된 번호가 없습니다</p>
            <p className="text-purple-200 mt-2">위 버튼을 눌러 번호를 생성해보세요!</p>
          </div>
        ) : (
          savedNumbers.map((lottery) => (
            <SavedNumberCard key={lottery.id} lottery={lottery} onDelete={deleteNumber} />
          ))
        )}
      </div>
    </div>
  );
};
