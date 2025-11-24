export interface LotterySet {
  id: string;
  numbers: number[];
  createdAt: number;
  expiresAt: number;
}

export interface WinningNumberData {
  returnValue: string;
  drwNo: number;
  drwNoDate: string;
  totSellamnt: number;
  firstWinamnt: number;
  firstPrzwnerCo: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

export type TabKey = 'saved' | 'winner' | 'camera';