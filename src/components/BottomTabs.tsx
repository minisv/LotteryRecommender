import React from 'react';
import { type TabType } from '../types/lottery';

interface BottomTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      key: 'saved' as TabType,
      label: '내 저장 번호',
      icon: (
        <svg className="w-7 h-7 mb-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" />
        </svg>
      ),
    },
    {
      key: 'winner' as TabType,
      label: '당첨 번호 조회',
      icon: (
        <svg className="w-7 h-7 mb-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      key: 'camera' as TabType,
      label: '카메라',
      icon: (
        <svg className="w-7 h-7 mb-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-3 h-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex flex-col items-center justify-center transition-all relative ${
              activeTab === tab.key
                ? 'text-purple-600 bg-purple-50 tab-active'
                : 'text-gray-400'
            }`}
          >
            {tab.icon}
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
