import React from 'react';
import { FaSave, FaTrophy, FaCamera } from 'react-icons/fa';
import { type TabKey } from '../types/lottery';

interface BottomTabsProps {
  selected: TabKey;
  onSelect: (key: TabKey) => void;
}

const tabs = [
  { key: 'saved' as TabKey, label: '내 저장 번호', icon: FaSave },
  { key: 'winner' as TabKey, label: '당첨 번호 조회', icon: FaTrophy },
  { key: 'camera' as TabKey, label: '카메라', icon: FaCamera },
];

export const BottomTabs: React.FC<BottomTabsProps> = ({ selected, onSelect }) => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-3 h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selected === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onSelect(tab.key)}
              className={`
                flex flex-col items-center justify-center transition-all
                ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50'}
              `}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};