import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/', label: '번호추천', icon: '🎱' },
    { path: '/saved', label: '저장번호', icon: '📋' },
    { path: '/history', label: '당첨번호', icon: '🏆' },
    { path: '/qr', label: 'QR확인', icon: '📷' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-4 h-20">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-lg
              ${isActive
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-gray-500 dark:text-gray-400'}`
            }
          >
            <span className="text-3xl mb-1">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
