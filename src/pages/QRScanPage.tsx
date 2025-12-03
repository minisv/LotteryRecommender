import React, { useEffect, useRef, useState, useCallback } from 'react';
import QrScanner from 'qr-scanner';

const QRScanPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<any>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // 스캔 성공 핸들러 (의존성 최소화)
  const onScanSuccess = useCallback((result: { data: string }) => {
    console.log('✅ QR 스캔 성공:', result.data);

    if (result.data.includes('dhlottery.co.kr')) {
      setScanResult(result.data);
      setIsScanning(false);
      if (scannerRef.current) {
        scannerRef.current.pause();
      }
    } else {
      setError('❌ 동행복권 로또 QR코드만 스캔 가능합니다.');
    }
  }, []);

  // 카메라 완전 재시작 (핵심 수정)
  const startScanner = useCallback(async () => {
    console.log('🎥 카메라 시작 시도...');

    // 상태 초기화
    setError(null);
    setIsScanning(false);

    // 기존 스캐너 완전 정리
    if (scannerRef.current) {
      try {
        scannerRef.current.destroy();
      } catch (e) {
        console.log('기존 스캐너 정리 완료');
      }
      scannerRef.current = null;
    }

    // 비디오 리셋
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }

    try {
      if (!videoRef.current) {
        console.error('❌ videoRef 없음');
        return;
      }

      // 새 스캐너 생성 및 시작
      scannerRef.current = new QrScanner(videoRef.current, onScanSuccess, {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      console.log('✅ 스캐너 생성 완료, 시작...');
      await scannerRef.current.start();
      setIsScanning(true);
      console.log('🎥 카메라 시작 완료!');

    } catch (err: any) {
      console.error('❌ 카메라 시작 실패:', err);
      setError(err?.message || '카메라 재시작 실패');
    }
  }, [onScanSuccess]);

  // 새탭 열기
  const openLottoResult = useCallback(() => {
    if (scanResult) {
      window.open(scanResult, '_blank', 'noopener,noreferrer');
    }
  }, [scanResult]);

  // 완전 재스캔 (핵심 수정)
  const handleRescan = useCallback(async () => {
    console.log('🔄 재스캔 요청');
    setScanResult(null);
    setError(null);

    // 100ms 딜레이 후 카메라 재시작
    setTimeout(() => {
      startScanner();
    }, 100);
  }, [startScanner]);

  // 최초 로드 및 정리
  useEffect(() => {
    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []); // 의존성 배열 비움

  return (
    <div className="p-6 pb-28 min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">📷 QR 당첨확인</h1>

      {/* 에러 상태 */}
      {error && (
        <div className="mb-8 p-8 bg-red-100 dark:bg-red-900/50 rounded-3xl border-4 border-red-200 shadow-xl mx-4">
          <p className="text-2xl font-bold text-red-800 dark:text-red-200 mb-6 text-center leading-relaxed">{error}</p>
          <button
            onClick={handleRescan}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-xl font-bold text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            🔄 카메라 다시 열기
          </button>
        </div>
      )}

      {/* 스캔 화면 */}
      {!scanResult && !error && (
        <div className="max-w-md mx-auto">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black border-8 border-gray-800/50 mx-4">
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* 스캔 가이드 애니메이션 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-44 h-44 rounded-2xl border-4 border-transparent
                border-t-blue-400 border-r-blue-400 border-b-blue-400
                animate-pulse shadow-2xl"></div>
            </div>
            {/* 상태 오버레이 */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
              {isScanning ? '스캔중...' : '카메라 준비'}
            </div>
          </div>

          <div className="text-center mt-8 mx-4">
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              로또 용지 QR 코드를 중앙에 맞추세요
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isScanning ? '✅ 스캔 준비 완료' : '📱 카메라 권한 허용 중...'}
            </p>
          </div>
        </div>
      )}

      {/* 스캔 성공 */}
      {scanResult && (
        <div className="max-w-2xl mx-auto space-y-6 px-4 animate-fade-in">
          {/* 성공 배너 */}
          <div className="p-8 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-3xl text-white text-center shadow-2xl backdrop-blur-md">
            <div className="w-28 h-28 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center
              text-5xl backdrop-blur-sm shadow-2xl animate-bounce-slow">
              ✅
            </div>
            <h2 className="text-3xl font-black mb-3 tracking-wide">스캔 완료!</h2>
            <p className="text-xl opacity-95">동행복권 당첨확인 페이지로 이동합니다</p>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-4 pt-6">
            <button
              onClick={openLottoResult}
              className="w-full py-6 px-8 text-2xl font-black text-white bg-gradient-to-r
                from-blue-600 via-blue-700 to-purple-700 rounded-3xl shadow-2xl
                hover:shadow-3xl hover:-translate-y-2 active:scale-95 transition-all duration-300 group"
            >
              🌐 <span>당첨확인 하러가기</span>
              <span className="ml-4 text-xl group-hover:translate-x-2 transition-all">→</span>
            </button>

            <button
              onClick={handleRescan}
              className="w-full py-5 px-8 text-xl font-bold text-gray-800 dark:text-white
                bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800
                backdrop-blur-md rounded-2xl border-2 border-gray-300 dark:border-gray-600
                hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              🔄 다른 로또번호 스캔하기
            </button>
          </div>

          {/* 디버그 (접기) */}
          <details className="p-4 bg-gray-100/80 dark:bg-gray-800/80 rounded-xl backdrop-blur text-sm">
            <summary className="font-bold cursor-pointer text-blue-600 dark:text-blue-400 mb-2">QR 원본 URL</summary>
            <code className="block p-3 bg-gray-200 dark:bg-gray-700 rounded-lg break-all text-xs font-mono max-h-20 overflow-auto">
              {scanResult}
            </code>
          </details>
        </div>
      )}
    </div>
  );
};

export default QRScanPage;
