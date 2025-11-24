import React, { useState } from 'react';
import { type WinningNumberData } from '../../types/lottery';
import { LotteryNumber } from '../LotteryNumber';

export const WinnerScreen: React.FC = () => {
  const [drawNo, setDrawNo] = useState('1199');
  const [winningData, setWinningData] = useState<WinningNumberData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWinningNumbers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`
      );

      if (!response.ok) throw new Error('조회 실패');

      const data = await response.json();

      if (data.returnValue !== 'success') {
        alert('해당 회차 정보를 찾을 수 없습니다.');
        return;
      }

      setWinningData(data);
    } catch (error) {
      console.error('조회 오류:', error);
      alert(
        '당첨 번호 조회 중 오류가 발생했습니다.\\n\\nCORS 이슈일 수 있습니다.\\n해결 방법:\\n1. 백엔드 프록시 서버 구축\\n2. Vite proxy 설정 (vite.config.ts)\\n3. 브라우저 CORS 확장 프로그램 사용'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">🏆 당첨 번호 조회</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={drawNo}
            onChange={(e) => setDrawNo(e.target.value)}
            placeholder="회차 입력"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={fetchWinningNumbers}
            disabled={isLoading}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 disabled:opacity-50 transition"
          >
            {isLoading ? '조회 중...' : '조회'}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          현재 최신 회차: 1199회 (2025년 11월 24일 기준)
        </p>
      </div>

      {winningData && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">{winningData.drwNo}회 당첨번호</h3>
            <p className="text-gray-600">{winningData.drwNoDate}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            {[
              winningData.drwtNo1,
              winningData.drwtNo2,
              winningData.drwtNo3,
              winningData.drwtNo4,
              winningData.drwtNo5,
              winningData.drwtNo6,
            ].map((num, idx) => (
              <LotteryNumber key={idx} number={num} />
            ))}
            <span className="text-2xl text-gray-400 mx-2">+</span>
            <LotteryNumber number={winningData.bnusNo} isBonus />
          </div>
          <div className="border-t pt-4 space-y-2 text-sm">
            <p>
              총 판매금액: <span className="font-bold">{winningData.totSellamnt.toLocaleString()}원</span>
            </p>
            <p>
              1등 당첨금: <span className="font-bold">{winningData.firstWinamnt.toLocaleString()}원</span>
            </p>
            <p>
              1등 당첨자: <span className="font-bold">{winningData.firstPrzwnerCo}명</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};