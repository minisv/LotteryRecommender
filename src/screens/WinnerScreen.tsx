import React, { useState } from 'react';
import { type WinningData } from '../types/lottery.ts';
import { fetchWinningNumbers } from '../utils/api.ts';
import { LotteryBall } from '../components/LotteryBall.tsx';

export const WinnerScreen: React.FC = () => {
  const [drawNo, setDrawNo] = useState<number>(1199);
  const [winningData, setWinningData] = useState<WinningData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchWinningNumbers(drawNo);
      setWinningData(data);
    } catch (error) {
      alert(
        '당첨 번호 조회 중 오류가 발생했습니다.\n\nCORS 이슈일 수 있습니다.\n\n해결 방법:\n1. Vite proxy 설정 사용\n2. 백엔드 프록시 서버 구축\n3. 브라우저 CORS 확장 프로그램 사용'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="text-6xl">🏆</div>
        </div>
        <h1 className="text-3xl font-black gradient-text text-center mb-6">당첨 번호 조회</h1>

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            value={drawNo}
            onChange={(e) => setDrawNo(Number(e.target.value))}
            placeholder="회차 입력"
            className="flex-1 px-6 py-4 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg font-semibold transition-all"
          />
          <button
            onClick={handleFetch}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95 text-lg disabled:opacity-50"
          >
            {loading ? '조회중...' : '조회'}
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center">
          💡 현재 최신 회차: <span className="font-bold text-purple-600">1199회</span> (2025년 11월
          24일 기준)
        </p>
      </div>

      {winningData && (
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-black gradient-text mb-2">
              {winningData.drwNo}회 당첨번호
            </h3>
            <p className="text-gray-600 text-lg font-medium">{winningData.drwNoDate}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
            {[
              winningData.drwtNo1,
              winningData.drwtNo2,
              winningData.drwtNo3,
              winningData.drwtNo4,
              winningData.drwtNo5,
              winningData.drwtNo6,
            ].map((num, idx) => (
              <LotteryBall key={idx} number={num} />
            ))}
            <span className="text-3xl text-gray-400 mx-2 font-bold">+</span>
            <LotteryBall number={winningData.bnusNo} isBonus />
          </div>
          <div className="border-t-2 border-gray-100 pt-6 space-y-3">
            <div className="flex justify-between items-center bg-purple-50 p-4 rounded-xl">
              <span className="text-gray-700 font-semibold">총 판매금액</span>
              <span className="font-black text-purple-600 text-lg">
                {winningData.totSellamnt.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl">
              <span className="text-gray-700 font-semibold">1등 당첨금</span>
              <span className="font-black text-yellow-600 text-lg">
                {winningData.firstWinamnt.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl">
              <span className="text-gray-700 font-semibold">1등 당첨자</span>
              <span className="font-black text-green-600 text-lg">
                {winningData.firstPrzwnerCo}명
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
