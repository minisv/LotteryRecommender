import React from 'react';
import { useQRScanner } from '../../hooks/useQRScanner';

export const CameraScreen: React.FC = () => {
  const { videoRef, isScanning, scanResult, toggleScanner, clearResult } = useQRScanner();

  const handleNavigate = () => {
    if (scanResult && confirm('해당 페이지로 이동하시겠습니까?')) {
      window.open(scanResult, '_blank');
      clearResult();
    }
  };

  return (
    <div className="pb-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">📷 QR 코드 스캔</h1>
        <p className="text-gray-600 mb-6">동행복권 QR 코드를 스캔하세요</p>

        <div className="flex justify-center mb-6">
          <video
            ref={videoRef}
            className={`w-full max-w-md rounded-lg shadow-lg ${isScanning ? '' : 'hidden'}`}
          />
        </div>

        <button
          onClick={toggleScanner}
          className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg mb-4 ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isScanning ? '스캔 중지' : '스캔 시작'}
        </button>

        {scanResult && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
            <p className="text-green-800 font-bold mb-2">✅ QR 코드 인식 완료</p>
            <p className="text-sm text-gray-600 mb-3 break-all">{scanResult}</p>
            <button
              onClick={handleNavigate}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >
              페이지 이동
            </button>
          </div>
        )}
      </div>
    </div>
  );
};