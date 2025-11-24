import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base: '/LotteryRecommender/',
  server: {
    proxy: {
      '/api': {
        target: 'https://www.dhlottery.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/common.do'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
