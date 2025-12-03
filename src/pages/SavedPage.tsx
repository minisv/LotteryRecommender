import React from 'react';
import { getSavedRecommendations } from '../utils/lottery';
import LottoBall from '../components/LotteryBall';

const SavedPage: React.FC = () => {
  const recommendations = getSavedRecommendations();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 pb-24">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">📋 저장된 번호</h1>

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            저장된 번호가 없습니다.
          </p>
          <p className="text-lg text-gray-400 dark:text-gray-500 mt-2">
            번호 추천을 받아보세요!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-600 mb-6"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-600">
      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">
        {rec.drawNumber}회차
      </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
        {formatDate(rec.createdAt)}
      </span>
              </div>

              {/* 3개씩 2줄 레이아웃 */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg">
                {rec.numbers.slice(0, 3).map((num) => (
                  <div key={`first-${num}`} className="flex flex-col items-center group">
                    <LottoBall number={num} size="lg" />
                  </div>
                ))}
                {rec.numbers.slice(3, 6).map((num) => (
                  <div key={`second-${num}`} className="flex flex-col items-center group">
                    <LottoBall number={num} size="lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default SavedPage;
