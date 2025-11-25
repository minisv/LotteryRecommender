import React, { useRef, useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

export const CameraScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const startScanner = () => {
    if (videoRef.current && !scanner) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (result.data.includes('m.dhlottery.co.kr')) {
            setScanResult(result.data);
            stopScanner();
          } else {
            alert('❌ 동행복권 QR 코드가 아닙니다.');
          }
        },
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScanner.start();
      setScanner(qrScanner);
      setIsScanning(true);
    }
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.stop();
      scanner.destroy();
      setScanner(null);
      setIsScanning(false);
    }
  };

  const toggleScanner = () => {
    if (isScanning) {
      stopScanner();
      setScanResult(null);
    } else {
      startScanner();
    }
  };

  const navigateToResult = () => {
    if (scanResult && confirm('해당 페이지로 이동하시겠습니까?')) {
      window.open(scanResult, '_blank');
      setScanResult(null);
    }
  };

  useEffect(() => {
    navigateToResult()
  }, [scanResult]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-center mb-4">
        <div className="text-6xl">📷</div>
      </div>
      <h1 className="text-3xl font-black gradient-text text-center mb-2">QR 코드 스캔</h1>
      <p className="text-gray-600 text-center mb-6 text-lg">동행복권 QR 코드를 스캔하세요</p>

      <div className="flex justify-center mb-6">
        <video
          ref={videoRef}
          className={`w-full max-w-md rounded-2xl shadow-2xl ${
            isScanning ? 'border-4 border-dashed border-purple-500 animate-scan-pulse' : 'hidden'
          }`}
        />
      </div>

      <button
        onClick={toggleScanner}
        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl text-lg mb-4 ${
          isScanning
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white'
        }`}
      >
        {isScanning ? '⏹️ 스캔 중지' : '📸 스캔 시작'}
      </button>

      {scanResult && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6">
          <p className="text-green-800 font-bold mb-2 text-lg flex items-center">
            <span className="text-2xl mr-2">✅</span> QR 코드 인식 완료
          </p>
          <p className="text-sm text-gray-600 mb-4 break-all bg-white p-3 rounded-lg">
            {scanResult}
          </p>
          <button
            onClick={navigateToResult}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-bold transition-all"
          >
            🔗 페이지 이동
          </button>
        </div>
      )}
    </div>
  );
};
