/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pop-in': 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'scan-pulse': 'scanPulse 2s infinite',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scanPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
