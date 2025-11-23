import React, { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

const CameraScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        result => console.log('QR code:', result),
        { /* 옵션 */ }
      );
      qrScannerRef.current.start();
    }
    return () => {
      qrScannerRef.current?.stop();
      qrScannerRef.current?.destroy();
    };
  }, []);

  return <video ref={videoRef} style={{ width: '100%' }} />;
};
export default CameraScreen;
