/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        lotto: ['Noto Sans KR', 'Roboto', 'sans-serif'],
      },
      colors: {
        // 로또볼 색상 커스텀 (선택사항)
        'lotto-yellow': '#FCD34D',
        'lotto-blue': '#3B82F6',
        'lotto-red': '#EF4444',
        'lotto-dark': '#1F2937',
        'lotto-green': '#10B981',
      }
    },
  },
  plugins: [],
}
