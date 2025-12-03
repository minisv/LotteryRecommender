import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700
        text-2xl shadow-lg z-50 hover:scale-110 transition-transform"
      aria-label="테마 전환"
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
