import React from "react";
import { FaSave, FaSearch, FaCamera } from "react-icons/fa";

const TAB_LIST = [
  { key: "saved", label: "내 저장 번호", icon: <FaSave /> },
  { key: "winner", label: "당첨 번호 조회", icon: <FaSearch /> },
  { key: "camera", label: "카메라", icon: <FaCamera /> },
];

export type TabKey = typeof TAB_LIST[number]["key"];

interface BottomTabsProps {
  selected: TabKey;
  onSelect: (key: TabKey) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ selected, onSelect }) => (
  <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
    <div className="grid grid-cols-3 h-full">
      {TAB_LIST.map(tab => (
        <button
          key={tab.key}
          onClick={() => onSelect(tab.key)}
          className={`flex flex-col items-center justify-center group
            ${selected === tab.key ? "text-purple-600 font-bold" : "text-gray-400"} transition`}
        >
          <div className="text-xl mb-0.5">{tab.icon}</div>
          <span className="text-xs">{tab.label}</span>
        </button>
      ))}
    </div>
  </nav>
);
