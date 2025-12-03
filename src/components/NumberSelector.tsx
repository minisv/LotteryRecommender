import React, { useState } from 'react';
import { getBallColor } from '../utils/lottery';

interface NumberSelectorProps {
  title: string;
  selectedNumbers: number[];
  onToggle: (num: number) => void;
  maxCount: number;
  disabledNumbers?: number[];
  isOpenDefault?: boolean;
}

const NumberSelector: React.FC<NumberSelectorProps> = (
  {
    title,
    selectedNumbers,
    onToggle,
    maxCount,
    disabledNumbers = [],
    isOpenDefault = false,
  }
) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* 폴더블 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-4">
          <span className="text-3xl">{title.includes('제외') ? '❌' : '✅'}</span>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
              {title.replace('(최대 5개)', '')}
            </h3>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
              {selectedNumbers.length}/{maxCount}개
            </p>
          </div>
        </div>
        <span
          className={`text-4xl transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* 폴더블 내용 (애니메이션) */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen
          ? 'max-h-96 opacity-100 p-6'
          : 'max-h-0 opacity-0 p-0'
        }
        `}
      >
        <div className="grid grid-cols-9 gap-3 mb-4">
          {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => {
            const isSelected = selectedNumbers.includes(num);
            const isDisabled = disabledNumbers.includes(num);
            const isFull = selectedNumbers.length >= maxCount && !isSelected;

            return (
              <button
                key={num}
                onClick={() => !isDisabled && !isFull && onToggle(num)}
                disabled={isDisabled || isFull}
                className={`
                  w-14 h-14 rounded-full text-lg font-bold shadow-lg
                  hover:shadow-xl active:scale-95 transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-blue-400/50
                  ${isSelected
                  ? getBallColor(num) + ' ring-4 ring-blue-400/60 shadow-blue-400/50 scale-110'
                  : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200'
                }
                  ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}
                  ${isFull && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}
                `}
                title={`${num}번 ${isSelected ? '선택됨' : isDisabled ? '상대방 선택' : '선택가능'}`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* 선택된 번호 태그 */}
        {selectedNumbers.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">선택된 번호:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedNumbers.map((num) => (
                <span
                  key={num}
                  className={`
                    px-4 py-2 rounded-full text-base font-bold shadow-md
                    cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200
                    ring-2 ring-gray-200 dark:ring-gray-600
                    ${getBallColor(num).replace('bg-', 'text-')}
                  `}
                  onClick={() => onToggle(num)}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberSelector;
