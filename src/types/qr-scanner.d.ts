// src/types/qr-scanner.d.ts
interface QrScannerScanResult {
  data: string;
}

interface QrScannerOptions {
  returnDetailedScanResult?: boolean;
  highlightScanRegion?: boolean;
  highlightCodeOutline?: boolean;
  maxScansPerWindow?: number;
}

declare module 'qr-scanner' {
  export type QrScannerScanResult = QrScannerScanResult;
  export interface QrScannerOptions extends QrScannerOptions {}

  export default class QrScanner {
    static hasCamera(): Promise<boolean>;

    constructor(
      video: HTMLVideoElement,
      onDecode: (result: QrScannerScanResult) => void,
      options?: QrScannerOptions
    );

    start(): Promise<void>;
    stop(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    destroy(): void;
    getState(): string;
  }
}
