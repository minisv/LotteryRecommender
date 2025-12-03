import React from 'react';

interface LottoBallProps {
  number: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LottoBall: React.FC<LottoBallProps> = ({ number, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  // v4에서 안정적으로 작동하는 색상 시스템
  const getBallColors = (num: number) => {
    if (num >= 1 && num <= 10) return { bg: 'bg-yellow-400', text: 'text-black', border: 'border-yellow-500' };
    if (num >= 11 && num <= 20) return { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' };
    if (num >= 21 && num <= 30) return { bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' };
    if (num >= 31 && num <= 40) return { bg: 'bg-gray-800', text: 'text-white', border: 'border-gray-900' };
    return { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600' };
  };

  const colors = getBallColors(number);

  return (
    <div className="flex items-center justify-center p-2">
      <div
        className={`
          ${sizeClasses[size]} ${colors.bg}
          aspect-square rounded-full
          flex items-center justify-center
          ${textSizeClasses[size]} font-lotto font-black tracking-widest
          ${colors.text} drop-shadow-2xl
          border-4 ${colors.border}
          ring-4 ring-white/90 shadow-2xl
          hover:scale-110 hover:shadow-3xl transition-all duration-300 ease-out
        `}
      >
        {number.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default LottoBall;
