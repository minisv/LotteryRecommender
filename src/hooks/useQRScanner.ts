import { useRef, useState, useCallback } from 'react';
import QrScanner from 'qr-scanner';

export const useQRScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const startScanner = useCallback(() => {
    if (!videoRef.current) return;

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        const data = result.data;
        if (data.includes('dhlottery.co.kr')) {
          setScanResult(data);
          stopScanner();
        } else {
          alert('동행복권 QR 코드가 아닙니다.');
        }
      },
      {
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scannerRef.current.start();
    setIsScanning(true);
  }, []);

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const toggleScanner = useCallback(() => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  }, [isScanning, startScanner, stopScanner]);

  return {
    videoRef,
    isScanning,
    scanResult,
    toggleScanner,
    clearResult: () => setScanResult(null),
  };
};