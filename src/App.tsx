import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import BottomNav from './components/BottomNav';
import ThemeToggle from './components/ThemeToggle';
import RecommendPage from './pages/RecommendPage';
import SavedPage from './pages/SavedPage';
import HistoryPage from './pages/HistoryPage';
import QRScanPage from './pages/QRScanPage';
import './App.css';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      <main className="max-w-lg mx-auto pb-20">
        <Routes>
          <Route path="/" element={<RecommendPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/qr" element={<QRScanPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
