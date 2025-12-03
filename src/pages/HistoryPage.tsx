import React, { useState, useEffect } from 'react';
import { getCurrentDrawNumber } from '../utils/lottery';
import { type LottoResult } from '../types';
import LottoBall from '../components/LotteryBall';

const HistoryPage: React.FC = () => {
  const [drawNumber, setDrawNumber] = useState(getCurrentDrawNumber());
  const [result, setResult] = useState<LottoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResult = async (drwNo: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`
      );
      const data = await response.json();

      if (data.returnValue === 'success') {
        setResult(data);
      } else {
        setError('해당 회차 정보를 찾을 수 없습니다.');
        setResult(null);
      }
    } catch {
      setError('정보를 불러오는데 실패했습니다.');
      setResult(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResult(drawNumber);
  }, [drawNumber]);

  const handlePrev = () => {
    if (drawNumber > 1) setDrawNumber(drawNumber - 1);
  };

  const handleNext = () => {
    if (drawNumber < getCurrentDrawNumber()) setDrawNumber(drawNumber + 1);
  };

  return (
    <div className="p-4 pb-24">
    <h1 className="text-3xl font-bold mb-6 dark:text-white">🏆 당첨 번호</h1>

  <div className="flex items-center justify-center gap-4 mb-8">
  <button
    onClick={handlePrev}
  disabled={drawNumber <= 1}
  className="w-14 h-14 text-2xl font-bold bg-gray-200 dark:bg-gray-600
  rounded-full disabled:opacity-30"
  >
          ◀
        </button>
        <span className="text-2xl font-bold dark:text-white min-w-[120px] text-center">
    {drawNumber}회차
  </span>
  <button
  onClick={handleNext}
  disabled={drawNumber >= getCurrentDrawNumber()}
  className="w-14 h-14 text-2xl font-bold bg-gray-200 dark:bg-gray-600
  rounded-full disabled:opacity-30"
  >
          ▶
        </button>
        </div>

  {loading && (
    <div className="text-center py-12">
    <p className="text-xl text-gray-500 dark:text-gray-400">로딩 중...</p>
  </div>
  )}

  {error && (
    <div className="text-center py-12">
    <p className="text-xl text-red-500">{error}</p>
      </div>
  )}

  {result && !loading && (
    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
    <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
      추첨일: {result.drwNoDate}
    </p>

      // 당첨번호 표시 부분 업데이트
      <div className="flex items-center justify-center gap-6 p-8 bg-gradient-to-r from-white/95 to-blue-50/70 dark:from-gray-800/90 dark:to-blue-900/30 rounded-3xl shadow-2xl">
        <LottoBall number={result.drwtNo1} size="lg" />
        <LottoBall number={result.drwtNo2} size="lg" />
        <LottoBall number={result.drwtNo3} size="lg" />
        <LottoBall number={result.drwtNo4} size="lg" />
        <LottoBall number={result.drwtNo5} size="lg" />
        <LottoBall number={result.drwtNo6} size="lg" />
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mx-4">
          +
        </div>
        <LottoBall number={result.bnusNo} size="lg" />
      </div>


      <p className="text-center text-base text-gray-500 dark:text-gray-400">
    마지막 공은 보너스 번호입니다
  </p>
  </div>
  )}
  </div>
);
};

export default HistoryPage;
